import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.js";
import Search from "./Search.js";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<App />} />
                <Route path="/search" element={<Search />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);