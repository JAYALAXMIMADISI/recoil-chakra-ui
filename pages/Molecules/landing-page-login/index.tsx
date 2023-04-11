import { Grid, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import { m } from "framer-motion";

const variants = {
  hidden: {
    y: -100,
  },
  visible: {
    size: "sm",
    width: "max-content",
    marginLeft: "15%",
    marginTop: "20px",
    y: 0,
    backgroundColor: "#fff",
    padding: 3,
    borderRadius: "5px",
  },
};

export default function Login() {
  const router = useRouter();
  const [changePinValue, setChangePinValue] = useState("");

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (event: any) => {
    if (event.target.value.length === 4) setChangePinValue(event.target.value);
  };
  return (
    <RecoilRoot>
      {mounted && (
        <Grid
          mt="20%"
          w="30%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          ml="43%"
          mr="35%"
        >
          <>
            <Input
              type="text"
              w={{ base: "50%" }}
              placeholder="Enter 4 digit pin"
              bg="#fff"
              onChange={handleChange}
            />

            {changePinValue && (
              <m.button
                variants={variants}
                initial="hidden"
                animate="visible"
                onClick={() => router.push("../../Organisms/users-chat-area")}
              >
                Open Chat
              </m.button>
            )}
          </>
        </Grid>
      )}
    </RecoilRoot>
  );
}
