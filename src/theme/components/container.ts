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
    collection: (props) => ({
      py: { base: "0", md: "8" },
      px: { base: "0", md: "8" },
      marginTop: 4,
      width: "100%",
      maxWidth: "8xl",
      boxShadow: { base: "none", md: "sm" },
      borderRadius: { base: "none", md: "lg" },
      maxW: "md",
      bg: {
        base: mode("transparent", "transparent")(props),
        md: mode("white", "darkGray.700")(props),
      },
    }),
    boxset: (props) => ({
      py: { base: "0", md: "4" },
      px: { base: "0", md: "8" },
      marginTop: 4,
      width: "100%",
      maxWidth: "8xl",
      boxShadow: { base: "none", md: "sm" },
      borderRadius: { base: "none", md: "lg" },
      maxW: "md",
      bg: {
        base: mode("transparent", "transparent")(props),
        md: mode("white", "darkGray.700")(props),
      },
    }),
  },
};
