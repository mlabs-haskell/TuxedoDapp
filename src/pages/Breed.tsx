import React, { useEffect, useState } from "react";
import {
  Input,
  Container,
  Flex,
  Heading,
  Divider, FormControl, FormLabel,
  Select,
  Stack,
  Button,
  Modal,
  ModalOverlay,
  useDisclosure, Textarea,
  Text, Tag,
  useToast
} from '@chakra-ui/react';

export const Breed = () => {
  const [state, setState] = useState<'breeding' | 'result'>('result');
  const {isOpen, onOpen, onClose} = useDisclosure();
  const toast = useToast();
  useEffect(()=>{
    // onWalletOpen(()=>{
    //   onOpen();//show backdrop
    // })
    // onWalletClose(()=>{
    //   onClose();//hide backdrop
    // })
  },[])
  useEffect(()=>{
    toast({
      title: "Kitty bred successfully!",
      status: 'success',
      isClosable: true,
      duration: 10000,
      position: 'top-right'
    })
  }, [])

  return (
    <>
      <div className="main">
        <header>
          <Container  maxW="container.lg">
            <Flex>
              <Heading as="h1" size="lg">Breed Kitties</Heading>
            </Flex>
          </Container>
        </header>
        <Container maxW="container.lg" mt="2em">
          <Divider />
        </Container>
        <Container maxW="container.sm" mt="2em">
          { state === 'breeding' ? (
            <>
              <Heading as="h2" size="lg" mb={10}>Select Parents</Heading>
              <FormControl>
                <FormLabel>Mom</FormLabel>
                <Input isReadOnly value="Bella 5130682273927811147766450526028831923738645492716772816...0103" />
              </FormControl>
              <FormControl mt={5}>
                <FormLabel>Dad</FormLabel>
                <Select>
                  <option>Milo 186134165906497996902981707074165700476823113467626361...4182</option>
                  <option>Oreo 443283712248594972183904105752923218618338272041534419...8581</option>
                </Select>
              </FormControl>
              <Stack mt={10}>
                <Button type="submit" colorScheme="teal">Breed</Button>
              </Stack>
            </>
          ) : (
            <>
              <Heading as="h2" size="lg" mb={10}>New Kitty: Simba</Heading>
              <FormControl>
                <FormLabel>Kitty DNA</FormLabel>
                <Textarea variant="filled" value="515315728237564593861820790636439631664048948986843239490053062984016986" isReadOnly={true} />
              </FormControl>
              <Stack direction="row" gap="6" textAlign="center" mt="10" mb="10">
                <div className="prop"><Text>Mom</Text><Tag colorScheme="pink" borderRadius="full">Ruby</Tag></div>
                <div className="prop"><Text>Dad</Text><Tag colorScheme="blue" borderRadius="full">Milo</Tag></div>
                <div className="prop"><Text>Gender</Text><Tag colorScheme="blue" borderRadius="full">Male</Tag></div>
                <div className="prop"><Text>No. of breedings</Text><Tag colorScheme="blackAlpha" borderRadius="full">0</Tag></div>
              </Stack>
            </>
          )}
        </Container>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
      </Modal>
    </>
  )
}
