import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Stack,
  Tag,
  Input,
  Container,
  Flex,
  Heading,
  Divider,
  FormControl,
  FormLabel,
  Textarea,
  Switch,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { CartIcon } from "chakra-ui-ionicons";
import { BuyModal } from "../components/BuyModal";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getKitty,
  selectKitty,
  setKitty,
  updateKittyName,
  updateKittyPrice,
  listKitty,
  delistKitty,
  purchaseKitty,
} from "../features/kittyDetails";
import { useNavigate } from "react-router-dom";
import { selectAccount } from "../features/wallet/walletSlice";
import { setDad, setMom } from "../features/breeding";
import { KittyAvatar } from "../components/Avatar";
import { Kitty } from "../types";

export const Details = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const kitty = useAppSelector(selectKitty);
  const account = useAppSelector(selectAccount);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [hasChanged, setChangedFields] = useState<Record<string, boolean>>({});
  const handleClose = useCallback((coin: string, outputAmount: number) => {
    // Avoid purchasing if any of the required fields are missing.
    // This happens when closing the modal without selecting a coin.
    if (!coin || !outputAmount || !kitty) {
      onClose();
      return;
    }

    dispatch(
      purchaseKitty({
        kitty: kitty as Kitty,
        key: account?.key!,
        outputAmount,
        coin,
      })
    )
      .unwrap()
      .then(() => {
        toast({
          title: "Kitty purchased successfully!",
          description: "Kitty info will update once the transaction is confirmed.",
          status: "success",
          isClosable: true,
          duration: 10000,
          position: "top-right",
        });
      })
      .finally(() => {
        onClose();
      });
  }, [account?.key, dispatch, kitty, onClose, toast]);
  
  const handleBreed = () => {
    if (!kitty) return;
    if (kitty?.gender === "male") {
      dispatch(setDad(kitty));
    } else {
      dispatch(setMom(kitty));
    }
    navigate("/breed");
  };
  const handleSaleToggle = () => {
    const isKittyForSale = !kitty?.forSale;
    dispatch(setKitty({ ...kitty, forSale: isKittyForSale }));
    if (isKittyForSale) {
      setChangedFields({
        ...hasChanged,
        listKitty: true,
      });
    } else {
      setChangedFields({
        ...hasChanged,
        delistKitty: true,
      });
    }
  };
  const handlePriceInput = (event: React.FormEvent<HTMLInputElement>) => {
    dispatch(setKitty({ ...kitty, price: +event.currentTarget.value }));
    setChangedFields({
      ...hasChanged,
      price: true,
    });
  };
  const handleNameInput = (event: React.FormEvent<HTMLInputElement>) => {
    dispatch(setKitty({ ...kitty, name: event.currentTarget.value }));
    setChangedFields({
      ...hasChanged,
      name: true,
    });
  };
  const handleUpdate = () => {
    if (!kitty || !account?.key) return;
    if (hasChanged.name) {
      dispatch(updateKittyName({ kitty: kitty as Kitty, key: account?.key! }));
    }
    if (hasChanged.price) {
      dispatch(updateKittyPrice({ kitty: kitty as Kitty, key: account?.key! }));
    }

    if (hasChanged.listKitty) {
      if (kitty.price) {
        dispatch(listKitty({ kitty: kitty as Kitty, key: account?.key! }));
      } else {
        toast({
          title: "Enter price to list kitty for sale!",
          status: "warning",
          isClosable: true,
          duration: 10000,
          position: "top-right",
        });
      }
    }
    if (hasChanged.delistKitty) {
      dispatch(delistKitty({ kitty: kitty as Kitty, key: account?.key! }));
    }
  };

  useEffect(() => {
    if (!kitty || !kitty?.dna) {
      navigate("/");
      return;
    }

    // Fetch kitty details every 10 seconds to ensure they are up to date
    // prior to any action.
    const interval = setInterval(() => {
      dispatch(getKitty(kitty.dna!));
    }, 10000);

    return () => clearInterval(interval);
  }, [kitty, dispatch, navigate]);

  return (
    <div className="main">
      <header>
        <Container maxW="container.lg">
          <Flex>
            <Heading as="h1" size="lg">
              Kitty Details
            </Heading>
          </Flex>
        </Container>
      </header>
      <Container maxW="container.lg" mt="2em">
        <Divider />
      </Container>
      <Container maxW="container.sm" mt="2em">
        <Heading as="h2" size="xl" mb="10">
          {kitty?.name}
        </Heading>
        <Flex justifyContent="center" w="100%" mb={3}>
          {!!kitty?.dna && <KittyAvatar dna={kitty?.dna!} />}
        </Flex>
        <FormControl>
          <FormLabel>Kitty DNA</FormLabel>
          <Textarea variant="filled" value={kitty?.dna} isReadOnly={true} />
        </FormControl>
        <Stack direction="row" gap="6" textAlign="center" mt="10" mb="10">
          <div className="prop">
            <Text>Mom</Text>
            <Tag colorScheme="pink" borderRadius="full">
              {kitty?.mom?.name}
            </Tag>
          </div>
          <div className="prop">
            <Text>Dad</Text>
            <Tag colorScheme="blue" borderRadius="full">
              {kitty?.dad?.name}
            </Tag>
          </div>
          <div className="prop">
            <Text>Gender</Text>
            <Tag
              colorScheme={kitty?.gender === "male" ? "blue" : "red"}
              borderRadius="full"
            >
              {kitty?.gender}
            </Tag>
          </div>
          <div className="prop">
            <Text>No. of breedings</Text>
            <Tag colorScheme="blackAlpha" borderRadius="full">
              {kitty?.breedings}
            </Tag>
          </div>
        </Stack>
        {kitty?.owner === account?.key ? (
          <>
            <FormControl>
              <FormLabel>Kitty name</FormLabel>
              <Input onInput={handleNameInput} value={kitty?.name} />
            </FormControl>
            <Flex mt="8">
              <FormControl display="flex" alignItems="end">
                <Switch
                  onChange={handleSaleToggle}
                  id="forSale"
                  mb="2"
                  isChecked={kitty?.forSale}
                />
                <FormLabel htmlFor="forSale" ml="3">
                  For sale?
                </FormLabel>
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  onInput={handlePriceInput}
                  value={kitty?.price}
                />
              </FormControl>
            </Flex>
            <Stack my="6">
              <Button
                onClick={handleUpdate}
                variant="outline"
                colorScheme="teal"
              >
                Update
              </Button>
              <Button onClick={handleBreed} type="submit" colorScheme="teal">
                Breed
              </Button>
            </Stack>
          </>
        ) : (
          <>
            <Stack gap={4} my="6">
              <FormControl>
                <FormLabel>Owner</FormLabel>
                <Input readOnly value={kitty?.owner} />
              </FormControl>

              {kitty?.forSale && (
                <>
                  <FormControl>
                    <FormLabel>Price</FormLabel>
                    <Input readOnly value={kitty?.price} />
                  </FormControl>
                  <Button
                    onClick={onOpen}
                    type="submit"
                    mt={8}
                    colorScheme="teal"
                  >
                    <CartIcon /> Buy Now
                  </Button>
                </>
              )}

              <BuyModal isOpen={isOpen} onOpen={onOpen} onClose={handleClose} />
            </Stack>
          </>
        )}
      </Container>
    </div>
  );
};
