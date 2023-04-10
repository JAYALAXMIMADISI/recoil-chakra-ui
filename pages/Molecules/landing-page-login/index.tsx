import { Button, Grid, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";

export default function Login() {
  const router = useRouter();
  const [changePinValue, setChangePinValue] = useState("");

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (event: any) => {
    setChangePinValue(event.target.value);
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
              placeholder="Enter pin"
              bg="#fff"
              onChange={handleChange}
            />

            {changePinValue && (
              <Button
                variant="outline"
                size="sm"
                w="max-content"
                ml="13%"
                mt="20px"
                onClick={() => router.push("../../Organisms/users-chat-area")}
              >
                Open Chat
              </Button>
            )}
          </>
        </Grid>
      )}
    </RecoilRoot>
  );
}
