import axios from "axios";
import React, { useState, createContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import config from "../../config";
import { CollectionType } from "../../types";

export interface PropsType {
  children: React.ReactNode;
  currentPlayer: CurrentPlayer;
}

export interface CurrentPlayer {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  username: string;
  token: string;
  defaultCollection: CollectionType;
}

export interface CurrentPlayerContext {
  currentPlayer: CurrentPlayer;
  setCurrentPlayer: (currentPlayer: CurrentPlayer) => void;
}

export const PlayerContext = createContext(null);

export const CurrentPlayerProvider = ({ children }) => {
  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayer>();
  const [cookies] = useCookies(["ninetynine_staples"]);

  const loadCollections = async () => {
    const collections = await axios(
      `${config.API_URL}/collections/${cookies.ninetynine_staples.username}`
    );

    if (collections) {
      setCurrentPlayer({
        email: cookies.ninetynine_staples.email,
        created_at: cookies.ninetynine_staples.created_at,
        updated_at: cookies.ninetynine_staples.updated_at,
        id: cookies.ninetynine_staples.id,
        username: cookies.ninetynine_staples.username,
        token: cookies.ninetynine_staples.token,
        defaultCollection: collections.data.collections[0],
      });
    }
  };

  useEffect(() => {
    if (cookies?.ninetynine_staples) {
      loadCollections();
    }
  }, [cookies]);

  return (
    <PlayerContext.Provider value={{ currentPlayer, setCurrentPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};
