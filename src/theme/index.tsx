import { extendTheme, theme as base, ThemeConfig } from "@chakra-ui/react";
import { buttonStyles } from "./components/button";
import { globalStyles } from "./styles";
import { inputStyles } from "./components/input";
import { customHeading } from "./components/heading";
import { containerStyles } from "./components/container";
import { customText } from "./components/text";
import { customFormLabel } from "./components/formLabel";
import { checkboxStyles } from "./components/checkbox";
import { numberInputStyles } from "./components/numberInput";

const config: ThemeConfig = {
  initialColorMode: "light",
};

const customTheme = extendTheme({
  config,
  fonts: {
    heading: `Montserrat, ${base.fonts?.heading}`,
    body: `Inter, ${base.fonts?.body}`,
  },
  components: {
    Button: {
      ...buttonStyles,
    },
    Input: {
      ...inputStyles,
    },
    Text: {
      ...customText,
    },
    Heading: {
      ...customHeading,
    },
    Container: {
      ...containerStyles,
    },
    FormLabel: {
      ...customFormLabel,
    },
    Checkbox: {
      ...checkboxStyles,
    },
    NumberInput: {
      ...numberInputStyles,
    },
  },
  ...globalStyles,
});

export default customTheme;
