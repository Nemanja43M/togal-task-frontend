import React from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DocDetails from "../pages/DocDetails/DocDetails";
import Home from "../pages/Home/Home";
import NotFound from "../pages/Notfound/NotFound";
import NewDocument from "../pages/NewDocument/NewDocument";

const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/new-doc/:folderId", element: <NewDocument /> },
    { path: "/:docId", element: <DocDetails /> },
    { path: "/*", element: <NotFound /> },
]);

export const DefaultRouter = () => {
    return <RouterProvider router={router} />;
};
