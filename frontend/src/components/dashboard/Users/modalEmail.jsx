import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, Box } from "@mui/system";
import { Modal } from "@mui/base/Modal";
import { useState } from "react";
import {
  IconButton,
  TextField,
  Chip,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import QuillEdit from "../widgets/quillEdit";

// ─── CBA Brand Colors ──────────────────────────────────────────────
const CBA = {
  red: "#D50032",
  redHover: "#B8002A",
  navy: "#002E5F",
  navyHover: "#001E3F",
  grey: "#DEDEDE",
  white: "#FFFFFF",
  labelGrey: "#5A6474",
  borderGrey: "#C8CDD5",
  bgGrey: "#F5F6F8",
};

// ─── Field wrapper ─────────────────────────────────────────────────
const FieldGroup = ({ label, children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
    <span
      style={{
        fontSize: "0.70rem",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: CBA.labelGrey,
      }}
    >
      {label}
    </span>
    {children}
  </div>
);

// ─── Shared sx for inputs ──────────────────────────────────────────
const inputSx = {
  borderRadius: "8px",
  backgroundColor: CBA.white,
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "& fieldset": { borderColor: CBA.borderGrey },
    "&:hover fieldset": { borderColor: CBA.navy },
    "&.Mui-focused fieldset": { borderColor: CBA.navy, borderWidth: 2 },
  },
};

// ─── Main Component ────────────────────────────────────────────────
export default function ModalUnstyledEmail({ open, handleClose, selectedUsers = [] }) {
  const [form, setForm] = useState({ title: "", body: "" });
  const [spinner, setSpinner] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: conectar con nodemailerservice
    setSpinner(true);
    setTimeout(() => {
      setSpinner(false);
      handleClose();
    }, 1500);
  };

  return (
    <StyledModal
      open={open}
      onClose={handleClose}
      slots={{ backdrop: StyledBackdrop }}
    >
      <ModalBox>

        {/* ── Header ── */}
        <ModalHeader>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <AvatarWrapper>
              <EmailIcon sx={{ color: CBA.white, fontSize: 20 }} />
            </AvatarWrapper>
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem", color: CBA.white }}>
                Enviar correo
              </p>
              <p style={{ margin: 0, fontSize: "0.78rem", color: "rgba(255,255,255,0.65)" }}>
                Redacta y envía un mensaje a los usuarios seleccionados
              </p>
            </div>
          </div>
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{ color: "rgba(255,255,255,0.7)", "&:hover": { color: CBA.white } }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </ModalHeader>

        {/* ── Body ── */}
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Destinatarios */}
              {selectedUsers.length > 0 && (
                <FieldGroup label="Destinatarios">
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      padding: "10px 12px",
                      backgroundColor: CBA.white,
                      border: `1.5px solid ${CBA.borderGrey}`,
                      borderRadius: 8,
                      minHeight: 42,
                    }}
                  >
                    {selectedUsers.map((email, i) => (
                      <Chip
                        key={i}
                        label={email}
                        size="small"
                        sx={{
                          backgroundColor: "#EEF2F8",
                          color: CBA.navy,
                          fontWeight: 600,
                          fontSize: "0.75rem",
                          border: `1px solid ${CBA.borderGrey}`,
                        }}
                      />
                    ))}
                  </div>
                </FieldGroup>
              )}

              {/* Asunto */}
              <FieldGroup label="Asunto">
                <TextField
                  fullWidth
                  size="small"
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Escribe el asunto del correo"
                  sx={inputSx}
                  required
                />
              </FieldGroup>

              {/* Mensaje */}
              <FieldGroup label="Mensaje">
                <div
                  style={{
                    backgroundColor: CBA.white,
                    borderRadius: 8,
                    border: `1.5px solid ${CBA.borderGrey}`,
                    overflow: "hidden",
                  }}
                >
                  <QuillEdit />
                </div>
              </FieldGroup>

            </div>

            {/* ── Botones ── */}
            <Divider />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <button
                type="button"
                onClick={handleClose}
                style={{
                  padding: "10px 0",
                  borderRadius: 8,
                  border: `1.5px solid ${CBA.borderGrey}`,
                  background: CBA.white,
                  color: "#374151",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = CBA.navy)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = CBA.borderGrey)}
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={spinner}
                style={{
                  padding: "10px 0",
                  borderRadius: 8,
                  border: "none",
                  background: spinner ? `${CBA.red}AA` : CBA.red,
                  color: CBA.white,
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  cursor: spinner ? "not-allowed" : "pointer",
                  transition: "background 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
                onMouseEnter={(e) => { if (!spinner) e.currentTarget.style.background = CBA.redHover; }}
                onMouseLeave={(e) => { if (!spinner) e.currentTarget.style.background = CBA.red; }}
              >
                {spinner ? (
                  <>
                    <span
                      style={{
                        width: 16, height: 16,
                        border: "2px solid rgba(255,255,255,0.4)",
                        borderTopColor: CBA.white,
                        borderRadius: "50%",
                        animation: "spin 0.7s linear infinite",
                        display: "inline-block",
                      }}
                    />
                    Enviando...
                  </>
                ) : (
                  <>
                    <SendIcon sx={{ fontSize: 16 }} />
                    Enviar correo
                  </>
                )}
              </button>
            </div>
          </form>
        </ModalBody>

      </ModalBox>
    </StyledModal>
  );
}

// ─── Styled Components ─────────────────────────────────────────────

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "MuiBackdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});
Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(2px);
  -webkit-tap-highlight-color: transparent;
`;

const ModalBox = styled(Box)`
  width: 640px;
  max-width: 95vw;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  background: ${CBA.navy};
  border-radius: 12px 12px 0 0;
`;

const AvatarWrapper = styled("div")`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBody = styled("div")`
  padding: 24px;
  background: ${CBA.bgGrey};
`;

const Divider = styled("div")`
  height: 1px;
  background: ${CBA.grey};
  margin: 20px 0;
`;

// ─── Spinner keyframe ──────────────────────────────────────────────
const styleTag = document.createElement("style");
styleTag.innerHTML = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(styleTag);