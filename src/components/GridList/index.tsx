import { DragHandleIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import React, { useState } from "react";
import { GridListProps, PlayerCollectionType } from "../../types";
import Search from "../CardList/Search";
import MagicCard from "../MagicCard";

const GridList: React.FC<GridListProps> = ({
  userCollection,
  gridView,
  setGridView,
}) => {
  const [search, setSearch] = useState<string>("");

  return (
    <Box
      bg="bg-surface"
      boxShadow={{ base: "none", md: useColorModeValue("sm", "sm-dark") }}
      borderRadius={useBreakpointValue({ base: "none", md: "lg" })}
    >
      <Stack spacing="8">
        <Box px={{ base: "4", md: "6" }} pt="5">
          <Stack
            direction={{ base: "column", md: "row" }}
            justify="space-between"
          >
            <FormControl>
              <Select
                isMulti
                // options={groupedOptions}
                placeholder="Select Rarity and/or Colors"
                closeMenuOnSelect={false}
                selectedOptionStyle="check"
                hideSelectedOptions={false}
                useBasicStyles
                size="md"
                // onChange={(e) => handleFilters(e)}
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
      </Stack>
      <Grid templateColumns="repeat(5, 1fr)" gap={6} marginTop={12}>
        {userCollection && userCollection.length
          ? userCollection.map(
              (collectionCard: PlayerCollectionType, index: number) => {
                return (
                  <MagicCard
                    key={`${collectionCard.magic_card.name}-${collectionCard.id}-${index}`}
                    // id={String(collectionCard.id)}
                    name={collectionCard.magic_card.name}
                    image_small={collectionCard.magic_card.image_small}
                    image_medium={collectionCard.magic_card.image_medium}
                    // quantity={collectionCard.quantity}
                  />
                );
              }
            )
          : null}
      </Grid>
    </Box>
  );
};

export default GridList;
