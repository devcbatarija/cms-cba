// NotFound.js
import { Box, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();
  const redirectToHome = () => {
    navigate("/");
  };
  return (
    <Container maxWidth="md">
      <Box
        my={20}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h2" align="center" gutterBottom>
          404
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          Lo siento, la página que estas buscando no se encuentra o no existe!
        </Typography>
        <button onClick={redirectToHome} className="button-404">VOLVER AL INICIO</button>
      </Box>
    </Container>
  );
}

export default NotFound;
