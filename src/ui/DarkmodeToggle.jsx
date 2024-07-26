import React from "react";
import { HiMoon, HiSun } from "react-icons/hi";
import ButtonIcon from "./ButtonIcon";
import { useTheme } from "../context/ThemeContext";

function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <ButtonIcon onClick={toggleTheme}>
      {theme === 'dark-mode' ? <HiSun /> : <HiMoon />}
    </ButtonIcon>
  )
}

export default DarkModeToggle;
