import axios from "axios";
import React, { useEffect, useState } from "react";
import MagicCard from "../../components/MagicCard";
import config from "../../config";

const LandingPage: React.FC = () => {
  const [cards, setCards] = useState([]);

  const loadCards = async () => {
    try {
      const magicCollection = await axios.get(
        `${config.API_URL}/collection/1/cards`
      );

      if (magicCollection) {
        setCards(magicCollection.data);
      }
    } catch (error) {
      throw new Error("Could not load your collection!");
    }
  };

  useEffect(() => {
    if (!cards.length) {
      loadCards();
    }
  }, []);
  return (
    <div style={{ height: "100%" }}>
      {cards && cards.length
        ? cards.map((card) => {
            return (
              <MagicCard
                key={`${card.magic_card.name}-${card.id}`}
                id={card.id}
                name={card.magic_card.name}
                image_small={card.magic_card.image_small}
                image_medium={card.magic_card.image_medium}
              />
            );
          })
        : null}
    </div>
  );
};

export default LandingPage;
