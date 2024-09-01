"use client";

import { Slide } from "@mui/material";
import { SnackbarProvider } from "notistack";
import React from "react";

const GlobalWrapper = ({ children }) => {
  return (
    <>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        TransitionComponent={Slide}
      >
        {children}
      </SnackbarProvider>
    </>
  );
};

export default GlobalWrapper;
