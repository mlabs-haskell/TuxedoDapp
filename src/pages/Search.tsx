import React, { useEffect } from "react";
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
  Divider,
  Tooltip
} from '@chakra-ui/react'
import { To, useNavigate } from "react-router-dom";
import { SearchIcon } from 'chakra-ui-ionicons';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getKitties, selectKitties } from "../features/kittiesList";
import { Kitty } from "../types";
import { setKitty } from "../features/kittyDetails";

export const Search = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const list = useAppSelector(selectKitties);
  const handleRowClick = (page: To, kitty: Kitty) => () => {
    dispatch(setKitty(kitty))
    navigate(page);
  };
  useEffect(()=>{
    dispatch(getKitties());
  },[])
  const colors:Record<string, string>  = {
    'ready to bread': "pink",
    'tired': "purple",
    'had birth recently': "teal",
  }

  // @ts-ignore
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
              <Table size='sm'>
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
                  {
                    list.map(kitty=> (
                      <Tr key={kitty.dna} onClick={handleRowClick("/details", kitty)}>
                        <Td>
                          <Tooltip label={kitty.owner}>
                            {`0x..${kitty.owner!.slice(-4,-1)}`}
                          </Tooltip>
                        </Td>
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
                      </Tr>
                    ))
                  }
                </Tbody>
              </Table>
            </TableContainer>
          </GridItem>
        </Grid>
      </Container>
     </div>
  )
}
