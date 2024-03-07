import React, { useCallback, useEffect } from "react";
import {
  Button,
  Stack,
  Tag,
  Input,
  Container,
  Flex,
  Heading,
  Divider, FormControl, FormLabel, Textarea, Switch,
  Text,
  useDisclosure, useToast,
} from '@chakra-ui/react';
import { CartIcon } from "chakra-ui-ionicons";
import { BuyModal } from "../components/BuyModal";
import { useAppSelector } from "../app/hooks";
import { selectKitty } from "../features/kittyDetails";
import { useNavigate } from "react-router-dom";
import { selectAccount } from "../features/wallet/walletSlice";

export const Details = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();
  const kitty = useAppSelector(selectKitty);
  const account = useAppSelector(selectAccount);
  const navigate = useNavigate();
  const handleClose = useCallback(()=>{
    toast({
      title: "Kitty purchased successfully!",
      status: 'success',
      isClosable: true,
      duration: 10000,
      position: 'top-right'
    })
    onClose();
  }, [])
  useEffect(()=>{
    if(!kitty) navigate('/')
  },[kitty])
  if (!kitty) return <div className="main">
    <header>
      <Container  maxW="container.lg">
        <Flex>
          <Heading as="h1" size="lg">No kitty</Heading>
        </Flex>
      </Container>
    </header>
  </div>

  return (
    <div className="main">
      <header>
        <Container  maxW="container.lg">
          <Flex>
            <Heading as="h1" size="lg">Kitty Details</Heading>
          </Flex>
        </Container>
      </header>
      <Container maxW="container.lg" mt="2em">
        <Divider />
      </Container>
      <Container maxW="container.sm" mt="2em">
        <Heading as="h2" size="xl" mb="10">{kitty.name}</Heading>
        <FormControl>
          <FormLabel>Kitty DNA</FormLabel>
          <Textarea variant="filled" value={kitty.dna} isReadOnly={true} />
        </FormControl>
        <Stack direction="row" gap="6" textAlign="center" mt="10" mb="10">
          <div className="prop"><Text>Mom</Text><Tag colorScheme="pink" borderRadius="full">{kitty.mom.name}</Tag></div>
          <div className="prop"><Text>Dad</Text><Tag colorScheme="blue" borderRadius="full">{kitty.dad.name}</Tag></div>
          <div className="prop"><Text>Gender</Text><Tag colorScheme={kitty.gender === 'male' ? 'blue' : 'red'} borderRadius="full">{kitty.gender}</Tag></div>
          <div className="prop"><Text>No. of breedings</Text><Tag colorScheme="blackAlpha" borderRadius="full">{kitty.breedings}</Tag></div>
        </Stack>
        { kitty.owner === account!.address ? (<>
          <FormControl>
            <FormLabel>Kitty name</FormLabel>
            <Input value={kitty.name} />
          </FormControl>
          <Flex mt="8">
            <FormControl display='flex' alignItems='end'>
              <Switch id='forSale' mb="2" isChecked={kitty.forSale} />
              <FormLabel htmlFor='forSale' ml="3">
                For sale?
              </FormLabel>
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <Input value={kitty.price} />
            </FormControl>
          </Flex>
          <Stack mt="6">
            <Button variant="outline" colorScheme='teal'>Update</Button>
            <Button type="submit" colorScheme='teal'>Breed</Button>
          </Stack>
        </>) : (<>
          <Stack gap={4}>
            <FormControl>
              <FormLabel>Owner</FormLabel>
              <Input value={kitty.owner} />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <Input value={kitty.price} />
            </FormControl>
            <Button onClick={onOpen} type="submit" mt={8} colorScheme="teal"><CartIcon /> Buy Now</Button>
            <BuyModal isOpen={isOpen} onOpen={onOpen} onClose={handleClose} />
          </Stack>
        </>) }
      </Container>
    </div>
  )
}
