import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { KakaoIdProvider } from "./KakaoIdContext";
import { UserNameProvider } from "./UserNameContext";

createRoot(document.getElementById("root")).render(
  <KakaoIdProvider>
    <UserNameProvider>
      <App />
    </UserNameProvider>
  </KakaoIdProvider>
);
