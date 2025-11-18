// Solana 工具函数

/**
 * 格式化 Solana 地址
 * @param address Solana 地址
 * @param startChars 开头显示的字符数
 * @param endChars 结尾显示的字符数
 * @returns 格式化后的地址
 */
export function formatSolanaAddress(
  address: string,
  startChars: number = 4,
  endChars: number = 4
): string {
  if (!address || address.length < startChars + endChars) {
    return address
  }
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`
}

/**
 * 验证 Solana 地址格式
 * @param address 地址
 * @returns 是否为有效的 Solana 地址
 */
export function isValidSolanaAddress(address: string): boolean {
  // Solana 地址是 base58 编码，长度通常为 32-44 字符
  const base58Regex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/
  return base58Regex.test(address)
}

/**
 * 获取网络显示名称
 */
export function getNetworkDisplayName(network: string): string {
  const networkMap: Record<string, string> = {
    'mainnet-beta': 'Mainnet',
    'devnet': 'Devnet',
    'testnet': 'Testnet',
  }
  return networkMap[network] || network
}

/**
 * 获取网络颜色
 */
export function getNetworkColor(network: string): string {
  const colorMap: Record<string, string> = {
    'mainnet-beta': 'badge-primary',
    'devnet': 'badge-warning',
    'testnet': 'badge-info',
  }
  return colorMap[network] || 'badge-neutral'
}

