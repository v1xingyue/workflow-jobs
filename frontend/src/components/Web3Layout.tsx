import { useState, ReactNode } from 'react'
import { 
  FaBars, 
  FaTimes, 
  FaHome, 
  FaWallet, 
  FaExchangeAlt,
  FaCog,
  FaCopy,
  FaCheck,
  FaCoins
} from 'react-icons/fa'
import { SiSolana } from 'react-icons/si'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import Logo from './Logo'
import { SolanaNetwork } from '../types/solana'
import { formatSolanaAddress, getNetworkDisplayName, getNetworkColor } from '../utils/solana'
import { useSolanaWallet } from '../hooks/useSolanaWallet'

interface Web3LayoutProps {
  children: ReactNode
  title?: string
  menuItems?: Array<{
    label: string
    icon: ReactNode
    onClick?: () => void
    active?: boolean
  }>
}


export default function Web3Layout({ 
  children, 
  title = "Solana DApp",
  menuItems = []
}: Web3LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [selectedNetwork, setSelectedNetwork] = useState<SolanaNetwork>('devnet')
  
  // 使用真实的 Solana 钱包 hook
  const { 
    walletInfo, 
    connected, 
    loading, 
    error,
    connect,
    disconnect,
    walletName
  } = useSolanaWallet(selectedNetwork)
  
  const { setVisible } = useWalletModal()

  // 默认菜单项
  const defaultMenuItems = [
    {
      label: 'Home',
      icon: <FaHome className="w-5 h-5" />,
      active: true
    },
    {
      label: 'Wallet',
      icon: <FaWallet className="w-5 h-5" />,
    },
    {
      label: 'Swap',
      icon: <FaExchangeAlt className="w-5 h-5" />,
    },
    {
      label: 'Settings',
      icon: <FaCog className="w-5 h-5" />,
    },
    ...menuItems
  ]

  const handleConnectWallet = async () => {
    if (!connected) {
      // 打开钱包选择模态框
      setVisible(true)
    } else {
      // 断开连接
      await disconnect()
    }
  }

  const handleNetworkChange = (network: SolanaNetwork) => {
    setSelectedNetwork(network)
    // 注意：切换网络时，钱包可能需要重新连接
    // 这里只是更新网络状态，实际网络切换需要在 SolanaProvider 中处理
  }

  const handleCopyAddress = () => {
    if (walletInfo?.address) {
      navigator.clipboard.writeText(walletInfo.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }


  return (
    <div className="min-h-screen bg-base-100">
      {/* Navbar */}
      <div className="navbar bg-base-200 shadow-lg sticky top-0 z-50">
        <div className="flex-none">
          <button 
            className="btn btn-square btn-ghost lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>
        </div>
        
        <div className="flex-1">
          <a className="btn btn-ghost text-xl gap-2">
            <Logo size={32} variant="icon" className="text-primary" />
            <span className="hidden sm:inline">{title}</span>
          </a>
        </div>

        <div className="flex-none gap-2">
          {/* Network Indicator */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className={`btn btn-ghost btn-sm gap-2 ${connected ? '' : 'opacity-70'}`}>
              <SiSolana className="w-4 h-4 text-purple-500" />
              <span className="hidden sm:inline">{getNetworkDisplayName(selectedNetwork)}</span>
            </label>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box shadow-lg w-52 p-2 mt-2">
              <li>
                <a 
                  onClick={() => handleNetworkChange('mainnet-beta')}
                  className={selectedNetwork === 'mainnet-beta' ? 'active' : ''}
                >
                  Mainnet
                </a>
              </li>
              <li>
                <a 
                  onClick={() => handleNetworkChange('devnet')}
                  className={selectedNetwork === 'devnet' ? 'active' : ''}
                >
                  Devnet
                </a>
              </li>
              <li>
                <a 
                  onClick={() => handleNetworkChange('testnet')}
                  className={selectedNetwork === 'testnet' ? 'active' : ''}
                >
                  Testnet
                </a>
              </li>
            </ul>
          </div>

          {/* Wallet Connect Button */}
          {connected && walletInfo ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-primary gap-2">
                <FaWallet className="w-4 h-4" />
                <span className="hidden sm:inline">{formatSolanaAddress(walletInfo.address)}</span>
              </label>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box shadow-lg w-80 p-4 mt-2">
                <li className="mb-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-base-content/70">Connected</span>
                      <div className="flex items-center gap-2">
                        {walletName && (
                          <span className="text-xs badge badge-sm">{walletName}</span>
                        )}
                        <button 
                          className="btn btn-xs btn-ghost"
                          onClick={handleConnectWallet}
                          disabled={loading}
                        >
                          {loading ? 'Disconnecting...' : 'Disconnect'}
                        </button>
                      </div>
                    </div>
                    {error && (
                      <div className="alert alert-error alert-sm mt-2">
                        <span className="text-xs">{error}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-base-200 px-2 py-1 rounded flex-1">
                        {walletInfo.address}
                      </code>
                      <button
                        className="btn btn-xs btn-square btn-ghost"
                        onClick={handleCopyAddress}
                        title="Copy address"
                      >
                        {copied ? <FaCheck className="w-3 h-3 text-success" /> : <FaCopy className="w-3 h-3" />}
                      </button>
                    </div>
                    <div className="divider my-1"></div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Balance</span>
                      <span className="font-semibold flex items-center gap-1">
                        <SiSolana className="w-4 h-4 text-purple-500" />
                        {walletInfo.balance} SOL
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Network</span>
                      <span className={`badge ${getNetworkColor(walletInfo.network)}`}>
                        {getNetworkDisplayName(walletInfo.network)}
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          ) : (
            <button 
              className="btn btn-primary gap-2"
              onClick={handleConnectWallet}
            >
              <FaWallet className="w-4 h-4" />
              <span className="hidden sm:inline">Connect Wallet</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-base-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="h-full flex flex-col border-r border-base-300">
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4 px-2">Navigation</h2>
              <ul className="menu menu-vertical w-full">
                {defaultMenuItems.map((item, index) => (
                  <li key={index}>
                    <a 
                      className={`flex items-center gap-3 ${item.active ? 'active' : ''}`}
                      onClick={item.onClick}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Wallet Status in Sidebar */}
            {connected && walletInfo && (
              <div className="mt-auto p-4 border-t border-base-300">
                <div className="card bg-base-100 shadow-sm">
                  <div className="card-body p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-base-content/70">Wallet</span>
                      <div className="badge badge-success badge-sm">Connected</div>
                    </div>
                    <div className="text-xs font-mono text-base-content/80 truncate">
                      {formatSolanaAddress(walletInfo.address)}
                    </div>
                    <div className="text-xs text-base-content/70 mt-1 flex items-center gap-1">
                      <SiSolana className="w-3 h-3 text-purple-500" />
                      {walletInfo.balance} SOL
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 min-w-0">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

