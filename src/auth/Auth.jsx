import { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader"
import { database } from '../firebase';
import { ref, set, getDatabase } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export default function Auth() {
   
  const [rollNumber, setRollNumber] = useState('');
  const [gender, setGender] = useState('Male');
  const [college, setCollege] = useState('ANITS');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = async () => {
    setIsLoading(true);

    const sex = gender;
    const rollNum = rollNumber;
    const university = college;

    if (rollNum === "" || sex === "" || university === "") {
      swal("Empty fields are not allowed", "Please fill the input fields", "error");
      setIsLoading(false);
      return;
    }

    localStorage.setItem('rollNumber', rollNumber);
    localStorage.setItem('gender', gender);
    localStorage.setItem('college', college);
    const name = localStorage.getItem('name');
    const profile = localStorage.getItem('profile');
    const email = localStorage.getItem('email');
    const uid = localStorage.getItem('uid');

    const databaseInstance = getDatabase();
    const dbRef = ref(databaseInstance, `users/${rollNum}`);

    try {
      await set(dbRef, {
        name: name,
        profile: profile,
        email: email,
        rollNumber: rollNum,
        gender: sex,
        college: university
      });

      // Success callback
      console.log("Data successfully added to the database!");
       localStorage.setItem("isLogin",true)
       navigate("/home")
    } catch (error) {
      // Failure callback
      console.error("Error adding data to the database:", error.message);
      // You can handle the error or show a user-friendly message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
   
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
       {isLoading?(  <Flex align="center" justify="center">
          <ClimbingBoxLoader />
        </Flex>):(
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Enter the above details</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="rollNumber">
              <FormLabel>Roll Number</FormLabel>
              <Input
                type="text"
                placeholder="Enter your roll number"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
              />
            </FormControl>
            {/* Added a gender field */}
            <FormControl id="gender">
              <FormLabel>Gender</FormLabel>
              <Select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
            </FormControl>
            <FormControl id="college">
              <FormLabel>College</FormLabel>
              <Select value={college} onChange={(e) => setCollege(e.target.value)} >
                <option value="ANITS">ANITS</option>
                <option value="NITW">NITW</option>
                <option value="LPU">LPU</option>
                <option value="GITAM">GITAM</option>
            
              </Select>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
              </Stack>
              <Button
                bg={'pink.400'}
                color={'white'}
                onClick={handleSignIn}
                _hover={{
                  bg: 'pink',
                }}>
                Next
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
       )}
    </Flex>
   
    </>
  );
}
