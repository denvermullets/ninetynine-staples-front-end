import { ReactNode } from "react";

export interface AppContainerProps {
  children: ReactNode;
}

export interface Boxset {
  id: string | number;
  code: string;
  name: string;
  release_date: string;
  base_set_size: number;
  total_set_size: number;
  set_type: string;
  created_at: Date;
  updated_at: Date;
}

export interface MagicCardType {
  id: string | number;
  boxset_id: number;
  name: string;
  text: string;
  original_text: string;
  power: string;
  toughness: string;
  rarity: string;
  card_type: string;
  original_type: string;
  edhrec_rank: number;
  has_foil: boolean;
  has_non_foil: boolean;
  border_color: string;
  converted_mana_cost: string;
  flavor_text: string;
  frame_version: string;
  is_reprint: boolean;
  card_number: string;
  // identifiers: object;
  card_uuid: string;
  image_large: string;
  image_medium: string;
  image_small: string;
  mana_value: string;
  mana_cost: string;
  face_name: string;
  card_side: string;
  created_at: string;
  updated_at: string;
  magic_card_color_idents: MagicCardColorIdents[];
}

interface MagicCardColorIdents {
  color: MagicCardColor;
}

interface MagicCardColor {
  name: string;
}

export interface CardListProps {
  cards: MagicCardType[];
  setCode: string;
  set: string;
  collection: PlayerCollectionType[];
  setUserCollection: (userCollection: PlayerCollectionType[]) => void;
  selectedCollection: SelectedCollectionOption;
}

export interface CardTableProps {
  cards: MagicCardType[];
  setCode: string;
  collection: PlayerCollectionType[];
  setUserCollection: (userCollection: PlayerCollectionType[]) => void;
  selectedCollection: SelectedCollectionOption;
}

export interface CardTableNameProps {
  card: MagicCardType;
  setCode: string;
}

export interface SelectedCollectionOption {
  value: number;
  label: string;
}

export interface PlayerCollectionType {
  id: number;
  quantity: number;
  foil_quantity: number;
  collection_id: number;
  magic_card_id: number;
  condition: string;
  notes: string;
  created_at: string;
  updated_at: string;
  magic_card: MagicCardType;
}

export interface QuantityInputProps {
  card: MagicCardType;
  cardQuantity: number;
  collection: PlayerCollectionType[];
  setUserCollection: (userCollection: PlayerCollectionType[]) => void;
  selectedCollection: SelectedCollectionOption;
}

export interface FilterOptions {
  value: string;
  label: string;
  color: string;
}

export interface CollectionQuantity {
  normal: number;
  foil: number;
}

export interface SearchProps {
  search: string;
  setSearch: (search: string) => void;
}
