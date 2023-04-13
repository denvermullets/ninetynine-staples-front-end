import React from "react";
import { Table, Tbody } from "@chakra-ui/react";
import { CollectionTableProps, PlayerCollectionType } from "../../types";
import "keyrune";
import "mana-font";
import CollectionTableHeader from "./CollectionTableHeader";
import CollectionTableRow from "./CollectionTableRow";

const CollectionTable: React.FC<CollectionTableProps> = ({
  playerCollection,
  setPlayerCollection,
}) => {
  return (
    <Table
      size={"sm"}
      // variant="striped"
      // colorScheme="gray"
    >
      <CollectionTableHeader playerCollection={playerCollection} />
      <Tbody>
        {playerCollection &&
          playerCollection.map((card: PlayerCollectionType, index: number) => (
            <CollectionTableRow
              key={index}
              playerCollection={playerCollection}
              setPlayerCollection={setPlayerCollection}
              card={card}
            />
          ))}
      </Tbody>
    </Table>
  );
};

export default React.memo(CollectionTable);
