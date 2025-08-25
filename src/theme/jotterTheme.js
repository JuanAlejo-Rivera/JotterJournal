import { createTheme } from "@mui/material";

export const jotterTheme = createTheme({
  palette: {
    primary: {
      main: "#1e2939",
    },
    secondary: {
      main: "#077ec3",
    },
    tercero: {
      main: "#48456d",
    },
    background: {
      default: "#ECEFF1",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1e2939",
      secondary: "#607D8B",
    },
    error: {
      main: "#E57373",
    },
    success: {
      main: "#81C784",
    },
    warning: {
      main: "#FFD54F",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    button: {
      textTransform: "none",
      fontWeight: "600",
    },
    h5: {
      fontWeight: 700,
      color: "#2F3542",
    },
  },
});

