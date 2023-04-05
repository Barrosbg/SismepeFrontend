import { TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from  'react';

const TextInput = ({
    label,
    input,
    type,
    variant,
    size,
    required,
    meta: { touched, invalid, error },
    ...custom
  }) => {


    return <TextField
        margin="normal"
        label={label}
        placeholder={label}
        type={type}
        size={size}
        variant={variant}
        error={touched && error}
        helperText={touched && error ? error : ""}
        {...input}
        {...custom}
    />
  }

export default TextInput;