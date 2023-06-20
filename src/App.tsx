import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import Router from "./Components/Router"
import { RecoilRoot } from "recoil"



export const App = () => (
  <RecoilRoot>
      <ChakraProvider theme={theme}>
          <Router/>
      </ChakraProvider>
  </RecoilRoot>
)
