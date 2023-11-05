import React from "react";
import { useTheme } from "@skagami/gatsby-plugin-dark-mode";

const ThemeCheckbox = () => {
  const [theme, toggleTheme] = useTheme();

  // Don't render anything at compile time. Deferring rendering until we
  // know which theme to use on the client avoids incorrect initial
  // state being displayed.
  if (theme === null) {
    return null;
  }

  return (
    <label>
      <input
        type="checkbox"
        onChange={(e) => toggleTheme(e.target.checked ? "dark" : "light")}
        checked={theme === "dark"}
      />
      Dark mode
    </label>
  );
};

export default ThemeCheckbox;
