// src/components/UploadPost.js
import React, { useState } from 'react';
import { Box, Button, Textarea } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import swal from 'sweetalert';
import { getDatabase, ref, get, set } from 'firebase/database';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const UploadPost = () => {
  const navigate = useNavigate()
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

   useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
    const indianTimeOptions = { timeZone: 'Asia/Kolkata' }
  const [tweet, setTweet] = useState('');
   const [user, setUser] = useState([]);
    const randomUUID = uuidv4();
        const myRollnumber = localStorage.getItem('rollNumber').trim();
    const databaseInstance = getDatabase();

    const link = `post/${randomUUID}`
     const userRef = ref(databaseInstance, link);
  const handleTweetChange = (e) => {
    setTweet(e.target.value);
  };

  const handleSubmit = () => {
    const name = localStorage.getItem("name")
    // Handle post submission logic
     if(tweet===""){
      swal("Please fill the conffesion")
     }else{
     set(userRef,{
      post:tweet,
      id:randomUUID,
      author:name,
      time:currentDateTime.toLocaleString('en-IN')
     }).then(()=>{
     swal({title:"Good Job"})
        window.location.href = 'https://www.univibe.fun/post';
      
     })
    }
      
    // You can send the tweet data to your server or perform other actions
  };

  return (
    <div style={{ maxWidth: '100%', padding: '40px', alignItems: 'flex-start', justifyContent: 'start' }}>
      <Box>
        <Textarea
        border={"1px"}
          placeholder="Share your secrets anonymously"
          value={tweet}
          onChange={handleTweetChange}
          resize="vertical"
          minHeight="100px" // Adjust the height as needed
        />
       <Button colorScheme="twitter" onClick={handleSubmit} marginTop={3} size="sm">
  Confess
</Button>

        
      </Box>
    </div>
  );
};

export default UploadPost;

