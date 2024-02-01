'use client'

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
    useColorMode,
     Button,
       useBreakpointValue,

  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  MenuDivider,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
  background,
} from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid';
import { getDatabase, ref, get, set, limitToLast, query } from 'firebase/database';
import { orderByChild } from 'firebase/database';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { FaHeart } from "react-icons/fa";
import { FaFaceKissWinkHeart } from "react-icons/fa6";
import { SiLivechat } from "react-icons/si";
import UploadPost from './UploadPost';
import PostComponent from './PostComponent';
import { useEffect,useState } from 'react';
import { ConsoleLevel } from '@zegocloud/zego-uikit-prebuilt';
import { GiLoveLetter } from "react-icons/gi";


const LinkItems = [
  { name: 'Live Chat', icon: SiLivechat,link:'/' },
  { name: 'Crush Matching', icon: FaHeart,link:'/love' },
  { name: 'My Matchs', icon: FaFaceKissWinkHeart,link:'/match' },
    {name:'Conffesions',icon:GiLoveLetter,link:'/post'}
  
]

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          UniVibe
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} link={link.link}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

const NavItem = ({ icon, children,link, ...rest }) => {
  return (
    <Box
      as="a"
      href={link}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}
const MobileNav = ({ onOpen, ...rest }) => {
   const profile = localStorage.getItem("profile")
    const name = localStorage.getItem("name")
     const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        UniVibe
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        
 <Button size={useBreakpointValue({base:'sm',md:'md'})} marginRight={useBreakpointValue({ base: '2', md: '0' })} onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    profile
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">{name}</Text>
                  
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  

                <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}

const Post = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
   const [user, setUser] = useState([]);
    const randomUUID = uuidv4();
     
    const databaseInstance = getDatabase();

    const link = `post`
     const userRef = ref(databaseInstance, link);
    
     const refQuery = query(userRef,limitToLast(20))
  useEffect(()=>{
    get(refQuery)
    .then((snapshot)=>{
       const userData = snapshot.val();
       console.log(userData)
          const userList = Object.entries(userData).map(([userId, userDetails]) => ({
            post:userDetails.post,
            id:userDetails.id,
            author:userDetails.author,
            time:userDetails.time

          }))
           const sortedPosts = userList.sort((a, b) => new Date(b.time) - new Date(a.time));
           setUser(sortedPosts);
    })
  },[])


  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
     
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
      <UploadPost/>
       {user.map((character, index) => (
          <PostComponent
            key={index}
            id = {character}
          />
        ))}
      </Box>
    </Box>
  )
}

export default Post