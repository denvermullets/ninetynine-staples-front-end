import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { Select } from "chakra-react-select";
import React, { useContext, useEffect, useState } from "react";
import MagicCard from "../../components/MagicCard";
import { PlayerContext } from "../../components/providers/CurrentPlayerProvider";
import config from "../../config";
import {
  Boxset,
  // MagicCardType,
  PlayerCollectionType,
  SelectedCollectionOption,
} from "../../types";

const LandingPage: React.FC = () => {
  // const [cards, setCards] = useState<MagicCardType[]>([]);
  const [boxsetOptions, setBoxsetOptions] = useState<Boxset[]>([]);
  const [userCollectionsOptions, setUserCollectionsOptions] = useState<
    SelectedCollectionOption[]
  >([]);
  const [selectedCollection, setSelectedCollection] =
    useState<SelectedCollectionOption>();
  const [userCollection, setUserCollection] = useState<PlayerCollectionType[]>(
    []
  );
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
    console.log(e);
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
      console.log("load collection options?");
      // potential loop if no collection created
      loadUserCollectionsOptions();
    }
  }, [currentPlayer]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios(
        `${config.API_URL}/collection/${selectedCollection.value}/cards`
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
      {currentPlayer ? (
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
                defaultValue={
                  userCollectionsOptions && userCollectionsOptions[0]
                }
                onChange={(e) => setSelectedCollection(e)}
                key="userCollection-select"
                name="user-collection-select"
                placeholder="Select your Collection"
              />
            </GridItem>
          </Grid>
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
      ) : (
        <Container>
          <Stack spacing="1">
            <Heading
              size={useBreakpointValue({ base: "xs", md: "xl" })}
              as="h1"
            >
              Please login to see your collection
            </Heading>
            <Text color="muted">
              Once you are logged in your collection options will display here
            </Text>
          </Stack>
        </Container>
      )}
    </Container>
  );
};

export default LandingPage;
