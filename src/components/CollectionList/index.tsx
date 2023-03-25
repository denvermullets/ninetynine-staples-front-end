import { DragHandleIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Container,
  FormControl,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  CheckboxGroup,
} from "@chakra-ui/react";
import axios from "axios";
import { Select } from "chakra-react-select";
import React, { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useParams } from "react-router-dom";
import config from "../../config";
import { Boxset, CollectionOption, FilterOptions, PlayerCollectionType } from "../../types";
import { useCustomSearchParams } from "../../util/customHooks";
import CollectionTable from "./CollectionTable";
import { groupedOptions } from "./helpers";

const CollectionList: React.FC = () => {
  const { username, id } = useParams();
  const [page, setPage] = useState<number>(1);
  const [playerCollection, setPlayerCollection] = useState<PlayerCollectionType[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(50);
  const [boxsetOptions, setBoxsetOptions] = useState<CollectionOption[]>([]);
  const [collectionOptions, setCollectionOptions] = useState<CollectionOption[]>([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [boxset, setBoxset] = useState(null);
  const [search, setSearch] = useCustomSearchParams();
  const [searchByCard, setSearchByCard] = useState<string>("");
  const [loadedCollection, setLoadedCollection] = useState<boolean>(false);
  const [exactMatch, setExactMatch] = useState<boolean>(false);
  const timeout = useRef<null | ReturnType<typeof setTimeout>>();

  const handleFilters = (e) => {
    const selectedFilters = e.filter(
      (option) =>
        option.value === "mythic" ||
        option.value === "rare" ||
        option.value === "uncommon" ||
        option.value === "common"
    );

    const colors: FilterOptions[] = e.filter(
      (color) =>
        color.value === "W" ||
        color.value === "U" ||
        color.value === "R" ||
        color.value === "B" ||
        color.value === "G"
    );

    // this kinda seems weird, why did i do this? was i dumb??
    setSearch({
      ...(selectedFilters?.length && {
        rarity: selectedFilters.map((rarity: FilterOptions) => rarity.value).join(","),
      }),
      ...(colors?.length && {
        color: colors.map((color: FilterOptions) => color.value).join(","),
      }),
    });
  };

  const handleSearch = (e) => {
    clearTimeout(timeout.current);
    setSearchByCard(e.target.value);

    timeout.current = setTimeout(async () => {
      if (e.target.value !== "") {
        setSearch({ ...search, search: e.target.value });
      } else {
        const updatedSearch = { ...search };
        delete updatedSearch["search"];

        setSearch({ ...updatedSearch });
      }
    }, 500);
  };

  const handleExactMatch = () => {
    const deleteExact = { ...search };

    if (!exactMatch === false && search?.exact) {
      delete deleteExact["exact"];
    }

    setSearch({
      ...deleteExact,
      ...(!exactMatch === true && { exact: "yes" }),
    });
    setExactMatch(!exactMatch);
  };

  const handleBoxsetChange = (e) => {
    // chakra react select is not an html element so just .value to get value
    setBoxset(e);
    setSearch({ ...search, boxset: e.label });
  };

  const handleCollectionChange = (event) => {
    console.log("this is the event", event);
    // setSearch({ ...search, collection: "hi" });
    // setSelectedCollection(event);
  };

  useEffect(() => {
    console.log("search object changed", search);

    fetchData();
  }, [search?.rarity, search?.color, search?.exact, search?.page, search?.boxset, search?.search]);

  const fetchData = async () => {
    const collectionData = await axios(`${config.API_URL}/collections/${username}/${id}`, {
      params: {
        ...(search?.rarity && { rarity: search.rarity }),
        ...(search?.color && { color: search.color }),
        ...(search?.exact && { exact: search.exact }),
        ...(search?.boxset && { boxset: search.boxset }),
        ...(search?.search && { search: search.search }),
        page: page ? page : 1,
        quantity: itemsPerPage ? itemsPerPage : 50,
      },
    });

    if (collectionData) {
      console.log("collection loaded", collectionData.data);
      const collection = collectionData.data.filter(
        (collection: PlayerCollectionType) =>
          collection.quantity > 0 || collection.foil_quantity > 0
      );
      setPlayerCollection(collection);
    }
  };

  useEffect(() => {
    if (!username || !id) {
      console.log("not found");
      return;
    }

    if (username && id && !loadedCollection) {
      fetchData();
      setLoadedCollection(true);
    }
  }, [username, id, loadedCollection]);

  useEffect(() => {
    // load boxsets & collections
    const fetchOptions = async () => {
      const filterOptions = await axios(`${config.API_URL}/collections/${username}`);

      if (filterOptions) {
        const boxsets: CollectionOption[] = filterOptions.data.boxsets.map((box: Boxset) => {
          return {
            value: box.id,
            label: box.name,
          };
        });

        const collections: CollectionOption[] = filterOptions.data.collections.map(
          (collection: PlayerCollectionType) => {
            return {
              value: collection.id,
              label: collection.name,
            };
          }
        );

        const defaultCollection = collections.filter((collection: CollectionOption) => {
          return Number(collection.value) === Number(id);
        });

        setBoxsetOptions(boxsets);
        setCollectionOptions(collections);
        setSelectedCollection(defaultCollection[0]);
      }
    };

    if (!boxsetOptions.length && !collectionOptions.length) {
      fetchOptions();
    }
  }, [boxsetOptions, collectionOptions]);

  return (
    <Box bg="white">
      <Container width="100%" maxWidth="8xl">
        <Box
          bg="bg-surface"
          boxShadow={{ base: "none", md: useColorModeValue("sm", "sm-dark") }}
          borderRadius={useBreakpointValue({ base: "none", md: "lg" })}
        >
          <Box paddingBottom={10}>
            <Grid gap={6} templateColumns="repeat(10, 1fr)" padding={2}>
              <GridItem colSpan={4}>
                <Select
                  useBasicStyles
                  options={boxsetOptions}
                  onChange={handleBoxsetChange}
                  placeholder="Select a Boxset"
                  value={boxset}
                />
              </GridItem>
              <GridItem colSpan={3}>
                <Select
                  isDisabled={true}
                  options={collectionOptions}
                  value={selectedCollection}
                  onChange={handleCollectionChange}
                  placeholder="Select your Collection"
                  useBasicStyles
                />
              </GridItem>
              <GridItem colSpan={3}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FiSearch} color="muted" boxSize="5" />
                  </InputLeftElement>
                  <Input placeholder="Find a card" onChange={handleSearch} value={searchByCard} />
                </InputGroup>
              </GridItem>
              <GridItem colSpan={6}>
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
                    onChange={handleFilters}
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={1}>
                <CheckboxGroup>
                  <Checkbox
                    size="lg"
                    marginTop={2}
                    value="exact"
                    isChecked={exactMatch}
                    onChange={handleExactMatch}
                  >
                    Exact
                  </Checkbox>
                </CheckboxGroup>
              </GridItem>

              <GridItem colSpan={1}>
                <Stack direction="row" spacing={2}>
                  <IconButton
                    // variant={gridView ? null : "outline"}
                    // disabled={gridView}
                    aria-label="View as Grid"
                    icon={<DragHandleIcon />}
                    // onClick={() => setGridView(true)}
                  />
                  <IconButton
                    // variant={gridView ? "outline" : null}
                    // disabled={!gridView}
                    // onClick={() => setGridView(false)}
                    aria-label="View as List"
                    icon={<HamburgerIcon />}
                  />
                </Stack>
              </GridItem>
            </Grid>
          </Box>
          <Box overflowX="auto">
            {playerCollection && (
              <CollectionTable
                playerCollection={playerCollection}
                setPlayerCollection={setPlayerCollection}
              />
            )}
          </Box>
          <Box px={{ base: "4", md: "6" }} pb="5" paddingTop={5}>
            <HStack spacing="3" justify="space-between">
              <Text color="muted" fontSize="sm"></Text>
              <ButtonGroup
                spacing="3"
                justifyContent="space-between"
                width={{ base: "full", md: "auto" }}
                variant="secondary"
              >
                <Button
                  onClick={() => {
                    setSearch({ ...search, page: String(page - 1) });
                    setPage(page - 1);
                  }}
                  disabled={page < 2}
                >
                  Previous
                </Button>
                <Button
                  onClick={() => {
                    setSearch({ ...search, page: String(page + 1) });
                    setPage(page + 1);
                  }}
                  disabled={playerCollection.length < itemsPerPage - 1}
                >
                  Next
                </Button>
              </ButtonGroup>
            </HStack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CollectionList;
