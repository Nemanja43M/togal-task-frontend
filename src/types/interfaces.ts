import { AxiosResponse } from "axios";

import { ZodSchema } from "zod";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export interface FolderBodyType {
    id: number;
    name: string;
    createdAt: Date;
    documents: Document[];
}
export interface CreateFolderBody {
    name: string;
}
export interface Document {
    id: number;
    title: string;
    content: string;
    folder: FolderBodyType;
}

export interface DocBodyType {
    id: string;
    file: string;
    title: string;
    description: string;
}
export interface DocType {
    file?: File;
    title: string;
    description: string;
}
export interface Folder {
    id: string;
    file: File;
    uploadDate: Date;
}

export interface FileVersion {
    id: string;
    file: File;
    uploadDate: Date;
}

export interface Document {
    id: number;
    title: string;
    description: string;
    versions: FileVersion[];
}
export interface FormDefType {
    id: string;
    name: string;
    type: string;
    placeholder: string;
}

export interface CreateFormProps<T extends FieldValues> {
    validationSchema: ZodSchema<T>;
    onSubmit: (data: T) => Promise<AxiosResponse<T>>;
    renderForm: (register: UseFormRegister<T>, errors: FieldErrors<T>) => React.ReactNode;
}
