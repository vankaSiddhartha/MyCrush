'use client'


import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Image,
  Avatar,
  useColorModeValue,
  Button,
} from '@chakra-ui/react'
import { useEffect } from 'react'


const DiscordCard = (props) => {

     const handleButtonClick = () => {
 
    // Replace '/your-link' with the actual link you want to navigate to
    const linkToGo = props.id.vlink
    window.location.href = linkToGo;
  };
    const profile = localStorage.getItem("profile")
   
  return (
    <Center py={6}>
      <Box
        maxW={'445px'}
        overflow={'hidden'}
        w={'full'}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        >
        <Box h={'250px'} bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
          <Image
            src={
              props.id.profile
            }
            fill
            alt="Example"
          />
        </Box>
        <Stack>
         
          <Heading
            // eslint-disable-next-line react-hooks/rules-of-hooks
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
             {props.id.name}
          </Heading>
          <Text color={'gray.500'}>
           {props.id.dis}
          </Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Avatar src={profile} />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Button  onClick={handleButtonClick}>Join Room</Button>
          </Stack>
        </Stack>
      </Box>
    </Center>
  )
}
export default DiscordCard