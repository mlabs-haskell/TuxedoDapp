import React, { useEffect } from 'react';
import {
  Link,
  Outlet,
} from "react-router-dom";
import { Button, Stack, Container, Flex } from '@chakra-ui/react';
import {SearchIcon, PersonCircleIcon} from "chakra-ui-ionicons";
import { WalletSelector } from "../features/wallet";
import { useAppSelector } from "../app/hooks";
import { selectAccount, selectIsConnected } from "../features/wallet/walletSlice";
import {getWalletBySource} from "@talisman-connect/wallets";

export const Root = () => {
  const account = useAppSelector(selectAccount);
  const isConnected = useAppSelector(selectIsConnected);
  const wallet = getWalletBySource('talisman');
  // const sign = async  () => {
  //   wallet?.enable('kitty');
  //   const signerResult = await wallet?.signer.signRaw({
  //     type: 'payload',
  //     data: 'Some data to sign...',
  //     address: account?.address,
  //   });
  // }
  useEffect(()=>{
    if (!account || !wallet) return;
    //sign();
  },[account, wallet])

  return (
    <div className="App">
      <header>
        <Container maxW="container.lg" mt="1em">
          <Flex justifyContent="flex-end">
            <Stack spacing="1em" direction="row">
              {account && isConnected ? (
                <>
                  {/*Money amount?*/}
                  <Button as={Link} to="/"><SearchIcon mr={1.5} /> Search</Button>
                  <Button as={Link} to="my-kitties"><PersonCircleIcon mr={1.5}/> My Kitties</Button>
                </>
                ) : <WalletSelector />}
              </Stack>
          </Flex>
        </Container>
      </header>
      <Outlet />
    </div>
  )
}
