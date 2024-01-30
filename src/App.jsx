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
import CreatePrivateRoom from './home/CreatePrivateRoom';


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
          <Route path='/custumRoom'element={<CreatePrivateRoom/>}/>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
