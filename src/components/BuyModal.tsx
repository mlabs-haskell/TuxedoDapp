import React, {FC} from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button, Stack, FormControl, FormLabel,
  Input, FormHelperText,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from "chakra-ui-ionicons";

type Props = {
  isOpen: any,
  onOpen: any,
  onClose: any,
};
export const BuyModal: FC<Props> = ({isOpen, onClose}) => {
  return <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Buying Luna</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack gap={6}>
                <FormControl>
                  <FormLabel>Input coin</FormLabel>
                  <Input value="c9b2c76f0a070a1b614b05277" />
                </FormControl>
                <FormControl>
                  <FormLabel>Send to address</FormLabel>
                  <Input value="0xf41a866782d45a4d2d8a623a...e06b" />
                  <FormHelperText>sr25519 pubkey</FormHelperText>
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='teal' width="100%" onClick={onClose}>
                <ArrowForwardIcon mr={2} /> Proceed
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
}
