import axios, { AxiosResponse } from "axios";
import { CreateFolderBody, DocBodyType, DocType, FolderBodyType } from "../types/interfaces";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
});

type AddNewFolderResponse = AxiosResponse<FolderBodyType>;
type AddNewDocResponse = AxiosResponse<DocBodyType>;
type GetAllFoldersResponse = AxiosResponse<FolderBodyType[]>;

export const addNewFolder = async (data: CreateFolderBody): Promise<AddNewFolderResponse> => {
    return await axiosInstance({
        url: "/folders",
        method: "POST",
        data: data,
    });
};

export const addNewDoc = async (documentData: {
    title: string;
    description: string;
    folderId: number;
}): Promise<AddNewDocResponse> => {
    return await axiosInstance({
        url: "/documents",
        method: "POST",
        data: documentData,
    });
};

export const getAllFolders = async (): Promise<GetAllFoldersResponse> => {
    return await axiosInstance({
        url: "/folders",
        method: "GET",
    });
};
export const uploadFile = async (formData: FormData): Promise<AxiosResponse<any, any>> => {
    return await axiosInstance({
        url: "/documents/upload",
        method: "POST",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
export const getDocumentDetails = async (docId: string): Promise<AxiosResponse<DocType>> => {
    return await axiosInstance({
        url: `/documents/${docId}`,
        method: "GET",
    });
};
export const getFileVersions = async (documentId: string) => {
    return await axios.get(`http://localhost:3000/api/documents/${documentId}/file-versions`);
};
export const downloadFile = async (fileVersionId: string): Promise<AxiosResponse<Blob>> => {
    return await axiosInstance({
        url: `documents/download/${fileVersionId}`,
        method: "GET",
        responseType: "blob",
    });
};
