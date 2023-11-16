import React from 'react'
import { Purchase, BankData } from '../definitions/coreTypings'
import { pageStyles } from '../styles/styles'
import { colors } from '../styles/colors'

export type AccountDataProps = {
  data: BankData
}

function formatDate(date: Date): string {
  return date.toLocaleDateString()
}

function AccountData({ data }: AccountDataProps) {
  const sortedPurchases = data.lastPurchases
    .slice()
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  return (
    <div
      style={{
        border: `1px solid black ${colors.black}`,
        padding: '10px',
        marginBottom: '20px',
        borderRadius: '5px',
      }}
    >
      <p>
        Account(
        {data.accountNumber.substring(
          data.accountNumber.length - 4,
          data.accountNumber.length,
        )}
        ) {data.accountType}:
      </p>
      <p>${data.balance.toFixed(2)}</p>
      <hr style={{ margin: '10px 0' }} />

      <h3>Last 10 Purchases:</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={pageStyles.tableHeaderStyle}>Amount</th>
            <th style={pageStyles.tableHeaderStyle}>Description</th>
            <th style={pageStyles.tableHeaderStyle}>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {sortedPurchases.map((purchase, index) => (
            <tr
              key={index}
              style={index % 2 === 0 ? pageStyles.alternateRowStyle : null}
            >
              <td style={pageStyles.tableCellStyle}>
                ${purchase.amount.toFixed(2)}
              </td>
              <td style={pageStyles.tableCellStyle}>{purchase.description}</td>
              <td style={pageStyles.tableCellStyle}>
                {formatDate(purchase.timestamp)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AccountData
