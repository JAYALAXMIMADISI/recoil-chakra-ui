import { Box, Button, Center, extendTheme } from '@chakra-ui/react';
import React from 'react';
import {IoMdCloseCircle} from 'react-icons/io'
import { motion } from 'framer-motion';


export default function ChatHeader() {
  return (
    <motion.div animate={{opacity:1,scale:1,backgroundColor:'#77a0bf',padding:'10px',position:"sticky", top:"0",borderRadius:"5px"}} initial={{opacity:0,scale:0}}>
      <Center fontSize={["16px",'20px','20px']} fontWeight="bold" color='var(--my-color)'>
        Chat Messages
      </Center>
    </motion.div>
  );
}
