import React, { useEffect, useState } from "react";
import axios from "axios";
import Uploader from "../Publications/Uploader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { getAllAmbientes } from "../../../redux-toolkit/actions/galleryActions";
import styled from "styled-components";

/* ===== Paleta CBA ===== */
const NAVY        = "#002E5F";
const RED         = "#D50032";
const GRAY_BG     = "#f4f6fa";
const GRAY_BORDER = "#DEDEDE";

const Wrapper = styled.div`
  background: ${GRAY_BG};
  min-height: 100vh;
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Panel = styled.div`
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid ${GRAY_BORDER};
  box-shadow: 0 2px 10px rgba(0,46,95,0.06);
  overflow: hidden;
  width: 100%;
  max-width: 560px;
`;

const PanelHeader = styled.div`
  background: ${NAVY};
  padding: 20px 26px;
`;

const PanelTitle = styled.h1`
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.01em;
`;

const PanelBody = styled.div`
  padding: 26px 28px 30px;
`;

const FieldGroup = styled.div`
  margin-bottom: 18px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: ${NAVY};
  margin-bottom: 6px;
`;

const SelectStyled = styled.select`
  width: 100%;
  background: ${GRAY_BG};
  border: 1px solid ${GRAY_BORDER};
  border-radius: 9px;
  padding: 10px 14px;
  font-size: 0.92rem;
  color: #1f2937;
  font-family: inherit;
  box-sizing: border-box;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23002E5F'%3E%3Cpath fill-rule='evenodd' d='M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z' clip-rule='evenodd'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px;
  cursor: pointer;
  padding-right: 2.4rem;
  transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;

  &:focus {
    outline: none;
    border-color: ${NAVY};
    background-color: #fff;
    box-shadow: 0 0 0 3px rgba(0,46,95,0.12);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: ${RED};
  color: #fff;
  font-weight: 700;
  font-size: 0.95rem;
  padding: 12px 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 4px;
  transition: background 0.15s, transform 0.05s;
  font-family: inherit;

  &:hover  { background: #b8002a; }
  &:active { transform: translateY(1px); }
`;

const GalleryAddComponent = () => {
  const dispatch = useDispatch();
  const ambientes = useSelector((state) => state.gallery.ambient);

  const [form, setForm] = useState({
    imagen: "",
    multimedia: [],
    AmbienteIdAmbiente: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.AmbienteIdAmbiente) {
      toast.error("Debes seleccionar un ambiente antes de agregar una imagen.");
      return;
    }
    try {
      const response = await axios.post("/files/upload", {
        filePath: form.multimedia,
        type: "image",
      });
      if (response.data) {
        await axios.post("gallery", {
          AmbienteIdAmbiente: form.AmbienteIdAmbiente,
          imagen: response.data.results[0],
        });
        toast.success("Imagen agregada exitosamente.");
        setForm({ imagen: "", multimedia: [], AmbienteIdAmbiente: "" });
      }
    } catch (error) {
      toast.error("Error al agregar la imagen.");
    }
  };

  useEffect(() => {
    dispatch(getAllAmbientes());
  }, []);

  return (
    <Wrapper>
      <Panel>
        <PanelHeader>
          <PanelTitle>Agregar imagen</PanelTitle>
        </PanelHeader>
        <PanelBody>
          <form onSubmit={handleSubmit}>

            <FieldGroup>
              <Label htmlFor="AmbienteIdAmbiente">Ambiente</Label>
              <SelectStyled
                id="AmbienteIdAmbiente"
                name="AmbienteIdAmbiente"
                value={form.AmbienteIdAmbiente}
                onChange={handleChange}
              >
                <option value="">Selecciona un ambiente</option>
                {ambientes && ambientes.map((ambient) => (
                  <option key={ambient.id_ambiente} value={ambient.id_ambiente}>
                    {ambient.nombre}
                  </option>
                ))}
              </SelectStyled>
            </FieldGroup>

            <FieldGroup>
              <Label>Imagen</Label>
              <Uploader
                publicacion={form}
                setPublicacion={setForm}
                cantMax={1}
              />
            </FieldGroup>

            <SubmitButton type="submit">Agregar imagen</SubmitButton>
          </form>
        </PanelBody>
      </Panel>
    </Wrapper>
  );
};

export default GalleryAddComponent;