import React from 'react';
import {
  RouterProvider,
} from "react-router-dom";
import { router } from "./router";
import { Button, Stack, Container, Flex } from '@chakra-ui/react';
import {SearchIcon, CartIcon, PersonCircleIcon} from "chakra-ui-ionicons";
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <Container maxW="container.lg" mt="1em">
          <Flex justifyContent="flex-end">
            <Stack spacing="1em" direction="row">
              <Button><SearchIcon mr={1.5} /> Search</Button>
              <Button><CartIcon mr={1.5}/> Trade</Button>
              <Button><PersonCircleIcon mr={1.5}/> My Kitties</Button>
            </Stack>
          </Flex>
        </Container>
      </header>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
