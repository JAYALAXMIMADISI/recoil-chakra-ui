import { Box, Grid } from '@chakra-ui/react';
import React from 'react';
import { useRecoilValue } from 'recoil';
import {
  userMessagesListByUserIdSelector,
  userMessagesListId,
} from '../users-panel';
import { BiUser } from 'react-icons/bi';

export default function UsersChat() {
  const id = useRecoilValue(userMessagesListId);
  const userMessages = useRecoilValue(userMessagesListByUserIdSelector(id));
  return (
    <Box overflow="scroll">
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
    </Box>
  );
}
