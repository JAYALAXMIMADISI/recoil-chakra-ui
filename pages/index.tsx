import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { ErrorBoundary } from "react-error-boundary";
import React, { useEffect, useState } from "react";
import LandingPage from "./Organisms/landing-page";
import { LazyMotion, domAnimation } from "framer-motion";

export const theme = extendTheme({
  colors: {
    primary: "teal",
    secondary: "blue",
  },
  variants: {
    bg: "red.400",
    boxShadow: "0 0 2px 2px #efdfde",
    border: "2px solid black",
  },
});

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
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
                <>
                  <LandingPage />
                </>
              )}
            </ChakraProvider>
          </ErrorBoundary>
        </React.Suspense>
      </RecoilRoot>
    </LazyMotion>
  );
}
