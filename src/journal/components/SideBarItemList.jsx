import { Grid2, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { TurnedInNot } from "@mui/icons-material"
import { useMemo } from "react"
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal/journalSlice";

export const SideBarItemList = ({ title = '', id, body, imageUrls = [], date}) => {

    const dispatch = useDispatch();
    const onClickNote = () =>{
        dispatch(setActiveNote({title, id, body, imageUrls, date}))
    } 

    const newTitle = useMemo(() => {
        return title.length > 17 ? title.substring(0,17) + '...' : title
    }, [title])

    return (
        <ListItem
            disablePadding // Elimina padding interno
        >
            <ListItemButton onClick={onClickNote}> {/* Crea un botón interactivo */}
                <ListItemIcon>
                    <TurnedInNot /> {/* Ícono del marcador */}
                </ListItemIcon>
                {/* Contenido de texto dentro del botón */}
                <Grid2 container direction={'column'}>
                    <ListItemText primary={newTitle} /> {/* Texto principal (nombre del mes) */}
                    <ListItemText secondary={body} /> {/* Texto secundario (descripción) */}
                </Grid2>
            </ListItemButton>
        </ListItem>
    )
}
