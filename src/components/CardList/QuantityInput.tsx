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

const QuantityInput: React.FC<QuantityInputProps> = ({
  card,
  cardQuantity,
  collection,
  setUserCollection,
}) => {
  const [quantity, setQuantity] = useState<number>();
  const timeout = useRef<null | ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setQuantity(cardQuantity);
  }, [cardQuantity]);

  const findCardInCollection = (newCard: PlayerCollectionType) => {
    return collection.filter((card) => card.id === newCard.id);
  };

  const handleQuantityChange = (value: number) => {
    clearTimeout(timeout.current);
    setQuantity(value);

    timeout.current = setTimeout(async () => {
      try {
        const createCard = await axios.post(
          `${config.API_URL}/collection_magic_cards`,
          {
            collection_magic_card: {
              collection_id: 1,
              magic_card_id: card.id,
              quantity: value,
              condition: "Mint",
              notes: "",
            },
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
        }
      } catch (error) {
        throw new Error("unable to update collection!");
      }
    }, 1000);
  };

  const handleFocus = (event) => event.target.select();

  return (
    <Td>
      <NumberInput
        key={`card-quantity-${card.id}`}
        defaultValue={cardQuantity}
        min={0}
        maxWidth={20}
        onChange={(value) => handleQuantityChange(Number(value))}
        name={`card-quantity-${card.id}`}
        onFocus={handleFocus}
      >
        <NumberInputField value={quantity} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Td>
  );
};

export default QuantityInput;
