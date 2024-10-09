import * as React from "react";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const Loading = () => {
  return (
    <Backdrop
      sx={{
        color: "#5C62F9",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
