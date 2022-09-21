import { Icon } from "@chakra-ui/icons";
import {
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import {
  FiBarChart2,
  FiHelpCircle,
  FiHome,
  FiSearch,
  FiSettings,
  FiUsers,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { PlayerContext } from "../providers/CurrentPlayerProvider";
import { NavButton } from "./NavButton";
import { UserProfile } from "./UserProfile";

const Sidebar: React.FC = () => {
  const { currentPlayer } = useContext(PlayerContext);
  return (
    <Flex as="section" minH="100vh" bg="bg-canvas">
      <Flex
        flex="1"
        bg="bg-accent"
        color="on-accent"
        maxW={{ base: "full", sm: "xs" }}
        py={{ base: "6", sm: "8" }}
        px={{ base: "4", sm: "6" }}
      >
        <Stack justify="space-between" spacing="1">
          <Stack spacing={{ base: "5", sm: "6" }} shouldWrapChildren>
            {/* <Logo /> */}
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiSearch} color="on-accent" boxSize="5" />
              </InputLeftElement>
              <Input placeholder="Search" variant="filled" colorScheme="blue" />
            </InputGroup>
            <Stack spacing="1">
              <Link to="/">
                <NavButton label="Home" icon={FiHome} />
              </Link>
              <Link to="/sets">
                <NavButton label="Sets" icon={FiBarChart2} />
              </Link>
              {!currentPlayer ? (
                <Link to="/login">
                  <NavButton label="Login" icon={FiUsers} />
                </Link>
              ) : null}
              {/* <NavButton label="Tasks" icon={FiCheckSquare} />
              <NavButton label="Bookmarks" icon={FiBookmark} /> */}
            </Stack>
          </Stack>
          <Stack spacing={{ base: "5", sm: "6" }}>
            <Stack spacing="1">
              <NavButton label="Help" icon={FiHelpCircle} />
              <NavButton label="Settings" icon={FiSettings} />
            </Stack>
            <Divider />
            {currentPlayer ? (
              <UserProfile
                name={currentPlayer.username}
                image=""
                email={currentPlayer.email}
              />
            ) : null}
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
