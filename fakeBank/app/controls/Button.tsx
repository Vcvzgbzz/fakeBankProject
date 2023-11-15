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
  text?: any
  onClick?: () => void
  disabled?: boolean
  style?: CSSProperties
  icon?: FontAwesomeIconProps['icon']
  title?: string
}

function Button({
  className,
  text,
  onClick,
  disabled,
  style,
  icon,
  title,
}: ButtonProps) {
  const handleMouseEnter = (event) => {
    event.target.style.backgroundColor =
      controlStyles.hoverButton.backgroundColor
  }

  const handleMouseLeave = (event) => {
    event.target.style.backgroundColor = controlStyles.button.backgroundColor
  }
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      style={{ ...style, ...controlStyles.button }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title={title}
    >
      <HStack spacing={5} align="center">
        <Text size={13}>{text}</Text>
        {icon && <FontAwesomeIcon icon={icon} />}
      </HStack>
    </button>
  )
}

export default Button
