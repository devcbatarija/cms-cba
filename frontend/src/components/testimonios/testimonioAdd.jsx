import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { handleUpload, uploadImgbb } from "../../services/functions";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import Uploader from "../dashboard/Publications/Uploader";

const BRAND_NAVY = "#002E5F";
const BRAND_RED = "#D50032";

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    bgcolor: "#F7F8FA",
    borderRadius: "8px",
    fontFamily: "Arial, sans-serif",
    "& fieldset": { borderColor: "#E5E7EB" },
    "&:hover fieldset": { borderColor: BRAND_NAVY },
    "&.Mui-focused fieldset": { borderColor: BRAND_NAVY },
  },
  "& .MuiInputLabel-root": { fontFamily: "Arial, sans-serif" },
  "& textarea, & input": {
    outline: "none",
    boxShadow: "none",
  },
};

const labelSx = {
  fontFamily: "Arial, sans-serif",
  fontWeight: 600,
  fontSize: "0.8rem",
  color: "#374151",
  textTransform: "uppercase",
  letterSpacing: "0.03em",
  mb: 1,
  display: "block",
};

export const TestimonioAdd = ({
  testimonios,
  setTestimonios,
  handleSetImagen,
  handleSubmitTestimonio,
}) => {
  const [input, setInput] = useState(false);
  const [image, setImage] = useState({
    multimedia: [],
  });
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newTestimonios = {
      ...testimonios,
      [name]: value,
    };

    if (["Estudiante", "Maestro"].includes(value)) {
      newTestimonios.cargoTwo = "";
    } else if (value === "Otro") {
      setInput(true);
    } else if (name === "cargoTwo") {
      // No additional logic needed here
    } else {
      setInput(false);
      if (testimonios.cargo !== "Otro") {
        newTestimonios.cargoTwo = "";
      }
    }

    setTestimonios(newTestimonios);
  };

  const handleSubmitImg = async (e) => {
    e.preventDefault();

    if (!image.multimedia[0]) {
      toast.error("Debes seleccionar una imagen antes de crear el testimonio.");
      return;
    }

    try {
      const response = await uploadImgbb(image.multimedia[0]);
      if (response?.status == 200) {
        handleSubmitTestimonio(response.results);
      } else {
        toast.error("No se pudo subir la imagen. Intenta nuevamente.");
      }
    } catch (error) {
      if (error) {
        console.log(error);
        toast.error("Ocurrió un error al crear el testimonio.");
      }
    }
  };

  useEffect(() => {
    image.multimedia.length > 0
      ? handleSetImagen(image.multimedia[0])
      : handleSetImagen("");
  }, [image]);

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#fff",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      }}
    >
      {/* Header navy */}
      <Box sx={{ bgcolor: BRAND_NAVY, px: 3, py: 2.5 }}>
        <Typography
          variant="h6"
          sx={{ color: "#fff", fontWeight: 600, fontFamily: "Arial, sans-serif" }}
        >
          Datos del testimonio
        </Typography>
      </Box>

      <Box sx={{ p: 3 }}>
        {/* Imagen */}
        <Box sx={{ mb: 3 }}>
          <Typography component="label" sx={labelSx}>
            Insertar imagen
          </Typography>
          <Uploader publicacion={image} setPublicacion={setImage} cantMax={1} />
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmitImg}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          {/* Nombre */}
          <Box>
            <Typography component="label" sx={labelSx}>
              Nombre de la persona
            </Typography>
            <TextField
              fullWidth
              size="small"
              name="nombre"
              value={testimonios.nombre}
              onChange={handleChange}
              required
              placeholder="Nombre"
              sx={fieldSx}
            />
          </Box>

          {/* Apellidos */}
          <Box>
            <Typography component="label" sx={labelSx}>
              Apellidos de la persona
            </Typography>
            <TextField
              fullWidth
              size="small"
              name="apellidos"
              value={testimonios.apellidos}
              onChange={handleChange}
              required
              placeholder="Apellidos"
              sx={fieldSx}
            />
          </Box>

          {/* Cargo y Estado */}
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Box sx={{ flex: 1, minWidth: 200 }}>
              <Typography component="label" sx={labelSx}>
                Cargo
              </Typography>
              <FormControl fullWidth size="small" sx={fieldSx}>
                <Select
                  name="cargo"
                  value={testimonios.cargo}
                  onChange={handleChange}
                  sx={{ fontFamily: "Arial, sans-serif" }}
                  MenuProps={{
                    PaperProps: {
                      sx: { "& .MuiMenuItem-root": { fontFamily: "Arial, sans-serif" } },
                    },
                  }}
                >
                  <MenuItem value="Estudiante">Estudiante</MenuItem>
                  <MenuItem value="Maestro">Maestro</MenuItem>
                  <MenuItem value="Otro">Otro</MenuItem>
                </Select>
              </FormControl>
              {testimonios.cargo === "Otro" && (
                <TextField
                  fullWidth
                  size="small"
                  name="cargoTwo"
                  value={testimonios.cargoTwo}
                  onChange={handleChange}
                  required
                  placeholder="Ingrese otro cargo"
                  sx={{ ...fieldSx, mt: 1.5 }}
                />
              )}
            </Box>

            <Box sx={{ flex: 1, minWidth: 200 }}>
              <Typography component="label" sx={labelSx}>
                Estado
              </Typography>
              <FormControl fullWidth size="small" sx={fieldSx}>
                <Select
                  name="state"
                  value={testimonios.state}
                  onChange={handleChange}
                  sx={{ fontFamily: "Arial, sans-serif" }}
                  MenuProps={{
                    PaperProps: {
                      sx: { "& .MuiMenuItem-root": { fontFamily: "Arial, sans-serif" } },
                    },
                  }}
                >
                  <MenuItem value={true}>Visible</MenuItem>
                  <MenuItem value={false}>Oculto</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Comentario */}
          <Box>
            <Typography component="label" sx={labelSx}>
              Comentario
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="comentario"
              value={testimonios.comentario}
              onChange={handleChange}
              placeholder="Escribe el testimonio aquí..."
              sx={fieldSx}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: BRAND_RED,
              borderRadius: "8px",
              textTransform: "none",
              fontFamily: "Arial, sans-serif",
              fontWeight: 600,
              py: 1.2,
              boxShadow: "none",
              "&:hover": { bgcolor: "#B0002A", boxShadow: "none" },
            }}
          >
            Crear
          </Button>
        </Box>
      </Box>
    </Box>
  );
};