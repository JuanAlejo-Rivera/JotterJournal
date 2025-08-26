import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Grid2, IconButton, Toolbar, Typography } from "@mui/material"
import { startLogout } from "../../store/auth/thunks";
import { useDispatch } from "react-redux";
import Logo from "../../Components/Logo";


export const NavBar = ({ drawerWidth = 240 }) => {

    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch(startLogout());
    }


    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}´px` }
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    edge='start'
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuOutlined />
                </IconButton>

                <Grid2 container direction='row'
                    alignItems="center"
                    sx={{
                        display: "flex",
                        justifyContent: "space-between", // Separa los elementos a los extremos
                        flexGrow: 1, // Asegura que ocupe todo el espacio disponible
                    }}>
        
                   
                    <Typography variant="h6" noWrap component='div'>Jotter</Typography>

                    <IconButton
                        onClick={onLogout}
                        color="error"
                    >
                        <LogoutOutlined />
                    </IconButton>
                </Grid2>
            </Toolbar>
        </AppBar>
    )
}



