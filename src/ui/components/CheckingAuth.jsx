import { CircularProgress, Grid2 } from "@mui/material"

export const CheckingAuth = () => {
    return (
        <Grid2
        size={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }}
            container
            spacing={0}
            // direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 6 }}
        >

            <Grid2>
                <CircularProgress color="warning" />
            </Grid2>
        </Grid2>

    )
}
