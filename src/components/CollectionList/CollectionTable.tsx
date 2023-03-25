import React, { useContext } from "react";
import {
  Badge,
  Box,
  HStack,
  Image,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { CollectionTableProps, PlayerCollectionType } from "../../types";
import "keyrune";
import "mana-font";
import { createUseStyles } from "react-jss";
import CollectionQuantityInput from "./CollectionQuantityInput";
import { PlayerContext } from "../providers/CurrentPlayerProvider";
import { useParams } from "react-router-dom";
import { currencyFormat } from "../../util/helpers";

const useStyles = createUseStyles(() => ({
  smallerTable: {
    paddingRight: "0px",
  },
}));

const CollectionTable: React.FC<CollectionTableProps> = ({
  playerCollection,
  setPlayerCollection,
}) => {
  const classes = useStyles();
  const { username } = useParams();
  const { currentPlayer } = useContext(PlayerContext);

  const manaSymbols = (manaCost: string) => {
    const removeBrace = manaCost.replace(/[{]/g, "");
    const result = removeBrace.split("}").filter(Boolean);

    const symbols = result.map((symbol, index) => (
      <i className={`ms ms-${symbol.toLowerCase()} ms-cost`} key={symbol + index} />
    ));

    return symbols;
  };

  const playerLoggedIn = () => {
    return playerCollection && currentPlayer && currentPlayer.username === username;
  };

  return (
    <Table size={"sm"} variant="striped" colorScheme="gray">
      <Thead>
        <Tr>
          <Th className={classes.smallerTable} isNumeric>
            #
          </Th>
          <Th>Name</Th>
          <Th>Border</Th>
          <Th>Type</Th>
          <Th>Mana</Th>
          {playerCollection && <Th>Normal</Th>}
          {playerCollection && <Th>Foil</Th>}
          {playerCollection && <Th>Owned</Th>}
          <Th isNumeric>Normal</Th>
          <Th isNumeric>Foil</Th>
          <Th isNumeric>Total</Th>
        </Tr>
      </Thead>
      <Tbody>
        {playerCollection &&
          playerCollection.map((card: PlayerCollectionType) => (
            <Tr key={card.id}>
              <Td className={classes.smallerTable} isNumeric>
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
                        {card.magic_card.face_name
                          ? card.magic_card.face_name
                          : card.magic_card.name}
                      </Text>
                    </Box>
                  </HStack>
                </Tooltip>
              </Td>
              <Td>
                <Badge
                  size="sm"
                  colorScheme={
                    card.magic_card.border_color === "borderless"
                      ? "green"
                      : card.magic_card.border_color
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
                  {card && card.magic_card.mana_cost
                    ? manaSymbols(card.magic_card.mana_cost)
                    : null}
                </Text>
              </Td>
              {playerLoggedIn() && card.magic_card.card_side !== "b" ? (
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
              {playerLoggedIn() && card.magic_card.card_side !== "b" ? (
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
                  currencyFormat(
                    Number(card.magic_card.normal_price ? card.magic_card.normal_price : 0)
                  )
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
                  currencyFormat(
                    Number(card.magic_card.foil_price ? card.magic_card.foil_price : 0)
                  )
                ) : (
                  <Text color="gray">
                    {currencyFormat(
                      Number(card.magic_card.foil_price ? card.magic_card.foil_price : 0)
                    )}
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
          ))}
      </Tbody>
    </Table>
  );
};

export default React.memo(CollectionTable);
