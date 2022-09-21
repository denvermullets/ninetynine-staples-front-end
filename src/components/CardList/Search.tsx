import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";
import { FiSearch } from "react-icons/fi";
import { SearchProps } from "../../types";

const Search: React.FC<SearchProps> = ({ search, setSearch }) => {
  const handleSearch = (e) => {
    console.log(e.target.value);

    setSearch(e.target.value);
  };

  return (
    <InputGroup maxW="xs">
      <InputLeftElement pointerEvents="none">
        <Icon as={FiSearch} color="muted" boxSize="5" />
      </InputLeftElement>
      <Input placeholder="Search" onChange={handleSearch} value={search} />
    </InputGroup>
  );
};

export default Search;
