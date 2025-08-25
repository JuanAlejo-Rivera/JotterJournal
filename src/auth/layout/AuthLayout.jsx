import { Box, Grid2, Typography } from "@mui/material"
import { Outlet } from "react-router-dom"
import Logo from "../../Components/Logo"

export const AuthLayout = ({ children, title = '' }) => {
    return (
        <>
            <Grid2
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
            >

                <Box textAlign="center" sx={{ mb: 3 }}>
                    <Logo width={120} height={120} />
                    <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2, color: "white" }}>
                        Iniciar Sesión
                    </Typography>
                    <Typography variant="body1" sx={{ color: "white", mt: 1 }}>
                        Planea, recuerda y registra tu camino{" "}
                        <span style={{ color: "#0a7cba", fontWeight: "bold" }}>
                            iniciando sesión en este formulario
                        </span>
                    </Typography>
                </Box>

                <Grid2
                    size={{ xs: 12, sm: 9, md: 9, lg: 6, xl: 4 }}
                    sx={{
                        backgroundColor: "white",
                        padding: 3,
                        borderRadius: 2,
                        boxShadow: 3

                    }}
                    className='box-shadow'
                >
             <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                    {title}
                </Typography>


                    {children}

                </Grid2>
            </Grid2>
        </>
    )
}
