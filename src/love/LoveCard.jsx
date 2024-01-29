'use client'

import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react'

const LoveCard=(props) => {
  return (
    <Center py={6} >
      <Box
        maxW={'320px'}
        w={'full'}
        bg={useColorModeValue('white', 'grey')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}>
        <Avatar
          size={'xl'}
          src={
            'https://img.freepik.com/free-vector/gradient-heart_78370-478.jpg?size=338&ext=jpg&ga=GA1.1.1448711260.1706486400&semt=ais'
          }
          mb={4}
          pos={'relative'}
          _after={{
            content: '""',
            w: 2,
            h: 2,
             objectFit:"contain",
            bg: 'green.300',
            border: '2px solid white',
            rounded: 'full',
            pos: 'absolute',
            bottom: 1,
            right: 3,
          }}
        />
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {props.id.status}
        </Heading>
       
       
       

      </Box>
    </Center>
  )
}
export default  LoveCard