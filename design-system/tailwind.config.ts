import type { Config } from "tailwindcss";
import { colors } from "./src/tokens/colors";
import { radius } from "./src/tokens/radius";

export const preset: Config = {
  darkMode: "class",
  content: [], // Content should be defined by the consumer
  theme: {
    extend: {
      colors,
      borderRadius: radius,
    },
  },
  plugins: [],
};
