import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { colors } from '../styles/colors'

interface ExpanderProps {
  title: string
  children: React.ReactNode
}

const Expander: React.FC<ExpanderProps> = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpander = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div
      style={{
        border: `1px solid ${colors.mediumGrey}`,
        marginBottom: '10px',
        width: '100%',
        borderRadius: '2px',
      }}
      className="Expander"
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px',
          background: colors.lightGrey,
          cursor: 'pointer',
          userSelect: 'none',
        }}
        onClick={toggleExpander}
      >
        <strong>{title} </strong>
        <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
      </div>
      {isExpanded && <div style={{ padding: '10px' }}>{children}</div>}
    </div>
  )
}

export default Expander
