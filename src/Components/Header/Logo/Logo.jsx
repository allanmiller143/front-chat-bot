import React from "react";
import { useThemeContext } from "../../../Theme/CustomThemeProvider";
import { Link } from "react-router-dom";
import LogoDark from "../../../assets/LightLogo.svg";
import LogoLight from "../../../assets/Logo.svg";


const Logo = () => {
  const { mode } = useThemeContext();

  return (
    <Link to="/" style={{ display: 'inline-block' }}>
      <img
        src={mode !== 'light' ? LogoDark : LogoLight}
        alt="Logo"
        style={{ width: '100px', height: '100px', cursor: 'pointer' }}
      />
    </Link>
  );
};

export default Logo;
