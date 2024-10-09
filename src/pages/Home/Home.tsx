import React, { useState } from "react";

import { z } from "zod";

import { v4 as uuidv4 } from "uuid";

import { addNewFolder } from "../../api/api";
import CreateForm from "../../components/CreateForm";
import { DefaultLayout } from "../../layout/DefaultLayout";
import { renderForm } from "../../util/util";
import { StyledBackground, StyledHeader, TextBackground } from "../../layout/styled";
import { AxiosResponse } from "axios";

const formDef = [
    {
        id: uuidv4(),
        name: "name",
        type: "text",
        placeholder: "Please enter folder name",
    },
];

const validationSchema = z.object({
    name: z.string().trim().min(1, "Folder name is required").max(35, "Folder name is too long"),
});

type ValidationSchemaType = z.infer<typeof validationSchema>;

const Home = () => {
    const [error, setError] = useState<string | null>(null);

    const handleCreateFolder = async (data: ValidationSchemaType): Promise<AxiosResponse> => {
        try {
            const response = await addNewFolder(data);

            window.dispatchEvent(new Event("FolderCreated"));

            return response;
        } catch (error) {
            setError("Failed to create folder.");
            console.error("Failed to create folder:", error);
            throw error;
        }
    };

    return (
        <DefaultLayout>
            <StyledBackground sx={{ flexDirection: "column" }}>
                <TextBackground>
                    <StyledHeader variant="h4">Create New Folder</StyledHeader>
                </TextBackground>
                <CreateForm<ValidationSchemaType>
                    validationSchema={validationSchema}
                    onSubmit={handleCreateFolder}
                    renderForm={(register, errors) => renderForm(formDef, register, errors)}
                />
            </StyledBackground>
        </DefaultLayout>
    );
};

export default Home;
