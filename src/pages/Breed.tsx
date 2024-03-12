import React, { useEffect, useState } from "react";
import {
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
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getKitties, selectKitties } from "../features/kittiesList";
import { Kitty } from "../types";
import { selectAccount } from "../features/wallet/walletSlice";
import { postBreed, selectChild, selectDad, selectMom, setDad, setMom } from "../features/breeding";

export const Breed = () => {
  const [state, setState] = useState<'breeding' | 'result'>('breeding');
  const {isOpen, onOpen, onClose} = useDisclosure();
  const dispatch = useAppDispatch();
  const [dads, moms] = useAppSelector(selectKitties).reduce<[Kitty[],Kitty[]]>((acc, kitty)=>{
    if (kitty.gender === 'male'){
      acc[0].push(kitty);
    }else{
      acc[1].push(kitty);
    }
    return acc
  },[[],[]])
  const account = useAppSelector(selectAccount);
  const toast = useToast();
  const selectedMom = useAppSelector(selectMom)
  const selectedDad = useAppSelector(selectDad);
  const selectedChild = useAppSelector(selectChild);

  const handleMomSelect = (event: React.FormEvent<HTMLSelectElement>) => {
    dispatch(setMom({dna: event.currentTarget.value}));
  };
  const handleDadSelect = (event: React.FormEvent<HTMLSelectElement>) => {
    dispatch(setDad({dna: event.currentTarget.value}));
  };
  const startBreeding = () => {
    if (!selectedDad && !selectedMom) return;
    dispatch(postBreed({
      mom: selectedMom!,
      dad: selectedDad!
    }));
  };
  useEffect(()=>{
    if (!account) return;
    // we don't want to update if the kitties are already in store
    if (moms.length > 0 || dads.length > 0) return;
    dispatch(getKitties(account.address))
  },[account, moms, dads])
  useEffect(()=>{
    // onWalletOpen(()=>{
    //   onOpen();//show backdrop
    // })
    // onWalletClose(()=>{
    //   onClose();//hide backdrop
    // })
  },[])
  useEffect(()=>{
    if (selectedChild){
      toast({
        title: "Kitty bred successfully!",
        status: 'success',
        isClosable: true,
        duration: 10000,
        position: 'top-right'
      })
    }
  }, [selectedChild])

  useEffect(()=>{
    if (state === 'breeding' && selectedChild) {
      setState('result');
    }
  },[selectedChild])

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
                <Select onChange={handleMomSelect} defaultValue={selectedMom?.dna}>
                  {moms.map(kitty=>(
                    <option key={kitty.dna} value={kitty.dna}>{kitty.name} {kitty.dna}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl mt={5}>
                <FormLabel>Dad</FormLabel>
                <Select onChange={handleDadSelect} defaultValue={selectedDad?.dna}>
                  {dads.map(kitty=>(
                    <option key={kitty.dna} value={kitty.dna}>{kitty.name} {kitty.dna}</option>
                  ))}
                </Select>
              </FormControl>
              <Stack mt={10}>
                <Button onClick={startBreeding} type="submit" colorScheme="teal">Breed</Button>
              </Stack>
            </>
          ) : (
            <>
              <Heading as="h2" size="lg" mb={10}>New Kitty: {selectedChild!.name}</Heading>
              <FormControl>
                <FormLabel>Kitty DNA</FormLabel>
                <Textarea variant="filled" value={selectedChild!.dna} isReadOnly={true} />
              </FormControl>
              <Stack direction="row" gap="6" textAlign="center" mt="10" mb="10">
                <div className="prop"><Text>Mom</Text><Tag colorScheme="pink" borderRadius="full">{selectedChild!.mom.name}</Tag></div>
                <div className="prop"><Text>Dad</Text><Tag colorScheme="blue" borderRadius="full">{selectedChild!.dad.name}</Tag></div>
                <div className="prop"><Text>Gender</Text><Tag colorScheme={selectedChild!.gender === 'male' ? 'blue' : 'red'} borderRadius="full">{selectedChild!.gender}</Tag></div>
                <div className="prop"><Text>No. of breedings</Text><Tag colorScheme="blackAlpha" borderRadius="full">{selectedChild!.breedings}</Tag></div>
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
