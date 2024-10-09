import React, { useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { List, Divider, IconButton, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { NavbarItem } from "./NavbarItem";
import { StyledNavbar, StyledNavbarHeader } from "../layout/styled";

import { getAllFolders } from "../api/api";
import { FolderBodyType } from "../types/interfaces";
import logo from "../img/64c804c83c2a878381a29da5_logo_togal.png";

export const Navbar = () => {
    const [open, setOpen] = useState(true);
    const [folderList, setFolderList] = useState<FolderBodyType[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleToggleDrawer = () => {
        setOpen((prevState) => !prevState);
    };

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const response = await getAllFolders();
                setFolderList(response.data);
            } catch (err) {
                setError("Failed to fetch folders");
                console.error(err);
            }
        };

        fetchFolders();

        const handleFolderCreated = () => {
            fetchFolders();
        };

        const handleDocumentCreated = () => {
            fetchFolders();
        };

        window.addEventListener("FolderCreated", handleFolderCreated);
        window.addEventListener("documentCreated", handleDocumentCreated);

        return () => {
            window.removeEventListener("FolderCreated", handleFolderCreated);
            window.removeEventListener("documentCreated", handleDocumentCreated);
        };
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <StyledNavbar variant="permanent" open={open}>
            <StyledNavbarHeader>
                {open && logo && (
                    <Box>
                        <img src={logo} alt="Logo" height="35px" />
                    </Box>
                )}
                <IconButton onClick={handleToggleDrawer}>
                    {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </StyledNavbarHeader>
            <Box
                sx={{
                    padding: open ? "30px 20px" : 0,
                }}
            >
                {open ? (
                    <Button
                        variant="contained"
                        startIcon={<AddOutlinedIcon />}
                        color="secondary"
                        size="large"
                        sx={{
                            textTransform: "none",
                        }}
                        onClick={() => navigate("/")}
                    >
                        New Folder
                    </Button>
                ) : (
                    <IconButton aria-label="Create new folder" onClick={() => navigate("/")}>
                        <AddBoxIcon />
                    </IconButton>
                )}
            </Box>
            <Divider sx={{ background: "#eee" }} />
            <List>
                {folderList.map((folderItem) => (
                    <NavbarItem
                        key={folderItem.id}
                        open={open}
                        title={folderItem.name}
                        docs={folderItem.documents}
                        folderId={folderItem.id}
                        onClick={() => navigate(`/new-doc/${folderItem.id}`, { state: { folderId: folderItem.id } })}
                    />
                ))}
            </List>
        </StyledNavbar>
    );
};
