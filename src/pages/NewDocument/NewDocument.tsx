import React from "react";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { addNewDoc, uploadFile } from "../../api/api";
import CreateForm from "../../components/CreateForm";
import { DefaultLayout } from "../../layout/DefaultLayout";
import { renderForm } from "../../util/util";
import { StyledBackground, StyledHeader, TextBackground } from "../../layout/styled";
import { AxiosResponse } from "axios";
import { useLocation } from "react-router-dom";
import { FormDefType } from "../../types/interfaces";

const validationSchema = z.object({
    title: z.string().trim().min(3, "Title is required").max(35, "Title is too long"),
    description: z.string().trim().min(3, "Description is required").max(200, "Description is too long"),
    file: z.any().optional(),
});

const formDef: FormDefType[] = [
    {
        id: uuidv4(),
        name: "title",
        type: "text",
        placeholder: "Please enter document title",
    },
    {
        id: uuidv4(),
        name: "description",
        type: "textarea",
        placeholder: "Please enter document description",
    },
    {
        id: uuidv4(),
        name: "file",
        type: "file",
        placeholder: "",
    },
];

type ValidationSchemaType = z.infer<typeof validationSchema>;

const NewDocument = () => {
    const location = useLocation();
    const folderId = location.state?.folderId;

    const onSubmit = async (data: ValidationSchemaType): Promise<AxiosResponse<any, any>> => {
        try {
            const documentData = {
                title: data.title,
                description: data.description,
                folderId: folderId,
            };

            console.log("SALJE SE", documentData);
            const documentResponse = await addNewDoc(documentData);

            const event = new CustomEvent("documentCreated", {
                detail: documentResponse.data,
            });

            if (data.file) {
                const uploadFormData = new FormData();
                uploadFormData.append("documentId", documentResponse.data.id);
                uploadFormData.append("file", data.file[0]);
                console.log(data.file);

                uploadFormData.forEach((value, key) => {
                    console.log(key, value);
                });

                const uploadResponse = await uploadFile(uploadFormData);
                console.log("File uploaded:", uploadResponse.data);
            }

            window.dispatchEvent(event);
            console.log("Document created:", documentResponse.data);
            return documentResponse;
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    };

    return (
        <DefaultLayout>
            <StyledBackground sx={{ flexDirection: "column" }}>
                <TextBackground>
                    <StyledHeader variant="h4">Create New Document</StyledHeader>
                    <p style={{ color: "gray", marginTop: "10px" }}>* All fields are required!</p>
                </TextBackground>
                <CreateForm<ValidationSchemaType>
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    renderForm={(register, errors) => renderForm(formDef, register, errors)}
                />
            </StyledBackground>
        </DefaultLayout>
    );
};

export default NewDocument;
