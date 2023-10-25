import * as React from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ModalAddEvent from '../modalAddEvent';
import dayjs from "dayjs";


export default function BasicPopover({
    setData,
    data,
    openModal,
    handleCloseModal,
    tipoModal,
    setTipoModal,
    handleOpen,
    calendarRef
}) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const abrirModal= async (e)=>{
        let calendarApi = calendarRef.current.getApi();
        let date=dayjs(calendarApi.getDate()).format('YYYY-MM-DD');
        await setData({
            ...data,
            start:date,
            end: date,
            tipo:'Academico'
        })
        setTipoModal(e);
        handleClose();
        handleOpen();
    }

    return (
        <>
            <ModalAddEvent
                setData={setData}
                data={data}
                open={openModal}
                handleClose={handleCloseModal}
                tipoModal={tipoModal}
            />
            <div>
                <Button
                    aria-describedby={id}
                    variant="contained"
                    onClick={handleClick}
                    sx={{ borderRadius: "3px" }}
                    fullWidth={true}
                    startIcon={<AddIcon sx={{ color: 'white' }} />}
                >
                    Crear
                </Button>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                >
                    <Button fullWidth={true} onClick={()=>abrirModal("EventoPredifinido")}>Evento Predefinido</Button>
                    <Button fullWidth={true} onClick={()=>abrirModal("Evento")}>Evento</Button>
                </Popover>
            </div>
        </>

    );
}
