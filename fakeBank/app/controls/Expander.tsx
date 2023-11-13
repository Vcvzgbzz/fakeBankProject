import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';


interface ExpanderProps {
  title: string;
  children: React.ReactNode;
}

const Expander: React.FC<ExpanderProps> = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpander = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div style={{ border: '1px solid #ccc', marginBottom: '10px', width:'100%' }} className='Expander'>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px',
          background: '#f0f0f0',
          cursor: 'pointer',
          userSelect: 'none',
        }}
        onClick={toggleExpander}
      >
        <strong>{title}{' '}</strong>
        <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
      </div>
      {isExpanded && (
        <div style={{ padding: '10px' }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Expander;
