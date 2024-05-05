import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";

const formContainer = {
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  flexDirection: "column",
  gap: "20px",
};

const anchorTag = {
  cursor: "pointer",
  color: "blue",
  textDecoration: "underline",
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "var(--primaryThemeBlue)",
    color: "#000",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "472px",
  height: "510px",
  backgroundColor: "#fff",
  borderRadius: "16px",
  boxShadow: "24",
};

const modalCrossStyle = {
  color: "#fff",
  position: "absolute",
  top: "-30px",
  cursor: "pointer",
  right: 0,
};

export {
  formContainer,
  anchorTag,
  StyledTableCell,
  StyledTableRow,
  modalStyles,
  modalCrossStyle,
};
