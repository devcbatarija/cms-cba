import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import ModalUpdateEvent from '../modalUpdateEvent';
import Icon from '@mui/material/Icon';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function BasicStack({ eventsPredefinidos }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            {open ? <ModalUpdateEvent
                id={id}
                open={open}
                handleClose={handleClose}
                tipoModal={'EventoPredefinido'}
            /> : null}
            <Box sx={{ width: '100%' }}>
                <Stack spacing={1}>
                    {
                        eventsPredefinidos.length > 0 ?
                            eventsPredefinidos.map((evento) => (
                                evento.allDay ?
                                    <Item style={{ backgroundColor: evento.color, color: "white" }} key={evento.id} className='fc-event' data-event={JSON.stringify(evento)}>{evento.title}</Item> :
                                    <Item key={evento.id} className='fc-event' data-event={JSON.stringify(evento)}><span style={{ color: evento.color }}>
                                        <FiberManualRecordRoundedIcon style={{ width: '12px' }} /></span>{evento.start_Time} {evento.title}</Item>
                            )) : (
                                <div>No hay datos</div>
                            )
                    }
                </Stack>
            </Box>
        </>
    );
}