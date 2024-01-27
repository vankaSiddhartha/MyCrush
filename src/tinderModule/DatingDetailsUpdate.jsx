'use client'

import React, { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function DatingDetailsUpdate() {
  const [profileImage, setProfileImage] = useState(null);
  const [idCardImage, setIdCardImage] = useState(null);

  const handleProfileImageChange = (e) => {
    // Handle profile image upload
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleIdCardImageChange = (e) => {
    // Handle ID card image upload
    const file = e.target.files[0];
    setIdCardImage(file);
  };

  const handleFormSubmit = () => {
    // Perform form submission logic here
    console.log('Submitted:', profileImage, idCardImage);
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Update Your Dating Details</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Update your profile and ID card images ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            {/* Profile Image Upload */}
            <FormControl id="profileImage">
              <FormLabel>Upload Profile Picture</FormLabel>
              <Input type="file" accept="image/*" onChange={handleProfileImageChange} />
            </FormControl>

            {/* ID Card Image Upload */}
            <FormControl id="idCardImage">
              <FormLabel>Upload ID Card Picture</FormLabel>
              <Input type="file" accept="image/*" onChange={handleIdCardImageChange} />
            </FormControl>

            {/* Other Form Fields */}
            {/* Add more form fields as needed */}

            {/* Submit Button */}
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              onClick={handleFormSubmit}>
              Update Details
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
