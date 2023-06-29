import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/courses");
  };
  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h1">404</Typography>
      <Typography variant="h5">Page not found</Typography>
      <Typography variant="body1" mt={2}>
        Sorry, the page you are looking for could not be found.
      </Typography>
      <Button variant="contained" color="primary" mt={4} onClick={goBack}>
        Go to Home
      </Button>
    </Box>
  );
}
