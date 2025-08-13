import { UserWithMetadata } from "@/types/user";
import { ApiUrl } from "@/url/ApiUrl";
import { useFetcher } from "@/url/Fetcher";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export type UserHookType = {
  user: UserWithMetadata | undefined;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  refetch: () => void;
  isFetched: boolean;
  isSuccess: boolean;
  isLoggedIn: boolean;
  metadata?: Record<string, any> | null;
  isAdmin: boolean;
  isSeller: boolean;
  isUser: boolean;
  logout: () => void;
};

const useAuth = (): UserHookType => {
  const queryClient = useQueryClient();
  const myFetcher = useFetcher(ApiUrl.user.my);
  const logoutFetcher = useFetcher(ApiUrl.user.logout);

  const fetchStatus = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      console.log("Fetching user data");
      const response = await myFetcher.get();
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch user status");
      }
      return data as UserWithMetadata;
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 2, // 2 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  const logout = async () => {
    await logoutFetcher.get();
    queryClient.resetQueries({ queryKey: ["user"] });
    toast.success("Logged out successfully");
  };

  if (fetchStatus.isError) {
    console.error("Error fetching user data:", fetchStatus.error);
  }

  return {
    user: { ...fetchStatus.data } as UserWithMetadata,
    isLoggedIn: !!fetchStatus.data,
    isLoading: fetchStatus.isLoading,
    isError: fetchStatus.isError,
    error: fetchStatus.error,
    refetch: fetchStatus.refetch,
    isFetched: fetchStatus.isFetched,
    isSuccess: fetchStatus.isSuccess,
    isAdmin: fetchStatus.data?.metadata?.role === "admin",
    isSeller: fetchStatus.data?.metadata?.role === "seller",
    isUser: fetchStatus.data?.metadata?.role === "user",
    logout,
  };
};

export default useAuth;
