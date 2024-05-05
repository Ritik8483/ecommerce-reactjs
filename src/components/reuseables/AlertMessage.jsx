import { Snackbar, Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { closeAlert } from "../../redux/slices/snackbarSlice";

const AlertMessage = (props) => {
  const { open, message, autoHideDuration, severity } = props;

  const dispatch = useDispatch();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeAlert(false));
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      sx={{ display: "flex", alignItems: "center" }}
    >
      <Alert
        severity={severity}
        sx={{ backgroundColor: "#000000", color: "#ffffff" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;
