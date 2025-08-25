import { Box } from "@mui/material";

export default function Logo() {
  return (
    <Box
      component="img"
      src="/LogoJotter.png"
      alt="Logotipo jotter"
      sx={{ height: 500, mb: 1, padding: 2 }}
    />
  );
}
