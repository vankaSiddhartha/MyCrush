import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <GoogleOAuthProvider clientId="702714662053-bg2tnjfci8lsrp9krj8ro9foou1opcv6.apps.googleusercontent.com">
  <ChakraProvider>
 

    <App />
    </ChakraProvider>
      </GoogleOAuthProvider>
  </React.StrictMode>,
)
