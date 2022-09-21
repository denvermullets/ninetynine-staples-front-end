import React from "react";
import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";

interface MagicCardProps {
  // id: string;
  name: string;
  image_small: string;
  image_medium: string;
}

const MagicCard: React.FC<MagicCardProps> = (props) => {
  const { name, image_medium } = props;

  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      maxW="sm"
      borderWidth="1px"
      rounded="lg"
      shadow="lg"
      position="relative"
    >
      <Circle size="10px" position="absolute" top={2} right={2} bg="red.200" />
      <Image src={image_medium} alt={`Picture of ${name}`} roundedTop="lg" />
      <Box p="4">
        <Box alignItems="baseline">
          <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
            New
          </Badge>
        </Box>
        <Flex mt="1" justifyContent="space-between" alignContent="center">
          <Box fontSize="lg" fontWeight="semibold" as="h4" lineHeight="tight">
            {name}
          </Box>
        </Flex>
        {/* <Flex justifyContent="space-between" alignContent="center">
          <Box color={useColorModeValue("gray.800", "white")}>
            <Text fontSize="md">{setName}</Text>
          </Box>
        </Flex> */}
      </Box>
    </Box>
  );
};

export default MagicCard;
