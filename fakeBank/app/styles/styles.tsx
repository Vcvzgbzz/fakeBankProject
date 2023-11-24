import React, { CSSProperties } from 'react'
import { colors } from './colors'

export const productStyles: { [key: string]: CSSProperties } = {
  productContainer: {
    border: `2px solid ${colors.mediumGrey}`,
    borderRadius: '10px',
    padding: '10px',
    margin: '10px',
    maxWidth: '200px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.white,
    minWidth: '200px',
  },

  productTitle: {
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: '16px',
    color: 'green',
  },
  productImage: {
    width: '100px',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  allProductWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
  },
  buttonContainerStyle: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    display: 'flex',
    gap: '5px',
    paddingTop: '5px',
  },
}

export const pageStyles: { [key: string]: CSSProperties } = {
  pageContainer: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: colors.lightGrey,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  lineStyle: {
    width: '100%',
    height: '2px',
    backgroundColor: colors.black,
    border: 'none',
  },
  tableHeaderStyle: {
    background: colors.lightGrey,
    padding: '8px',
    textAlign: 'left',
    borderBottom: `1px solid ${colors.mediumGrey}`,
  },

  tableCellStyle: {
    padding: '8px',
    borderBottom: `1px solid ${colors.mediumGrey}`,
  },
  alternateRowStyle: {
    background: colors.lightBlue,
  },
  cardStyle: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    border: `1px solid ${colors.mediumGrey}`,
    borderRadius: '8px',
    margin: '10px',
    width: '50%',
  },
}

export const controlStyles: { [key: string]: CSSProperties } = {
  button: {
    backgroundColor: colors.darkGrey,
    color: colors.white,
    padding: '8px 13px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  hoverButton: {
    backgroundColor: colors.mediumGrey,
  },
  disabledButton: {
    backgroundColor: colors.lightGrey,
    color: colors.mediumGrey,
    cursor: 'not-allowed',
    transition: 'none',
  },
}
