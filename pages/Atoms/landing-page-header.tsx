import { Box } from "@chakra-ui/react";
import React from "react";

export default function LandingPageHeader() {
  return (
    <Box
      h="60px"
      bg="teal.300"
      textAlign="center"
      fontSize="20px"
      fontWeight="bold"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      My Chat App
    </Box>
  );
}
