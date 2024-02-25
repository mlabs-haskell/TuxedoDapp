import React from 'react';
import { Button, Stack, Spacer, Tag, Input, Container, Grid, GridItem, Flex, Heading, Table, TableContainer, Thead, Tr, Th, Td, Tbody } from '@chakra-ui/react'
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <Container maxW="container.lg" mt="1em">
          <Flex justifyContent="flex-end">
            <Stack spacing="1em" direction="row">
              <Button>Search</Button>
              <Button>Trade</Button>
              <Button>My Kitties</Button>
            </Stack>
          </Flex>
        </Container>
      </header>
      <div className="main">
        <header>
          <Container  maxW="container.lg">
            <Flex>
              <Heading as="h1" size="lg">My Kitties</Heading>
              <Spacer />
              <Stack spacing="1em" direction="row">
                <Button colorScheme="pink">Breed</Button>
                <Input maxW="xs"></Input>
              </Stack>
            </Flex>
          </Container>
        </header>
        <Container maxW="container.lg" mt="2em">
          <Grid>
            <GridItem>
              <TableContainer>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Kitty Name</Th>
                      <Th>Gender</Th>
                      <Th>Mom DNA</Th>
                      <Th>Dad DNA</Th>
                      <Th>No. of Breedings</Th>
                      <Th>Breeding Status</Th>
                      <Th>For Sale</Th>
                      <Th>Price</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Milo</Td>
                      <Td>Male</Td>
                      <Td>None</Td>
                      <Td>None</Td>
                      <Td>3</Td>
                      <Td><Tag colorScheme="teal">Ready to Breed</Tag></Td>
                      <Td><Tag colorScheme="teal">Yes</Tag></Td>
                      <Td>$10</Td>
                    </Tr>
                    <Tr>
                      <Td>Bella</Td>
                      <Td>Female</Td>
                      <Td>None</Td>
                      <Td>None</Td>
                      <Td>3</Td>
                      <Td><Tag colorScheme="teal">Ready to Breed</Tag></Td>
                      <Td><Tag colorScheme="teal">Yes</Tag></Td>
                      <Td>$20</Td>
                    </Tr>
                    <Tr>
                      <Td>Oreo</Td>
                      <Td>Male</Td>
                      <Td>None</Td>
                      <Td>None</Td>
                      <Td>1</Td>
                      <Td><Tag colorScheme="orange">Tired</Tag></Td>
                      <Td><Tag colorScheme="gray">No</Tag></Td>
                      <Td>None</Td>
                    </Tr>
                    <Tr>
                      <Td>Lily</Td>
                      <Td>Female</Td>
                      <Td>None</Td>
                      <Td>None</Td>
                      <Td>3</Td>
                      <Td><Tag colorScheme="gray">Had Birth Recently</Tag></Td>
                      <Td><Tag colorScheme="gray">No</Tag></Td>
                      <Td>None</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </GridItem>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default App;
