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
  faSitemap,
  faBlender,
} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import CreditReport from '../coreComponents/CreditReport'
import { colors } from '../styles/colors'
import Link from 'next/link'
import { generateInterestingFacts } from '../coreComponents/CreditReport'
import JsonViewer from './JsonViewer'

export interface allUserData {
  user: FakeUserResponse['results'][0]
  bankData: {
    savings: BankData
    checking: BankData
  }
  creditData: {
    score: number
    facts: string[]
  }
}

export default function HomePage() {
  const [position, setPosition] = useState<number>(-1)
  const [viewJsonData, setViewJsonData] = useState(false)
  const [fakeUser, setFakeUser] = useState<allUserData | undefined>(undefined)

  const [fakeUserArr, setFakeUserArr] = useState<allUserData[]>([])
  const [newUserIsLoading, setNewUserIsLoading] = useState<boolean>(false)
  useEffect(() => {
    getNextUser()
  }, [])

  const getNextUser = () => {
    if (fakeUserArr[position + 1]) {
      setFakeUser(fakeUserArr[position + 1])
      setPosition(position + 1)
    } else {
      callApi<undefined, FakeUserResponse>({
        url: 'https://randomuser.me/api',
        method: 'get',
        raceLocker: newUserIsLoading,
        steps: {
          onRequest: () => {
            setNewUserIsLoading(true)
          },
          onSuccess: (data) => {
            const newCreditScore = Math.min(
              Math.floor(Math.random() * 800) + 300,
              800,
            )
            const newUser: allUserData = {
              user: data.results[0],
              bankData: {
                checking: bankData('Checking'),
                savings: bankData('Savings'),
              },
              creditData: {
                score: newCreditScore,
                facts: generateInterestingFacts(
                  data.results[0],
                  newCreditScore,
                ),
              },
            }
            fakeUserArr.push(newUser)
            setPosition(position + 1)
            setFakeUser(newUser)
            setNewUserIsLoading(false)
          },
          onFail: (error) => {
            console.log(error)
            setNewUserIsLoading(false)
          },
        },
      })
    }
  }

  const getPrevUser = () => {
    if (fakeUserArr[position - 1]) {
      const newPos = position - 1
      setFakeUser(fakeUserArr[newPos])
      setPosition(newPos)
    }
  }
  const deleteUser = () => {
    if (fakeUserArr.length > 1 && position !== 0) {
      fakeUserArr.splice(position, 1)
      setFakeUser(fakeUserArr[position - 1])
      setPosition(position - 1)
    }
  }
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
    ) : !viewJsonData ? (
      <div style={pageStyles.pageContainer}>
        <HStack align="center" style={{ justifyContent: 'space-between' }}>
          <Text size={40}>Fake Bank Incorporated</Text>
          <HStack
            spacing={10}
            style={{
              paddingLeft: '10px',
              borderLeft: `2px solid ${colors.black}`,
              borderRight: `2px solid ${colors.black}`,
              paddingRight: '10px',
            }}
          >
            <Button
              icon={faChevronDown}
              text={'Next User'}
              onClick={getNextUser}
            />
            <Button
              disabled={position === 0}
              icon={faChevronUp}
              text={'Previous User'}
              onClick={getPrevUser}
            />
            <Button
              disabled={fakeUserArr.length === 1 || position === 0}
              icon={faBlender}
              text={'Delete User'}
              onClick={deleteUser}
            />
            <Button
              text="View Json Data"
              onClick={() => setViewJsonData(!viewJsonData)}
              icon={faSitemap}
            ></Button>
          </HStack>
          <FontAwesomeIcon icon={faUniversity} size="3x" />
        </HStack>

        <hr style={pageStyles.lineStyle}></hr>
        <HStack style={{ justifyContent: 'space-between' }} align="center">
          <UserData user={fakeUser.user}></UserData>
          <CreditReport creditData={fakeUser.creditData}></CreditReport>
        </HStack>
        <hr style={pageStyles.lineStyle}></hr>

        <VStack>
          <Expander
            children={<AccountData data={fakeUser.bankData.checking} />}
            title="View Your Checking Account Data"
          />
          <hr style={pageStyles.lineStyle}></hr>
          <Expander
            children={<AccountData data={fakeUser.bankData.savings} />}
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
          <p>Jadeyn Fincher, Sam Pierce</p>
          <hr style={pageStyles.lineStyle}></hr>
          <br></br>
          <Expander title="Credits for page">
            <VStack>
              <Text>
                <a
                  href="https://github.com/Vcvzgbzz/fakeBankProject/commits/main"
                  target="new"
                >
                  View Github Commits
                </a>
              </Text>
              <Text>
                <a
                  href="https://github.com/Vcvzgbzz/fakeBankProject/graphs/contributors"
                  target="new"
                >
                  View Github Contributions
                </a>
              </Text>
            </VStack>
          </Expander>
        </footer>
      </div>
    ) : (
      <div style={pageStyles.pageContainer}>
        <JsonViewer
          object={fakeUserArr}
          viewJsonData={viewJsonData}
          setViewJsonData={setViewJsonData}
        />
      </div>
    )
  } catch {
    return <div>There was an error loading this page, please retry...</div>
  }
}
