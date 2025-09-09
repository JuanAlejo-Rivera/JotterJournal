import { Box } from "@mui/material";

export default function Logo({ maxWidth = 150, sx = {} }) {
  return (

<Box display="flex" justifyContent="center">
      <img
        src="/LogoJotter.png"
        alt="Logo"
        style={{
          width: "350px",
          height: "auto",
          display: "center"
        }}
      />
    </Box>
  );
}
