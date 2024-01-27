
import Lading from './auth/Landing';
import Auth from './auth/Auth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import { ChakraProvider } from '@chakra-ui/react';

import Home from './home/Home';
import Advanced from './tinderModule/Swipe';
import NavBar from './components/NavBar';


function App() {
  const isLogin = localStorage.getItem("isLogin")

  return (
    <Router>
      <Routes>
        <Route path='/' element={isLogin?(<Home/>):(<Lading/>)} />
        <Route path='/auth' element={isLogin?(<Home/>):(<Auth />)} />
         <Route path='/dating' element={<Advanced/>} />

          <Route
          path='/home'
        
              element={<Home />}
           
          
        />
      </Routes>
    </Router>
  );
}

export default App;

