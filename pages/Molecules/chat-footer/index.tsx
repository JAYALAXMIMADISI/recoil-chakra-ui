import {
  Box,
  Button,
  chakra,
  ChakraBaseProvider,
  Input,
} from "@chakra-ui/react";
import React from "react";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import {
  userMessagesListId,
  usersListStateAtom,
  userChatMessage,
} from "../../components/atoms-selectors";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import isValidHTMLProp from "@emotion/is-prop-valid";
import { shouldForwardProp } from "@chakra-ui/react";

const Div = chakra("div", {
  shouldForwardProp: (prop: any) => {
    const isChakraProp = !shouldForwardProp(prop.hello);
    if (isChakraProp) return false;
    const isValidProp = isValidHTMLProp(prop);
    if (isValidProp) return true;
    return ["sample"].includes(prop);
  },
});

const ButtonSend = chakra(Button, {
  shouldForwardProp: (prop) => {
    return true;
  },
  baseStyle: {
    shadow: "lg",
    rounded: "lg",
    bg: "white",
  },
});

export default function ChatFooter() {
  const [inputValue, setInputValue] = useRecoilState(userChatMessage);
  const id = useRecoilValue(userMessagesListId);

  const setUserMessages = useSetRecoilState(usersListStateAtom);

  const list = useRecoilValue(usersListStateAtom);

  const handleOnChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const addUsersNewMessage = () => {
    const userUpdatedList = JSON.parse(JSON.stringify(list));
    const userUpdatedMessages = userUpdatedList.map((item: any) => {
      if (item.id == id) {
        item.messages = [...item.messages, inputValue];
        return item;
      }
      return item;
    });

    setInputValue("");

    setUserMessages((list: any) => userUpdatedMessages);
  };

  return (
    <Div>
      <Box mt={10} display="flex">
        <Input type="text" onChange={handleOnChange} value={inputValue} />
        <ButtonSend
          onClick={addUsersNewMessage}
          ml={2}
          rightIcon={<ArrowForwardIcon />}
          bg="green"
        >
          Send
        </ButtonSend>
      </Box>
    </Div>
  );
}
