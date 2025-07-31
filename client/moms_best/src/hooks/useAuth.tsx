import { User } from "@/types/user";
import { ApiUrl } from "@/url/ApiUrl";
import { useFetcher } from "@/url/Fetcher";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

interface LoginOptions {
  onSuccess?: () => void;
  onError?: () => void;
  displayToast?: boolean;
}

export type UserHookType = {
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

const useAuth = (): UserHookType => {
  const myFetcher = useFetcher(ApiUrl.user.my, { useKey: true });
  const loginFetcher = useFetcher(ApiUrl.email, { useKey: false });
  const key = sessionStorage.getItem("key");

  const fetchStatus = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await myFetcher.get();
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
    enabled: !!key, // Only fetch if key is available
  });

  const login = async (
    event: React.FormEvent,
    options?: {
      onSuccess?: () => void;
      onError?: () => void;
      displayToast?: boolean;
    }
  ) => {
    const viewToast = options?.displayToast ?? true;

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log("Login data:", data);
    const result = await loginFetcher.post(data);

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

  return {
    user: { ...fetchStatus.data } as User,
    isLoggedIn: !!fetchStatus.data,
    isLoading: fetchStatus.isLoading,
    isError: fetchStatus.isError,
    error: fetchStatus.error,
    refetch: fetchStatus.refetch,
    isFetched: fetchStatus.isFetched,
    isSuccess: fetchStatus.isSuccess,
    login: login,
  };
};

export default useAuth;
