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
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";
import { FiHelpCircle, FiSearch, FiSettings } from "react-icons/fi";
import { FcCapacitor } from "react-icons/fc";
import { Sidebar } from "./Sidebar";
import { ToggleButton } from "./ToggleButton";

export const Navbar = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Box as="nav" bg="bg-accent" color="on-accent" padding={4}>
      <Flex justify="space-between">
        <HStack spacing="4">
          <FcCapacitor />
          {isDesktop && (
            <ButtonGroup variant="ghost-on-accent" spacing="1">
              <Button>Home</Button>
              <Button aria-current="page">Dashboard</Button>
              <Button>Tasks</Button>
              <Button>Bookmarks</Button>
              <Button>Users</Button>
            </ButtonGroup>
          )}
        </HStack>
        {isDesktop ? (
          <HStack spacing="4">
            <ButtonGroup variant="ghost-on-accent" spacing="1">
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
            <Avatar
              boxSize="10"
              name="Christoph Winston"
              src="https://tinyurl.com/yhkm2ek8"
            />
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
              // Only disabled for showcase
              trapFocus={false}
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
