import React from "react";
import { Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import { PlayerCollectionType } from "../../types";

type CollectionHeaderProps = {
  playerCollection: PlayerCollectionType[];
};

const CollectionTableHeader: React.FC<CollectionHeaderProps> = ({ playerCollection }) => {
  // opting to use Chakra's built in breakpoints instead of defining values all over the place
  const isMobile = useBreakpointValue({ base: true, sm: true, md: false, lg: false });

  return (
    <Thead position="sticky">
      <Tr>
        <Th paddingRight={0} isNumeric>
          #
        </Th>
        <Th>Name</Th>
        {!isMobile && <Th>Border</Th>}
        {!isMobile && <Th>Type</Th>}
        {!isMobile && <Th>Mana</Th>}
        {playerCollection?.length ? <Th minWidth={100}>Normal</Th> : null}
        {playerCollection?.length ? <Th minWidth={100}>Foil</Th> : null}
        {playerCollection?.length ? <Th>Owned</Th> : null}
        <Th isNumeric>Normal</Th>
        <Th isNumeric>Foil</Th>
        <Th isNumeric>Total</Th>
      </Tr>
    </Thead>
  );
};

export default CollectionTableHeader;
