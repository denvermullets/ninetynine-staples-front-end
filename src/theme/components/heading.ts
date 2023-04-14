import { mode, StyleConfig, StyleFunctionProps } from "@chakra-ui/theme-tools";

export const customHeading: StyleConfig = {
  baseStyle: {
    // color: mode("purpleMoment.800", "white"),
  },
  variants: {
    loginHeading: (props: StyleFunctionProps) => ({
      color: mode("green.500", "green.500")(props),
    }),
  },
};
