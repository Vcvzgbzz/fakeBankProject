import React, { ChangeEvent, CSSProperties } from 'react'

interface InputProps {
  className?: string
  text?: any
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  value?: string | number
  style?: CSSProperties
}

function Input({ className, value, onChange, style }: InputProps) {
  return (
    <input
      className={className}
      onChange={onChange}
      value={value}
      style={style}
    />
  )
}

export default Input
