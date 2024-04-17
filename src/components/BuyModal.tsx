import React, { FC, useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import { MultiValue, Select } from "chakra-react-select";
import { ArrowForwardIcon } from "chakra-ui-ionicons";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getCoins, selectCoins } from "../features/trade";
import { selectKitty } from "../features/kittyDetails";
import { selectAccount } from "../features/wallet/walletSlice";

type Props = {
  isOpen: any;
  onOpen: any;
  onClose: any;
};
export const BuyModal: FC<Props> = ({ isOpen, onClose }) => {
  const kitty = useAppSelector(selectKitty);
  const coins = useAppSelector(selectCoins);
  const dispatch = useAppDispatch();
  const account = useAppSelector(selectAccount);

  useEffect(() => {
    if (!account) return;
    dispatch(getCoins(account.key));
  }, [account]);

  const [total, setTotal] = useState<number>(0);

  const handleCoinSelect = (
    selected: null | MultiValue<{ label: string; value: string }>,
  ) => {
    setTotal(
      selected?.reduce((acc, option) => acc + Number(option.value), 0) || 0,
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Buying {kitty?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack gap={6}>
            <FormControl>
              <FormLabel>Input coin</FormLabel>
              <Select
                onChange={handleCoinSelect}
                isMulti
                options={coins.map((coin) => ({
                  label: `${coin.hash} (${coin.value})`,
                  value: `${coin.value}`,
                }))}
              />
              <FormHelperText>Total value: {total}</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Send to address</FormLabel>
              <Input value={kitty?.owner} readOnly />
              <FormHelperText>sr25519 pubkey</FormHelperText>
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" width="100%" onClick={onClose}>
            <ArrowForwardIcon mr={2} /> Proceed
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
