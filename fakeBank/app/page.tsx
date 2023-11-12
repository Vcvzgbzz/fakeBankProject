"use client"
import React, { useState, useEffect } from "react";
import Button from "./controls/Button";
import Input from "./controls/Input";
import { callApi } from "./coreFunctions/functions";
import { FakeStoreApiResponse,FakeStoreItem ,FakeUserResponse} from "./definitions/apiDefinitions";
import { productStyles, pageStyles } from "./styles/styles";
import { url } from "inspector";
import {HStack,VStack,Text,VerticalLine} from './coreComponents/components'
import {BankData,Purchase} from './definitions/coreTypings'
import AccountData from './coreComponents/AccountData'
import UserData from './coreComponents/UserData'


export default function Page() {
  useEffect(()=>{

    callApi<undefined,FakeUserResponse>({
      url:"https://randomuser.me/api",
      method:'get',
      onSuccess:(data)=>{setFakeUser(data.results[0])},
      onFail:(error)=>console.log(error)
    }
    )
  },[])

  const [fakeUser,setFakeUser]=useState<FakeUserResponse['results'][0]|undefined>(undefined)


  const parseBirthday =(birthday:string) =>{
    return birthday.split("T")[0].replace(/-/g, ' ')
    
  }
  const formatToAmericanStandard= (phoneNumber: string) => {
    const cleanedNumber = phoneNumber.replace(/\D/g, '')
  
    if (cleanedNumber.length === 10) {
      return `(${cleanedNumber.substring(0, 3)}) ${cleanedNumber.substring(3, 6)}-${cleanedNumber.substring(6)}`;
    } else if (cleanedNumber.length === 11 && cleanedNumber[0] === '1') {
      return `1-${cleanedNumber.substring(1, 4)}-${cleanedNumber.substring(4, 7)}-${cleanedNumber.substring(7)}`;
    }
  
    return phoneNumber
  }
  const generateRandomString=(length: number): string =>{
    const characters = '0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result;
  }
  const generateRandomDate=(): Date =>{
    const start = new Date(2022, 0, 1); // January 1, 2022
    const end = new Date(); // Current date
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate;
  }
  const bankData=(inputAccountType?:'Savings'|'Checking'): BankData => {
    const accountNumber = generateRandomString(12)
    const accountHolder = generateRandomString(8)
    const balance = Math.random() * 10000
    const accountType = inputAccountType==='Savings'?'Savings' : 'Checking'
    const lastPurchases: Purchase[] = Array.from({ length: 10 }, () => ({
      amount: (Math.random() * 500),
      description: accountType==='Checking'?`Purchase #${generateRandomString(5)}`:`Transfer #${generateRandomString(4)}`,
      timestamp: generateRandomDate(),
    }));
    return {
      accountNumber,
      accountHolder,
      balance,
      accountType,
      lastPurchases,
    };
  }
  
  const randomBankDataChecking: BankData = bankData('Checking');
  const randomBankDataSavings: BankData = bankData('Savings');
try{
  return (
    !fakeUser?(<div style={pageStyles.pageContainer}>
      Loading Your Bank Account Information...
    </div>):
    (<div style={pageStyles.pageContainer}>
      <Text size={40}>Fake Bank Incorperated</Text>
      <hr style={pageStyles.lineStyle}></hr>
      <HStack style={{justifyContent:'space-between'}} align="center">
        <Text size={30}>Welcome {fakeUser.name.first} !</Text>
        
          <VStack align="flex-end">
            
          <UserData user={fakeUser}></UserData>
          </VStack>
      </HStack>
      <hr style={pageStyles.lineStyle}></hr>
      
      <VStack>
      
      <HStack style={{justifyContent:'space-between'}}>
            <AccountData data={randomBankDataChecking}/>
            <AccountData data={randomBankDataSavings}/>
          </HStack>
          

      </VStack>
    </div>)
  );
}catch{
  return <div>There was an error loading this page, please retry...</div>
}
}
