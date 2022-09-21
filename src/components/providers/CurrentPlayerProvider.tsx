import React, { useState, createContext, useEffect } from "react";
import { useCookies } from "react-cookie";

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
}

export interface CurrentPlayerContext {
  currentPlayer: CurrentPlayer;
  setCurrentPlayer: (currentPlayer: CurrentPlayer) => void;
}

export const PlayerContext = createContext(null);

export const CurrentPlayerProvider = ({ children }) => {
  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayer>();
  const [cookies] = useCookies(["ninetynine_staples"]);

  useEffect(() => {
    if (cookies.ninetynine_staples && !currentPlayer) {
      setCurrentPlayer({
        email: cookies.ninetynine_staples.email,
        created_at: cookies.ninetynine_staples.created_at,
        updated_at: cookies.ninetynine_staples.updated_at,
        id: cookies.ninetynine_staples.id,
        username: cookies.ninetynine_staples.username,
        token: cookies.ninetynine_staples.token,
      });
    }
  }, [cookies]);

  return (
    <PlayerContext.Provider value={{ currentPlayer, setCurrentPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};
