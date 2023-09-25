import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function SwitchLabels({
    data,
    setData
}) {
    const handleSwitch= async()=>{
        await setData({
            ...data,
            allDay: !data.allDay
        });
    }
  return (
      <FormControlLabel onClick={handleSwitch} control={<Switch defaultChecked />} label="Todo el dia" />
  );
}