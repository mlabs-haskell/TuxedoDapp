import React from "react";
import {
  Input,
  Container,
  Flex,
  Heading,
  Divider, FormControl, FormLabel,
  Select,
} from '@chakra-ui/react';

export const Breed = () => {
  return (
    <div className="main">
      <header>
        <Container  maxW="container.lg">
          <Flex>
            <Heading as="h1" size="lg">Breed Kitties</Heading>
          </Flex>
        </Container>
      </header>
      <Container maxW="container.lg" mt="2em">
        <Divider />
      </Container>
      <Container maxW="container.sm" mt="2em">
        <Heading as="h2" size="lg" mb={10}>Select Parents</Heading>
        <FormControl>
          <FormLabel>Mom</FormLabel>
          <Input isReadOnly value="Bella 5130682273927811147766450526028831923738645492716772816...0103" />
        </FormControl>
        <FormControl mt={10}>
          <FormLabel>Dad</FormLabel>
          <Select>
            <option>Milo 186134165906497996902981707074165700476823113467626361...4182</option>
            <option>Oreo 443283712248594972183904105752923218618338272041534419...8581</option>
          </Select>
        </FormControl>
      </Container>
    </div>
  )
}
