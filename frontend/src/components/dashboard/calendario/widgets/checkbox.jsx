import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Checkboxes({
    data,
    setData
}) {
    const handleSwitch = async () => {
        await setData({
            ...data,
            allDay: !data.allDay
        });
    }
    return (
        <>
        <div>
        <FormControlLabel control={
        <Checkbox onChange={handleSwitch}
            checked={data.allDay}
        />} label="Todo el dia" />
        </div>
        </>
    );
}