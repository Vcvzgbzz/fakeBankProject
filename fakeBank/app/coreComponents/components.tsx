import React, { ReactNode } from 'react'

type HStackProps = {
  children: ReactNode
  spacing?: number
  align?: 'flex-start' | 'center' | 'flex-end' // Added align prop
  style?: React.CSSProperties
}

export const HStack: React.FC<HStackProps> = ({
  children,
  spacing = 8,
  align = 'flex-start',
  style,
}) => {
  const stackStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: align,
    gap: `${spacing}px`,
    ...style,
  }

  return (
    <div style={stackStyle} className="HStack">
      {children}
    </div>
  )
}

type VStackProps = {
  children: ReactNode
  spacing?: number
  align?: 'flex-start' | 'center' | 'flex-end' // Added align prop
  style?: React.CSSProperties
}

export const VStack: React.FC<VStackProps> = ({
  children,
  spacing = 8,
  align = 'flex-start',
  style,
}) => {
  const stackStyle: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: align,
    gap: `${spacing}px`,
    ...style,
  }

  return (
    <div style={stackStyle} className="VStack">
      {children}
    </div>
  )
}

type TextProps = {
  children?: ReactNode
  size?: number
  style?: React.CSSProperties
}

export const Text: React.FC<TextProps> = ({
  children = '',
  size = 16,
  style,
}) => {
  const textStyle: React.CSSProperties = {
    fontSize: `${size}px`,
    ...style,
  }

  return (
    <span style={textStyle} className="Text">
      {children}
    </span>
  )
}

type VerticalLineProps = {
  color?: string
  height: string
  width?: string
}

export const VerticalLine: React.FC<VerticalLineProps> = ({
  color = 'black',
  height,
  width = '1px',
}) => {
  const lineStyle: React.CSSProperties = {
    borderLeft: `${width} solid ${color}`,
    height,
    margin: '0',
  }

  return <div style={lineStyle}></div>
}
