import { User } from "@/types/user";
import { ApiUrl } from "@/url/ApiUrl";
import { useFetcher } from "@/url/Fetcher";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

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
  setMetadata?: React.Dispatch<
    React.SetStateAction<Record<string, any> | null>
  >;
  setKey: (key: string, remember: boolean) => void;
  getKey: () => string | null;
};

const useAuth = (): UserHookType => {
  const setKey = (key: string, remember: boolean) =>
    remember
      ? localStorage.setItem("apiKey", key)
      : sessionStorage.setItem("apiKey", key);
  const getKey = () =>
    localStorage.getItem("apiKey") || sessionStorage.getItem("apiKey");
  const [metadata, setMetadata] = useState<Record<string, any> | null>(null);
  const myFetcher = useFetcher(ApiUrl.user.my);

  const fetchStatus = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      console.log("key:", getKey());
      const response = await myFetcher.get();
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch user status");
      }
      return data as User;
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 2, // 2 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    enabled: !!metadata?.key || !!getKey(),
  });

  if (fetchStatus.isError) {
    toast.error(fetchStatus.error.toString());
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
    metadata: metadata,
    setMetadata,
    setKey,
    getKey,
  };
};

export default useAuth;
