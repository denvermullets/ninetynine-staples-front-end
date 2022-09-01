import axios from "axios";
import { Select } from "chakra-react-select";
import React, { useEffect, useState } from "react";
import CardList from "../../components/CardList";
import config from "../../config";
import { Boxset, MagicCardType, SelectedCollectionOption } from "../../types";

const Boxsets: React.FC = () => {
  const [cards, setCards] = useState<MagicCardType[]>([]);
  const [boxsetOptions, setBoxsetOptions] = useState([]);
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
      <Select options={boxsetOptions} onChange={handleBoxsetChange} />
      <span>{cards && cards.length ? cards.length : 0}</span>

      <Select
        options={userCollectionsOptions}
        onChange={(e) => setSelectedCollection(e)}
        key="userCollection-select"
        name="user-collection-select"
      />

      {cards && cards.length ? (
        <CardList
          cards={cards}
          setCode={currentBox.code.toLowerCase()}
          set={currentBox.name}
          collection={userCollection}
          setUserCollection={setUserCollection}
        />
      ) : null}
    </div>
  );
};

export default Boxsets;
