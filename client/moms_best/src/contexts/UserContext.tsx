import { User } from "@/types/user";
import { ApiUrl } from "@/url/ApiUrl";
import { Fetcher } from "@/url/Fetcher";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";
import { toast } from "sonner";

interface LoginOptions {
  onSuccess?: () => void;
  onError?: () => void;
  displayToast?: boolean;
}

type UserContextType = {
  user: User | undefined;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  refetch: () => void;
  isFetched: boolean;
  isSuccess: boolean;
  isLoggedIn: boolean;
  login: (event: React.FormEvent, options?: LoginOptions) => Promise<void>;
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
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 2, // 2 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  const login = async (
    event: React.FormEvent,
    options?: {
      onSuccess?: () => void;
      onError?: () => void;
      displayToast?: boolean;
    }
  ) => {
    const api = new Fetcher(ApiUrl.email);
    const viewToast = options?.displayToast ?? true;

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log("Login data:", data);
    const result = await api.post(data);

    if (!result.ok) {
      console.error("Login failed", await result.json());
      if (viewToast) {
        toast.error("Login failed. Please check your credentials.");
      }
      options?.onError?.();
      throw new Error("Failed to login");
    } else {
      fetchStatus?.refetch();
      options?.onSuccess?.();
      if (viewToast) {
        toast.success("Login successful!", {
          description: "Welcome back!",
        });
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: { ...fetchStatus.data } as User,
        isLoggedIn: !!fetchStatus.data,
        isLoading: fetchStatus.isLoading,
        isError: fetchStatus.isError,
        error: fetchStatus.error,
        refetch: fetchStatus.refetch,
        isFetched: fetchStatus.isFetched,
        isSuccess: fetchStatus.isSuccess,
        login: login,
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
