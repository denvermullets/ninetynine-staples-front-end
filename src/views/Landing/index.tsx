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
import React, { useContext, useEffect, useState } from "react";
import CardList from "../../components/CardList";
import GridList from "../../components/GridList";
import { PlayerContext } from "../../components/providers/CurrentPlayerProvider";
import config from "../../config";
import { Boxset, MagicCardType, PlayerCollectionType, SelectedCollectionOption } from "../../types";

const LandingPage: React.FC = () => {
  const [boxsetOptions, setBoxsetOptions] = useState<Boxset[]>([]);
  const [userCollectionsOptions, setUserCollectionsOptions] = useState<SelectedCollectionOption[]>(
    []
  );
  const [selectedCollection, setSelectedCollection] = useState<SelectedCollectionOption>();
  const [userCollection, setUserCollection] = useState<PlayerCollectionType[]>([]);
  const [cards, setCards] = useState<MagicCardType[]>([]);
  const [gridView, setGridView] = useState<boolean>(false);
  const { currentPlayer } = useContext(PlayerContext);

  const loadBoxsets = async () => {
    // try {
    //   const boxset = await axios(`${config.API_URL}/boxsets`);
    //   if (boxset) {
    //     const selectOptions = boxset.data.map((box: Boxset) => {
    //       return {
    //         value: box.id,
    //         label: box.name,
    //       };
    //     });
    //     setBoxsetOptions(selectOptions);
    //   }
    // } catch (error) {
    //   throw new Error("Could not load boxset!");
    // }
  };

  const loadUserCollectionsOptions = async () => {
    try {
      const collections = await axios(
        `${config.API_URL}/collections?player_id=${currentPlayer.id}`,
        { headers: { Authorization: `Bearer ${currentPlayer.token}` } }
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
    // try {
    //   const loadCards = await axios(`${config.API_URL}/boxsets/${e.value}`);
    //   if (loadCards) {
    //     loadCards.data.magic_cards.sort((a: MagicCardType, b: MagicCardType) =>
    //       Number(a.card_number) > Number(b.card_number)
    //         ? 1
    //         : Number(b.card_number) > Number(a.card_number)
    //         ? -1
    //         : 0
    //     );
    //     setCards(loadCards.data.magic_cards);
    //     setCurrentBox(loadCards.data);
    //   }
    // } catch (error) {
    //   throw new Error(`Could not load cards from Boxset ${e.value}`);
    // }
  };

  useEffect(() => {
    if (!boxsetOptions.length) {
      loadBoxsets();
    }

    if (!userCollectionsOptions.length && currentPlayer) {
      // potential loop if no collection created
      loadUserCollectionsOptions();
    }
  }, [currentPlayer]);

  useEffect(() => {
    const fetchData = async () => {
      const collectionData = await axios(
        `${config.API_URL}/collection/${selectedCollection.value}/cards`
      );

      if (collectionData) {
        const collectedCards = collectionData.data.map(
          (collection: PlayerCollectionType) => collection
        );
        const magicCards = [];
        collectionData.data.map((collection: PlayerCollectionType) => {
          if (collection.quantity > 0 || collection.foil_quantity > 0) {
            magicCards.push(collection.magic_card);
          }
        });

        setUserCollection(collectedCards);
        setCards(magicCards);
      }
    };

    if (selectedCollection) {
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
      backgroundColor="white"
      boxShadow={{ base: "none", md: useColorModeValue("sm", "sm-dark") }}
      borderRadius={useBreakpointValue({ base: "none", md: "lg" })}
    >
      <Box bg="white">
        <Grid gap={6} templateColumns="repeat(4, 1fr)" padding={2}>
          <GridItem colSpan={2}>
            <Select
              isDisabled={true}
              options={boxsetOptions}
              onChange={handleBoxsetChange}
              placeholder="Select a Boxset"
            />
          </GridItem>
          <GridItem colSpan={2}>
            <Select
              options={userCollectionsOptions}
              defaultValue={userCollectionsOptions && userCollectionsOptions[0]}
              onChange={(e) => setSelectedCollection(e)}
              key="userCollection-select"
              name="user-collection-select"
              placeholder="Select your Collection"
            />
          </GridItem>
        </Grid>
        {gridView ? (
          <GridList userCollection={userCollection} gridView={gridView} setGridView={setGridView} />
        ) : (
          <CardList
            gridView={gridView}
            setGridView={setGridView}
            cards={cards}
            collection={userCollection}
            setUserCollection={setUserCollection}
            selectedCollection={selectedCollection}
          />
        )}
      </Box>
    </Container>
  );
};

export default LandingPage;
