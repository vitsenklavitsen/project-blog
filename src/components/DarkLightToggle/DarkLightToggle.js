"use client";
import React from "react";
import Cookie from "js-cookie";
import { Sun, Moon } from "react-feather";
import VisuallyHidden from "../VisuallyHidden";
import {
  LIGHT_TOKENS,
  DARK_TOKENS,
  COLOR_THEME_COOKIE_NAME,
} from "@/constants";

import styles from "./DarkLightToggle.module.css";

function DarkLightToggle({ initialTheme }) {
  const [theme, setTheme] = React.useState(initialTheme);

  function handleThemeChange() {
    const nextTheme = theme === "light" ? "dark" : "light";
    // Update state, so the correct icon will be shown
    setTheme(nextTheme);

    // Set the cookie, so on the next page visit the root layout gets the right theme from the get go
    Cookie.set(COLOR_THEME_COOKIE_NAME, nextTheme, { expires: 365 });

    const rootElement = document.documentElement;
    const colors = nextTheme === "light" ? LIGHT_TOKENS : DARK_TOKENS;

    // actually swap the the theme on the current site
    rootElement.setAttribute("data-color-theme", nextTheme);
    Object.entries(colors).forEach(([key, value]) => {
      rootElement.style.setProperty(key, value);
    });
  }

  return (
    <button className={styles.action} onClick={handleThemeChange}>
      {theme === "light" ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
      <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
    </button>
  );
}

export default DarkLightToggle;
