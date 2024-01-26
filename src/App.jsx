import { useState } from 'react'
import Lading from './auth/Landing'
import { ChakraProvider } from '@chakra-ui/react';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Lading/>
  )
}

export default App
