import * as React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import br from "date-fns/locale/pt-BR";

import 'moment/locale/pt'
import 'date-fns/locale/pt-BR'

export default function InputDate(props) {

    const { label, value, handleDateChange, error } = props;
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
                inputFormat="DD/MM/YYYY"
                value={value}
                onChange={handleDateChange}
                renderInput={(params) => <TextField size='small' {...params} />}
                fullWidth={true}
                autoOk={true}
                inputVariant="outlined"
                id="date-picker-dialog"
                label={label || ''}
                disabled={props.disabled}
                required={props.required || false}
                sx={props.sx}
                invalidDateMessage="Data inválida"
                InputLabelProps={{ shrink: !!value }}
                error={props.error || ''}
                helperText={props.helperText || ''}                
                disablePast={props.disablePast}
            />
        </LocalizationProvider >
    )


};