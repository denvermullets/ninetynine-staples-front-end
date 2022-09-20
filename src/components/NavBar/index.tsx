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
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";
import { FiHelpCircle, FiSearch, FiSettings } from "react-icons/fi";
import { FcCapacitor } from "react-icons/fc";
import Sidebar from "./Sidebar";
import { ToggleButton } from "./ToggleButton";
import { Link } from "react-router-dom";
import { useCurrentPlayerContext } from "../providers/CurrentPlayerProvider";

export const Navbar = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { currentPlayer } = useCurrentPlayerContext();

  return (
    <Box
      as="nav"
      bg="white"
      boxShadow={useColorModeValue("sm", "sm-dark")}
      padding={4}
    >
      <Flex justify="space-between">
        <HStack spacing="4">
          <FcCapacitor />
          {isDesktop && (
            <ButtonGroup variant="lightBlue" spacing="1">
              <Link to="/">
                <Button>Home</Button>
              </Link>
              <Link to="/sets">
                <Button>Sets</Button>
              </Link>
              {!currentPlayer ? (
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
              ) : null}
              {/* <Button>Tasks</Button>
              <Button>Bookmarks</Button>
              <Button>Users</Button> */}
            </ButtonGroup>
          )}
        </HStack>
        {isDesktop ? (
          <HStack spacing="4">
            <ButtonGroup variant="lightBlue" spacing="1">
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
