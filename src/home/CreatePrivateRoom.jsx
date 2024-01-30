import React, { useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, FormControl, FormLabel, useDisclosure } from '@chakra-ui/react';

export default function CreatePrivateRoom() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [roomName, setRoomName] = useState('');

  const handleCreateRoom = () => {
    // Add logic to handle room creation
    console.log('Room created with name:', roomName);
    // Close the modal after creating the room
    onClose();
  };

  return (
    <div>
      <Button colorScheme="teal" onClick={onOpen}>
        Create Room
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Private Room</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Room Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter room name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCreateRoom}>
              Create
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
