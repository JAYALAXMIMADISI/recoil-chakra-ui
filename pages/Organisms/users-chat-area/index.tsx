import { Box, Button, ChakraProvider, Grid } from "@chakra-ui/react";
import ChatHeader from "nxt/pages/Atoms/chat-header";
import React, { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { RecoilRoot } from "recoil";
import ChatFooter from "../../Molecules/chat-footer";
import UsersChat from "../../Molecules/users-chat";
import UsersPanel from "../users-panel";
import { theme } from "nxt/pages";
import { useRouter } from "next/router";

export default function OpenUsersChatOnLogin() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem("chatLogin") != "") {
      router.push("../../Organisms/users-chat-area");
    } else {
      router.push("/");
    }
  }, []);
  return (
    <>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary
              fallbackRender={({ error }) => (
                <div>
                  {`Errors that appear here are errors that happen at render: ${error.message}`}
                </div>
              )}
            >
              {mounted && (
                <>
                  <Grid display="flex" h="100vh">
                    <Box
                      width={{ base: "100%", sm: "40%", md: "30%" }}
                      h="100vh"
                      m={2}
                      overflow="scroll"
                    >
                      <UsersPanel />
                    </Box>
                    <Box w={{ base: "100%", sm: "60%", md: "70%" }} m={2}>
                      <Box
                        h={{ base: "100%", sm: "90%", md: "85%", lg: "90%" }}
                        overflow="scroll"
                      >
                        <ChatHeader />
                        <UsersChat />
                      </Box>
                      <Box h="10%">
                        <ChatFooter />
                      </Box>
                    </Box>
                  </Grid>
                </>
              )}
            </ErrorBoundary>
          </React.Suspense>
        </ChakraProvider>
      </RecoilRoot>

      {/* }  */}
    </>
  );
}
