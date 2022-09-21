import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Td,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import "keyrune";
import "mana-font";
import { PlayerCollectionType, QuantityInputProps } from "../../types";
import axios from "axios";
import config from "../../config";
import { useCurrentPlayerContext } from "../providers/CurrentPlayerProvider";

const QuantityInput: React.FC<QuantityInputProps> = ({
  card,
  cardQuantity,
  collection,
  setUserCollection,
  selectedCollection,
}) => {
  const [quantity, setQuantity] = useState<number>(cardQuantity || 0);
  const timeout = useRef<null | ReturnType<typeof setTimeout>>();
  const { currentPlayer } = useCurrentPlayerContext();

  useEffect(() => {
    console.log("updating quantity?", quantity);
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
              quantity: value,
              condition: "Mint",
              notes: "",
            },
          },
          {
            headers: { Authorization: `Bearer ${currentPlayer.token}` },
          }
        );

        if (createCard) {
          if (!findCardInCollection(createCard.data).length) {
            setUserCollection([...collection, createCard.data]);
          } else {
            const newCollection = collection.map((collectionCard) =>
              collectionCard.id === createCard.data.id
                ? { ...collectionCard, quantity: value }
                : collectionCard
            );

            setUserCollection([...newCollection]);
          }
          console.log("we upated the db", createCard.data);
        }
      } catch (error) {
        throw new Error("unable to update collection!");
      }
    }, 500);
  };

  const checkDisabled = () => {
    if (!card.has_non_foil && !card.has_foil) {
      return false;
    } else if (card.has_non_foil) {
      return false;
    } else {
      return true;
    }
  };

  const handleFocus = (event) => event.target.select();

  return (
    <Td>
      <NumberInput
        isDisabled={checkDisabled()}
        key={`card-quantity-${card.id}`}
        value={quantity}
        min={0}
        maxWidth={20}
        onChange={(value) => handleQuantityChange(Number(value))}
        name={`card-quantity-${card.id}`}
        clampValueOnBlur={false}
        onFocus={handleFocus}
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

export default QuantityInput;
