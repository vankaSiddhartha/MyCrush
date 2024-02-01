import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';

import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
 // big_red_donkey


const PostComponent = (props) => {
 const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
  return (
    <Box borderWidth="1px" border={'1px'} borderRadius="lg" p="4" mb="4">
      <Flex align="baseline" mb="2">
        <Text fontSize="sm" color="gray.500">
          {randomName} - {props.id.time}
        </Text>
      </Flex>
      <Text fontSize="md">{props.id.post}</Text>
    </Box>
  );
};

export default PostComponent;