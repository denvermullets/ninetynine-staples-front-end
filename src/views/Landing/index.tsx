import { Box, Container } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { PlayerContext } from "../../components/providers/CurrentPlayerProvider";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const { currentPlayer } = useContext(PlayerContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentPlayer) {
      navigate(`/collections/${currentPlayer.username}/${currentPlayer.defaultCollection.id}`);
    }
  }, []);

  return (
    <Container variant="collection">
      <Box></Box>
    </Container>
  );
};

export default LandingPage;
