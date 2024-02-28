import React from 'react';
import {
  Link,
  Outlet,
} from "react-router-dom";
import { Button, Stack, Container, Flex } from '@chakra-ui/react';
import {SearchIcon, CartIcon, PersonCircleIcon} from "chakra-ui-ionicons";
import { WalletSelector } from "../features/wallet";

export const Root = () => {
  let account = undefined;
  return (
    <div className="App">
      <header>
        <Container maxW="container.lg" mt="1em">
          <Flex justifyContent="flex-end">
            <Stack spacing="1em" direction="row">
              {account ? (
                <>
                  <Button as={Link} to="/"><SearchIcon mr={1.5} /> Search</Button>
                  <Button as={Link} to="trade"><CartIcon mr={1.5}/> Trade</Button>
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
