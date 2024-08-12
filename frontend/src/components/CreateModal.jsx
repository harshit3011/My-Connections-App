import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";

const CreateModal = ({ isOpen, onClose }) => {
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [description, setDescription] = useState("");
    const toast = useToast();
    const handleSubmit = async () => {
        if(!name || !designation || !description){
            toast({
                title: "Error",
                description: "Fields are required",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
              onClose()
              return
        }
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user._id; // Extract user ID
        console.log(userId)
        try {
          const res = await fetch("http://localhost:8000/api/connection/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
              name:name,
              designation:designation,
              description: description
            }),
          });
          console.log(res)
          if (res.ok) {
          toast({
            title: "Connection Added",
            description: "Your new connection has been added successfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          // Clear form fields
          setName("");
          setDesignation("");
          setDesignation("");
          onClose();
        }
        else{
            toast({
                title: "Error",
                description: "Error while adding a new connection",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
        }
        } catch (error) {
          toast({
            title: "Error",
            description: error.message || "Something went wrong",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          setName("");
          setDesignation("");
          setDesignation("");
          onClose();
        }
      };
    
      return (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Book</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box as="form" onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <FormControl id="name" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Person's name"
                    />
                  </FormControl>
                  <FormControl id="Designation" isRequired>
                    <FormLabel>Designation</FormLabel>
                    <Input
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      placeholder="Person's designation"
                    />
                  </FormControl>
                  <FormControl id="Desccription">
                <FormLabel>Description</FormLabel>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Person's Description"
                />
              </FormControl>
                </Stack>
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                Add a connection
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      );
}

export default CreateModal