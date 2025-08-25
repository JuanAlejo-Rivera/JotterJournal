import { ImageList, ImageListItem } from "@mui/material";

export default function ImageGallery({ images = [] }) {
  return (
    <ImageList sx={{ width: '100%', height: 'auto' }} cols={3} >
      {images.map((image, index) => (
        <ImageListItem key={index}>
          <img
            src={`${image}?w=250&h=250&fit=crop&auto=format`}  // Cambié el tamaño aquí
            srcSet={`${image}?w=250&h=250&fit=crop&auto=format&dpr=2 2x`}  // Ajusto el tamaño para pantallas retina
            alt="Imagen de la nota"
            loading="lazy"
            style={{ width: '100%', height: 'auto', borderRadius: '8px'}}
            />
        </ImageListItem>
        
      ))}
    </ImageList>
  );
}
