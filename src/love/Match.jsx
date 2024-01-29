import React, { Component, useEffect, useState } from 'react'
import LoveCard from './LoveCard'
import { database } from '../firebase';
import { ref, get,limitToFirst ,query,getDatabase,} from 'firebase/database';
import { Box,Text,Flex } from '@chakra-ui/react';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
export default function Match() {
  const[userd,setUserList] = useState('')
  const[loading,setLoading] = useState(false)
    const databaseInstance = getDatabase();
        const myRollnumber = localStorage.getItem('rollNumber');
    const keyRef = ref(databaseInstance, `match/${myRollnumber}`);
  const [userDetailsList, setUserDetailsList] = useState([]);

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const snapshot = await get(keyRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const userEntries = Object.entries(userData);

          const userDetailsArray = userEntries.map(async ([userId, userDetails]) => {
            console.log(userDetails.status);
            return userDetails; // Assuming you want to store userDetails in the state
          });

          const userDetailsList = await Promise.all(userDetailsArray);
          setUserDetailsList(userDetailsList);
          console.log(userDetailsList)
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
        console.error(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run useEffect only once

 // Empty dependency array ensures that this effect runs once when the component mounts


 
    return (
           <Box width="100%" height="100%" >
            {loading ? (
         <Flex align="center" justify="center" minH="100vh">
      <ClimbingBoxLoader color="#36d7b7" />
    </Flex>
      ) : (
        <>
        <Box p={4} textAlign="center">
        <Text fontSize="2xl" color="#FF167C" fontWeight="bold" mb={2} alignItems={'center'}>
          Matches
        </Text>
        {userDetailsList.map((classData, index) => (
          <LoveCard key={index} id={classData} />
        ))}
      </Box>
      </>
       )}
    </Box>
    )
  
}
