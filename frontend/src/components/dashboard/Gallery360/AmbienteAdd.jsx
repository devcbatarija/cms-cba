import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
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

  span.req { color: ${RED}; margin-left: 2px; }
`;

const Input = styled.input`
  width: 100%;
  background: ${GRAY_BG};
  border: 1px solid ${GRAY_BORDER};
  border-radius: 9px;
  padding: 10px 14px;
  font-size: 0.92rem;
  color: #1f2937;
  font-family: inherit;
  box-sizing: border-box;
  transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;

  &::placeholder { color: #9ca3af; }
  &:focus {
    outline: none;
    border-color: ${NAVY};
    background: #fff;
    box-shadow: 0 0 0 3px rgba(0,46,95,0.12);
  }
  &[aria-invalid="true"] {
    border-color: ${RED};
    &:focus { box-shadow: 0 0 0 3px rgba(213,0,50,0.12); }
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  background: ${GRAY_BG};
  border: 1px solid ${GRAY_BORDER};
  border-radius: 9px;
  padding: 10px 14px;
  font-size: 0.92rem;
  color: #1f2937;
  font-family: inherit;
  box-sizing: border-box;
  min-height: 110px;
  resize: vertical;
  transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;

  &::placeholder { color: #9ca3af; }
  &:focus {
    outline: none;
    border-color: ${NAVY};
    background: #fff;
    box-shadow: 0 0 0 3px rgba(0,46,95,0.12);
  }
  &[aria-invalid="true"] {
    border-color: ${RED};
  }
`;

const ErrorMsg = styled.p`
  font-size: 0.75rem;
  color: ${RED};
  margin: 4px 0 0;
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

const AmbienteAddComponent = () => {
  const userId = useSelector((state) => state.login.user._userId);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("environment", {
        nombre: data.nombre,
        descripcion: data.descripcion,
        UsuarioIdUsuario: userId || "",
      });
      if (res.data) {
        toast.success("Ambiente creado exitosamente.");
        reset();
      }
    } catch (error) {
      toast.error("Error al crear el ambiente.");
    }
  };

  return (
    <Wrapper>
      <Panel>
        <PanelHeader>
          <PanelTitle>Agregar ambiente</PanelTitle>
        </PanelHeader>
        <PanelBody>
          <form onSubmit={handleSubmit(onSubmit)}>

            <FieldGroup>
              <Label htmlFor="nombre">
                Nombre <span className="req">*</span>
              </Label>
              <Input
                id="nombre"
                type="text"
                placeholder="Nombre del ambiente"
                aria-invalid={errors.nombre ? "true" : "false"}
                {...register("nombre", { required: "Este campo es obligatorio" })}
              />
              {errors.nombre && <ErrorMsg>{errors.nombre.message}</ErrorMsg>}
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="descripcion">
                Descripción <span className="req">*</span>
              </Label>
              <TextArea
                id="descripcion"
                placeholder="Describe brevemente este ambiente"
                aria-invalid={errors.descripcion ? "true" : "false"}
                {...register("descripcion", { required: "Este campo es obligatorio" })}
              />
              {errors.descripcion && <ErrorMsg>{errors.descripcion.message}</ErrorMsg>}
            </FieldGroup>

            <SubmitButton type="submit">Crear ambiente</SubmitButton>
          </form>
        </PanelBody>
      </Panel>
    </Wrapper>
  );
};

export default AmbienteAddComponent;