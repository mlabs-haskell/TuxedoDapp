import React from "react";
import {
  Tag,
  Input,
  Container,
  Grid,
  GridItem,
  Flex,
  Heading,
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  InputGroup, InputLeftElement,
  Divider
} from '@chakra-ui/react'
import { To, useNavigate } from "react-router-dom";
import { SearchIcon } from 'chakra-ui-ionicons';

export const Search = () => {
  const navigate = useNavigate();
  const handleRowClick = (page: To) => () => {
    navigate(page);
  };

  return (
    <div className="main">
      <header>
        <Container  maxW="container.lg">
          <Flex>
            <Heading minW={230} as="h1" size="lg">Search Kitties</Heading>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <SearchIcon />
              </InputLeftElement>
              <Input type='search' placeholder='Input the public key of the seller (e.g., "ABC")' />
            </InputGroup>
          </Flex>

        </Container>
      </header>
      <Container maxW="container.lg" mt="2em">
        <Divider />
      </Container>
      <Container maxW="container.lg">
        <Grid>
          <GridItem>
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Owner</Th>
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
                  <Tr onClick={handleRowClick("/details")}>
                    <Td>Alice</Td>
                    <Td>Milo</Td>
                    <Td>Male</Td>
                    <Td>None</Td>
                    <Td>None</Td>
                    <Td>3</Td>
                    <Td><Tag colorScheme="teal">Ready to Breed</Tag></Td>
                    <Td><Tag colorScheme="teal">Yes</Tag></Td>
                    <Td>$10</Td>
                  </Tr>
                  <Tr onClick={handleRowClick("/details")}>
                    <Td>Alice</Td>
                    <Td>Milo</Td>
                    <Td>Male</Td>
                    <Td>None</Td>
                    <Td>None</Td>
                    <Td>3</Td>
                    <Td><Tag colorScheme="teal">Ready to Breed</Tag></Td>
                    <Td><Tag colorScheme="teal">Yes</Tag></Td>
                    <Td>$10</Td>
                  </Tr>
                  <Tr onClick={handleRowClick("/details")}>
                    <Td>Alice</Td>
                    <Td>Milo</Td>
                    <Td>Male</Td>
                    <Td>None</Td>
                    <Td>None</Td>
                    <Td>3</Td>
                    <Td><Tag colorScheme="teal">Ready to Breed</Tag></Td>
                    <Td><Tag colorScheme="teal">Yes</Tag></Td>
                    <Td>$10</Td>
                  </Tr>
                  <Tr onClick={handleRowClick("/details")}>
                    <Td>Alice</Td>
                    <Td>Milo</Td>
                    <Td>Male</Td>
                    <Td>None</Td>
                    <Td>None</Td>
                    <Td>3</Td>
                    <Td><Tag colorScheme="teal">Ready to Breed</Tag></Td>
                    <Td><Tag colorScheme="teal">Yes</Tag></Td>
                    <Td>$10</Td>
                  </Tr>
                  <Tr onClick={handleRowClick("/details")}>
                    <Td>Alice</Td>
                    <Td>Milo</Td>
                    <Td>Male</Td>
                    <Td>None</Td>
                    <Td>None</Td>
                    <Td>3</Td>
                    <Td><Tag colorScheme="teal">Ready to Breed</Tag></Td>
                    <Td><Tag colorScheme="teal">Yes</Tag></Td>
                    <Td>$10</Td>
                  </Tr>
                  <Tr onClick={handleRowClick("/details")}>
                    <Td>Alice</Td>
                    <Td>Milo</Td>
                    <Td>Male</Td>
                    <Td>None</Td>
                    <Td>None</Td>
                    <Td>3</Td>
                    <Td><Tag colorScheme="teal">Ready to Breed</Tag></Td>
                    <Td><Tag colorScheme="teal">Yes</Tag></Td>
                    <Td>$10</Td>
                  </Tr>
                  <Tr onClick={handleRowClick("/details")}>
                    <Td>Alice</Td>
                    <Td>Milo</Td>
                    <Td>Male</Td>
                    <Td>None</Td>
                    <Td>None</Td>
                    <Td>3</Td>
                    <Td><Tag colorScheme="teal">Ready to Breed</Tag></Td>
                    <Td><Tag colorScheme="teal">Yes</Tag></Td>
                    <Td>$10</Td>
                  </Tr>
                  <Tr onClick={handleRowClick("/details")}>
                    <Td>Alice</Td>
                    <Td>Milo</Td>
                    <Td>Male</Td>
                    <Td>None</Td>
                    <Td>None</Td>
                    <Td>3</Td>
                    <Td><Tag colorScheme="teal">Ready to Breed</Tag></Td>
                    <Td><Tag colorScheme="teal">Yes</Tag></Td>
                    <Td>$10</Td>
                  </Tr>
                  <Tr onClick={handleRowClick("/details")}>
                    <Td>Alice</Td>
                    <Td>Milo</Td>
                    <Td>Male</Td>
                    <Td>None</Td>
                    <Td>None</Td>
                    <Td>3</Td>
                    <Td><Tag colorScheme="teal">Ready to Breed</Tag></Td>
                    <Td><Tag colorScheme="teal">Yes</Tag></Td>
                    <Td>$10</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </GridItem>
        </Grid>
      </Container>
     </div>
  )
}
