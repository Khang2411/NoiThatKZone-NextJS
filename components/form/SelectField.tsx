import { Cities, Districts, Wards } from '@/models';
import { FormControl, InputLabel, MenuItem, Select, SelectProps } from '@mui/material';
import * as React from 'react';
import { Control, useController } from "react-hook-form";
import { FormHelperText } from '@mui/material';

type SelectFieldProps = SelectProps & {
    control: Control<any>;
    name: string,
    options?: Wards[] | Districts[] | Cities[]
}

export function SelectField({ control, name, label, options, onChange: externalOnChange, ...rest }: SelectFieldProps) {
    const {
        field,
        fieldState,
    } = useController({
        name,
        control
    });
    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                label={label}
                id="demo-simple-select"
                name={name}
                value={field.value}
                error={!!fieldState.error}
                onChange={(event, child) => {
                    field.onChange(event) // onChange of React Hook Form
                    externalOnChange?.(event, child) // props onChange of ParentComponent
                }}
                {...rest}
            >
                {options?.map((item: { id: number, name: string }, index: React.Key) =>
                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                )}
            </Select>
            <FormHelperText sx={{ color: '#D84949' }}>{fieldState.error?.message}</FormHelperText>
        </FormControl>
    );
}
