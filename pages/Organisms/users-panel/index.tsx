import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Box, Text } from "@chakra-ui/react";
import AddNewUser from "../../add-user";
import { FaUserAlt } from "react-icons/fa";
import {
  ssrCompletedState,
  usersListStateAtom,
  userMessagesListId,
} from "../../components/atoms-selectors";
import { listItem } from "nxt/interfaces";
import { motion, useAnimate } from "framer-motion";

export const useSsrComplectedState = () => {
  const setSsrCompleted = useSetRecoilState(ssrCompletedState);
  return () => setSsrCompleted(true);
};

type usersList = [];

const containerVariants = {
  hidden: {
    x: -200,
    opacity:0,
  },
  visible: {
    x: 0,
    padding: "10px",
    overflow: "scroll",
    display: "flex",
    backgroundColor: "skyblue",
    margin: "20px",
    cursor: "pointer",
    transition: { delay: 0.5 },
    // damping:10,
    when:'beforeChildren',
    staggerChildren:0.4,
    opacity:1,
  },
};

const childVariants = {
  hidden: {
    opacity:0,
  },
  visible: {
   opacity:1,
  },
};

export default function UsersPanel() {


  const [scope, animate] = useAnimate()


  const users: usersList = useRecoilValue(usersListStateAtom);

  const [id, setId] = useRecoilState(userMessagesListId);

  const [initialUsers, setInitialUsers] = useState([]);

  useEffect(() => {
    animate('div',{opacity:1} , {duration:3})
    setInitialUsers(users);
  }, []);

  const OpenUserMessages = (itemId: any) => {
    setId(itemId);
  };

  return (
    <>
      <Box bg="primary" p={2} h="100vh" overflow="scroll" ref={scope}>
        <Head>
          <title>Users</title>
        </Head>

        <Box>
          <AddNewUser />

          {initialUsers.length > 0
            ? users?.map((item: listItem) => {
                return (
                 
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      onClick={() => OpenUserMessages(item.id)}
                      style={{border:id==item.id?'3px solid #fff':""}}
                    >
                     <motion.div variants={childVariants}> <FaUserAlt style={{ marginTop: "5px" }} /></motion.div>
                     <motion.div variants={childVariants} > <Text ml={2}>{item.name}</Text></motion.div>

                      {/* </Box> */}
                    </motion.div>
                );
              })
            : null}
        </Box>
      </Box>
    </>
  );
}
