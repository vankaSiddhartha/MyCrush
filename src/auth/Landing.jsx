import { useEffect, useState } from 'react';
import { auth, provider } from "../firebase";
import { signInWithRedirect, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader"
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

export default function Landing() {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function isBusinessEmail(email) {
    const businessDomains = ['company1.com', 'company2.com', 'businessdomain.com', 'anits.edu.in', 'gmail.com'];
    const [, domain] = email.split('@');

    if (!businessDomains.includes(domain)) {
      window.alert("Use college mail");
    } else {
      localStorage.setItem("email", email);
     
       navigate("/auth")
      
    }
  }

  useEffect(() => {
    

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setValue(user.email);
        localStorage.setItem("name",user.displayName)
        localStorage.setItem("profile",user.photoURL)
        localStorage.setItem("uid",user.uid)
        

      
       


        isBusinessEmail(user.email);
      }
    
    });

    return () => unsubscribe();
  }, []);

  const handleClick = () => {
    setIsLoading(true);
    signInWithRedirect(auth, provider).catch((error) => {
      console.error('Error during sign-in redirect:', error);
       setIsLoading(false);
    });
  };

  return (
    <>
 
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
              
                zIndex: -1,
              }}>
              MyCrush❤️
            </Text>
            <br />{' '}
            <Text color={'pink.400'} as={'span'}>
              Love at first click-anonymously😜
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            
🚀 Welcome to our dating universe! Explore thrilling crush connections, spill your heart out in our confession zone, and ignite sparks with our seamless dating feature. 🌟 Unleash the power of emotions, connections, and unforgettable dates – all in one place! 
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
             onClick={handleClick}
              _hover={{
                bg: 'blue.500',
              }}>
              Create Account
            </Button>
            <Button rounded={'full'} onClick={handleClick} >Login Account</Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.ottplay.com/images/12tn-fail-91.jpeg?impolicy=ottplay-20210210&width=1200&height=675'
          }
        />
      </Flex>
        
    </Stack>
  
    </>
  )
}