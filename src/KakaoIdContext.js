import React, { createContext, useState } from "react";

export const KakaoIdContext = createContext();

export const KakaoIdProvider = ({ children }) => {
  const [kakaoContext, setkakaoContext] = useState("");

  return (
    <KakaoIdContext.Provider value={[kakaoContext, setkakaoContext]}>
      {children}
    </KakaoIdContext.Provider>
  );
};
