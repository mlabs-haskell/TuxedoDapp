import React, { useEffect } from "react";
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
  Divider, Tooltip,
} from '@chakra-ui/react'
import { Link, To, useNavigate } from "react-router-dom";
import { EggIcon, SearchIcon } from 'chakra-ui-ionicons';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getKitties, selectKitties } from "../features/kittiesList";
import { selectAccount } from "../features/wallet/walletSlice";
import { setKitty } from "../features/kittyDetails";
import { Kitty } from "../types";

const colors:Record<string, string>  = {
  'ready to bread': "pink",
  'tired': "purple",
  'had birth recently': "teal",
};

export const MyKitties = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const list = useAppSelector(selectKitties);
  const account = useAppSelector(selectAccount);


  useEffect(()=>{
    if(!account) return;
    dispatch(getKitties(account.address));
  },[account])
  const handleRowClick = (page: To, kitty: Kitty) => () => {
    dispatch(setKitty(kitty))
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
                  {list.map(kitty =><Tr key={kitty.dna} onClick={handleRowClick("/details", kitty)}>
                    <Td>{kitty.name}</Td>
                    <Td>{kitty.gender}</Td>
                    <Td>
                      <Tooltip label={kitty.mom.dna}>
                        {kitty.mom.name}
                      </Tooltip>
                    </Td>
                    <Td>
                      <Tooltip label={kitty.dad.dna}>
                        {kitty.dad.name}
                      </Tooltip>
                    </Td>
                    <Td>{kitty.breedings}</Td>
                    <Td><Tag colorScheme={colors[kitty.status]}>{kitty.status}</Tag></Td>
                    <Td><Tag colorScheme={kitty.forSale ? "teal" : "gray"}>{kitty.forSale ? "Yes" : "No"}</Tag></Td>
                    <Td>${kitty.price}</Td>
                  </Tr>)}
                </Tbody>
              </Table>
            </TableContainer>
          </GridItem>
        </Grid>
      </Container>
     </div>
  )
}
