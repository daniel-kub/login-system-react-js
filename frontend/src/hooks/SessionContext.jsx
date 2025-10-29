import { createContext, useContext } from "react";
import useSessionStorage from "../hooks/useSessionStorage";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useSessionStorage("session", {
    userId: null,
    fullName: null,
  });

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
