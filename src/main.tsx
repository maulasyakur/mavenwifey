import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import RootLayout from "./components/RootLayout";
import ChatRoom from "./pages/ChatRoom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="chat-room" element={<ChatRoom />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
