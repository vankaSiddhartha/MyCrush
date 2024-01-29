'use client'

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  useColorMode,
    Button,
  MenuItem,
  MenuList,
  useBreakpoint,
  useBreakpointValue,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
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
import React, { useMemo, useRef, useEffect, useState } from 'react';
import DiscordCard from './DiscordCard'
import { ref, get,limitToFirst ,query} from 'firebase/database';
import { database } from '../firebase';
import { FaHeart } from "react-icons/fa";
import { FaFaceKissWinkHeart } from "react-icons/fa6";
import { SiLivechat } from "react-icons/si";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";


const LinkItems = [
  { name: 'Live Chat', icon: SiLivechat,link:'/' },
  { name: 'Crush Matching', icon: FaHeart,link:'/love' },
  { name: 'My Matchs', icon: FaFaceKissWinkHeart,link:'/match' },
  { name: 'Favourites', icon: FiStar, link:'/'},
  { name: 'Settings', icon: FiSettings,link:'' },
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
         // <Link  icon ={link.icon} to={link.link}>{link.name}</Link>
      ))}
    </Box>
  )
}

const NavItem = ({ icon, children,link, ...rest }) => {
  return (
    <Box
      as="a"
      href= {link}
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

const SidebarWithHeader = () => {
  const [user, setUser] = useState([]);
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    const userRef = ref(database, 'servers');
    setLoading(true)
    get(query(userRef,limitToFirst(2)))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const userList = Object.entries(userData).map(([userId, userDetails]) => ({
            id: userDetails.id,
            name: userDetails.name,
            profile: userDetails.profile,
            vlink: userDetails.vlink,
            live: userDetails.live,
            dis: userDetails.dis,
        
          }));
          setUser(userList);
          console.log(userList)
          setLoading(false)
        } else {
          console.log("No data");
          setLoading(false)
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false)
      });
  }, []);
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
   <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      {loading ? (
         <Flex align="center" justify="center" minH="100vh">
      <ClimbingBoxLoader color="#36d7b7" />
    </Flex>
      ) : (
        <>
          <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            returnFocusOnClose={false}
            onOverlayClick={onClose}
            size="full"
          >
            <DrawerContent>
              <SidebarContent onClose={onClose} />
            </DrawerContent>
          </Drawer>
          {/* mobilenav */}
          <MobileNav onOpen={onOpen} />
          <Box ml={{ base: 0, md: 60 }} p="4">
            <Flex flexWrap="wrap" gap={10}>
              {user.map((classData, index) => (
                <DiscordCard key={index} id={classData} />
              ))}
            </Flex>
          </Box>
        </>
      )}
    </Box>
  )
}

export default SidebarWithHeader