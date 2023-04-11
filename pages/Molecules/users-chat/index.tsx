import { Box, Center, Grid, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import {
  userMessagesListByUserIdSelector,
  userMessagesListId,
} from "../../components/atoms-selectors";
import { BiUser } from "react-icons/bi";
import {
  motion,
  useAnimate,
  useDragControls,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";

type message = string | null;

export default function UsersChat() {
  const controls = useDragControls();
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  const id = useRecoilValue(userMessagesListId);
  const userMessages = useRecoilValue(userMessagesListByUserIdSelector(id));

  const x = useMotionValue(200);
  const y = useMotionValue(200);

  function handleMouse(event: any) {
    x.set(event.pageX);
    y.set(event.pageY);
  }

  useEffect(() => {
    if (isInView) {
      animate(scope.current, { ease: "linear" });
    }
  }, [isInView]);

  const startDrag = (event: any) => {
    controls.start(event, { snapToCursor: true });
  };
  return (
    <VStack overflow="scroll" align="left" ref={scope}>
      {userMessages[0]?.messages.length > 0 ? (
        userMessages[0]?.messages?.map((item: message) => {
          return (
            <>
              <div
                onPointerDown={startDrag}
                // onMouseMove={handleMouse}
              />

              <motion.div
                whileHover={{ scale: 1.1, originX: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                drag="x"
                // dragListener={false}
                dragControls={controls}
                dragConstraints={{
                  top: 0,
                  right: 125,
                  bottom: 0,
                  left: 0,
                }}

                // style={{rotateX: rotateX,
                //   rotateY: rotateY,
                // }}

                // whileTap={{border:'solid 2px #000'}}
              >
                <Grid
                  bg="green.100"
                  mt={2}
                  w="max-content"
                  p={3}
                  borderRadius="5px"
                  display="flex"
                >
                  <BiUser style={{ marginTop: "5px", marginRight: "10px" }} />
                  <Box>{item}</Box>
                </Grid>
              </motion.div>
              {/* </div> */}
            </>
          );
        })
      ) : (
        <Center mt="30%">No messages found</Center>
      )}
    </VStack>
  );
}
