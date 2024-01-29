import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import { ChakraProvider } from '@chakra-ui/react';
import Home from './home/Home';
import Advanced from './tinderModule/Swipe';
import Omegle from './Omegle/Omegle';
import Landing from './auth/Landing';
import Auth from './auth/Auth';
import Love from './love/Love';
import Match from './love/Match';


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
          <Route path='/love' element={<Love/>}/>
          <Route path='/match' element={<Match/>}/>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
