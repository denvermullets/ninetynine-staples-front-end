import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Td,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import "keyrune";
import "mana-font";
import { PlayerCollectionType, QuantityInputProps } from "../../types";
import axios from "axios";
import config from "../../config";
import { PlayerContext } from "../providers/CurrentPlayerProvider";

const FoilQuantityInput: React.FC<QuantityInputProps> = ({
  card,
  cardQuantity,
  collection,
  setUserCollection,
  selectedCollection,
}) => {
  const [quantity, setQuantity] = useState<number>(cardQuantity || 0);
  const timeout = useRef<null | ReturnType<typeof setTimeout>>();
  const { currentPlayer } = useContext(PlayerContext);

  useEffect(() => {
    setQuantity(cardQuantity);
  }, [cardQuantity]);

  const findCardInCollection = (newCard: PlayerCollectionType) => {
    return collection.filter((card) => card.id === newCard.id);
  };

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
    clearTimeout(timeout.current);

    timeout.current = setTimeout(async () => {
      try {
        const createCard = await axios.post(
          `${config.API_URL}/collection_magic_cards`,
          {
            collection_magic_card: {
              collection_id: selectedCollection.value,
              magic_card_id: card.id,
              foil_quantity: value,
              condition: "Mint",
              notes: "",
            },
          },
          {
            headers: { Authorization: `Bearer ${currentPlayer.token}` },
          }
        );

        if (createCard.status === 204) {
          // TODO: we need to really simplify the state of things across the app
          // card was deleted from collection
          const existingCollection = [...collection];
          const trimmedCards = existingCollection.filter(
            (existingCard) => Number(existingCard.magic_card_id) !== Number(card.id)
          );

          setUserCollection(trimmedCards);
          return;
        } else if (createCard) {
          if (!findCardInCollection(createCard.data).length) {
            setUserCollection([...collection, createCard.data]);
          } else {
            const newCollection = collection.map((collectionCard) =>
              collectionCard.id === createCard.data.id
                ? { ...collectionCard, foil_quantity: value }
                : collectionCard
            );

            setUserCollection([...newCollection]);
          }
        }
      } catch (error) {
        throw new Error("unable to update collection!");
      }
    }, 500);
  };

  const handleFocus = (event) => event.target.select();

  return (
    <Td>
      <NumberInput
        isDisabled={!card.has_foil}
        key={`card-foil-quantity-${card.id}`}
        value={quantity}
        min={0}
        maxWidth={20}
        onChange={(value) => handleQuantityChange(Number(value))}
        name={`card-quantity-${card.id}`}
        clampValueOnBlur={false}
        onFocus={handleFocus}
        variant="collection"
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Td>
  );
};

export default FoilQuantityInput;
