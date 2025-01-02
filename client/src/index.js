import React from "react";
import routes from "./routes";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "./index.css";


const container = document.getElementById("root");
const root = createRoot(container);
const router = createBrowserRouter(routes)
root.render(<RouterProvider router={router} />)
