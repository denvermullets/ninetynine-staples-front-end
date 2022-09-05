import {
  Box,
  Checkbox,
  HStack,
  Image,
  Td,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { CardTableNameProps } from "../../types";

const CardTableName: React.FC<CardTableNameProps> = ({ setCode, card }) => {
  return (
    <React.Fragment>
      <Td>
        <Tooltip label={<Image src={card.image_medium} />}>
          <HStack spacing="3">
            <Checkbox />
            <i className={`ss ss-${setCode} ss-${card.rarity} ss-2x`} />
            <Box>
              <Text fontWeight="medium">{card.name}</Text>
            </Box>
          </HStack>
        </Tooltip>
      </Td>
    </React.Fragment>
  );
};

export default CardTableName;
