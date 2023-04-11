import {
  AlertDialog,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { motion } from "framer-motion";

export default function CloseChat() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef: any = React.useRef();

  return (
    <>
      <motion.button
        initial={{ x: -200 }}
        animate={{ x: 8 }}
        transition={{ type: "tween" }}
      >
        <Button colorScheme="red" onClick={onOpen}>
          Close Chat
        </Button>
      </motion.button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Close Chat
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You want to close chat
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={() => router.push("/")} ml={3}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
