"use client"
import React, { useState, useEffect } from "react";
import Button from "./controls/Button";
import Input from "./controls/Input";
import { callApi } from "./coreFunctions/functions";
import { FakeStoreApiResponse,FakeStoreItem ,FakeUserResponse} from "./definitions/apiDefinitions";
import { productStyles, pageStyles } from "./styling/styles";
import { url } from "inspector";
import {HStack,VStack,Text} from './coreComponents/components'


export default function Page() {
  useEffect(()=>{

    callApi<undefined,FakeUserResponse>({
      url:"https://randomuser.me/api",
      method:'get',
      onSuccess:(data)=>{setFakeUser(data.results)},
      onFail:(error)=>console.log(error)
    }
    )
  },[])

  const [fakeUser,setFakeUser]=useState<FakeUserResponse['results']|undefined>(undefined)


  const parseBirthday =(birthday:string) =>{
    return birthday.split("T")[0].replace(/-/g, ' ')
    
  }
  return (
    !fakeUser?(<div style={pageStyles.pageContainer}>
      Loading...
    </div>):
    (<div style={pageStyles.pageContainer}>
      <Text size={20}>Fake Bank Incorperated</Text>
      <hr style={pageStyles.lineStyle}></hr>
      <HStack style={{justifyContent:'space-between'}} align="center">
        <Text>Welcome {fakeUser[0].name.first} !</Text>
          <VStack align="flex-end">
            <img src={fakeUser[0].picture.large} alt=""/>
            <>
              <Text>Dob: {parseBirthday(fakeUser[0].dob.date)}</Text>
              <Text>{fakeUser[0].cell}</Text>
              <Text>{fakeUser[0].email}</Text>
            </>
          </VStack>
      </HStack>
      <VStack>
          <div>
            <Text> Bank Total:</Text>
          </div>
      </VStack>
    </div>)
  );
}
