import type { Config } from "tailwindcss";
import { colors } from "./src/tokens/colors";
import { radius } from "./src/tokens/radius";
import { fontSize, fontWeight } from "./src/tokens/typography";
import { spacing } from "./src/tokens/spacing";
import { boxShadow } from "./src/tokens/shadows";

export const preset: Config = {
  darkMode: "class",
  content: [], // Content should be defined by the consumer
  theme: {
    extend: {
      colors,
      borderRadius: radius,
      fontSize,
      fontWeight,
      spacing,
      boxShadow,
    },
  },
  plugins: [],
};
