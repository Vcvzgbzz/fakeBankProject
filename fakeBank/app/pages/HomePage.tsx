import React, { useState, useEffect } from 'react'
import Button from '../controls/Button'
import Input from '../controls/Input'
import { callApi, routeToPage } from '../coreFunctions/functions'
import {
  FakeStoreApiResponse,
  FakeStoreItem,
  FakeUserResponse,
} from '../definitions/apiDefinitions'
import { productStyles, pageStyles } from '../styles/styles'
import { url } from 'inspector'
import {
  HStack,
  VStack,
  Text,
  VerticalLine,
} from '../coreComponents/components'
import { BankData, Purchase } from '../definitions/coreTypings'
import AccountData from '../coreComponents/AccountData'
import UserData from '../coreComponents/UserData'
import Expander from '../controls/Expander'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faChevronUp,
  faUniversity,
  faReceipt,
} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

export default function HomePage() {
  useEffect(() => {
    callApi<undefined, FakeUserResponse>({
      url: 'https://randomuser.me/api',
      method: 'get',
      onSuccess: (data) => {
        setFakeUser(data.results[0])
      },
      onFail: (error) => console.log(error),
    })
  }, [])

  const [fakeUser, setFakeUser] = useState<
    FakeUserResponse['results'][0] | undefined
  >(undefined)

  const generateRandomString = (length: number): string => {
    const characters = '0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }
  const generateRandomDate = (): Date => {
    const start = new Date(2022, 0, 1)
    const end = new Date()
    const randomDate = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    )
    return randomDate
  }
  const bankData = (inputAccountType?: 'Savings' | 'Checking'): BankData => {
    const accountNumber = generateRandomString(12)
    const accountHolder = generateRandomString(8)
    const balance = Math.random() * 10000
    const accountType = inputAccountType === 'Savings' ? 'Savings' : 'Checking'
    const lastPurchases: Purchase[] = Array.from({ length: 10 }, () => ({
      amount:
        inputAccountType === 'Savings'
          ? Math.floor(Math.random() * 500)
          : Math.random() * 500,
      description:
        accountType === 'Checking'
          ? `Purchase #${generateRandomString(5)}`
          : `Transfer #${generateRandomString(4)}`,
      timestamp: generateRandomDate(),
    }))
    return {
      accountNumber,
      accountHolder,
      balance,
      accountType,
      lastPurchases,
    }
  }

  const randomBankDataChecking: BankData = bankData('Checking')
  const randomBankDataSavings: BankData = bankData('Savings')
  try {
    return !fakeUser ? (
      <div
        style={{
          ...pageStyles.pageContainer,
          width: '100%',
          height: '250px',
          textAlign: 'center',
        }}
      >
        <Text style={{ paddingTop: '50px' }} size={30}>
          Loading Your Bank Account Information...
        </Text>
      </div>
    ) : (
      <div style={pageStyles.pageContainer}>
        <HStack align="center" style={{ justifyContent: 'space-between' }}>
          <Text size={40}>Fake Bank Incorporated</Text>
          <HStack spacing={10}>
            <Button
              icon={faReceipt}
              text={'Report an issue'}
              title="Have an issue with your statement? Report an issue here"
              onClick={() => {}}
            />
            <Button icon={faChevronDown} text={'Another Page'} />
            <Button icon={faChevronUp} text={'Another Page'} />
          </HStack>
          <FontAwesomeIcon icon={faUniversity} size="3x" />
        </HStack>

        <hr style={pageStyles.lineStyle}></hr>
        <HStack style={{ justifyContent: 'space-between' }} align="center">
          <UserData user={fakeUser}></UserData>
          <div
            style={{ ...pageStyles.cardStyle, width: '100%', height: '100%' }}
          >
            {' '}
            Thinking of adding more pages with the example buttons above, or
            adding a new section here.
          </div>
        </HStack>
        <hr style={pageStyles.lineStyle}></hr>

        <VStack>
          <Expander
            children={<AccountData data={randomBankDataChecking} />}
            title="View Your Checking Account Data"
          />
          <hr style={pageStyles.lineStyle}></hr>
          <Expander
            children={<AccountData data={randomBankDataSavings} />}
            title="View Your Savings Account Data"
          />
        </VStack>
        <br />
        <br />
        <hr style={pageStyles.lineStyle}></hr>
        <footer>
          <p>&copy; 2023 Fake Bank Incorporated. All rights reserved.</p>
          <p>123 Main Street, Cityville, Country</p>
          <p>Email: info@fakebank.com | Phone: (123) 456-7890</p>
        </footer>
      </div>
    )
  } catch {
    return <div>There was an error loading this page, please retry...</div>
  }
}
