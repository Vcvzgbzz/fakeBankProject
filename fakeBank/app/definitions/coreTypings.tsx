export type BankData = {
  accountNumber: string
  accountHolder: string
  balance: number
  accountType: 'Savings' | 'Checking'
  lastPurchases: Purchase[]
}

export type Purchase = {
  amount: number
  description: string
  timestamp: Date
}
