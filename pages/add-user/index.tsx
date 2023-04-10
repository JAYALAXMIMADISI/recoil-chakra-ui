import { Button, Link } from "@chakra-ui/react";
import React from "react";
import {} from "@chakra-ui/react";
import AddUserModal from "../Organisms/modal";
import CloseChat from "../Organisms/close-button-alert";

export default function AddNewUser() {
  return (
    <>
      <CloseChat />
      <AddUserModal />
    </>
  );
}
