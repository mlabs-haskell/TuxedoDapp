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
  InputGroup,
  InputLeftElement,
  Divider,
  Tooltip,
} from "@chakra-ui/react";
import { To, useNavigate } from "react-router-dom";
import { SearchIcon } from "chakra-ui-ionicons";
import Fuse, { FuseResult } from "fuse.js";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectError,
  selectKitties,
  selectStatus,
} from "../features/kittiesList";
import { Kitty } from "../types";
import { setKitty } from "../features/kittyDetails";
import { LoadingStatus } from "../components/LoadingStatus";
import { getStatusColor } from "../utils";
import { useRefreshKittiesList } from "../features/kittiesList/useRefreshKittiesList";

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
  keys: ["name"],
};
export const Search = () => {
  const [filteredList, setList] = useState<FuseResult<Kitty>[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const list = useAppSelector(selectKitties);
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);
  const fuse = new Fuse(list, fuseOptions);

  useRefreshKittiesList({ intervalMilliseconds: 10000 });

  const message = error ?? filteredList.length === 0 ? "No kitties found" : undefined;

  const handleRowClick = (page: To, kitty: Kitty) => () => {
    dispatch(setKitty(kitty));
    navigate(page);
  };

  useEffect(() => {
    setList(list.map((kitty) => ({ item: kitty, refIndex: 1 })));
  }, [list]);

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length > 0) {
      setList(fuse.search(e.currentTarget.value));
    } else {
      setList(list.map((kitty) => ({ item: kitty, refIndex: 1 })));
    }
  };

  return (
    <div className="main">
      <header>
        <Container maxW="container.lg">
          <Flex>
            <Heading minW={230} as="h1" size="lg">
              Search Kitties
            </Heading>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon />
              </InputLeftElement>
              <Input
                onInput={handleSearch}
                type="search"
                placeholder='Input the public key of the seller (e.g., "ABC")'
              />
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
              <Table size="sm">
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
                  {filteredList.map(({ item }) => (
                    <Tr
                      key={item?.dna}
                      onClick={handleRowClick("/details", item)}
                    >
                      <Td>
                        <Tooltip label={item?.owner}>
                          {`0x..${item?.owner?.slice(-4, -1) || ""}`}
                        </Tooltip>
                      </Td>
                      <Td>{item?.name}</Td>
                      <Td>{item?.gender}</Td>
                      <Td>
                        <Tooltip label={item?.mom?.dna}>
                          {item?.mom?.name || ""}
                        </Tooltip>
                      </Td>
                      <Td>
                        <Tooltip label={item?.dad?.dna}>
                          {item?.dad?.name || ""}
                        </Tooltip>
                      </Td>
                      <Td>{item?.breedings}</Td>
                      <Td>
                        <Tag colorScheme={getStatusColor(item?.status)}>
                          {item?.status}
                        </Tag>
                      </Td>
                      <Td>
                        <Tag colorScheme={item?.forSale ? "teal" : "gray"}>
                          {item?.forSale ? "Yes" : "No"}
                        </Tag>
                      </Td>
                      <Td>{item?.price ? `${item?.price}` : "-"}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <LoadingStatus status={status} message={message} />
          </GridItem>
        </Grid>
      </Container>
    </div>
  );
};
