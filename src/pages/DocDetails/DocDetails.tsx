import React, { useEffect, useState } from "react";
import { DefaultLayout } from "../../layout/DefaultLayout";
import {
    StyleBox,
    StyledBackground,
    StyledHeader,
    StyledListItem,
    StyledParagraph,
    TextBackground,
} from "../../layout/styled";
import { useParams } from "react-router-dom";
import { Box, Button, Collapse, Divider, IconButton, List, ListItemText } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { downloadFile, getDocumentDetails, getFileVersions, uploadFile } from "../../api/api";

const DocDetails = () => {
    const [info, setInfo] = useState<any>(null);
    const [fileVersions, setFileVersions] = useState<any[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadAttempted, setUploadAttempted] = useState(false);
    const { docId } = useParams();
    const id = docId as string;

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const response = await getDocumentDetails(id);
                setInfo(response.data);
            } catch (error) {
                console.error("Error fetching document:", error);
            }
        };

        const fetchFileVersions = async () => {
            try {
                const response = await getFileVersions(id);
                setFileVersions(response.data);
            } catch (error) {
                console.error("Error fetching file versions:", error);
            }
        };

        fetchDocument();
        fetchFileVersions();
    }, [docId]);

    if (!info) {
        return <div>Loading...</div>;
    }

    const latestFileVersion = fileVersions.length > 0 ? fileVersions[0] : null;

    const handleUpload = async () => {
        setUploadAttempted(true);
        if (selectedFile) {
            const uploadFormData = new FormData();
            uploadFormData.append("documentId", info.id);
            uploadFormData.append("file", selectedFile);
            try {
                const uploadResponse = await uploadFile(uploadFormData);
                console.log("File uploaded:", uploadResponse.data);

                const updatedFileVersions = await getFileVersions(id);
                setFileVersions(updatedFileVersions.data);
                setSelectedFile(null);
                setUploadAttempted(false);
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList && fileList.length > 0) {
            setSelectedFile(fileList[0]);
            setUploadAttempted(false);
        }
    };

    const handleFileInputClick = () => {
        const fileInput = document.getElementById("file-upload");
        if (fileInput) {
            fileInput.click();
        }
    };
    const handleDownload = async (fileVersionId: string) => {
        try {
            const response = await downloadFile(fileVersionId);

            const contentType = response.headers["content-type"];
            const blob = new Blob([response.data], { type: contentType });

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;

            const fileExtension = contentType.split("/")[1];
            a.download = `${fileVersionId}.${fileExtension}`;

            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    };

    return (
        <DefaultLayout>
            <StyledBackground sx={{ flexDirection: "column" }}>
                <StyleBox>
                    <TextBackground>
                        <StyledHeader variant="h4">{info.title}</StyledHeader>
                        <StyledParagraph variant="subtitle1" sx={{ marginTop: "20px" }}>
                            {info.description}
                        </StyledParagraph>
                    </TextBackground>
                    <IconButton
                        color="secondary"
                        aria-label="Edit document"
                        size="small"
                        sx={{ justifyContent: "flex-end" }}
                    >
                        <BorderColorIcon />
                    </IconButton>
                </StyleBox>
                <Box component={"div"} sx={{ textAlign: "right", margin: "15px 0" }}>
                    <Button
                        variant="text"
                        color="secondary"
                        sx={{
                            textTransform: "none",
                            mr: 2,
                        }}
                        onClick={() => setShowDropdown((prevState) => !prevState)}
                    >
                        {showDropdown ? "Hide" : "View all"} files
                    </Button>
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                        id="file-upload"
                    />
                    <Button
                        variant="text"
                        color="secondary"
                        sx={{
                            textTransform: "none",
                        }}
                        onClick={handleFileInputClick}
                    >
                        Select File
                    </Button>
                    <Button
                        variant="text"
                        color="secondary"
                        sx={{
                            textTransform: "none",
                            ml: 2,
                        }}
                        onClick={handleUpload}
                    >
                        Upload new version
                    </Button>
                </Box>

                {uploadAttempted && selectedFile === null && (
                    <StyledParagraph sx={{ color: "red" }}>Please select a file</StyledParagraph>
                )}
                <Divider />
                <List component="div" disablePadding>
                    {latestFileVersion && (
                        <StyledListItem>
                            <ListItemText
                                primary={latestFileVersion.filePath}
                                secondary={latestFileVersion.createdAt}
                            />
                            <IconButton
                                color="secondary"
                                aria-label="Download file"
                                size="small"
                                onClick={() => handleDownload(latestFileVersion.id)}
                            >
                                <CloudDownloadIcon />
                            </IconButton>
                        </StyledListItem>
                    )}
                    <Divider />
                    <Collapse in={showDropdown} timeout="auto" unmountOnExit>
                        {fileVersions?.slice(1)?.map((file: any, index: number) => (
                            <StyledListItem key={file.id || index}>
                                <ListItemText primary={file.filePath} secondary={file.createdAt} />
                                <IconButton
                                    color="secondary"
                                    aria-label="Download file"
                                    size="small"
                                    onClick={() => handleDownload(file.id)}
                                >
                                    <CloudDownloadIcon />
                                </IconButton>
                            </StyledListItem>
                        ))}
                    </Collapse>
                </List>
            </StyledBackground>
        </DefaultLayout>
    );
};

export default DocDetails;
