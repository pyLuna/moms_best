import useAuth, { UserHookType } from "@/hooks/useAuth";
import useMetadata from "@/hooks/useMetadata";
import { createContext, ReactNode, useContext } from "react";

type UserContextType = UserHookType & {
  metadata: any; // Replace 'any' with the actual type of metadata if available
};

const UserContext = createContext<UserContextType | undefined>(undefined);
const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const authHook = useAuth();
  const metadataHook = useMetadata();
  return (
    <UserContext.Provider
      value={{
        ...authHook,
        metadata: metadataHook,
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
