import { Box } from "@mui/material";

export default function Logo({ maxWidth = 150, sx = {} }) {
  return (

      <img
        src="/LogoJotter.png"
        alt="Logo"
        style={{
          width: "100%",   
          height: "auto",  
          display: "block" 
        }}
      />
  );
}
