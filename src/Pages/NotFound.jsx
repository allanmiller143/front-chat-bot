import React from "react";
import { Box } from "@mui/material";
import LgBox from "../Components/LgBox"
import Logo from "../Components/Header/Logo/Logo";

const NotFound = () => {
  return (
      <LgBox>
        <Box sx = {{ textAlign: "center", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Logo/>
          <p>Ocorreu um erro inesperado, por favor tente novamente mais tarde!!!</p>
        </Box>
      </LgBox>
  );
};

export default NotFound;
