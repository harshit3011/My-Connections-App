import React, { useState } from 'react';
import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import EditModal from './EditModal.jsx';  // Import the EditModal component

const PersonCard = ({ id, name, designation, description, updatePerson }) => {
  const toast = useToast();
  const [isDeleted, setIsDeleted] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();  // Hook for modal state

  const handleDelete = async () => {
    try {
      console.log(id);
      const res = await fetch(`http://localhost:8000/api/connection/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        toast({
          title: "Connection deleted",
          description: "The connection has been deleted successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setIsDeleted(true);
      } else {
        toast({
          title: "Error",
          description: "Error while deleting the connection",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isDeleted) return null;

  return (
    <>
      <Card>
        <CardHeader>
          <Flex gap={4}>
            <Flex flex={"1"} gap={"4"} alignItems={"center"}>
              <Avatar src="https://img.freepik.com/premium-vector/businessman-avatar-illustration-cartoon-user-portrait-user-profile-icon_118339-4382.jpg" />

              <Box>
                <Heading size='sm'>{name}</Heading>
                <Text>{designation}</Text>
              </Box>
            </Flex>

            <Flex>
              <IconButton
                variant='ghost'
                colorScheme='blue'
                aria-label='Edit connection'
                size={"sm"}
                icon={<BiEditAlt size={20} />}
                onClick={onOpen}  // Open the EditModal
              />
              <IconButton
                variant='ghost'
                colorScheme='red'
                size={"sm"}
                aria-label='Delete connection'
                icon={<BiTrash size={20} />}
                onClick={handleDelete}
              />
            </Flex>
          </Flex>
        </CardHeader>

        <CardBody>
          <Text>{description}</Text>
        </CardBody>
      </Card>

      {/* Render the EditModal */}
      <EditModal
        isOpen={isOpen}
        onClose={onClose}
        person={{ _id: id, name, designation, description }}  // Pass person data to modal
        updatePerson={updatePerson}  // Pass the update function
      />
    </>
  );
};

export default PersonCard;
