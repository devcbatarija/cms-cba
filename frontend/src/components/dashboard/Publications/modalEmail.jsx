import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, Box } from "@mui/system";
import { Modal } from "@mui/base/Modal";
import { useState, useMemo } from "react";
import { useEffect } from "react";
import {
  Button,
  TextField,
  FormControl,
  Grid,
  Typography,
} from "@mui/material";
import QuillEdit from "../widgets/quillEdit";
import SendIcon from "@mui/icons-material/Send";
import SelectEmail from "../widgets/selectEmail";


const emails = ['username@gmail.com', 'user02@gmail.com'];

export default function ModalUnstyledEmail({ open, handleOpen, handleClose }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    multimedia: "",
  });
  //select email component states
  const [openSelectEmail, setOpenSelectEmail] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleClickOpenSelectEmail = () => {
    setOpen(true);
  };

  const handleCloseSelectEmail = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };


  const handleChangeEmail = (e) => {
    setValue(e.key);
    console.log(value);
  };

  const handleChange = (e) => {
    const property = e.target.name;
    const value = e.target.value;
    setForm({
      ...form,
      [property]: value,
    });
  };
  useEffect(() => {}, []);

  return (
    <div>
      {
        openSelectEmail?
        <SelectEmail
         open={openSelectEmail}
         setOpen={setOpenSelectEmail} 
         selectedValue={selectedValue} 
         setSelectedValue={setSelectedValue} 
         handleClickOpenSelectEmail={handleClickOpenSelectEmail}
         handleCloseSelectEmail={handleCloseSelectEmail}
         ></SelectEmail>:null
      }
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <Box sx={style}>
        
          <Typography sx={{m: 1}}  variant="h3" component="h3">
             Email
          </Typography>
          <form className="">
            <FormControl sx={{ m: 1, width: "50%" }} variant="outlined">
              <TextField
                onChange={handleChange}
                value={form.title}
                id="outlined-basic-title"
                label="Title"
                name="title"
                type="text"
                variant="outlined"
                sx={{ borderRadius: "0px" }}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <QuillEdit></QuillEdit>
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="outlined">
              <Button
                variant="contained"
                sx={{ borderRadius: "0px" }}
                onClick={handleClose}
                endIcon={<SendIcon />}
              >
                Enviar
              </Button>
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="outlined">
              <Button
                variant="outlined"
                sx={{ borderRadius: "0px" }}
                onClick={handleClose}
              >
                CANCELAR
              </Button>
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="outlined">
              <Button
                variant="outlined"
                sx={{ borderRadius: "0px" }}
                onClick={handleClickOpenSelectEmail}
              >
                SELECCIONAR
              </Button>
            </FormControl>
          </form>
        </Box>
      </StyledModal>
    </div>
  );
}

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

const blue = {
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
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
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = (theme) => ({
  width: 1000,
  // borderRadius: "12px",
  padding: "16px 32px 24px 32px",
  backgroundColor: theme.palette.mode === "dark" ? "#0A1929" : "white",
  boxShadow: `0px 2px 24px ${
    theme.palette.mode === "dark" ? "#000" : "#383838"
  }`,
});

const TriggerButton = styled("button")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  border-radius: 12px;
  padding: 6px 12px;
  line-height: 1.5;
  background: transparent;
  border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[100] : grey[900]};

  &:hover {
    background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
  }

  &:focus-visible {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[500] : blue[200]};
  }
  `
);
