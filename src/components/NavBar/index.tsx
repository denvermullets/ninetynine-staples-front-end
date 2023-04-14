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
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { FiHelpCircle, FiSearch } from "react-icons/fi";
import { MdOutlineNightlight, MdOutlineLightMode } from "react-icons/md";
import Logo from "./ninety_logo_512.png";
import LightLogo from "./light_ninety_logo_512.png";
import Sidebar from "./Sidebar";
import { ToggleButton } from "./ToggleButton";
import { Link } from "react-router-dom";
import { CurrentPlayerContext, PlayerContext } from "../providers/CurrentPlayerProvider";

const Navbar: React.FC = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { currentPlayer } = useContext<CurrentPlayerContext>(PlayerContext);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      as="nav"
      bg={useColorModeValue("white", "darkGray.700")}
      boxShadow={useColorModeValue("sm", "sm-dark")}
      padding={4}
      width="100%"
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
                  src={colorMode === "dark" ? LightLogo : Logo}
                  alt="Ninety Nine Staples Logo"
                />
              </Button>
              {currentPlayer && (
                <Link
                  to={
                    "/collections" +
                    `/${currentPlayer.username}` +
                    `/${currentPlayer.defaultCollection.id}`
                  }
                >
                  <Button>Collections</Button>
                </Link>
              )}
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
                  <IconButton icon={<FiSearch fontSize="1.25rem" />} aria-label="Search" />
                  {colorMode === "light" ? (
                    <IconButton
                      icon={<MdOutlineNightlight fontSize="1.25rem" />}
                      aria-label="Dark Mode"
                      onClick={toggleColorMode}
                    />
                  ) : (
                    <IconButton
                      icon={<MdOutlineLightMode fontSize="1.25rem" />}
                      aria-label="Light Mode"
                      onClick={toggleColorMode}
                    />
                  )}
                  <IconButton icon={<FiHelpCircle fontSize="1.25rem" />} aria-label="Help Center" />
                </>
              )}
            </ButtonGroup>
            {currentPlayer && <Avatar boxSize="10" name={currentPlayer.username} src="" />}
          </HStack>
        ) : (
          <>
            <ToggleButton isOpen={isOpen} aria-label="Open Menu" onClick={onToggle} />
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
