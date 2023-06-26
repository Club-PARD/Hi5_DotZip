import React, { createContext, useState } from "react";

export const UserNameContext = createContext();

export const UserNameProvider = ({ children }) => {
  const [userContext, setuserContext] = useState("");

  return (
    <UserNameContext.Provider value={[userContext, setuserContext]}>
      {children}
    </UserNameContext.Provider>
  );
};