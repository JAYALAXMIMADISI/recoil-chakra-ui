import { Box } from "@chakra-ui/react";
import React from "react";
import { RecoilRoot } from "recoil";
import LandingPageHeader from "../../Atoms/landing-page-header";
import Login from "../../Molecules/landing-page-login";


export default function LandingPage(){

    return(
        <Box bg='grey' h='100vh'  >
        <LandingPageHeader/>
        <Login/>
        </Box>
    )
}