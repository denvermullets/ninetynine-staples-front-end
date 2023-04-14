import { mode, StyleConfig, StyleFunctionProps } from "@chakra-ui/theme-tools";

export const customFormLabel: StyleConfig = {
  baseStyle: {
    // color: mode("purpleMoment.800", "white"),
  },
  variants: {
    loginLabel: (props: StyleFunctionProps) => ({
      color: mode("cyan.600", "cyan.400")(props),
    }),
  },
};
