import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState, useCallback } from 'react'
import { address } from 'gill'
import { useGillClient } from '../contexts/GillProvider'
import { SolanaWalletInfo, SolanaNetwork } from '../types/solana'
import { SOLANA_CONFIG } from '../config/solana'

export function useSolanaWallet(network: SolanaNetwork) {
  const { publicKey, connected, disconnect, connect, wallet } = useWallet()
  const gillClient = useGillClient(network)
  const [walletInfo, setWalletInfo] = useState<SolanaWalletInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 获取余额 - 使用 Gill SDK
  const fetchBalance = useCallback(async () => {
    if (!publicKey || !gillClient) {
      setWalletInfo(null)
      return
    }

    try {
      setLoading(true)
      setError(null)

      // 使用 Gill 获取账户余额
      const accountAddress = address(publicKey.toString())
      const { value: accountInfo } = await gillClient.rpc.getAccountInfo(accountAddress).send()
      
      // 如果账户存在，获取余额
      if (accountInfo) {
        const lamports = accountInfo.lamports
        // 转换为 SOL (1 SOL = 1,000,000,000 lamports)
        const solBalance = lamports / 1_000_000_000
        
        // 格式化余额：如果大于等于 1，保留 4 位小数；如果小于 1，保留 6 位小数
        const formattedBalance = solBalance >= 1 
          ? solBalance.toFixed(4).replace(/\.?0+$/, '')
          : solBalance.toFixed(6).replace(/\.?0+$/, '')

        setWalletInfo({
          address: publicKey.toString(),
          balance: formattedBalance,
          network,
          publicKey: publicKey.toString(),
        })
      } else {
        // 账户不存在，余额为 0
        setWalletInfo({
          address: publicKey.toString(),
          balance: '0',
          network,
          publicKey: publicKey.toString(),
        })
      }
    } catch (err) {
      console.error('Failed to fetch balance:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch balance')
      setWalletInfo(null)
    } finally {
      setLoading(false)
    }
  }, [publicKey, gillClient, network])

  // 当钱包连接或网络变化时，更新余额
  useEffect(() => {
    if (connected && publicKey) {
      fetchBalance()

      // 定期更新余额
      const interval = setInterval(fetchBalance, SOLANA_CONFIG.BALANCE_REFRESH_INTERVAL)
      return () => clearInterval(interval)
    } else {
      setWalletInfo(null)
    }
  }, [connected, publicKey, fetchBalance])

  // 处理连接钱包
  const handleConnect = useCallback(async () => {
    try {
      setError(null)
      if (!wallet) {
        throw new Error('No wallet selected')
      }
      await connect()
    } catch (err) {
      console.error('Failed to connect wallet:', err)
      setError(err instanceof Error ? err.message : 'Failed to connect wallet')
    }
  }, [connect, wallet])

  // 处理断开连接
  const handleDisconnect = useCallback(async () => {
    try {
      await disconnect()
      setWalletInfo(null)
      setError(null)
    } catch (err) {
      console.error('Failed to disconnect wallet:', err)
      setError(err instanceof Error ? err.message : 'Failed to disconnect wallet')
    }
  }, [disconnect])

  return {
    walletInfo,
    connected,
    publicKey,
    loading,
    error,
    connect: handleConnect,
    disconnect: handleDisconnect,
    refreshBalance: fetchBalance,
    walletName: wallet?.adapter.name,
  }
}

