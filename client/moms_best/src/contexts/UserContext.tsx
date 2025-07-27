import { User } from "@/types/user";
import { ApiUrl } from "@/url/ApiUrl";
import { Fetcher } from "@/url/Fetcher";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";

type UserContextType = {
  user: User | undefined;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  refetch: () => void;
  isFetched: boolean;
  isSuccess: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);
const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const fetchStatus = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const api = new Fetcher(ApiUrl.user.my);

      const response = await api.get();
      if (!response.ok) {
        throw new Error("Failed to fetch user status");
      }
      const data = await response.json();
      return data as User;
    },
  });

  return (
    <UserContext.Provider
      value={{
        user: fetchStatus.data,
        isLoading: fetchStatus.isLoading,
        isError: fetchStatus.isError,
        error: fetchStatus.error,
        refetch: fetchStatus.refetch,
        isFetched: fetchStatus.isFetched,
        isSuccess: fetchStatus.isSuccess,
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
