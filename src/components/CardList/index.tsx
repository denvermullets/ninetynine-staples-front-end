import {
  Box,
  Button,
  ButtonGroup,
  Container,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { CardListProps, MagicCardType } from "../../types";
import CardTable from "./CardTable";

const CardList: React.FC<CardListProps> = ({ cards, set, setCode }) => {
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(50);
  const [paginatedCards, setPaginatedCards] = useState<MagicCardType[]>([]);

  const paginate = (magicCards: MagicCardType[]) => {
    const offset = (page - 1) * itemsPerPage;
    return magicCards.slice(offset).slice(0, itemsPerPage);
  };

  useEffect(() => {
    const magicCards = paginate(cards);
    setPaginatedCards(magicCards);
  }, [page, cards]);

  useEffect(() => {
    setPage(1);
  }, [cards]);

  return (
    <Container
      py={{ base: "4", md: "8" }}
      px={{ base: "14", md: "8" }}
      width="100%"
      maxWidth="8xl"
    >
      <Box
        bg="bg-surface"
        boxShadow={{ base: "none", md: useColorModeValue("sm", "sm-dark") }}
        borderRadius={useBreakpointValue({ base: "none", md: "lg" })}
      >
        <Stack spacing="5">
          <Box px={{ base: "4", md: "6" }} pt="5">
            <Stack
              direction={{ base: "column", md: "row" }}
              justify="space-between"
            >
              <Text fontSize="lg" fontWeight="medium">
                {set} - {page} - {itemsPerPage}
              </Text>
              <InputGroup maxW="xs">
                <InputLeftElement pointerEvents="none">
                  <Icon as={FiSearch} color="muted" boxSize="5" />
                </InputLeftElement>
                <Input placeholder="Search" />
              </InputGroup>
            </Stack>
          </Box>
          <Box overflowX="auto">
            <CardTable cards={paginatedCards} setCode={setCode} />
          </Box>
          <Box px={{ base: "4", md: "6" }} pb="5">
            <HStack spacing="3" justify="space-between">
              <Text color="muted" fontSize="sm">
                Showing {page * itemsPerPage - itemsPerPage + 1} to{" "}
                {page * itemsPerPage > cards.length
                  ? cards.length
                  : page * itemsPerPage}{" "}
                of {cards.length} results
              </Text>

              <ButtonGroup
                spacing="3"
                justifyContent="space-between"
                width={{ base: "full", md: "auto" }}
                variant="secondary"
              >
                <Button onClick={() => setPage(page - 1)} disabled={page < 2}>
                  Previous
                </Button>
                <Button
                  onClick={() => setPage(page + 1)}
                  disabled={Math.ceil(cards.length / itemsPerPage) === page}
                >
                  Next
                </Button>
              </ButtonGroup>
            </HStack>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default CardList;
