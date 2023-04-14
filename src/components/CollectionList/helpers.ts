import { mode } from "@chakra-ui/theme-tools";
import { StylesConfig } from "chakra-react-select";

export const cardRarity = [
  { value: "mythic", label: "Mythic" },
  { value: "rare", label: "Rare" },
  { value: "uncommon", label: "Uncommon" },
  { value: "common", label: "Common" },
];

export const cardColor = [
  { value: "W", label: "White", colorScheme: "white" },
  { value: "U", label: "Blue", colorScheme: "blue" },
  { value: "R", label: "Red", colorScheme: "red" },
  { value: "B", label: "Black", colorScheme: "gray" },
  { value: "G", label: "Green", colorScheme: "green" },
];

export const groupedOptions = [
  {
    label: "Rarity",
    options: cardRarity,
  },
  {
    label: "Color",
    options: cardColor,
  },
];

export const selectBoxStyles = (colorMode: "light" | "dark"): StylesConfig => ({
  control: (provided, { theme }) => ({
    ...provided,
    borderRadius: "16px",
    color: mode("cyan.600", "darkGray.200")(theme),
    background: mode("white", "darkGray.800")({ colorMode }),
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "30px",
    background: mode("white", "darkGray.500")({ colorMode }),
  }),
  placeholder: (provided, { theme }) => ({
    ...provided,
    color: mode("cyan.600", "darkGray.200")(theme),
  }),
});
