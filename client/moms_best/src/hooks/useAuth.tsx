import { User, UserWithMetadata } from "@/types/user";
import { ApiUrl } from "@/url/ApiUrl";
import { useFetcher } from "@/url/Fetcher";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export type UserHookType = {
  user: User | undefined;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  refetch: () => void;
  isFetched: boolean;
  isSuccess: boolean;
  isLoggedIn: boolean;
  metadata?: Record<string, any> | null;
  setKey: (key: string, remember: boolean) => void;
  getKey: () => string | null;
  logout: () => void;
};

const useAuth = (): UserHookType => {
  const queryClient = useQueryClient();
  const setKey = (key: string, remember: boolean) =>
    remember
      ? localStorage.setItem("apiKey", key)
      : sessionStorage.setItem("apiKey", key);
  const getKey = () =>
    localStorage.getItem("apiKey") || sessionStorage.getItem("apiKey");
  const myFetcher = useFetcher(ApiUrl.user.my);

  const fetchStatus = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
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
    enabled: !!getKey(),
  });

  const removeQuery = () => {
    console.log("Logging out and removing user data");
    localStorage.removeItem("apiKey");
    sessionStorage.removeItem("apiKey");
    queryClient.resetQueries({ queryKey: ["user"] });
  };

  if (fetchStatus.isError) {
    console.error("Error fetching user data:", fetchStatus.error);
  }

  return {
    user: { ...fetchStatus.data } as User,
    isLoggedIn: !!fetchStatus.data,
    isLoading: fetchStatus.isLoading,
    isError: fetchStatus.isError,
    error: fetchStatus.error,
    refetch: fetchStatus.refetch,
    isFetched: fetchStatus.isFetched,
    isSuccess: fetchStatus.isSuccess,
    logout: removeQuery,
    setKey,
    getKey,
  };
};

export default useAuth;
