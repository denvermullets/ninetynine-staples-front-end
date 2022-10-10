import React, { useContext, useEffect, useRef, useState } from "react";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Td,
} from "@chakra-ui/react";
import "keyrune";
import "mana-font";
import { CollectionQuantityProps, PlayerCollectionType } from "../../types";
import axios from "axios";
import config from "../../config";
import { PlayerContext } from "../providers/CurrentPlayerProvider";

const CollectionQuantityInput: React.FC<CollectionQuantityProps> = ({
  collectionId,
  cardId,
  cardQuantity,
  playerCollection,
  setPlayerCollection,
  foil,
  disabled,
}) => {
  const [quantity, setQuantity] = useState<number>(cardQuantity || 0);
  const timeout = useRef<null | ReturnType<typeof setTimeout>>();
  const { currentPlayer } = useContext(PlayerContext);

  useEffect(() => {
    console.log("updating quantity?", quantity);
    setQuantity(cardQuantity);
  }, [cardQuantity]);

  const findCardInCollection = (newCard: PlayerCollectionType) => {
    return playerCollection.filter(
      (existingCard) => existingCard.id === newCard.id
    );
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
              collection_id: collectionId,
              magic_card_id: cardId,
              ...(foil && { foil_quantity: value }),
              ...(!foil && { quantity: value }),
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
            setPlayerCollection([...playerCollection, createCard.data]);
          } else {
            const newCollection = playerCollection.map((collectionCard) => {
              if (foil) {
                return collectionCard.id === createCard.data.id
                  ? { ...collectionCard, foil_quantity: value }
                  : collectionCard;
              } else {
                return collectionCard.id === createCard.data.id
                  ? { ...collectionCard, quantity: value }
                  : collectionCard;
              }
            });

            setPlayerCollection([...newCollection]);
          }
          console.log("we upated the db", createCard.data);
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
        isDisabled={disabled}
        key={`card-quantity-${foil ? "foil-" : null}${collectionId}`}
        value={quantity}
        min={0}
        maxWidth={20}
        onChange={(value) => handleQuantityChange(Number(value))}
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

export default CollectionQuantityInput;
