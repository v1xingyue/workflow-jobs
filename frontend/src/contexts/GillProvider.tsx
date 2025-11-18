import { useMemo, ReactNode } from 'react'
import { createSolanaClient } from 'gill'
import { SolanaNetwork } from '../types/solana'
import { SOLANA_CONFIG } from '../config/solana'

interface GillProviderProps {
  children: ReactNode
  network?: SolanaNetwork
}

// 创建 Gill 客户端上下文
export function GillProvider({ children, network = SOLANA_CONFIG.DEFAULT_NETWORK }: GillProviderProps) {
  // 将网络类型转换为 Gill 支持的网络标识
  const networkMoniker = useMemo(() => {
    switch (network) {
      case 'mainnet-beta':
        return 'mainnet'
      case 'devnet':
        return 'devnet'
      case 'testnet':
        return 'testnet'
      default:
        return 'devnet'
    }
  }, [network])

  // 创建 Solana 客户端
  const solanaClient = useMemo(() => {
    // 优先使用环境变量配置的 RPC，否则使用网络标识
    const rpcUrl = SOLANA_CONFIG.RPC_ENDPOINTS[network]
    return createSolanaClient({
      urlOrMoniker: rpcUrl || networkMoniker,
    })
  }, [network, networkMoniker])

  // 将客户端通过 context 传递给子组件
  // 注意：这里我们需要创建一个 Context 来传递客户端
  // 为了简化，我们可以直接导出客户端创建函数，让组件自己创建
  
  return <>{children}</>
}

// 导出创建客户端的辅助函数
export function useGillClient(network: SolanaNetwork = SOLANA_CONFIG.DEFAULT_NETWORK) {
  return useMemo(() => {
    const networkMoniker = network === 'mainnet-beta' ? 'mainnet' : network
    const rpcUrl = SOLANA_CONFIG.RPC_ENDPOINTS[network]
    return createSolanaClient({
      urlOrMoniker: rpcUrl || networkMoniker,
    })
  }, [network])
}

