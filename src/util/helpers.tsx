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
