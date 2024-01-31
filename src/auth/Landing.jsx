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
    const businessDomains = [ 'anits.edu.in', 'nitw.ac.in','gitam.edu'];
    const [, domain] = email.split('@');

    if (!businessDomains.includes(domain)) {
      window.alert("Use college mail");
      setIsLoading(false)
    } else {
      localStorage.setItem("email", email);
      setIsLoading(false)
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
  {isLoading?( <Flex align="center" justify="center" minH="100vh">   <ClimbingBoxLoader color="#36d7b7" /></Flex>):(<Flex></Flex>)}
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
              UniVibe❤️
            </Text>
            <br />{' '}
            <Text color={'pink.400'} as={'span'}>
              Elevate Your College Experience – Learn, Enjoy, Socialize!😜
            </Text>{' '}
            <Text>Use college mail</Text>
          </Heading>
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
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            
🚀 Welcome to Univibe: Redefining College Bliss! 🌟

Embark on an extraordinary college adventure with Univibe! 🎓💫 Immerse yourself in enlightening discussions in our vibrant Voice Rooms, share your innermost thoughts anonymously in the Confessions Courts, and experience the thrill of connecting through Anonymous Crush Tags. 🗣️💖 Discover the power of authentic expressions, make everlasting connections, and weave unforgettable memories throughout your college journey. 🚀✨ At Univibe, every feature is crafted to enhance your experience and make your college years truly exceptional. Welcome to a world where emotions, connections, and unforgettable moments come together seamlessly. 🌈🎉 
          </Text>
          
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