import React from "react";
import { Box } from "@mui/material";

const LgBox = ({ children }) => {
  return (
      <Box width="100%" maxWidth="lg" margin={"0 auto"}>
        {children}
      </Box>
  );
};

export default LgBox;
