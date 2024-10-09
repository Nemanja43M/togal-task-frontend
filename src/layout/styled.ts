import * as React from "react";

import {
    Button,
    Box,
    Paper,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    ButtonProps,
    TableContainerProps,
    Grid,
    ListItem,
    ListItemButton,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

import { closedMixin, openedMixin } from "./styleMixins";

interface StyledButtonProps extends ButtonProps {
    href?: string;
    target?: string;
}

interface StyledTableContainerProps extends TableContainerProps {
    component?: React.ElementType;
    elevation: number;
}

interface StyledFormProps {
    onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export const StyledBackground = styled(Paper)(({ theme }) => ({
    flexGrow: 1,
    height: "calc(100% - 60px)",
    padding: theme.spacing(4),
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `right`,
    backgroundSize: `contain 90%`,
    display: "flex",
    flexWrap: "nowrap",
    overflow: `auto`,
    "&::-webkit-scrollbar": {
        width: "5px",
        height: "5px",
    },
    "&::-webkit-scrollbar-track": {
        backgroundColor: "#f1f1f1",
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(130,90,160,)",
        borderRadius: "8px",
    },
}));

export const StyledBackgroundLight = styled(StyledBackground)(() => ({
    backgroundColor: "#fff",
}));

export const TextBackground = styled(Paper)(({ theme }) => ({
    backgroundColor: "transparent",
    boxShadow: "none",
}));

export const StyledHeader = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    color: "rgba(35,35,35)",
}));

export const StyledParagraph = styled(Typography)(({ theme }) => ({
    fontWeight: 500,
    color: "rgba(85,85,100)",
}));

export const StyledDescription = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    marginY: theme.spacing(4),
    color: theme.palette.common.black,
    lineHeight: theme.spacing(3),
}));

export const StyledListItem = styled(ListItem)(({ theme }) => ({
    color: "rgb(140,140,140)",
    "&:first-of-type": {
        color: "rgb(85,85,100)",
    },
    "& .MuiButtonBase-root": {
        opacity: 0.4,
        "& .MuiSvgIcon-root": {
            color: "rgb(185,50,185)",
        },
        "&:hover": {
            opacity: 1,
        },
    },
}));

export const StyleBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    "& .MuiButtonBase-root": {
        "& .MuiSvgIcon-root": {
            color: "rgba(80,120,120)",
        },
    },
}));

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
    backgroundColor: "rgba(185,50,185,0.3)",
    "&:hover": {
        backgroundColor: "rgba(185,50,185,0.5)",
    },
}));

export const Accent = styled("span")(({ theme }) => ({
    color: "#5C62F9",
    fontWeight: 600,
    margin: theme.spacing(0.5),
}));

export const StyledButton = styled(Button)<StyledButtonProps>(() => ({
    textTransform: "none",
    backgroundColor: "#5C62F9",
    "&:hover": {
        backgroundColor: "#4B52D4",
    },
}));

export const StyledTableContainer = styled(TableContainer)<StyledTableContainerProps>(() => ({
    "&::-webkit-scrollbar": {
        width: "5px",
        height: "5px",
    },
    "&::-webkit-scrollbar-track": {
        backgroundColor: "#F2F3F5",
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#5C62F9",
        borderRadius: "8px",
    },
}));

export const StyledTableHeader = styled(TableHead)(() => ({
    "& th": {
        backgroundColor: "rgba(209,221,241)",
        fontWeight: 700,
    },
}));

export const StyledTableRow = styled(TableRow)(() => ({
    "&:nth-of-type(even)": {
        backgroundColor: "rgb(232, 237, 242)",
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

export const PagePanelBox = styled(Box)(() => ({
    padding: 50,
    flexGrow: 1,
    backgroundColor: "#E6E6EA",

    "& .MuiPaper-root": {
        color: "#fff",
        "& svg ": {
            color: "#fff",
        },
    },
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    width: "70%",
    height: "80%",
    overflow: "auto",

    "&::-webkit-scrollbar": {
        width: "5px",
        height: "5px",
    },
    "&::-webkit-scrollbar-track": {
        backgroundColor: "#F2F3F5",
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#5C62F9",
        borderRadius: "8px",
    },
}));

export const StyledForm = styled("form")<StyledFormProps>(() => ({
    width: "100%",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
}));

export const StyledGridLayout = styled(Grid)(() => ({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
}));

export const NoDataBox = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(6),
    minHeight: "400px",
    width: "80%",
    height: "80%",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    color: "#5C62F9 !important",
    fontWeight: "bold",
    margin: theme.spacing(0.5),
    // backgroundImage: `url(${noDataImg})`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `center`,
    backgroundSize: `contain 50%`,
    backgroundColor: "rgba(209,221,241,0.8)",
}));

export const StyledNavbarHeader = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

export const StyledNavbar = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: 240,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",

    "& .MuiPaper-root": {
        display: "flex",
        color: "#fff",
        backgroundColor: "#01082D",
        "& svg": {
            color: "#fff",
        },
    },

    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));
