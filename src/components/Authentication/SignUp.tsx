import React, { useContext, useState } from "react";
import {
  Button,
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
import config from "../../config";
import axios from "axios";
import { PlayerContext } from "../providers/CurrentPlayerProvider";
import { useCookies } from "react-cookie";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);
  const [userName, setUserName] = useState<string>(null);
  const [userNameError, setUserNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setCurrentPlayer } = useContext(PlayerContext);
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

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    setUserNameError(e.target.value === "");
  };

  const createAccount = async () => {
    setEmailError(!email || email === "" || !validateEmail());
    setPasswordError(!password || password === "");
    setUserNameError(!userName || userName === "");

    if (!email || email === "" || password === "" || !password || !userName || userName === "") {
      return;
    }

    try {
      const loginUser = await axios.post(`${config.API_URL}/players`, {
        player: {
          username: userName,
          password: password,
          email: email,
        },
      });

      if (!loginUser) {
        console.error("something went wrong creating an account");
        throw Error("Unable to create account");
      }

      if (loginUser.data.message === "Username is already taken") {
        setUserNameError(true);
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
            <Heading size={{ base: "md" }} variant="loginHeading">
              Create your account
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
                id="email"
                placeholder="Enter your email"
                type="email"
                onChange={handleEmailChange}
                variant="authInput"
              />
              {emailError && (
                <FormErrorMessage style={{ marginBottom: "6px" }}>
                  Valid email is required.
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={userNameError}>
              <FormLabel htmlFor="username" variant="loginLabel">
                Username
              </FormLabel>
              <Input
                id="username"
                placeholder="Enter your username"
                type="error"
                onChange={handleUserNameChange}
                variant="authInput"
              />
              {userNameError && (
                <FormErrorMessage style={{ marginBottom: "6px" }}>
                  This username {userName !== "" ? "is already taken" : "can't be blank"}.
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={passwordError}>
              <FormLabel htmlFor="password" variant="loginLabel">
                Password
              </FormLabel>
              <Input
                id="password"
                placeholder="********"
                type="password"
                onChange={handlePasswordChange}
                variant="authInput"
              />
              {passwordError && <FormErrorMessage>Password is required.</FormErrorMessage>}
            </FormControl>
          </Stack>
          <Stack spacing="4">
            <Button variant="brand" onClick={createAccount}>
              Create Account
            </Button>
          </Stack>
        </Stack>
        <HStack spacing="1" justify="center">
          <Text fontSize="sm">Already have an account?</Text>
          <Link to="/login">
            <Button
              variant="link"
              colorScheme="green"
              size="sm"
              marginBottom="4px"
              marginLeft="4px"
            >
              Sign in
            </Button>
          </Link>
        </HStack>
      </Stack>
    </Container>
  );
};

export default SignUp;
