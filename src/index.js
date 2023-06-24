import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { KakaoIdProvider } from "./KakaoIdContext";

createRoot(document.getElementById("root")).render(
  <KakaoIdProvider>
    <App />
  </KakaoIdProvider>
);
