import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import "./globals.css";
import SessionForm from "./pages/SessionForm.js";
import AppLayout from "./AppLayout.js";
import LoginPage from "./pages/LoginPage.js";
import App from "./App";

const container = document.getElementById("root")!;

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="sessions">
            <Route index element={<SessionForm />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
