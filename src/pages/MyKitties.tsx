import React from "react";
import {
  Button,
  Stack,
  Spacer,
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
import { Link, To, useNavigate } from "react-router-dom";
import { EggIcon, SearchIcon } from 'chakra-ui-ionicons';

export const MyKitties = () => {
  const navigate = useNavigate();
  const handleRowClick = (page: To) => () => {
    navigate(page);
  };

  return (
    <div className="main">
      <header>
        <Container  maxW="container.lg">
          <Flex>
            <Heading as="h1" size="lg">My Kitties</Heading>
            <Spacer />
            <Stack spacing="1em" direction="row">
              <Button as={Link} to="/breed" colorScheme="pink"><EggIcon mr={1.5}/> Breed</Button>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <SearchIcon />
                </InputLeftElement>
                <Input type='search' placeholder='Find' />
              </InputGroup>
            </Stack>
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
                    <Td>Bella</Td>
                    <Td>Female</Td>
                    <Td>None</Td>
                    <Td>None</Td>
                    <Td>3</Td>
                    <Td><Tag colorScheme="teal">Ready to Breed</Tag></Td>
                    <Td><Tag colorScheme="teal">Yes</Tag></Td>
                    <Td>$20</Td>
                  </Tr>
                  <Tr onClick={handleRowClick("/details")}>
                    <Td>Oreo</Td>
                    <Td>Male</Td>
                    <Td>None</Td>
                    <Td>None</Td>
                    <Td>1</Td>
                    <Td><Tag colorScheme="orange">Tired</Tag></Td>
                    <Td><Tag colorScheme="gray">No</Tag></Td>
                    <Td>None</Td>
                  </Tr>
                  <Tr onClick={handleRowClick("/details")}>
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
  )
}
