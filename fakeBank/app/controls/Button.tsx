import React, { CSSProperties } from 'react'
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome'
import { controlStyles } from '../styles/styles'
import { HStack } from '../coreComponents/components'
import { Text } from '../coreComponents/components'

interface ButtonProps {
  className?: string
  text?: string
  onClick?: () => void
  disabled?: boolean
  style?: CSSProperties
  icon?: FontAwesomeIconProps['icon']
  title?: string
  children?: any
}

function Button({
  className,
  text,
  onClick,
  disabled,
  style,
  icon,
  title,
  children,
}: ButtonProps) {
  const handleMouseEnter = (event) => {
    event.target.style.backgroundColor =
      controlStyles.hoverButton.backgroundColor
  }

  const handleMouseLeave = (event) => {
    !disabled
      ? (event.target.style.backgroundColor =
          controlStyles.button.backgroundColor)
      : null
  }
  const parsedStyle = disabled
    ? { ...style, ...controlStyles.button, ...controlStyles.disabledButton }
    : { ...style, ...controlStyles.button }
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      style={parsedStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title={title}
    >
      <HStack spacing={5} align="center">
        {text && <Text size={13}>{text}</Text>}
        {children && children}
        {icon && <FontAwesomeIcon icon={icon} />}
      </HStack>
    </button>
  )
}

export default Button
