import { Button } from "@mui/material";

const Buttons = (props) => {
    const { text, sx, variant, ...rest } = props;
    return (
      <>
        <Button
          {...rest}
          variant={variant || "contained"}
          sx={{ ...sx, textTransform: "capitalize" }}
        >
          {text}
        </Button>
      </>
    );
  };
  
  export default Buttons;