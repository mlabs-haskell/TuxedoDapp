import React, { useEffect, useState } from "react";
import {
  Container,
  Flex,
  Heading,
  Divider,
  FormControl,
  FormLabel,
  Select,
  Stack,
  Button,
  Modal,
  ModalOverlay,
  useDisclosure,
  Input,
  Textarea,
  Text,
  Tag,
  useToast,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getKitties, selectKitties } from "../features/kittiesList";
import { Kitty } from "../types";
import { selectAccount } from "../features/wallet/walletSlice";
import {
  postBreed,
  selectChild,
  selectDad,
  selectMom,
  setDad,
  setMom,
} from "../features/breeding";

export const Breed = () => {
  const [state, setState] = useState<"breeding" | "result">("breeding");
  const { isOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const [dads, moms] = useAppSelector(selectKitties).reduce<[Kitty[], Kitty[]]>(
    (acc, kitty) => {
      if (kitty.gender === "male") {
        acc[0].push(kitty);
      } else {
        acc[1].push(kitty);
      }
      return acc;
    },
    [[], []],
  );
  const account = useAppSelector(selectAccount);
  const toast = useToast();
  const selectedMom = useAppSelector(selectMom);
  const selectedDad = useAppSelector(selectDad);
  const selectedChild = useAppSelector(selectChild);
  const [kittyName, setKittyName] = useState("");

  const handleMomSelect = (event: React.FormEvent<HTMLSelectElement>) => {
    dispatch(setMom({ dna: event.currentTarget.value }));
  };
  const handleDadSelect = (event: React.FormEvent<HTMLSelectElement>) => {
    console.log("dad", event.currentTarget.value);
    dispatch(setDad({ dna: event.currentTarget.value }));
  };
  const startBreeding = () => {
    if (!selectedDad || !selectedMom || kittyName === "") {
      toast({
        title: "Be sure to enter kitty breeding details!",
        status: "warning",
        isClosable: true,
        duration: 10000,
        position: "top-right",
      });
      return;
    }
    dispatch(
      postBreed({
        mom: selectedMom?.dna!,
        dad: selectedDad?.dna!,
        name: kittyName,
        key: account?.key!,
      }),
    );
  };
  useEffect(() => {
    if (!account) return;
    // we don't want to update if the kitties are already in store
    if (moms.length > 0 || dads.length > 0) return;
    dispatch(getKitties(account.address));
  }, [account, moms, dads]);

  useEffect(() => {
    if (selectedDad && !selectedMom && moms.length > 0) {
      dispatch(setMom({ dna: moms[0].dna }));
    }
  }, [moms]);

  useEffect(() => {
    if (selectedMom && !selectedDad && dads.length > 0) {
      dispatch(setDad({ dna: dads[0].dna }));
    }
  }, [dads]);

  return (
    <>
      <div className="main">
        <header>
          <Container maxW="container.lg">
            <Flex>
              <Heading as="h1" size="lg">
                Breed Kitties
              </Heading>
            </Flex>
          </Container>
        </header>
        <Container maxW="container.lg" mt="2em">
          <Divider />
        </Container>
        <Container maxW="container.sm" mt="2em">
          <Heading as="h2" size="lg" mb={10}>
            Select Parents
          </Heading>
          <FormControl>
            <FormLabel>Mom</FormLabel>
            <Select onChange={handleMomSelect}>
              {moms.map((kitty) => (
                <option key={kitty.dna} value={kitty.dna}>
                  {kitty.name} {kitty.dna}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mt={5}>
            <FormLabel>Dad</FormLabel>
            <Select onChange={handleDadSelect}>
              {dads.map((kitty) => (
                <option key={kitty.dna} value={kitty.dna}>
                  {kitty.name} {kitty.dna}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mt={5}>
            <FormLabel>Kitty name</FormLabel>
            <Input
              onInput={(event: React.FormEvent<HTMLInputElement>) =>
                setKittyName(event.currentTarget.value)
              }
              value={kittyName}
            />
          </FormControl>
          <Stack mt={10}>
            <Button onClick={startBreeding} type="submit" colorScheme="teal">
              Breed
            </Button>
          </Stack>
        </Container>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
      </Modal>
    </>
  );
};
