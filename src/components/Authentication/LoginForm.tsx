import React, { useContext, useState } from "react";
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
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import { PlayerContext } from "../providers/CurrentPlayerProvider";
import { useCookies } from "react-cookie";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const { setCurrentPlayer } = useContext(PlayerContext);
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
        console.error("something went wrong logging in");
        throw Error("Unable to create account");
      }

      if (loginUser.data.message === "Incorrect email or password") {
        setEmailError(true);
        setPasswordError(true);
        return;
      }

      const collections = await axios(
        `${config.API_URL}/collections/${loginUser.data.player.username}`
      );

      if (collections) {
        const player = {
          email: loginUser.data.player.email,
          created_at: loginUser.data.player.created_at,
          updated_at: loginUser.data.player.updated_at,
          id: loginUser.data.player.id,
          username: loginUser.data.player.username,
          token: loginUser.data.token,
          defaultCollection: collections.data.collections[0],
        };

        setCurrentPlayer(player);
        setCookie("ninetynine_staples", player, {
          path: "/",
          secure: true,
          // i think a 4hr cookie is ok, probably not going to need more than that w/tokens exp
          expires: new Date(Date.now() + 3600 * 1000 * 4),
          sameSite: true,
        });

        navigate(`/collections/${player.username}/${player.defaultCollection.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container variant="login">
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "md" }} as="h1" variant="loginHeading">
              Log in to your account
            </Heading>
            <Text>Start making your dreams come true</Text>
          </Stack>
        </Stack>
        <Stack spacing="6">
          <Stack spacing="5">
            <FormControl isInvalid={emailError}>
              <FormLabel htmlFor="email" variant="loginLabel">
                Email
              </FormLabel>
              <Input
                variant="authInput"
                id="email"
                placeholder="Enter your email"
                type="email"
                onChange={handleEmailChange}
              />
              {emailError && (
                <FormErrorMessage style={{ marginBottom: "6px" }}>
                  Valid email is required.
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={passwordError}>
              <FormLabel htmlFor="password" variant="loginLabel">
                Password
              </FormLabel>
              <Input
                variant="authInput"
                id="password"
                placeholder="********"
                type="password"
                onChange={handlePasswordChange}
              />
              {passwordError && <FormErrorMessage>Password is required.</FormErrorMessage>}
            </FormControl>
          </Stack>
          <HStack justify="space-between">
            <Checkbox defaultChecked variant="loginForm">
              Remember me
            </Checkbox>
            <Button variant="link" colorScheme="green" size="sm">
              Forgot password
            </Button>
          </HStack>
          <Stack spacing="4">
            <Button variant="brand" onClick={login}>
              Sign in
            </Button>
          </Stack>
        </Stack>
        <HStack spacing="1" justify="center">
          <Text fontSize="sm">Dont have an account?</Text>
          <Link to="/sign-up">
            <Button
              variant="link"
              colorScheme="green"
              size="sm"
              marginBottom="4px"
              marginLeft="4px"
            >
              Sign up
            </Button>
          </Link>
        </HStack>
      </Stack>
    </Container>
  );
};

export default LoginForm;
