"use client"
import React, { useState, useEffect } from "react";
import Button from "./controls/Button";
import Input from "./controls/Input";
import { callApi } from "./coreFunctions/functions";
import { FakeStoreApiResponse,FakeStoreItem } from "./definitions/apiDefinitions";
import { productStyles, pageStyles } from "./styling/styles";


export default function Page() {

  return (
    <body style={pageStyles.pageContainer}>
      Empty Store
    </body>
  );
}
