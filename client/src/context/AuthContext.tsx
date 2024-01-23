import React, { createContext, useState } from "react";
import { User } from "../types";

export const AuthContext = createContext({
  user: undefined as User | undefined,
  setUser: (user: User) => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
