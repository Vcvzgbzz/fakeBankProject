import React, { CSSProperties } from 'react';
export const productStyles: { [key: string]: CSSProperties } = {
    productContainer: {
      border: '2px solid #ccc',
      borderRadius:'10px',
      padding: '10px',
      margin: '10px',
      maxWidth: '200px',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor:'#ffffff',
      minWidth:'200px'
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
  };
  
  export const pageStyles:{ [key: string]: CSSProperties}={
    pageContainer: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f2f2f2',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
      },
      lineStyle: {
        width: '100%',
        height: '2px',
        backgroundColor: '#000',
        border: 'none',
      }
  }