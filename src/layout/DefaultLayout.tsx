import React, { ReactNode } from "react";
import { Grid } from "@mui/material";
import { Navbar } from "../components/Navbar";
import { PagePanel } from "../components/PagePanel";

export const DefaultLayout: React.FC<{ children?: ReactNode }> = ({ children }) => {
    return (
        <Grid display="flex" height="100svh">
            <Navbar />
            <PagePanel>{React.cloneElement(children as React.ReactElement<any>)}</PagePanel>
        </Grid>
    );
};
