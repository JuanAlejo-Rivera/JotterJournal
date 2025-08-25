import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { DeleteOutlined, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid2, IconButton, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'

import { useForm } from "../../hooks/useForm"
import ImageGallery from "../components/ImageGallery"
import { setActiveNote, starDeletingNote, starSaveNote, startUploadingFiles } from "../../store/journal"

export const NoteView = () => {

    const dispatch = useDispatch();

    const { activeNote: note, messageSaved, isSaving } = useSelector(state => state.journal)

    const { body, title, onInputChange, formState, date } = useForm(note);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString()
    }, [date])

    const fileInputRef = useRef()

    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState])

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota Actualizada', messageSaved, 'success');
        }
    }, [messageSaved])


    const onSaveNote = () => {
        dispatch(starSaveNote())
    }

    const onFileInputChange = ({ target }) => {
        if (target.files.length === 0) return;
        // console.log('subiendo archivos')
        dispatch(startUploadingFiles(target.files))
    }

    const onDelete = () => {
        dispatch(starDeletingNote());
    }


    return (
        <Grid2
            container
            direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}
            className="animate__animated animate__fadeIn animate__faster"
        >
            <Grid2>
                <Typography noWrap fontSize={39} fontWeight='light'>{dateString}</Typography>
            </Grid2>
            <Grid2>
                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={onFileInputChange}
                    style={{ display: 'none' }}
                />

                <IconButton
                    color="primary"
                    disabled={isSaving}
                    onClick={() => fileInputRef.current.click()}
                >
                    <UploadOutlined />
                </IconButton>

                <Button
                    disabled={isSaving}
                    onClick={onSaveNote}
                    color="primary"
                    sx={{ padding: 2 }}
                >
                    <SaveOutlined />
                    Guardar
                </Button>
            </Grid2>

            <Grid2 container size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un título"
                    label="Título"
                    sx={{ border: 'none', mb: 1 }}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Que sucedio en el día de hoy?"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />
            </Grid2>

            <Grid2 container sx={{ width: "100%", justifyContent: "end" }}>            <Button
                onClick={onDelete}
                sx={{mt:2}}
                color="error"
                >
                    <DeleteOutlined/>
                    Borrar
                </Button>
            </Grid2>


            {/* {console.log(note.imageUrls)} */}
            {/* Image gallery */}
            <ImageGallery images={note.imageUrls} />




        </Grid2>
    )
}







// import { useEffect, useMemo, useRef, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"

// import { DeleteOutlined, SaveOutlined, UploadOutlined } from "@mui/icons-material"
// import { Button, Grid2, IconButton, TextField, Typography } from "@mui/material"
// import Swal from "sweetalert2"
// import 'sweetalert2/dist/sweetalert2.css'

// import { useForm } from "../../hooks/useForm"
// import ImageGallery from "../components/ImageGallery"
// import { setActiveNote, starDeletingNote, starSaveNote, startUploadingFiles } from "../../store/journal"
// import SmallImage from "../components/SmallImage"

// export const NoteView = () => {

//     const dispatch = useDispatch();

//     const { activeNote: note, messageSaved, isSaving } = useSelector(state => state.journal)

//     const { body, title, onInputChange, formState, date } = useForm(note);

//     const dateString = useMemo(() => {
//         const newDate = new Date(date);
//         return newDate.toUTCString()
//     }, [date])

//     const fileInputRef = useRef()

//     useEffect(() => {
//         dispatch(setActiveNote(formState))
//     }, [formState])

//     useEffect(() => {
//         if (messageSaved.length > 0) {
//             Swal.fire('Nota Actualizada', messageSaved, 'success');
//         }
//     }, [messageSaved])

//     const [previewImages, setPreviewImages] = useState([]);

//     const onFileInputChange = ({ target }) => {
//         if (target.files.length === 0) return;
    
//         dispatch(startUploadingFiles(target.files));
    
//         // NO revocamos las URLs en este punto, solo agregamos nuevas
//         const newImages = Array.from(target.files).map(file => URL.createObjectURL(file));
    
//         setPreviewImages(prev => [...prev, ...newImages]); // Agregar imágenes sin borrar las anteriores
//     };
    
    
    

//     const onSaveNote = () => {
//         dispatch(starSaveNote());
    
//         // Revocar las URLs después de guardar
//         previewImages.forEach(img => URL.revokeObjectURL(img));
    
//         // Limpiar el estado de previsualización
//         setPreviewImages([]);
//     };
    
    

//     const onDelete = () => {
//         dispatch(starDeletingNote());
//     }


//     return (
//         <Grid2
//             container
//             direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}
//             className="animate__animated animate__fadeIn animate__faster"
//         >
//             <Grid2>
//                 <Typography noWrap fontSize={39} fontWeight='light'>{dateString}</Typography>
//             </Grid2>
//             <Grid2>
//                 <input
//                     type="file"
//                     multiple
//                     ref={fileInputRef}
//                     onChange={onFileInputChange}
//                     style={{ display: 'none' }}
//                 />

//                 <IconButton
//                     color="primary"
//                     disabled={isSaving}
//                     onClick={() => fileInputRef.current.click()}
//                 >
//                     <UploadOutlined />
//                 </IconButton>

//                 <Button
//                     disabled={isSaving}
//                     onClick={onSaveNote}
//                     color="primary"
//                     sx={{ padding: 2 }}
//                 >
//                     <SaveOutlined />
//                     Guardar
//                 </Button>
//                 <SmallImage images={previewImages} />

//             </Grid2>

            
// {/* <preViewImage/> */}
//             <Grid2 container size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
//                 <TextField
//                     type="text"
//                     variant="filled"
//                     fullWidth
//                     placeholder="Ingrese un título"
//                     label="Título"
//                     sx={{ border: 'none', mb: 1 }}
//                     name="title"
//                     value={title}
//                     onChange={onInputChange}
//                 />

//                 <TextField
//                     type="text"
//                     variant="filled"
//                     fullWidth
//                     multiline
//                     placeholder="¿Que sucedio en el día de hoy?"
//                     minRows={5}
//                     name="body"
//                     value={body}
//                     onChange={onInputChange}
//                 />
//             </Grid2>

//             <Grid2 container sx={{ width: "100%", justifyContent: "end" }}>            
//                 <Button
//                 onClick={onDelete}
//                 sx={{ mt: 2 }}
//                 color="error"
//             >
//                 <DeleteOutlined />
//                 Borrar
//             </Button>
//             </Grid2>


//             {/* {console.log(note.imageUrls)} */}
//             {/* Image gallery */}
//             <ImageGallery images={note.imageUrls} />

//         </Grid2>
//     )
// }





