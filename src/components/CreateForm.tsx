import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldValues } from "react-hook-form";

import { Loading } from "./Loading";
import { useAsyncService } from "../hooks/useAsyncService";
import { StyledButton, StyledForm, StyledPaper } from "../layout/styled";
import { CreateFormProps } from "../types/interfaces";
import { useParams } from "react-router-dom";

export const CreateForm = <T extends FieldValues>({ validationSchema, renderForm, onSubmit }: CreateFormProps<T>) => {
    const { folderId } = useParams();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<T>({
        resolver: zodResolver(validationSchema),
    });

    const { isLoading, fetchData } = useAsyncService();

    const handleFormSubmit = async (data: T) => {
        console.log(data);
        await fetchData(() => onSubmit(data));
    };

    return (
        <StyledPaper
            sx={{
                padding: "30px 0",
                boxShadow: "none",
                width: "100%",
            }}
        >
            <StyledForm
                onSubmit={(e) => {
                    const response = handleSubmit(handleFormSubmit);
                    void response(e);
                    let event = null;
                    if (folderId) {
                        event = new CustomEvent("Document", { detail: folderId });
                    } else {
                        event = new Event("Folder");
                    }
                    window.dispatchEvent(event);
                }}
            >
                {renderForm(register, errors)}
                <StyledButton type="submit" variant="contained" disabled={isLoading}>
                    {isLoading ? <Loading /> : "Submit"}
                </StyledButton>
            </StyledForm>
        </StyledPaper>
    );
};

export default CreateForm;
