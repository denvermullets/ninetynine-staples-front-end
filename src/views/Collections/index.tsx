import React from "react";
import {
  Container,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import CollectionList from "../../components/CollectionList";

const Collections: React.FC = () => {
  return (
    <Container
      py={{ base: "4", md: "8" }}
      px={{ base: "14", md: "8" }}
      marginTop={4}
      width="100%"
      maxWidth="8xl"
      backgroundColor={"white"}
      boxShadow={{ base: "none", md: useColorModeValue("sm", "sm-dark") }}
      borderRadius={useBreakpointValue({ base: "none", md: "lg" })}
    >
      <CollectionList />
    </Container>
  );
};

export default Collections;
