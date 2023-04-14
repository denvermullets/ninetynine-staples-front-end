import { mode, StyleConfig, StyleFunctionProps } from "@chakra-ui/theme-tools";

export const customText: StyleConfig = {
  baseStyle: (props: StyleFunctionProps) => ({
    color: mode("cyan.600", "cyan.400")(props),
  }),
};
