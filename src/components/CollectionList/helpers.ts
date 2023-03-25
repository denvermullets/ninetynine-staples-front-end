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
