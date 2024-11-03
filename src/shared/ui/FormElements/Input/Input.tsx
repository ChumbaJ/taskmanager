import { TextField, TextFieldProps } from "@mui/material";
import { Controller, FieldValues, RegisterOptions, useFormContext } from "react-hook-form";

interface CustomProps {
    name: string
    registerOptions?: RegisterOptions<FieldValues, string>;
}

type InputProps = CustomProps & TextFieldProps;

export const Input = (props: InputProps) => {
    const { name, className, registerOptions, ...rest } = props;
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            rules={registerOptions}
            render={({ field }) => (
                <TextField
                    required={!!registerOptions?.required}
                    className={className}
                    {...field}
                    {...rest}
                />
            )}
        />
    );
};
