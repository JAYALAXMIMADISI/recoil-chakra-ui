import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { RecoilRoot } from "recoil";
import LandingPageHeader from "../../Atoms/landing-page-header";
import Login from "../../Molecules/landing-page-login";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    // setMounted(true);
    if (localStorage.getItem("chatLogin") != "") {
      router.push("../../Organisms/users-chat-area");
    } else {
      router.push("/");
    }
  }, []);

  return (
    <Box bg="grey" h="100vh">
      <LandingPageHeader />
      <Login />
    </Box>
  );
}
