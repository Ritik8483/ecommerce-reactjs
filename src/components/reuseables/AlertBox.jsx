import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Box, Typography } from "@mui/material";
import Buttons from "./Buttons";

const AlertBox = (props) => {
  const {
    onClose,
    open,
    handleClick,
    cancelText,
    userName,
    confirmText,
    mainHeaderText,
  } = props;

  return (
    <Dialog sx={{ padding: "20px" }} onClose={onClose} open={open}>
      <DialogTitle fontSize="20px" textAlign="center">
        {mainHeaderText + " "}
        {userName && (
          <Typography fontSize="20px" color="var(--primaryThemeBlue)">
            {userName} ?
          </Typography>
        )}
      </DialogTitle>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="20px"
        padding="20px"
      >
        <Buttons
          color="error"
          onClick={onClose}
          variant="contained"
          text={cancelText}
        />
        <Buttons variant="contained" text={confirmText} onClick={handleClick} />
      </Box>
    </Dialog>
  );
};

export default AlertBox;
