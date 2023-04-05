import { Box, Center, extendTheme } from '@chakra-ui/react';
import React from 'react';


export default function ChatHeader() {
  return (
    <Box bg="blue.200" p={2} position="sticky" top="0" borderRadius="5px" sx={{ color: 'primary' }}>
      <Center fontSize={["16px",'20px','20px']} fontWeight="bold" color='var(--my-color)'>
        Chat Messages
      </Center>
    </Box>
  );
}
