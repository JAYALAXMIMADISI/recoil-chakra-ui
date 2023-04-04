import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import {
  selector,
  useRecoilState,
  useRecoilValue,
  atom,
  selectorFamily,
  useSetRecoilState,
} from 'recoil';
import {
  Box,
  Text,
} from '@chakra-ui/react';
import AddNewUser from '../add-user';
import { recoilPersist } from 'recoil-persist';
import { FaUserAlt } from 'react-icons/fa';

const { persistAtom } = recoilPersist();

const getChatUsers = selector({
  key: 'users-selector',
  get: async ({ get }) => {
    const users = await fetch(
      `https://jsonplaceholder.typicode.com/users`
    ).then((res) => res.json());
    const userList = users.map((item:any, index:any) => {
      return {
        id: index,
        name: item.name,
        messages: [],
      };
    });
    return userList;
  },
});

const ssrCompletedState = atom({
  key: 'SsrCompleted',
  default: getChatUsers,
});

export const useSsrComplectedState = () => {
  const setSsrCompleted = useSetRecoilState(ssrCompletedState);
  return () => setSsrCompleted(true);
};

export const persistAtomEffect = (param: any) => {
  param.getPromise(ssrCompletedState).then(() => persistAtom(param));
};

export const usersListStateAtom = atom({
  key: 'usersListStateAtom',
  default: getChatUsers,
  effects_UNSTABLE: [persistAtom],
});

export const userMessagesListId = atom({
  key: 'userMessagesList',
  default: 0,
});

export const userMessagesListByUserIdSelector = selectorFamily({
  key: 'userMessagesListByUserId',
  get:
    (userId) =>
    async ({ get }) => {
      const getUsers = get(usersListStateAtom);
      const users = await getUsers.filter((item:any) => item.id === userId);
      return users;
    },
});

export default function UsersPanel() {
  const usersList = useRecoilValue(getChatUsers);
  const users = useRecoilValue(usersListStateAtom);
  {
    console.log('users users', users);
  }

  const setUsersUserName = useSetRecoilState(usersListStateAtom);

  const [userNameUpdate, setUserNameUpdate] = useState('');

  const [id, setId] = useRecoilState(userMessagesListId);

  const [initialUsers, setInitialUsers] = useState([]);

  useEffect(() => {
    setInitialUsers(users);
  }, []);

  const OpenUserMessages = (itemId:any) => {
    setId(itemId);
  };

  const updateUserName = () => {
    const usersList = JSON.parse(JSON.stringify(users));
    const nameUpdatedList = usersList.map((item:any) => {
      if (item.id == id) {
        item.name = userNameUpdate;
        return item;
      }
      return item;
    });
    setUsersUserName(nameUpdatedList);
  };

  const handleChange = (event:any) => {
    setUserNameUpdate(event);
  };

  return (
    <Box bg="teal" p={2} h="100vh" overflow="scroll">
      <Head>
        <title>Users</title>
      </Head>
      <Box>
        <AddNewUser />
        {initialUsers.length > 0 &&
          users?.map((item:any) => {
            return (
              <Box
                bg="skyblue"
                m={2}
                onClick={() => OpenUserMessages(item.id)}
                p={3}
                overflow="scroll"
                display="flex"
              >
                <FaUserAlt style={{ marginTop: '5px' }} />
                <Text ml={2}>{item.name}</Text>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
}
