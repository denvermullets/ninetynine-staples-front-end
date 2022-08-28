import axios from "axios";
import { Select } from "chakra-react-select";
import React, { useEffect, useState } from "react";
import CardList from "../../components/CardList";
import MagicCard from "../../components/MagicCard";
import config from "../../config";
import { Boxset, MagicCardType } from "../../types";

const Boxsets: React.FC = () => {
  const [cards, setCards] = useState<MagicCardType[]>([]);
  const [options, setOptions] = useState([]);
  const [currentBox, setCurrentBox] = useState<Boxset>();

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

        setOptions(selectOptions);
      }
    } catch (error) {
      throw new Error("Could not load boxset!");
    }
  };

  const handleSelectChange = async (e) => {
    console.log(e);
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
    if (!options.length) {
      console.log("useEffect hit");
      loadBoxsets();
    }
  }, []);
  return (
    <div style={{ height: "100%" }}>
      <Select options={options} onChange={handleSelectChange} />
      <span>{cards && cards.length ? cards.length : 0}</span>
      {cards && cards.length ? (
        <CardList
          cards={cards}
          setCode={currentBox.code.toLowerCase()}
          set={currentBox.name}
        />
      ) : null}
      {/* {cards && cards.length
        ? cards.map((card) => {
            return (
              <MagicCard
                key={`${card.name}-${card.id}`}
                id={card.id}
                name={card.name}
                image_small={card.image_small}
                image_medium={card.image_medium}
              />
            );
          })
        : null} */}
    </div>
  );
};

export default Boxsets;
