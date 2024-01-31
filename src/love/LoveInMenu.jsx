import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
} from '@chakra-ui/react';
import { getDatabase, ref, get, set } from 'firebase/database';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import { Resend } from 'resend';
import { Text } from '@chakra-ui/react';
import swal from 'sweetalert';

const LoveInMenu = () => {
  const [crushRollNumber, setCrushRollNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);

    if (crushRollNumber === '') {
      setIsLoading(false);
     
      return;
    }

    const myRollnumber = localStorage.getItem('rollNumber').trim();
    const databaseInstance = getDatabase();
    const link = `crush/${crushRollNumber.trim()}/${myRollnumber.trim()}`;
    const sendlink = `crush/${myRollnumber.trim()}/${crushRollNumber.trim()}`;
    const matchedLinkA = `match/${myRollnumber.trim()}/${crushRollNumber.trim()}`;
    const matchedLinkB = `match/${crushRollNumber.trim()}/${myRollnumber.trim()}`;
    const userRef = ref(databaseInstance, link);
    const sendRef = ref(databaseInstance, sendlink);


    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log('Matched');
          get(ref(databaseInstance,`users/${crushRollNumber.trim()}/email`))
          .then((snapshot)=>{
            console.log(snapshot.val())
       
          
          }).then(()=>{
          
        
          set(ref(databaseInstance, matchedLinkA), {
            status: crushRollNumber.trim(),
          }).then(() => {
            set(ref(databaseInstance, matchedLinkB), {
              status: myRollnumber,
            });
          });
           swal('You got matched. Check the match section to know who matched you');
           })
        } else {
          try {
            set(sendRef, {
              status: '0',
            });
            console.log('Data added to the database');
          } catch (error) {
            console.error('Error adding data to the database:', error.message);
          }
        }
      }).then(()=>{
        swal("Successful❤️","We hope you got match with your crush")
      })
      .catch((error) => {
        console.error('Error reading data from the database:', error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
      
  };

  return (
    <>
    <Box
      background="#FF167C"
      w="100%"
      h="100vh"
      backgroundImage="url('https://firebasestorage.googleapis.com/v0/b/anits-fest.appspot.com/o/lovelastbgm.png?alt=media&token=65be2951-f378-4160-8172-9e90380bbf65')"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >

      {isLoading ? (
        <Flex align="center" justify="center" direction="column">
          <ClimbingBoxLoader />
          <Box mt={4}>Submitting...</Box>
        </Flex>
      ) : (
        <Box
          p={8}
          backdropFilter="blur(50px)"
          backgroundColor="rgba(255, 22, 124, 0.5)"
        >
          <Heading mb={4}>Send secretly🫣 end to end encrypted</Heading>
          <Text fontSize={18}>We've created a feature where you can add your crush to a list, and if the feeling is mutual and your crush adds you back, you'll be notified. Until then, your crush list remains confidential with us, it's fun way to increase your chances of finding a match by adding more crushes.</Text><br></br>

          <FormControl mb={4}>
            <FormLabel>Crush Roll number</FormLabel>
            <Input
              placeholder="Roll number"
              value={crushRollNumber.trim()}
              onChange={(e) => setCrushRollNumber(e.target.value)}
            />
          </FormControl>

          <Button colorScheme="teal" onClick={handleSubmit}>
            Send❤️
          </Button>
        </Box>
      )}
    </Box>
    </>
  );
};

export default LoveInMenu;
