import { Button, Flex, Heading } from '@chakra-ui/react'
import { useContext } from "react";
import { HouseContext } from '../../context/HouseContext';

import LocationFilter from "./LocationFilter";
import PriceFilter from "./PriceFilter";
import PropertyTypeFilter from "./PropertyTypeFilter";
import { Input } from '@chakra-ui/react';

const Search = () => {

  const { searchHandler, setSearchQuery } = useContext(HouseContext);

  return (
    <Flex my='3' direction='column' borderRadius='md' bg='#fff' boxShadow='md' p='5'>

      <Heading py='2' size={{ base: 'sm', md: 'md' }}>Search the price you looking for</Heading>

      <Flex gap={{ base: 3, md: 2 }} direction={{ base: 'column', md: 'row' }} borderRadius='30'>
        <LocationFilter />
        <PropertyTypeFilter />
        <PriceFilter />
        <Input placeholder='Search By Name' onChange={(e) => setSearchQuery(e.target.value)} />
        <Button onClick={searchHandler} p={{ base: 3, md: 2 }} size="100%">Search</Button>
      </Flex>
    </Flex>
  )
}

export default Search