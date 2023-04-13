import React, { useContext } from "react";
import { Badge, Box, HStack, Image, Td, Text, Tooltip, Tr } from "@chakra-ui/react";
import CollectionQuantityInput from "./CollectionQuantityInput";
import { currencyFormat } from "../../util/helpers";
import ManaSymbols from "./ManaSymbols";
import { PlayerContext } from "../providers/CurrentPlayerProvider";
import { useParams } from "react-router-dom";
import { PlayerCollectionType } from "../../types";

type CollectionTableRowProps = {
  card: PlayerCollectionType;
  playerCollection: PlayerCollectionType[];
  setPlayerCollection: (playerCollection: PlayerCollectionType[]) => void;
};

const CollectionTableRow: React.FC<CollectionTableRowProps> = ({
  card,
  playerCollection,
  setPlayerCollection,
}) => {
  const { username } = useParams();
  const { currentPlayer } = useContext(PlayerContext);
  const playerLoggedIn = playerCollection && currentPlayer && currentPlayer.username === username;

  return (
    <Tr key={card.id}>
      <Td paddingRight={0} isNumeric>
        {card.magic_card.card_number}
      </Td>
      <Td>
        <Tooltip label={<Image src={card.magic_card.image_medium} />}>
          <HStack spacing="3">
            <i
              className={`ss ss-${card.magic_card.boxset.code.toLowerCase()} ss-${
                card.magic_card.rarity
              } ss-2x`}
            />
            <Box>
              <Text fontWeight="medium">
                {card.magic_card.face_name ? card.magic_card.face_name : card.magic_card.name}
              </Text>
            </Box>
          </HStack>
        </Tooltip>
      </Td>
      <Td>
        <Badge
          size="sm"
          colorScheme={
            card.magic_card.border_color === "borderless" ? "green" : card.magic_card.border_color
          }
        >
          {card.magic_card.border_color}
        </Badge>
      </Td>
      <Td>
        <Text color="muted">{card.magic_card.card_type}</Text>
      </Td>
      <Td>
        <Text color="muted">
          {card?.magic_card?.mana_cost && <ManaSymbols manaCost={card.magic_card.mana_cost} />}
        </Text>
      </Td>
      {playerLoggedIn && card.magic_card.card_side !== "b" ? (
        <CollectionQuantityInput
          disabled={
            (!card.magic_card.has_non_foil && !card.magic_card.has_foil) ||
            card.magic_card.has_non_foil
              ? false
              : true
          }
          collectionId={card.collection_id}
          cardQuantity={card.quantity || 0}
          cardId={card.magic_card_id}
          playerCollection={playerCollection}
          setPlayerCollection={setPlayerCollection}
        />
      ) : (
        <Td textAlign="center">
          <Badge size="sm" colorScheme={card.quantity > 0 ? "green" : "red"}>
            {card.quantity}
          </Badge>
        </Td>
      )}
      {playerLoggedIn && card.magic_card.card_side !== "b" ? (
        <CollectionQuantityInput
          disabled={!card.magic_card.has_foil}
          collectionId={card.collection_id}
          cardQuantity={card.foil_quantity || 0}
          cardId={card.magic_card_id}
          playerCollection={playerCollection}
          setPlayerCollection={setPlayerCollection}
          foil
        />
      ) : (
        <Td textAlign="center">
          <Badge size="sm" colorScheme={card.foil_quantity > 0 ? "green" : "red"}>
            {card.foil_quantity}
          </Badge>
        </Td>
      )}
      <Td isNumeric>
        <Badge
          size="sm"
          colorScheme={card.quantity > 0 || card.foil_quantity > 0 ? "green" : "red"}
        >
          {card.quantity + card.foil_quantity}
        </Badge>
      </Td>
      <Td isNumeric>
        {card.quantity > 0 ? (
          currencyFormat(Number(card.magic_card.normal_price ? card.magic_card.normal_price : 0))
        ) : (
          <Text color="gray">
            {currencyFormat(
              Number(card.magic_card.normal_price ? card.magic_card.normal_price : 0)
            )}
          </Text>
        )}
      </Td>
      <Td isNumeric>
        {card.foil_quantity > 0 ? (
          currencyFormat(Number(card.magic_card.foil_price ? card.magic_card.foil_price : 0))
        ) : (
          <Text color="gray">
            {currencyFormat(Number(card.magic_card.foil_price ? card.magic_card.foil_price : 0))}
          </Text>
        )}
      </Td>
      <Td isNumeric>
        {currencyFormat(
          card.quantity * Number(card.magic_card.normal_price) +
            card.foil_quantity * Number(card.magic_card.foil_price)
        )}
      </Td>
    </Tr>
  );
};

export default CollectionTableRow;
