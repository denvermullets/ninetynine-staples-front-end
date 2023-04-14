import React from "react";
import { AppContainerProps } from "../../types";
import { Box } from "@chakra-ui/react";

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  return (
    <Box width="100%" alignItems="center" padding={0} margin={0} paddingBottom="125px">
      {children}
    </Box>
  );
};

export default AppContainer;
