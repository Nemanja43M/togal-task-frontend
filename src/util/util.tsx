import React from "react";

import { Button, TextField } from "@mui/material";
import { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";

import { FormDefType } from "../types/interfaces";

export const renderForm = <T extends FieldValues>(
    formDef: FormDefType[],
    register: UseFormRegister<T>,
    errors: FieldErrors<T>
) => {
    const isFormDefPresent = formDef.length > 0;

    return (
        isFormDefPresent &&
        formDef?.map((field) => {
            const name = field.name as Path<T>;
            const errorMessage = errors[field.name as keyof T]?.message as string | undefined;

            if (field.type === "file") {
                return (
                    <TextField
                        {...register(name)}
                        key={field.id}
                        variant="outlined"
                        type="file"
                        fullWidth
                        id={field.name}
                        name={field.name}
                        error={!!errors[field.name]}
                        helperText={errorMessage}
                        color="primary"
                        label={field.name}
                    />
                );
            } else {
                return (
                    <TextField
                        {...register(name)}
                        key={field.id}
                        variant="outlined"
                        placeholder={field.placeholder}
                        type={field.type}
                        fullWidth
                        id={field.name}
                        name={field.name}
                        error={!!errors[field.name]}
                        helperText={errorMessage}
                        color="primary"
                        label={field.name}
                    ></TextField>
                );
            }
        })
    );
};
