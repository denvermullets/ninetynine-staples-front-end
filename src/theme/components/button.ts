import { mode, StyleConfig } from "@chakra-ui/theme-tools";

export const buttonStyles: StyleConfig = {
  baseStyle: {
    borderRadius: "16px",
    boxShadow: "45px 76px 113px 7px rgba(112, 144, 176, 0.08)",
    transition: ".25s all ease",
    boxSizing: "border-box",
    cursor: "pointer",
    _focus: {
      boxShadow: "none",
    },
    _active: {
      boxShadow: "none",
    },
  },
  variants: {
    outline: () => ({
      borderRadius: "16px",
    }),
    brand: (props) => ({
      bg: mode("green.400", "green.500")(props),
      color: mode("white", "darkGray.600")(props),
      _focus: {
        bg: mode("green.500", "green.600")(props),
      },
      _active: {
        bg: mode("green.500", "green.400")(props),
      },
      _hover: {
        bg: mode("green.500", "green.400")(props),
      },
    }),
  },
};
