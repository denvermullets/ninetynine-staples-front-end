import React from "react";
import { Container } from "@chakra-ui/react";
import CollectionList from "../../components/CollectionList";

const Collections: React.FC = () => {
  return (
    <Container variant="collection">
      <CollectionList />
    </Container>
  );
};

export default Collections;
