import { Box, Divider, Drawer, Grid2, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux";
import { SideBarItemList } from "./SideBarItemList";

// Componente SideBar: Muestra un menú lateral con una lista de elementos
export const SideBar = ({ drawerWidth = 280 }) => { 

    const { displayName } = useSelector(state => state.auth);
    const { notes } = useSelector(state => state.journal);
    

    return (
        <Box
            component='nav' // Define que el contenedor es de navegación
            sx={{ 
                width: { sm: drawerWidth }, // Define el ancho del componente para pantallas medianas y superiores
                flexShrink: { sm: 0 } // Evita que el componente se reduzca en flex layouts
            }}
        >
            <Drawer  //es de MUI
                variant="permanent" // Define que el Drawer será permanente (no se oculta)
                open // El Drawer está abierto siempre
                sx={{
                    display: { xs: 'block'}, // Asegura que se muestre en todas las pantallas (incluyendo xs)
                    '& .MuiDrawer-paper': { 
                        boxSizing: 'border-box', // Incluye padding y border dentro del ancho definido
                        width: drawerWidth // Establece el ancho del Drawer
                    }
                }}
            >
                {/* Encabezado de la barra lateral Pading estandar el toolbar*/}
                <Toolbar> 
                    <Typography 
                        variant="h6" // Estilo de encabezado nivel 6
                        noWrap // Evita que el texto haga saltos de línea
                        component='div'
                    >
                        {displayName} {/* Nombre mostrado en la barra lateral */}
                        {/* <hr/> */}
                        {/* {email} */}
                    </Typography>
                </Toolbar>
                
                {/* Línea divisoria entre secciones */}
                <Divider />

                {/* Lista de elementos */}
                <List>
                    {notes.map(note => ( // Recorre un array de meses
                        <SideBarItemList key={note.id} {...note}/>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
};






// // Codigo con el responsive
// import { TurnedInNot } from "@mui/icons-material"
// import { Box, Divider, Drawer, Grid2, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"


// import { useState, useEffect } from "react"; // Importar hooks useState y useEffect
// import { useMediaQuery, useTheme } from "@mui/material"; // Importar hooks de Material-UI para responsividad

// export const SideBar = ({ drawerWidth = 240 }) => {
//     const theme = useTheme(); // Obtener el tema actual para usar breakpoints
//     const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Detectar si la pantalla es más pequeña que el tamaño "sm"
//     const [open, setOpen] = useState(isSmallScreen); // Estado para controlar si el Drawer está abierto o cerrado

//     // Hook useEffect: Detecta cambios en el tamaño de la pantalla y cierra el Drawer automáticamente si es pequeña
//     useEffect(() => {
//         if (isSmallScreen) {
//             setOpen(false); // Cierra el Drawer si el tamaño de la pantalla es menor a "sm"
//         }
//     }, [isSmallScreen]); // Ejecuta este efecto cuando el valor de isSmallScreen cambia

//     // Función para alternar el estado del Drawer en pantallas pequeñas
//     const toggleDrawer = () => {
//         setOpen(!open); // Alterna entre abierto y cerrado
//     };

//     return (
//         <Box
//             component="nav" // Define que este contenedor actúa como un elemento de navegación
//             sx={{
//                 width: { sm: drawerWidth }, // Define el ancho del Drawer en pantallas grandes
//                 flexShrink: { sm: 0 }, // Evita que el Drawer cambie de tamaño en pantallas grandes
//             }}
//         >
//             {/* Drawer: Contenedor principal de la barra lateral */}
//             <Drawer
//                 variant={isSmallScreen ? "temporary" : "permanent"} // Cambia entre temporary y permanent según el tamaño de la pantalla
//                 open={open} // Controla si el Drawer está abierto o cerrado
//                 onClose={toggleDrawer} // Requerido para cerrar el Drawer en modo temporary
//                 sx={{
//                     display: { xs: "block" }, // Asegura que se muestre en todas las pantallas
//                     "& .MuiDrawer-paper": {
//                         boxSizing: "border-box", // Incluye padding y border en el ancho total
//                         width: drawerWidth, // Establece el ancho fijo del Drawer
//                     },
//                 }}
//             >
//                 {/* Encabezado de la barra lateral */}
//                 <Toolbar>
//                     <Typography variant="h6" noWrap component="div">
//                         Alejandro Rivera
//                     </Typography>
//                 </Toolbar>
//                 <Divider /> {/* Línea divisora */}

//                 {/* Lista de elementos en la barra lateral */}
//                 <List>
//                     {["Enero", "Febrero", "Marzo", "Abril"].map((text) => (
//                         <ListItem key={text} disablePadding> {/* Cada elemento de la lista */}
//                             <ListItemButton>
//                                 <ListItemIcon>
//                                     <TurnedInNot /> {/* Icono de un marcador */}
//                                 </ListItemIcon>
//                                 <Grid2 container> {/* Contenedor para organizar el texto */}
//                                     <ListItemText primary={text} /> {/* Texto principal */}
//                                     <ListItemText secondary={"Ullamco est culpa non aute Lorem."} /> {/* Texto secundario */}
//                                 </Grid2>
//                             </ListItemButton>
//                         </ListItem>
//                     ))}
//                 </List>
//             </Drawer>
//         </Box>
//     );
// };
