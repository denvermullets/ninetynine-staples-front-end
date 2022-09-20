import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import { useCurrentPlayerContext } from "../providers/CurrentPlayerProvider";
import { useCookies } from "react-cookie";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const { setCurrentPlayer } = useCurrentPlayerContext();
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["ninetynine_staples"]);

  const validateEmail = () => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(e.target.value === "");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(e.target.value === "");
  };

  const login = async () => {
    setEmailError(!email || email === "" || !validateEmail());
    setPasswordError(!password || password === "");

    if (!email || email === "" || password === "" || !password) {
      return;
    }

    try {
      const loginUser = await axios.post(`${config.API_URL}/login`, {
        player: {
          email: email,
          password: password,
        },
      });

      if (!loginUser) {
        console.log("something went wrong logging in");
        throw Error("Unable to create account");
      }

      if (loginUser.data.message === "Incorrect email or password") {
        setEmailError(true);
        setPasswordError(true);
        return;
      }

      const player = {
        email: loginUser.data.player.email,
        created_at: loginUser.data.player.created_at,
        updated_at: loginUser.data.player.updated_at,
        id: loginUser.data.player.id,
        username: loginUser.data.player.username,
        token: loginUser.data.token,
      };

      setCurrentPlayer(player);
      setCookie("ninetynine_staples", player, {
        path: "/",
        secure: true,
        // i think a 4hr cookie is ok, probably not going to need more than that w/tokens exp
        expires: new Date(Date.now() + 3600 * 1000 * 4),
        sameSite: true,
      });

      navigate("/sets");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      marginTop={20}
      maxW="md"
      py={{ base: "0", sm: "8" }}
      px={{ base: "4", sm: "10" }}
      bg={useBreakpointValue({ base: "transparent", sm: "white" })}
      boxShadow={{ base: "none", sm: "xl" }}
      borderRadius={{ base: "none", sm: "xl" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          {/* <Logo /> */}
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>
              Log in to your account
            </Heading>
            <Text color="muted">Start making your dreams come true</Text>
          </Stack>
        </Stack>
        <Stack spacing="6">
          <Stack spacing="5">
            <FormControl isInvalid={emailError}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                onChange={handleEmailChange}
              />
              {!emailError ? null : (
                <FormErrorMessage style={{ marginBottom: "6px" }}>
                  Valid email is required.
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={passwordError}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                placeholder="********"
                type="password"
                onChange={handlePasswordChange}
              />
              {!passwordError ? null : (
                <FormErrorMessage>Password is required.</FormErrorMessage>
              )}
            </FormControl>
          </Stack>
          <HStack justify="space-between">
            <Checkbox defaultChecked>Remember me</Checkbox>
            <Button variant="link" colorScheme="blue" size="sm">
              Forgot password
            </Button>
          </HStack>
          <Stack spacing="4">
            <Button variant="solid" colorScheme="blue" onClick={login}>
              Sign in
            </Button>
          </Stack>
        </Stack>
        <HStack spacing="1" justify="center">
          <Text fontSize="sm" color="muted">
            Dont have an account?
          </Text>
          <Link to="/sign-up">
            <Button variant="link" colorScheme="blue" size="sm">
              Sign up
            </Button>
          </Link>
        </HStack>
      </Stack>
    </Container>
  );
};

export default LoginForm;
