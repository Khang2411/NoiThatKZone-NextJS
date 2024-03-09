import {  RadioGroup, RadioProps, } from '@mui/material';
import * as React from 'react';
import { Control, useController } from "react-hook-form";
import { FormHelperText } from '@mui/material';

type RadioFieldProps = RadioProps & {
    label?: React.ReactNode,
    control?: Control<any>,
    name: string,
    defaultValue?: string,
    option: any
}

export function RadioField({ control, name, option }: RadioFieldProps) {
    const {
        field,
        fieldState,
    } = useController({
        name,
        control
    });
    return (
        <RadioGroup {...field}>
            {option}
            <FormHelperText sx={{ color: '#D84949' }}>{fieldState.error?.message}</FormHelperText>
        </RadioGroup>
    );
}
