import { Box } from "@mui/material";
import errorImage from "../../assets/errorImage.png";

const styleErrorBox = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "80vh",
};

const PageNotFound = () => {
  return (
    <Box sx={{ ...styleErrorBox }}>
      <img src={errorImage} alt="error" />
    </Box>
  );
};

export default PageNotFound;
