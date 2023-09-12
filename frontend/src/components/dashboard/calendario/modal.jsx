import * as React from "react";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, styled } from '@mui/system';
import { Portal } from '@mui/base/Portal';
import { FocusTrap } from '@mui/base/FocusTrap';
import { unstable_useModal as useModal } from '@mui/base/unstable_useModal';
import Fade from '@mui/material/Fade';
import { TextField, Typography, Button, TextareaAutosize, Alert } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getEvents } from "../../../redux-toolkit/actions/eventActions";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
const UseModal = ({setData,data,handleOpen,handleClose,open}) => {
   const dispatch=useDispatch();

    const handleChange=(e)=>{
      const property = e.target.name;
      const value = e.target.value;
      setData({
        ...data,
        [property]: value,
      });
        // const value=e.target.value
        // setData({
        //     ...data,
        //     title:value
        // })
    }
    const saveEvent=()=>{
      const token = Cookies.get('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
      const res = axios.post("/event/create",data, config).then(res=>{
        toast.success(res.data.successMessage)
        dispatch(getEvents())
      }).catch(error=>{
        console.log(error)
        if(error.response.status==401){
          toast.error(error.response.data.messageError)
        }
      })
      handleClose()
    }
  const handleSubmit = async (e) => {
    console.log(e)
  }
    return ( 
        <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="containerForm">
              <Typography variant="h5" component="h2">
                Crear Evento
              </Typography>
              <div className="formDiv">
                    <form onSubmit={handleSubmit} className="formLogin" >
                      <TextField
                    onChange={handleChange}
                    value={data.title}
                    id="outlined-basic-title"
                    label="Titulo"
                    name="title"
                    type="txt"
                    variant="outlined"
                  />
                  <TextField
                    onChange={handleChange}
                    value={data.start}
                    id="outlined-basic-start"
                    label="Fecha de Inicio"
                    name="start"
                    type="date"
                    variant="outlined"
                  />
                  <TextField
                    onChange={handleChange}
                    value={data.end}
                    id="outlined-basic-end"
                    label="Fecha de Fin"
                    name="end"
                    type="date"
                    variant="outlined"
                  />
                  <TextField
                    onChange={handleChange}
                    value={data.color}
                    id="outlined-basic-color"
                    name="color"
                    type="color"
                    variant="outlined"
                  />
                  <TextField
                    onChange={handleChange}
                    value={data.tipo}
                    id="outlined-basic-tipo"
                    label="Tipo"
                    name="tipo"
                    type="txt"
                    variant="outlined"
                  />
                  <Button type="button" onClick={saveEvent}>
                    Guardar
                  </Button>
                  </form>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

const Modal = React.forwardRef(function Modal(props, forwardedRef) {
  const {
    children,
    closeAfterTransition = false,
    container,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableEscapeKeyDown = false,
    disablePortal = false,
    disableRestoreFocus = false,
    disableScrollLock = false,
    hideBackdrop = false,
    keepMounted = false,
    onClose,
    open,
    onTransitionEnter,
    onTransitionExited,
    ...other
  } = props;

  const propsWithDefaults = {
    ...props,
    closeAfterTransition,
    disableAutoFocus,
    disableEnforceFocus,
    disableEscapeKeyDown,
    disablePortal,
    disableRestoreFocus,
    disableScrollLock,
    hideBackdrop,
    keepMounted,
  };

  const {
    getRootProps,
    getBackdropProps,
    getTransitionProps,
    portalRef,
    isTopModal,
    exited,
    hasTransition,
  } = useModal({
    ...propsWithDefaults,
    rootRef: forwardedRef,
  });

  const classes = {
    hidden: !open && exited,
  };

  const childProps = {};
  if (children.props.tabIndex === undefined) {
    childProps.tabIndex = '-1';
  }

  // It's a Transition like component
  if (hasTransition) {
    const { onEnter, onExited } = getTransitionProps();
    childProps.onEnter = onEnter;
    childProps.onExited = onExited;
  }

  const rootProps = {
    ...other,
    className: clsx(classes),
    ...getRootProps(other),
  };

  const backdropProps = {
    open,
    ...getBackdropProps(),
  };

  if (!keepMounted && !open && (!hasTransition || exited)) {
    return null;
  }

  return (
    <Portal ref={portalRef} container={container} disablePortal={disablePortal}>
      {/*
       * Marking an element with the role presentation indicates to assistive technology
       * that this element should be ignored; it exists to support the web application and
       * is not meant for humans to interact with directly.
       * https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
       */}
      <CustomModalRoot {...rootProps}>
        {!hideBackdrop ? <CustomModalBackdrop {...backdropProps} /> : null}
        <FocusTrap
          disableEnforceFocus={disableEnforceFocus}
          disableAutoFocus={disableAutoFocus}
          disableRestoreFocus={disableRestoreFocus}
          isEnabled={isTopModal}
          open={open}
        >
          {React.cloneElement(children, childProps)}
        </FocusTrap>
      </CustomModalRoot>
    </Portal>
  );
});

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  closeAfterTransition: PropTypes.bool,
  container: PropTypes.oneOfType([
    function (props, propName) {
      if (props[propName] == null) {
        return new Error("Prop '" + propName + "' is required but wasn't specified");
      } else if (
        typeof props[propName] !== 'object' ||
        props[propName].nodeType !== 1
      ) {
        return new Error("Expected prop '" + propName + "' to be of type Element");
      }
    },
    PropTypes.func,
  ]),
  disableAutoFocus: PropTypes.bool,
  disableEnforceFocus: PropTypes.bool,
  disableEscapeKeyDown: PropTypes.bool,
  disablePortal: PropTypes.bool,
  disableRestoreFocus: PropTypes.bool,
  disableScrollLock: PropTypes.bool,
  hideBackdrop: PropTypes.bool,
  keepMounted: PropTypes.bool,
  onClose: PropTypes.func,
  onTransitionEnter: PropTypes.func,
  onTransitionExited: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

const Backdrop = React.forwardRef((props, ref) => {
  const { open, ...other } = props;
  return (
    <Fade in={open}>
      <div ref={ref} {...other} />
    </Fade>
  );
});

Backdrop.propTypes = {
  open: PropTypes.bool,
};

const blue = {
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const style = (theme) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  borderRadius: '12px',
  padding: '16px 32px 24px 32px',
  backgroundColor: theme.palette.mode === 'dark' ? '#0A1929' : 'white',
  boxShadow: `0px 2px 24px ${theme.palette.mode === 'dark' ? '#000' : '#383838'}`,
});

const CustomModalRoot = styled('div')`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CustomModalBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;


 
export default UseModal;