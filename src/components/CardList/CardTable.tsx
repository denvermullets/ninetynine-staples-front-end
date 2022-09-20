import {
  Badge,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { CardTableProps, CollectionQuantity, MagicCardType } from "../../types";
import "keyrune";
import "mana-font";
import QuantityInput from "./QuantityInput";
import CardTableName from "./CardTableName";
import { createUseStyles } from "react-jss";
import FoilQuantityInput from "./FoilQuantityInput";

const useStyles = createUseStyles(() => ({
  smallerTable: {
    paddingLeft: "0px",
    paddingRight: "0px",
  },
}));

const CardTable: React.FC<CardTableProps> = ({
  cards,
  setCode,
  collection,
  setUserCollection,
  selectedCollection,
}) => {
  const classes = useStyles();
  const findMatch = (card: MagicCardType): CollectionQuantity => {
    const result = collection.find(
      (collectionCard) => collectionCard.magic_card.id === card.id
    );

    if (result) {
      return {
        normal: result.quantity,
        foil: result.foil_quantity,
      };
    } else {
      return {
        normal: 0,
        foil: 0,
      };
    }
  };

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

  return (
    <Table size={"sm"}>
      <Thead>
        <Tr>
          <Th className={classes.smallerTable}>#</Th>
          <Th>
            <HStack spacing="3">
              <i className={`ss ss-${setCode} ss-mythic ss-2x`} />
              <HStack spacing="1">
                <Text>Name</Text>
              </HStack>
            </HStack>
          </Th>
          <Th>Foil</Th>
          <Th>Type</Th>
          <Th>Mana</Th>
          {collection && selectedCollection ? <Th>Normal</Th> : null}
          {collection && selectedCollection ? <Th>Foil</Th> : null}
          {collection && selectedCollection ? <Th>Owned</Th> : null}
        </Tr>
      </Thead>
      <Tbody>
        {cards.map((card: MagicCardType) => (
          <Tr key={card.id}>
            <Td className={classes.smallerTable}>{card.card_number}</Td>
            <CardTableName card={card} setCode={setCode} />
            <Td>
              <Badge size="sm" colorScheme={card.has_foil ? "green" : "red"}>
                foil
              </Badge>
            </Td>
            <Td>
              <Text color="muted">{card.card_type}</Text>
            </Td>
            <Td>
              <Text color="muted">
                {card && card.mana_cost ? manaSymbols(card.mana_cost) : null}
              </Text>
            </Td>
            {collection && selectedCollection ? (
              <QuantityInput
                card={card}
                cardQuantity={Number(findMatch(card).normal) || 0}
                collection={collection}
                setUserCollection={setUserCollection}
                selectedCollection={selectedCollection}
              />
            ) : null}
            {collection && selectedCollection ? (
              <FoilQuantityInput
                card={card}
                cardQuantity={Number(findMatch(card).foil) || 0}
                collection={collection}
                setUserCollection={setUserCollection}
                selectedCollection={selectedCollection}
              />
            ) : null}

            {collection && selectedCollection ? (
              <Td>
                <Badge
                  size="sm"
                  colorScheme={
                    findMatch(card).normal > 0 || findMatch(card).foil > 0
                      ? "green"
                      : "red"
                  }
                >
                  {findMatch(card).normal + findMatch(card).foil}
                </Badge>
              </Td>
            ) : null}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default CardTable;
