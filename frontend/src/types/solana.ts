// Solana 相关类型定义

export type SolanaNetwork = "mainnet-beta" | "devnet" | "testnet";

export interface SolanaWalletInfo {
  address: string;
  balance: string; // SOL balance
  network: SolanaNetwork;
  publicKey?: string;
}

export interface SolanaWalletAdapter {
  publicKey: string | null;
  connected: boolean;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  signTransaction?(transaction: any): Promise<any>;
  signAllTransactions?(transactions: any[]): Promise<any[]>;
}

// 钱包类型
export type WalletName = "Phantom" | "Solflare" | "Backpack" | "WalletConnect";
