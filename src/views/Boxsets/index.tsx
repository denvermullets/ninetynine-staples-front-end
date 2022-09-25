import {
  Box,
  Container,
  Grid,
  GridItem,
  HStack,
  Spinner,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { Select } from "chakra-react-select";
import React, { useContext, useEffect, useState } from "react";
import CardList from "../../components/CardList";
import { PlayerContext } from "../../components/providers/CurrentPlayerProvider";
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
  const [loading, setLoading] = useState<boolean>(false);
  const [gridView, setGridView] = useState<boolean>(false);
  const { currentPlayer } = useContext(PlayerContext);

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
        `${config.API_URL}/collections?player_id=${currentPlayer.id}`,
        { headers: { Authorization: `Bearer ${currentPlayer.token}` } }
      );

      console.log("this is the collection options?", collections);
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
    setLoading(true);
    setCards([]);
    try {
      const loadCards = await axios(`${config.API_URL}/boxsets/${e.value}`);

      if (loadCards) {
        loadCards.data.magic_cards.sort((a: MagicCardType, b: MagicCardType) =>
          Number(a.card_number) > Number(b.card_number)
            ? 1
            : Number(b.card_number) > Number(a.card_number)
            ? -1
            : 0
        );

        setCards(loadCards.data.magic_cards);
        setCurrentBox(loadCards.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      throw new Error(`Could not load cards from Boxset ${e.value}`);
    }
  };

  useEffect(() => {
    if (!boxsetOptions.length) {
      loadBoxsets();
    }
    if (!userCollectionsOptions.length && currentPlayer) {
      console.log("load collection options?");
      // potential loop if no collection created
      loadUserCollectionsOptions();
    }
  }, [currentPlayer]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios(
        `${config.API_URL}/collection/${selectedCollection.value}/cards?boxset=${currentBox.id}`
      );

      if (data) {
        const collectedCards = data.data.map((collection) => collection);
        console.log("updating collection", collectedCards);
        setUserCollection(collectedCards);
      }
    };

    if (selectedCollection) {
      console.log("collection pulled");
      fetchData();
    }
  }, [selectedCollection]);

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
      <Box bg="white">
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
        {loading ? (
          <HStack justifyContent="center" margin={20}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </HStack>
        ) : null}
        {cards && cards.length ? (
          <CardList
            setGridView={setGridView}
            gridView={gridView}
            cards={cards}
            collection={userCollection}
            setUserCollection={setUserCollection}
            selectedCollection={selectedCollection}
          />
        ) : null}
      </Box>
    </Container>
  );
};

export default Boxsets;
