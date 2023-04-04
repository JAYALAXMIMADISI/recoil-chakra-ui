import { Box, Center } from '@chakra-ui/react';
import React from 'react';

export default function ChatHeader() {
  return (
    <Box bg="blue.200" p={2} position="sticky" top="0" borderRadius="5px">
      <Center fontSize="20px" fontWeight="bold">
        Chat Messages
      </Center>
    </Box>
  );
}
