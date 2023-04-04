import { Box, Button, Input } from '@chakra-ui/react';
import React from 'react';
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { userMessagesListId, usersListStateAtom } from '../users-panel';
import { ArrowForwardIcon } from '@chakra-ui/icons';

export const userChatMessage = atom({
  key: 'userChatMessage',
  default: '',
});

export default function ChatFooter() {
  const [inputValue, setInputValue] = useRecoilState(userChatMessage);
  const id = useRecoilValue(userMessagesListId);

  const setUserMessages = useSetRecoilState(usersListStateAtom);

  const list = useRecoilValue(usersListStateAtom);

  const handleOnChange = (event:any) => {
    setInputValue(event.target.value);
  };

  const addUsersNewMessage = () => {
    const userUpdatedList = JSON.parse(JSON.stringify(list));
    const userUpdatedMessages = userUpdatedList.map((item:any) => {
      if (item.id == id) {
        item.messages = [...item.messages, inputValue];
        return item;
      }
      return item;
    });

    setInputValue('');

    setUserMessages((list:any) => userUpdatedMessages);
  };

  return (
    <>
      <Box mt={10} display="flex">
        <Input type="text" onChange={handleOnChange} value={inputValue} />
        <Button
          onClick={addUsersNewMessage}
          ml={2}
          rightIcon={<ArrowForwardIcon />}
        >
          Send
        </Button>
      </Box>
    </>
  );
}
