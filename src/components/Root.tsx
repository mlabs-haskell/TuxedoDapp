import React from 'react';
import {
  Link,
  Outlet,
} from "react-router-dom";
import { Button, Stack, Container, Flex } from '@chakra-ui/react';
import {SearchIcon, PersonCircleIcon} from "chakra-ui-ionicons";
import { WalletSelector } from "../features/wallet";
import { useAppSelector } from "../app/hooks";
import { selectAccount } from "../features/wallet/walletSlice";

export const Root = () => {
  const account = useAppSelector(selectAccount);
  return (
    <div className="App">
      <header>
        <Container maxW="container.lg" mt="1em">
          <Flex justifyContent="flex-end">
            <Stack spacing="1em" direction="row">
              {account ? (
                <>
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
