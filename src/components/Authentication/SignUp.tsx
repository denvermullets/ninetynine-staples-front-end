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
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import config from "../../config";
import axios from "axios";
import { PlayerContext } from "../providers/CurrentPlayerProvider";

// import { useCookies } from "react-cookie";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);
  const [userName, setUserName] = useState<string>(null);
  const [userNameError, setUserNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setCurrentPlayer } = useContext(PlayerContext);
  // const [, setCookie] = useCookies(["ninetynine_staples"]);

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

    if (
      !email ||
      email === "" ||
      password === "" ||
      !password ||
      !userName ||
      userName === ""
    ) {
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
        console.log("something went wrong creating an account");
        throw Error("Unable to create account");
      }

      if (loginUser.data.message === "Username is already taken") {
        setUserNameError(true);
        return;
      }

      setCurrentPlayer({
        email: loginUser.data.player.email,
        created_at: loginUser.data.player.created_at,
        updated_at: loginUser.data.player.updated_at,
        id: loginUser.data.player.id,
        username: loginUser.data.player.username,
        token: loginUser.data.token,
      });

      navigate("/sets");
      // setCookie("ninetynine_staples", user, {
      //   path: "/",
      //   secure: true,
      //   expires: new Date(Date.now() + 3600 * 1000 * 48),
      //   sameSite: true,
      // });
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
              Create your account
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
            <FormControl isInvalid={userNameError}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                id="username"
                placeholder="Enter your username"
                type="error"
                onChange={handleUserNameChange}
              />
              {userNameError ? (
                <FormErrorMessage style={{ marginBottom: "6px" }}>
                  This username is already taken.
                </FormErrorMessage>
              ) : null}
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
          <Stack spacing="4">
            <Button variant="solid" colorScheme="blue" onClick={createAccount}>
              Create Account
            </Button>
          </Stack>
        </Stack>
        <HStack spacing="1" justify="center">
          <Text fontSize="sm" color="muted">
            Already have an account?
          </Text>
          <Link to="/login">
            <Button variant="link" colorScheme="blue" size="sm">
              Sign in
            </Button>
          </Link>
        </HStack>
      </Stack>
    </Container>
  );
};

export default SignUp;
