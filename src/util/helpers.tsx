import { MagicCardType } from "../types";

export const formatPrice = (card: MagicCardType) => {
  if (card.normal_price && card.foil_price) {
    return `$${card.normal_price} // $${card.foil_price}`;
  } else if (!card.normal_price && card.foil_price) {
    return `$${card.foil_price}`;
  } else if (card.normal_price && !card.foil_price) {
    return `$${card.normal_price}`;
  }
};

export const currencyFormat = (amount: number) => {
  return "$" + amount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
