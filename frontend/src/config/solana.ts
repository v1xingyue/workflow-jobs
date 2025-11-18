// Solana 配置常量

export const SOLANA_CONFIG = {
  // RPC 端点配置
  RPC_ENDPOINTS: {
    'mainnet-beta': import.meta.env.VITE_SOLANA_RPC_MAINNET || 'https://api.mainnet-beta.solana.com',
    'devnet': import.meta.env.VITE_SOLANA_RPC_DEVNET || 'https://api.devnet.solana.com',
    'testnet': import.meta.env.VITE_SOLANA_RPC_TESTNET || 'https://api.testnet.solana.com',
  },
  
  // 默认网络
  DEFAULT_NETWORK: 'devnet' as const,
  
  // 余额刷新间隔（毫秒）
  BALANCE_REFRESH_INTERVAL: 10000,
  
  // 支持的钱包
  SUPPORTED_WALLETS: ['Phantom', 'Solflare'] as const,
} as const

