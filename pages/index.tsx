import { Box, ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import ChatFooter from './chat-footer';
import UsersChat from './users-chat';
import UsersPanel from './users-panel';
import { ErrorBoundary } from 'react-error-boundary';
import React, { useEffect, useState } from 'react';
import ChatHeader from './chat-header';

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
          <ChakraProvider>
            <Head>
              <title>Create Next App</title>
            </Head>
            {mounted && (
              <Box display="flex" h="100vh">
                <Box w="30%" h="100vh" m={2} overflow="scroll">
                  <UsersPanel />
                </Box>
                <Box w="70%" m={2}>
                  <Box h="90%" overflow="scroll">
                    <ChatHeader />
                    <UsersChat />
                  </Box>
                  <Box h="10%">
                    <ChatFooter />
                  </Box>
                </Box>
              </Box>
            )}
          </ChakraProvider>
        </ErrorBoundary>
      </React.Suspense>
    </RecoilRoot>
  );
}
