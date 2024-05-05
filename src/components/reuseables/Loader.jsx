import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      zIndex="999"
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
