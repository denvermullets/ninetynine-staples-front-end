import {
  Box,
  Container,
  Grid,
  GridItem,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { Select } from "chakra-react-select";
import React, { useEffect, useState } from "react";
import CardList from "../../components/CardList";
import config from "../../config";
import { Boxset, MagicCardType, SelectedCollectionOption } from "../../types";

const Boxsets: React.FC = () => {
  const [cards, setCards] = useState<MagicCardType[]>([]);
  const [boxsetOptions, setBoxsetOptions] = useState<Boxset[]>([]);
  const [currentBox, setCurrentBox] = useState<Boxset>();
  const [userCollectionsOptions, setUserCollectionsOptions] = useState([]);
  const [selectedCollection, setSelectedCollection] =
    useState<SelectedCollectionOption>();
  const [userCollection, setUserCollection] = useState([]);

  const loadBoxsets = async () => {
    try {
      const boxset = await axios(`${config.API_URL}/boxsets`);

      if (boxset) {
        const selectOptions = boxset.data.map((box: Boxset) => {
          return {
            value: box.id,
            label: box.name,
          };
        });

        setBoxsetOptions(selectOptions);
      }
    } catch (error) {
      throw new Error("Could not load boxset!");
    }
  };
  const loadUserCollectionsOptions = async () => {
    try {
      const collections = await axios(
        `${config.API_URL}/collections?player_id=1`
      );

      if (collections) {
        const selectOptions = collections.data.map((collection) => {
          return {
            value: collection.id,
            label: collection.name,
          };
        });

        setUserCollectionsOptions(selectOptions);
      }
    } catch (error) {
      throw new Error("Could not load User Collections!");
    }
  };

  const handleBoxsetChange = async (e) => {
    try {
      const loadCards = await axios(`${config.API_URL}/boxsets/${e.value}`);

      if (loadCards) {
        setCards(loadCards.data.magic_cards);
        setCurrentBox(loadCards.data);
      }
    } catch (error) {
      throw new Error(`Could not load cards from Boxset ${e.value}`);
    }
  };

  useEffect(() => {
    if (!boxsetOptions.length) {
      loadBoxsets();
    }
    if (!userCollectionsOptions.length) {
      // potential loop if no collection created
      loadUserCollectionsOptions();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios(
        `${config.API_URL}/collection/${selectedCollection.value}/cards?boxset=${currentBox.id}`
      );

      if (data) {
        const collectedCards = data.data.map((collection) => collection);
        setUserCollection(collectedCards);
      }
    };

    if (selectedCollection && !userCollection.length) {
      fetchData();
    }
  }, [selectedCollection]);

  return (
    <div style={{ height: "100%" }}>
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
          <Grid gap={6} templateColumns="repeat(4, 1fr)" padding={2}>
            <GridItem colSpan={2}>
              <Select
                options={boxsetOptions}
                onChange={handleBoxsetChange}
                placeholder="Select a Boxset"
              />
            </GridItem>
            <GridItem colSpan={2}>
              <Select
                options={userCollectionsOptions}
                onChange={(e) => setSelectedCollection(e)}
                key="userCollection-select"
                name="user-collection-select"
                placeholder="Select your Collection"
              />
            </GridItem>
          </Grid>
          {cards && cards.length ? (
            <CardList
              cards={cards}
              setCode={currentBox.code.toLowerCase()}
              set={currentBox.name}
              collection={userCollection}
              setUserCollection={setUserCollection}
              selectedCollection={selectedCollection}
            />
          ) : null}
        </Box>
      </Container>
    </div>
  );
};

export default Boxsets;
