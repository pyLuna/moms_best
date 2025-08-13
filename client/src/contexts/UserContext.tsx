import Authenticate from "@/components/auth/Authenticate";
import useAuth, { UserHookType } from "@/hooks/useAuth";
import { createContext, ReactNode, useContext, useState } from "react";

type UserContextType = UserHookType;

const UserContext = createContext<UserContextType | undefined>(undefined);
const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const authHook = useAuth();
  const [displayLogin, setDisplayLogin] = useState(authHook.isGuest);
  const [displaySignUp, setDisplaySignUp] = useState(false);
  console.log("UserContextProvider rendered", authHook);
  return (
    <>
      <UserContext.Provider
        value={{
          ...authHook,
        }}
      >
        {children}
        <Authenticate
          openLogin={displayLogin}
          openSignUp={displaySignUp}
          setOpenLogin={setDisplayLogin}
          setOpenSignUp={setDisplaySignUp}
        />
      </UserContext.Provider>
    </>
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
