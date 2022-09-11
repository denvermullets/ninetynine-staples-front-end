import React, { useState, useContext, createContext } from "react";

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

export const PlayerContext = createContext<CurrentPlayerContext | null>(null);

export const useCurrentPlayerContext = () => useContext(PlayerContext);

export const CurrentPlayerProvider = ({ children }) => {
  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayer>(null);

  return (
    <PlayerContext.Provider value={{ currentPlayer, setCurrentPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};
