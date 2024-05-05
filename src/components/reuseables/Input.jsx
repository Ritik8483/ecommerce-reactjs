import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";

const InputField = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 16,
    // width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const Input = ({
  placeholder,
  label,
  errorMessage,
  type,
  id,
  register,
  name,
  ...rest
}) => {
  return (
    <FormControl variant="standard">
      <InputLabel shrink htmlFor={type}>
        {label}
      </InputLabel>
      <InputField
        {...(register !== undefined
          ? {
              ...register(name ?? "", {
                required: true,
              }),
            }
          : null)}
        name={name}
        placeholder={placeholder}
        {...rest}
        type={type}
        id="type"
      />
      <Typography marginTop="5px" fontSize="12px" color="red">
        {errorMessage || ""}
      </Typography>
    </FormControl>
  );
};

export default Input;
