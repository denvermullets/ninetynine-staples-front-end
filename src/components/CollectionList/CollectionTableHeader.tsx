import React from "react";
import { Th, Thead, Tr } from "@chakra-ui/react";
import { PlayerCollectionType } from "../../types";

type CollectionHeaderProps = {
  playerCollection: PlayerCollectionType[];
};

const CollectionTableHeader: React.FC<CollectionHeaderProps> = ({ playerCollection }) => (
  <Thead>
    <Tr>
      <Th paddingRight={0} isNumeric>
        #
      </Th>
      <Th>Name</Th>
      <Th>Border</Th>
      <Th>Type</Th>
      <Th>Mana</Th>
      {playerCollection?.length && <Th>Normal</Th>}
      {playerCollection?.length && <Th>Foil</Th>}
      {playerCollection?.length && <Th>Owned</Th>}
      <Th isNumeric>Normal</Th>
      <Th isNumeric>Foil</Th>
      <Th isNumeric>Total</Th>
    </Tr>
  </Thead>
);

export default CollectionTableHeader;
