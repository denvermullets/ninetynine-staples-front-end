import { DragHandleIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  HStack,
  IconButton,
  Stack,
  Text,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Select, StylesConfig } from "chakra-react-select";
import React, { useEffect, useState } from "react";
import { CardListProps, FilterOptions, MagicCardType } from "../../types";
import CardTable from "./CardTable";
import Search from "./Search";
import { selectBoxStyles } from "../CollectionList/helpers";

const CardList: React.FC<CardListProps> = ({
  cards,
  collection,
  setUserCollection,
  selectedCollection,
  gridView,
  setGridView,
}) => {
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(50);
  const [paginatedCards, setPaginatedCards] = useState<MagicCardType[]>([]);
  const [filters, setFilters] = useState<FilterOptions[]>([]);
  const [filterColors, setFilterColors] = useState<FilterOptions[]>([]);
  const [search, setSearch] = useState<string>("");
  const { colorMode } = useColorMode();

  const isMobile = useBreakpointValue({ base: true, sm: true, md: false, lg: false });

  const cardRarity = [
    { value: "mythic", label: "Mythic" },
    { value: "rare", label: "Rare" },
    { value: "uncommon", label: "Uncommon" },
    { value: "common", label: "Common" },
  ];

  const cardColor = [
    { value: "W", label: "White", colorScheme: "white" },
    { value: "U", label: "Blue", colorScheme: "blue" },
    { value: "R", label: "Red", colorScheme: "red" },
    { value: "B", label: "Black", colorScheme: "gray" },
    { value: "G", label: "Green", colorScheme: "green" },
  ];

  const groupedOptions = [
    {
      label: "Rarity",
      options: cardRarity,
    },
    {
      label: "Color",
      options: cardColor,
    },
  ];

  const handleFilters = (e) => {
    const selectedFilters = e.filter(
      (option) =>
        option.value === "mythic" ||
        option.value === "rare" ||
        option.value === "uncommon" ||
        option.value === "common"
    );

    const colors = e.filter(
      (color) =>
        color.value === "W" ||
        color.value === "U" ||
        color.value === "R" ||
        color.value === "B" ||
        color.value === "G"
    );

    setFilters(selectedFilters);
    setFilterColors(colors);
  };

  const paginate = (magicCards: MagicCardType[]) => {
    const offset = (page - 1) * itemsPerPage;
    return magicCards.slice(offset).slice(0, itemsPerPage);
  };

  const filterByRarity = (searchCards: MagicCardType[]) => {
    const filterCards = searchCards.filter((card) => {
      const options = filters.map((filter) => {
        return filter.value;
      });

      if (options.includes(card.rarity)) {
        return card;
      }
    });

    const magicCards = paginate(filterCards);
    setPaginatedCards(magicCards);
  };

  const filterByColor = (searchCards: MagicCardType[]) => {
    const filterCards = searchCards.filter((card) => {
      const options = filterColors.map((filter) => {
        return filter.value;
      });
      const cardColors = card.magic_card_color_idents.map((idents) => idents.color.name);

      const filtered = options.filter((optionColor) =>
        cardColors.find((identColor) => optionColor === identColor)
      );

      if (filtered.length) {
        return card;
      }
    });

    const magicCards = paginate(filterCards);
    setPaginatedCards(magicCards);
  };

  const filterByColorAndRarity = (searchCards: MagicCardType[]) => {
    const filterCards = searchCards.filter((card) => {
      const rarityOptions = filters.map((filter) => {
        return filter.value;
      });
      const colorOptions = filterColors.map((filter) => {
        return filter.value;
      });
      const cardColors = card.magic_card_color_idents.map((idents) => idents.color.name);

      const filtered = colorOptions.filter((optionColor) =>
        cardColors.find((identColor) => optionColor === identColor)
      );

      if (filtered.length && rarityOptions.includes(card.rarity)) {
        return card;
      }
    });

    const magicCards = paginate(filterCards);
    setPaginatedCards(magicCards);
  };

  useEffect(() => {
    // search takes priority before filters
    const searchedCards = cards.filter((card: MagicCardType) =>
      card.name.toLowerCase().includes(search)
    );

    if (!filters.length && !filterColors.length) {
      // no filters
      const magicCards = paginate(searchedCards);
      setPaginatedCards(magicCards);

      return;
    } else if (filters.length && !filterColors.length) {
      // just rarity
      filterByRarity(searchedCards);
    } else if (!filters.length && filterColors.length) {
      // just colors
      filterByColor(searchedCards);
    } else {
      // both rarity and color
      filterByColorAndRarity(searchedCards);
    }
  }, [page, cards, filters, filterColors, search]);

  useEffect(() => {
    setPage(1);
    setItemsPerPage(50);
  }, [cards]);

  return (
    <Container variant="boxset" marginTop="0">
      <Box
        boxShadow={{ base: "none", md: useColorModeValue("sm", "sm-dark") }}
        borderRadius={useBreakpointValue({ base: "none", md: "lg" })}
      >
        <Stack spacing="8">
          <Box px={{ base: "2" }}>
            <Stack direction={{ base: "column", md: "row" }} justify="space-between">
              <FormControl>
                <Select
                  isMulti
                  options={groupedOptions}
                  placeholder="Select Rarity and/or Colors"
                  closeMenuOnSelect={false}
                  selectedOptionStyle="check"
                  hideSelectedOptions={false}
                  useBasicStyles
                  size="md"
                  onChange={(e) => handleFilters(e)}
                  focusBorderColor="green.500"
                  selectedOptionColorScheme="green"
                  chakraStyles={selectBoxStyles(colorMode)}
                />
              </FormControl>
              <Search search={search} setSearch={setSearch} />
              <Stack direction="row" spacing={2}>
                <IconButton
                  variant={gridView ? null : "outline"}
                  disabled={gridView}
                  aria-label="View as Grid"
                  icon={<DragHandleIcon />}
                  onClick={() => setGridView(true)}
                />
                <IconButton
                  variant={gridView ? "outline" : null}
                  disabled={!gridView}
                  onClick={() => setGridView(false)}
                  aria-label="View as List"
                  icon={<HamburgerIcon />}
                />
              </Stack>
            </Stack>
          </Box>
          <Box overflowX="auto">
            <CardTable
              cards={paginatedCards}
              collection={collection}
              setUserCollection={setUserCollection}
              selectedCollection={selectedCollection}
            />
          </Box>
          <Box px={{ base: "4", md: "6" }} pb="5">
            <HStack spacing="3" justify="space-between">
              <Text color="muted" fontSize="sm">
                Showing {page * itemsPerPage - itemsPerPage + 1} to{" "}
                {page * itemsPerPage > cards.length ? cards.length : page * itemsPerPage} of{" "}
                {cards.length} results
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
