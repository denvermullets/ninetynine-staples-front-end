import { mode, StyleConfig, StyleFunctionProps } from "@chakra-ui/theme-tools";

export const checkboxStyles: StyleConfig = {
  baseStyle: {
    control: {
      borderRadius: "sm",
      _checked: {
        bg: "green.500",
      },
      _focus: {
        boxShadow: "none",
      },
    },
  },
  variants: {
    loginForm: (props: StyleFunctionProps) => ({
      label: {
        color: mode("cyan.600", "cyan.400")(props),
      },
      control: {
        borderColor: mode("green.500", "darkGray.200")(props),
        _hover: {
          borderColor: mode("green.600", "darkGray.300")(props),
          _notChecked: {
            bg: "green.400",
          },
          _checked: {
            bg: "green.400",
            borderColor: "green.500",
          },
        },
        _checked: {
          bg: "green.500",
          borderColor: "green.500",
        },
      },
    }),
  },
};
