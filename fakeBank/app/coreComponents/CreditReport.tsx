import React from 'react'
import { faCreditCard, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FakeUserResponse } from '../definitions/apiDefinitions'
import { pageStyles } from '../styles/styles'
import { HStack, Text, VStack } from './components'

interface CreditReportProps {
  user: FakeUserResponse['results'][0]
}

export default function CreditReport() {
  const generateInterestingFacts = (creditScore: number): string[] => {
    const facts: string[] = []

    // Example facts based on the credit score
    if (creditScore > 750) {
      facts.push('Excellent credit history!')
    } else if (creditScore > 650) {
      facts.push('Good credit standing.')
    } else if (creditScore > 550) {
      facts.push('Some room for improvement in credit management.')
    } else {
      facts.push('Consider taking steps to improve credit health.')
    }
    return facts
  }
  const creditScore = Math.min(Math.floor(Math.random() * 800) + 300, 800)
  const facts = generateInterestingFacts(creditScore)

  return (
    <div style={pageStyles.cardStyle}>
      <VStack>
        <HStack>
          <FontAwesomeIcon
            icon={faCreditCard}
            style={{ marginRight: '10px' }}
          />
          <Text>Credit Report</Text>
        </HStack>
        <Text>Credit Score: {creditScore}</Text>
        <VStack>
          {facts.map((fact, index) => (
            <HStack>
              <FontAwesomeIcon
                icon={faInfoCircle}
                style={{ marginRight: '5px' }}
              />
              <Text>{fact}</Text>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </div>
  )
}
