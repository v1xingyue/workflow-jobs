import { useMemo, ReactNode } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { SolanaNetwork } from '../types/solana'
import { SOLANA_CONFIG } from '../config/solana'

// 需要导入钱包适配器的 CSS
import '@solana/wallet-adapter-react-ui/styles.css'

interface SolanaProviderProps {
  children: ReactNode
  network?: SolanaNetwork
}

export function SolanaProvider({ children, network = SOLANA_CONFIG.DEFAULT_NETWORK }: SolanaProviderProps) {
  // 将我们的网络类型转换为 Solana 钱包适配器的网络类型
  const walletNetwork = useMemo(() => {
    switch (network) {
      case 'mainnet-beta':
        return WalletAdapterNetwork.Mainnet
      case 'devnet':
        return WalletAdapterNetwork.Devnet
      case 'testnet':
        return WalletAdapterNetwork.Testnet
      default:
        return WalletAdapterNetwork.Devnet
    }
  }, [network])

  // RPC 端点配置
  const endpoint = useMemo(() => {
    return SOLANA_CONFIG.RPC_ENDPOINTS[network] || SOLANA_CONFIG.RPC_ENDPOINTS.devnet
  }, [network])

  // 支持的钱包列表
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

