import { Box, Grid, VStack } from '@chakra-ui/react';
import React from 'react';
import { useRecoilValue } from 'recoil';
import {
  userMessagesListByUserIdSelector,
  userMessagesListId,
} from '../../components/atoms-selectors';
import { BiUser } from 'react-icons/bi';

export default function UsersChat() {
  const id = useRecoilValue(userMessagesListId);
  const userMessages = useRecoilValue(userMessagesListByUserIdSelector(id));
  return (
    <VStack overflow="scroll" align='left'>
      {userMessages[0]?.messages?.map((item:any) => {
        return (
          <Grid
            bg="green.100"
            mt={2}
            w="max-content"
            p={3}
            borderRadius="5px"
            display="flex"
          >
            <BiUser style={{ marginTop: '5px', marginRight: '10px' }} />
            <Box>{item}</Box>
          </Grid>
        );
      })}
    </VStack>
  );
}
