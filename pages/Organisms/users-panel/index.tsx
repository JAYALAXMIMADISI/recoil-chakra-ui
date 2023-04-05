import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Box, Text } from "@chakra-ui/react";
import AddNewUser from "../../add-user";
import { FaUserAlt } from "react-icons/fa";
import {
  ssrCompletedState,
  getChatUsers,
  usersListStateAtom,
  userMessagesListId,
  userMessagesListByUserIdSelector,
} from "../../components/atoms-selectors";

export const useSsrComplectedState = () => {
  const setSsrCompleted = useSetRecoilState(ssrCompletedState);
  return () => setSsrCompleted(true);
};

export default function UsersPanel() {
  const usersList = useRecoilValue(getChatUsers);
  const users = useRecoilValue(usersListStateAtom);
  {
    console.log("users users", users);
  }

  const setUsersUserName = useSetRecoilState(usersListStateAtom);

  const [userNameUpdate, setUserNameUpdate] = useState("");

  const [id, setId] = useRecoilState(userMessagesListId);

  const [initialUsers, setInitialUsers] = useState([]);

  useEffect(() => {
    setInitialUsers(users);
  }, []);

  const OpenUserMessages = (itemId: any) => {
    setId(itemId);
  };

  const updateUserName = () => {
    const usersList = JSON.parse(JSON.stringify(users));
    const nameUpdatedList = usersList.map((item: any) => {
      if (item.id == id) {
        item.name = userNameUpdate;
        return item;
      }
      return item;
    });
    setUsersUserName(nameUpdatedList);
  };

  const handleChange = (event: any) => {
    setUserNameUpdate(event);
  };

  return (
    <Box bg="primary" p={2} h="100vh" overflow="scroll">
      <Head>
        <title>Users</title>
      </Head>
      <Box>
        <AddNewUser />
        {initialUsers.length > 0 &&
          users?.map((item: any) => {
            return (
              <Box
                bg="skyblue"
                m={2}
                onClick={() => OpenUserMessages(item.id)}
                p={3}
                overflow="scroll"
                display="flex"
              >
                <FaUserAlt style={{ marginTop: "5px" }} />
                <Text ml={2}>{item.name}</Text>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
}
