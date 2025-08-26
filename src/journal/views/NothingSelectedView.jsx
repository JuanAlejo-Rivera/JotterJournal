import { StarOutline } from "@mui/icons-material"
import { Button, Grid2, TextField, Typography } from "@mui/material"

export const NothingSelectedView = () => {
    return (
        <Grid2
            className="animate__animated animate__fadeIn animate__faster"
            container
            spacing={0}
            // direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: "calc(100vh - 110px)", backgroundColor: "primary.main", borderRadius: 3 }}
        >

            <Grid2 container justifyContent='center'>
                <Button>
                    <StarOutline sx={{ fontSize: 100, color: "white" }} />
                </Button>
                <Grid2 container size={{ xs: 6, sm: 8, md: 10, lg: 12, xl: 12 }} justifyContent='center'>
                    <Typography color='white' variant="h5">Selecciona o crea una entrada</Typography>
                </Grid2>
            </Grid2>

        </Grid2>
    )
}
