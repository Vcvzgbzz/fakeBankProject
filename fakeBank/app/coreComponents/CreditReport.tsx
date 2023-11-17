import React from 'react'
import { faCreditCard, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FakeUserResponse } from '../definitions/apiDefinitions'
import { pageStyles } from '../styles/styles'
import { HStack, Text, VStack } from './components'
import { colors } from '../styles/colors'

interface CreditReportProps {
  user: FakeUserResponse['results'][0]
}

export default function CreditReport({ user }: CreditReportProps) {
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
    if (user.dob.age < 35) {
      facts.push('One auto loan found')
    }
    if (user.dob.age > 40) {
      facts.push('One Authorized User on one credit account found')
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
                style={{
                  marginRight: '5px',
                  color:
                    index > 0
                      ? colors.darkGrey
                      : fact.includes('Excellent')
                        ? colors.green
                        : fact.includes('Good')
                          ? colors.green
                          : fact.includes('Some')
                            ? colors.yellow
                            : colors.red,
                }}
              />
              <Text>{fact}</Text>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </div>
  )
}
