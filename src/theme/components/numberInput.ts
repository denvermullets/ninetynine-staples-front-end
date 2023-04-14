import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

export const numberInputStyles = {
  baseStyle: {
    field: {
      border: "1px solid",
      borderRadius: "16px",
    },
  },

  variants: {
    collection: (props: StyleFunctionProps) => ({
      field: {
        borderRadius: "16px",
        color: mode("cyan.600", "darkGray.200")(props),
        background: mode("white", "darkGray.800")(props),
        borderColor: mode("cyan.100", "darkGray.800")(props),
        fontSize: "14px",
        height: "34px",
        width: "80px",
        _focus: {
          borderColor: "green.500",
        },
      },
    }),
  },
};
