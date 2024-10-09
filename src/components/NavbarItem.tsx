import React, { MouseEventHandler, useEffect, useState } from "react";

import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { useNavigate } from "react-router-dom";
import { StyledListItemButton } from "../layout/styled";
import { DocBodyType } from "../types/interfaces";

export const NavbarItem = ({
    folderId,
    open,
    icon,
    title,
    docs,
    onClick,
}: {
    open: boolean;
    icon?: JSX.Element;
    title: string;
    docs?: any; // ???
    folderId: number;
    onClick?: MouseEventHandler;
}) => {
    const navigate = useNavigate();
    const [isVisible, setisVisible] = useState(false);
    const [documents, setDocuments] = useState<DocBodyType[]>(docs || []);

    useEffect(() => {
        const handleDocumentCreated: EventListener = (event) => {
            const customEvent = event as CustomEvent<DocBodyType>;
            const newDocument = customEvent.detail;
            console.log("New Document Detail:", newDocument);

            setDocuments((prevDocs) => {
                const updatedDocs = [...prevDocs, newDocument];
                console.log("Updated Documents:", updatedDocs);
                return updatedDocs;
            });
        };

        window.addEventListener("documentCreated", handleDocumentCreated);

        return () => {
            window.removeEventListener("documentCreated", handleDocumentCreated);
        };
    }, []);

    return (
        <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                }}
                onClick={() => {
                    setisVisible((prevState) => !prevState);
                    console.log("Folder ID:", folderId);
                }}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                    }}
                >
                    {isVisible ? <FolderOpenIcon /> : <FolderIcon />}
                </ListItemIcon>
                <ListItemText primary={title} sx={{ opacity: open ? 1 : 0 }} />
                {isVisible ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isVisible} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <StyledListItemButton
                        sx={{ pl: 4 }}
                        onClick={() => navigate(`/new-doc/${folderId}`, { state: { folderId } })} // Prosledi folderId
                    >
                        <ListItemIcon>
                            <NoteAddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add Document" />
                    </StyledListItemButton>
                    {docs?.map((doc: any) => (
                        <ListItemButton key={doc?.id} sx={{ pl: 4 }} onClick={() => navigate(`/${doc?.id}`)}>
                            <ListItemIcon>
                                <InsertDriveFileIcon />
                            </ListItemIcon>
                            <ListItemText primary={doc?.title} secondary={doc?.description} />
                        </ListItemButton>
                    ))}
                </List>
            </Collapse>
        </ListItem>
    );
};
