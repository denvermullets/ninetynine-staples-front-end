import {
  Badge,
  Checkbox,
  HStack,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { IoArrowDown } from "react-icons/io5";
import { CardTableProps, MagicCardType } from "../../types";
import "keyrune";
import "mana-font";
import QuantityInput from "./QuantityInput";
import CardTableName from "./CardTableName";

const CardTable: React.FC<CardTableProps> = ({
  cards,
  setCode,
  collection,
  setUserCollection,
  selectedCollection,
}) => {
  const findMatch = (card: MagicCardType) => {
    const result = collection.find(
      (collectionCard) => collectionCard.magic_card.id === card.id
    );

    if (result) {
      return result.quantity;
    } else {
      return 0;
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
    <Table>
      <Thead>
        <Tr>
          <Th>
            <HStack spacing="3">
              <Checkbox />
              <HStack spacing="1">
                <Text>Name</Text>
                <Icon as={IoArrowDown} color="muted" boxSize="4" />
              </HStack>
            </HStack>
          </Th>
          <Th>Foil</Th>
          <Th>Type</Th>
          <Th>Mana</Th>
          {collection && selectedCollection ? <Th>Quantity</Th> : null}
          {collection && selectedCollection ? <Th>Owned</Th> : null}
        </Tr>
      </Thead>
      <Tbody>
        {cards.map((card: MagicCardType) => (
          <Tr key={card.id}>
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
                cardQuantity={Number(findMatch(card)) || 0}
                collection={collection}
                setUserCollection={setUserCollection}
                selectedCollection={selectedCollection}
              />
            ) : null}

            {collection && selectedCollection ? (
              <Td>
                <Badge
                  size="sm"
                  colorScheme={findMatch(card) ? "green" : "red"}
                >
                  {findMatch(card)}
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
