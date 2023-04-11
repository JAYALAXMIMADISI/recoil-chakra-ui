import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { atom, useRecoilState, useSetRecoilState } from "recoil";
import { usersListStateAtom } from "../components/atoms-selectors";
import { motion } from "framer-motion";

const inputFieldValue = atom({
  key: "inputFieldValue",
  default: "",
});

export default function AddUserModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useRecoilState(inputFieldValue);
  const setUsersUpdatedList = useSetRecoilState(usersListStateAtom);

  const inputRef: any = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addNewUser = () => {
    setUsersUpdatedList((list: any) => [
      ...list,
      {
        id: list.length + 1,
        name: value,
        messages: [],
      },
    ]);
    setValue("");
  };

  const handleOnChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <>
      <motion.button
        initial={{ x: -200 }}
        animate={{ x: 95 }}
        transition={{ type: "tween" }}
      >
        <Button onClick={onOpen} ml="35%">
          Add New User
        </Button>
      </motion.button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter User Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <motion.input
              type="text"
              value={value}
              onChange={handleOnChange}
              ref={inputRef}
              placeholder="Enter user name"
              initial={{ width: "100%", height: 40, padding: 4 }}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={addNewUser}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
