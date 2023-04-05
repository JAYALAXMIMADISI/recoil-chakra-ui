import { Box, ChakraProvider, Grid, extendTheme } from '@chakra-ui/react';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import ChatFooter from './Molecules/chat-footer';
import UsersChat from './Molecules/users-chat';
import UsersPanel from './Organisms/users-panel';
import { ErrorBoundary } from 'react-error-boundary';
import React, { useEffect, useState } from 'react';
import ChatHeader from './Atoms/chat-header';



const theme=extendTheme({
  colors:{
    primary:'teal',
    secondary:'blue'
  },
  variants:{
    bg: 'red.400',
    boxShadow: '0 0 2px 2px #efdfde',
    border:'2px solid black',
  }
})


export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <div>
              {`Errors that appear here are errors that happen at render: ${error.message}`}
            </div>
          )}
        >
          <ChakraProvider theme={theme}>
            <Head>
              <title>Create Next App</title>
            </Head>
            {mounted && (
              <Grid display="flex" h="100vh">
                <Box width={{ base: '100%', sm: '40%', md: '30%' }} h="100vh" m={2} overflow="scroll">
                  <UsersPanel />
                </Box>
                <Box w={{ base: '100%', sm: '60%', md: '70%' }} m={2}>
                  <Box h={{ base: '100%', sm: '90%', md: '85%',lg:"90%" }} overflow="scroll">
                    <ChatHeader />
                    <UsersChat />
                  </Box>
                  <Box h="10%">
                    <ChatFooter />
                  </Box>
                </Box>
              </Grid>
            )}
          </ChakraProvider>
        </ErrorBoundary>
      </React.Suspense>
    </RecoilRoot>
  );
}
