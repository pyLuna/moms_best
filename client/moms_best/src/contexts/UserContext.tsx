import useAuth, { UserHookType } from "@/hooks/useAuth";
import { createContext, ReactNode, useContext } from "react";

type UserContextType = UserHookType;

const UserContext = createContext<UserContextType | undefined>(undefined);
const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const authHook = useAuth();
  return (
    <UserContext.Provider
      value={{
        ...authHook,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
};

export default UserContextProvider;
export { UserContext, useUser };
