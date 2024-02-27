import React from "react";
import {
  Button,
  Stack,
  Tag,
  Input,
  Container,
  Flex,
  Heading,
  Divider, FormControl, FormLabel, Textarea, Switch,
  Text,
} from '@chakra-ui/react'

export const Details = () => {
  return (
    <div className="main">
      <header>
        <Container  maxW="container.lg">
          <Flex>
            <Heading as="h1" size="lg">Kitty Details</Heading>
          </Flex>
        </Container>
      </header>
      <Container maxW="container.lg" mt="2em">
        <Divider />
      </Container>
      <Container maxW="container.sm" mt="2em">
        <Heading as="h2" size="xl" mb="10">Bella</Heading>
        <FormControl>
          <FormLabel>Kitty DNA</FormLabel>
          <Textarea variant="filled" value="515315728237564593861820790636439631664048948986843239490053062984016986" isReadOnly={true} />
        </FormControl>
        <Stack direction="row" gap="6" textAlign="center" mt="10" mb="10">
          <div className="prop"><Text>Mom</Text><Tag colorScheme="pink" borderRadius="full">Ruby</Tag></div>
          <div className="prop"><Text>Dad</Text><Tag colorScheme="blue" borderRadius="full">Milo</Tag></div>
          <div className="prop"><Text>Gender</Text><Tag colorScheme="red" borderRadius="full">Female</Tag></div>
          <div className="prop"><Text>No. of breedings</Text><Tag colorScheme="blackAlpha" borderRadius="full">3</Tag></div>
        </Stack>
        <FormControl>
          <FormLabel>Kitty name</FormLabel>
          <Input value="Bella" />
        </FormControl>
        <Flex mt="8">
          <FormControl display='flex' alignItems='end'>
            <Switch id='forSale' mb="2" />
            <FormLabel htmlFor='forSale' ml="3">
              For sale?
            </FormLabel>
          </FormControl>
          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input value="20" />
          </FormControl>
        </Flex>
        <Stack mt="6">
          <Button variant="outline" colorScheme='teal'>Update</Button>
          <Button type="submit" colorScheme='teal'>Breed</Button>
        </Stack>
      </Container>
    </div>
  )
}
