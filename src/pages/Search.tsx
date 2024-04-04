import React, { useEffect, useState } from "react";
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
  Tooltip, CircularProgress,
} from '@chakra-ui/react'
import { To, useNavigate } from "react-router-dom";
import { SearchIcon } from 'chakra-ui-ionicons';
import Fuse, { FuseResult } from "fuse.js";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getKitties, selectKitties, selectStatus } from "../features/kittiesList";
import { Kitty } from "../types";
import { setKitty } from "../features/kittyDetails";

const fuseOptions = {
  // isCaseSensitive: false,
  // includeScore: false,
  shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  threshold: 0.6,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
  keys: [
    "name"
  ]
};
export const Search = () => {
  const [filteredList, setList] = useState<FuseResult<Kitty>[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const list = useAppSelector(selectKitties);
  const loading = useAppSelector(selectStatus)
  const fuse = new Fuse(list,fuseOptions);
  const handleRowClick = (page: To, kitty: Kitty) => () => {
    dispatch(setKitty(kitty))
    navigate(page);
  };
  useEffect(()=>{
    dispatch(getKitties());
  },[])
  useEffect(()=>{
    setList(list.map(kitty => ({item: kitty, refIndex: 1})))
  },[list])
  const colors:Record<string, string>  = {
    'RearinToGo': "pink",
    'tired': "purple",
    'had birth recently': "teal",
  }

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length > 0) {
      setList(fuse.search(e.currentTarget.value));
    } else {
      setList(list.map(kitty => ({item: kitty, refIndex: 1})))
    }
  }

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
              <Input onInput={handleSearch} type='search' placeholder='Input the public key of the seller (e.g., "ABC")' />
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
                    filteredList
                      .map(({item})=> (
                      <Tr key={item?.dna} onClick={handleRowClick("/details", item)}>
                        <Td>
                          <Tooltip label={item?.owner}>
                            {`0x..${item?.owner?.slice(-4,-1) || ''}`}
                          </Tooltip>
                        </Td>
                        <Td>{item?.name}</Td>
                        <Td>{item?.gender}</Td>
                        <Td>
                          <Tooltip label={item?.mom?.dna}>
                            {item?.mom?.name || ''}
                          </Tooltip>
                        </Td>
                        <Td>
                          <Tooltip label={item?.dad?.dna}>
                            {item?.dad?.name || ''}
                          </Tooltip>
                        </Td>
                        <Td>{item?.breedings}</Td>
                        <Td><Tag colorScheme={colors[item?.status]}>{item?.status}</Tag></Td>
                        <Td><Tag colorScheme={item?.forSale ? "teal" : "gray"}>{item?.forSale ? "Yes" : "No"}</Tag></Td>
                        <Td>{item?.price ? `$${item?.price}` : '-'}</Td>
                      </Tr>
                    ))
                  }
                </Tbody>
              </Table>
            </TableContainer>
            <Flex justifyContent="center">{loading === 'idle' && <CircularProgress isIndeterminate color='green.300' /> }</Flex>
          </GridItem>
        </Grid>
      </Container>
     </div>
  )
}
