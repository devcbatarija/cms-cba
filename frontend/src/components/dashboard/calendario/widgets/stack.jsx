import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function BasicStack({ eventsPredefinidos }) {
    return (
        <Box sx={{ width: '100%' }}>
            <Stack spacing={1}>
                {
                    eventsPredefinidos.length > 0 ?
                        eventsPredefinidos.map((evento) => (
                            <Item style={{ backgroundColor: evento.color, color:"white" }} key={evento.id} className='fc-event' data-event={JSON.stringify(evento)}>{evento.title}</Item>
                        )) : (
                            <div>No hay datos</div>
                        )
                }
            </Stack>
        </Box>
    );
}