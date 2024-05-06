import { Button } from "@mui/material";

const Buttons = (props) => {
    const { text, sx, variant,disabled, ...rest } = props;
    return (
      <>
        <Button
          {...rest}
          disabled={disabled}
          variant={variant || "contained"}
          sx={{ ...sx, textTransform: "capitalize" }}
        >
          {text}
        </Button>
      </>
    );
  };
  
  export default Buttons;