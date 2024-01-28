import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import { ChakraProvider } from '@chakra-ui/react';
import Home from './home/Home';
import Advanced from './tinderModule/Swipe';
import Omegle from './Omegle/Omegle';
import Landing from './auth/Landing';
import Auth from './auth/Auth';

function App() {
  const isLogin = localStorage.getItem("isLogin");

  return (
    <ChakraProvider>
      <Router>
        
        <Routes>
          <Route path='/' element={isLogin ? (<Home />) : (<Landing />)} />
          <Route path='/auth' element={isLogin ? (<Home />) : (<Auth />)} />
          <Route path='/dating' element={<Advanced />} />
          <Route path='/omegle' element={<Omegle />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
