import React from "react";
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

const useStyles = createUseStyles(() => ({
  smallerTable: {
    paddingLeft: "0px",
    paddingRight: "0px",
  },
}));

const CollectionTable: React.FC<CollectionTableProps> = ({
  playerCollection,
  setPlayerCollection,
}) => {
  const classes = useStyles();

  const manaSymbols = (manaCost: string) => {
    const removeBrace = manaCost.replace(/[{]/g, "");
    const result = removeBrace.split("}").filter(Boolean);

    const symbols = result.map((symbol, index) => (
      <i
        className={`ms ms-${symbol.toLowerCase()} ms-cost`}
        key={symbol + index}
      />
    ));

    return symbols;
  };

  // const checkDisabled = () => {
  //   if (!card.has_non_foil && !card.has_foil) {
  //     return false;
  //   } else if (card.has_non_foil) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  return (
    <Table size={"sm"}>
      <Thead>
        <Tr>
          <Th className={classes.smallerTable}>#</Th>
          <Th>Name</Th>
          <Th>Has Foil</Th>
          <Th>Border</Th>
          <Th>Type</Th>
          <Th>Mana</Th>
          {playerCollection ? <Th>Normal</Th> : null}
          {playerCollection ? <Th>Foil</Th> : null}
          {playerCollection ? <Th>Owned</Th> : null}
        </Tr>
      </Thead>
      <Tbody>
        {playerCollection.map((card: PlayerCollectionType) => (
          <Tr key={card.id}>
            <Td className={classes.smallerTable}>
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
                    <Text fontWeight="medium">{card.magic_card.name}</Text>
                  </Box>
                </HStack>
              </Tooltip>
            </Td>
            <Td>
              <Badge
                size="sm"
                colorScheme={card.magic_card.has_foil ? "green" : "red"}
              >
                foil
              </Badge>
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
            {playerCollection ? (
              <CollectionQuantityInput
                disabled={
                  (!card.magic_card.has_non_foil &&
                    !card.magic_card.has_foil) ||
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
            ) : null}
            {playerCollection ? (
              <CollectionQuantityInput
                disabled={!card.magic_card.has_foil}
                collectionId={card.collection_id}
                cardQuantity={card.foil_quantity || 0}
                cardId={card.magic_card_id}
                playerCollection={playerCollection}
                setPlayerCollection={setPlayerCollection}
                foil
              />
            ) : null}
            {playerCollection ? (
              <Td>
                <Badge
                  size="sm"
                  colorScheme={
                    card.quantity > 0 || card.foil_quantity > 0
                      ? "green"
                      : "red"
                  }
                >
                  {card.quantity + card.foil_quantity}
                </Badge>
              </Td>
            ) : null}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default React.memo(CollectionTable);
