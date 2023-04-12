import { mode, StyleConfig } from "@chakra-ui/theme-tools";

export const containerStyles: StyleConfig = {
  baseStyle: {
    // base styles
  },
  variants: {
    login: (props) => ({
      marginTop: 20,
      maxW: "md",
      py: { base: "0", sm: "8" },
      px: { base: "4", sm: "10" },
      bg: {
        base: mode("transparent", "transparent")(props),
        sm: mode("white", "darkGray.700")(props),
      },
      boxShadow: { base: "none", sm: "xl" },
      borderRadius: { base: "none", sm: "xl" },
    }),
  },
};
