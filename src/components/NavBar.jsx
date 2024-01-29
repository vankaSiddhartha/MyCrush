import {
  Flex,
  Button,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
   Stack,
  DrawerContent,
  DrawerCloseButton,
  Icon,
    CloseButton,
  DrawerHeader,
  DrawerBody,
  Box,
} from '@chakra-ui/react';

import { Link, useNavigation } from 'react-router-dom';
import { Text } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';


const ListHeader = ({ children }) => {

  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  )
}
export default function NavBar() {
  const navigate = useNavigate()
   function click(){
        
     navigate("/contact")
   }
  const { isOpen, onOpen, onClose } = useDisclosure();

  const flexStyles = {
   
    px: 4,
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "none", // Set boxShadow to none explicitly
  };


  return (
    <>
       <Flex
      bg={'#FF4E4C'}
      position={'fixed'}
      width={'100%'}
      zIndex="1000"
      {...flexStyles}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        w={{ base: '100%', md: '1000px' }}
        h={{ base: '150px', md: '200px' }}
        marginLeft={{ base: '24', md: '0' }}
        marginRight={{ base: '0', md: '30' }}
        background={`url("https://firebasestorage.googleapis.com/v0/b/anits-fest.appspot.com/o/finalbro.svg?alt=media&token=e3b404c6-809a-4185-9982-39cbbc4d9812")`}
        backgroundSize="contain"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
      >
        {/* Content inside the Box, if any */}
      </Box>


    </Flex>
 <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
  <DrawerOverlay>
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader bg={'#FF4E4C'}>Menu</DrawerHeader>
      <DrawerBody bg={'#FF4E4C'}>
      
       
        <Stack align={'flex-start'}>
  <ListHeader>Menu</ListHeader>
  <Link to="/help-center">Home</Link>
  <Link to="/dating">Dating</Link>
  <Link to="/privacy-policy">Privacy Policy</Link>
   <ListHeader>Company</ListHeader>
  <Link to="/about">About</Link>
    <Link to={"/blogs"}>Company Blogs</Link>
  <Link to="/careers">Careers</Link>
  <Link to="/contact">Contact</Link>
    <ListHeader>Follow Us</ListHeader>
  <a href="https://twitter.com/gossylovesyou">Twitter</a>
  <a href="https://www.instagram.com/gossylovesyou/">Instagram</a>
  <a href="https://www.linkedin.com/company/gossy-the-perfect-social-app/about/?viewAsMember=true">LinkedIn</a>

</Stack>
        
      </DrawerBody>
    </DrawerContent>
  </DrawerOverlay>
</Drawer>

    </>
  );
}
