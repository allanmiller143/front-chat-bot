import React from "react";
import { useThemeContext } from "../../../Theme/CustomThemeProvider";
import { Link } from "react-router-dom";

const Logo = () => {
  const { mode } = useThemeContext();

  return (
    <Link to="/" style={{ display: 'inline-block' }}>
      <img
        src={mode !== 'light' ? "/src/assets/LightLogo.svg" : "/src/assets/Logo.svg"}
        alt="Logo"
        style={{ width: '100px', height: '100px', cursor: 'pointer' }}
      />
    </Link>
  );
};

export default Logo;
