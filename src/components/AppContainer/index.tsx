import React from "react";
import { AppContainerProps } from "../../types";
import { Box } from "@chakra-ui/react";

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  return (
    <Box
      display="flex"
      position="relative"
      width="100%"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      minHeight="100vh"
      padding={0}
      margin={0}
      paddingBottom="125px"
    >
      {children}
    </Box>
  );
};

export default AppContainer;
