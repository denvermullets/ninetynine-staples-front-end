import { mode, StyleConfig, StyleFunctionProps } from "@chakra-ui/theme-tools";

export const inputStyles: StyleConfig = {
  baseStyle: {
    field: {
      border: "1px solid",
      borderRadius: "16px",
    },
  },

  variants: {
    authInput: (props: StyleFunctionProps) => ({
      field: {
        borderRadius: "16px",
        color: mode("cyan.600", "darkGray.200")(props),
        background: mode("white", "darkGray.800")(props),
        _focus: {
          borderColor: "green.500",
        },
        borderColor: mode("cyan.100", "darkGray.800")(props),
      },
    }),
  },
};
