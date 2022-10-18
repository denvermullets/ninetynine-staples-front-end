import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Image,
  Stack,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { FiHelpCircle, FiSearch, FiSettings } from "react-icons/fi";
import { FcCapacitor } from "react-icons/fc";
import Logo from "./ninety_logo_512.png";
import Sidebar from "./Sidebar";
import { ToggleButton } from "./ToggleButton";
import { Link } from "react-router-dom";
import { PlayerContext } from "../providers/CurrentPlayerProvider";

const Navbar: React.FC = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { currentPlayer } = useContext(PlayerContext);

  return (
    <Box
      as="nav"
      bg="white"
      boxShadow={useColorModeValue("sm", "sm-dark")}
      padding={4}
    >
      <Flex justify="space-between">
        <HStack spacing="4">
          <Stack direction="row" alignContent="center"></Stack>
          {isDesktop && (
            <ButtonGroup variant="lightBlue" spacing="1">
              <Button>
                <Image
                  boxSize="32px"
                  objectFit="fill"
                  src={Logo}
                  alt="Ninety Nine Staples Logo"
                />
              </Button>
              <Link to="/">
                <Button>Home</Button>
              </Link>
              <Link to="/sets">
                <Button>Sets</Button>
              </Link>
            </ButtonGroup>
          )}
        </HStack>
        {isDesktop ? (
          <HStack spacing="4">
            <ButtonGroup variant="lightBlue" spacing="1">
              {!currentPlayer ? (
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
              ) : (
                <>
                  <IconButton
                    icon={<FiSearch fontSize="1.25rem" />}
                    aria-label="Search"
                  />
                  <IconButton
                    icon={<FiSettings fontSize="1.25rem" />}
                    aria-label="Settings"
                  />
                  <IconButton
                    icon={<FiHelpCircle fontSize="1.25rem" />}
                    aria-label="Help Center"
                  />
                </>
              )}
            </ButtonGroup>
            {currentPlayer ? (
              <Avatar boxSize="10" name={currentPlayer.username} src="" />
            ) : null}
          </HStack>
        ) : (
          <>
            <ToggleButton
              isOpen={isOpen}
              aria-label="Open Menu"
              onClick={onToggle}
            />
            <Drawer
              isOpen={isOpen}
              placement="left"
              onClose={onClose}
              isFullHeight
              preserveScrollBarGap
              trapFocus={true}
            >
              <DrawerOverlay />
              <DrawerContent>
                <Sidebar />
              </DrawerContent>
            </Drawer>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
