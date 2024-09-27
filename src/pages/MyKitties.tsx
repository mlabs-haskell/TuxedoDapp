import React, { useEffect, useState } from "react";
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
  InputGroup,
  InputLeftElement,
  Divider,
  Tooltip,
} from "@chakra-ui/react";
import { Link, To, useNavigate } from "react-router-dom";
import { EggIcon, SearchIcon } from "chakra-ui-ionicons";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectError, selectKitties, selectStatus } from "../features/kittiesList";
import { selectAccount } from "../features/wallet/walletSlice";
import { setKitty } from "../features/kittyDetails";
import { Kitty } from "../types";
import Fuse, { FuseResult } from "fuse.js";
import { LoadingStatus } from "../components/LoadingStatus";
import { getStatusColor } from "../utils";
import { useRefreshKittiesList } from "../features/kittiesList/useRefreshKittiesList";

export const MyKitties = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const list = useAppSelector(selectKitties);
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);
  const account = useAppSelector(selectAccount);
  const [filteredList, setList] = useState<FuseResult<Kitty>[]>([]);
  const fuse = new Fuse(list, {
    shouldSort: true,
    keys: ["name", "hash", "status", "forSale"],
  });
  const message = error ?? filteredList.length === 0 ? "No kitties found" : undefined;

  useRefreshKittiesList({ intervalMilliseconds: 10000, accountKey: account?.key });

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
            <Heading as="h1" size="lg">
              My Kitties
            </Heading>
            <Spacer />
            <Stack spacing="1em" direction="row">
              <Button as={Link} to="/breed" colorScheme="pink">
                <EggIcon mr={1.5} /> Breed
              </Button>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon />
                </InputLeftElement>
                <Input
                  onInput={handleSearch}
                  type="search"
                  placeholder="Find"
                />
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
                  {filteredList.map(({ item }) => (
                    <Tr
                      key={item?.dna}
                      onClick={handleRowClick("/details", item)}
                    >
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
                      <Td>{item?.price || "N/A"}</Td>
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
