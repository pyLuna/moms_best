import { ApiUrl } from "@/url/ApiUrl";
import { useFetcher } from "@/url/Fetcher";
import { useQuery } from "@tanstack/react-query";

const useMetadata = () => {
  const mdFetcher = useFetcher(ApiUrl.metadata.get);
  const key = sessionStorage.getItem("key");
  const metadata = useQuery({
    queryKey: ["metadata"],
    queryFn: async () => {
      const response = await mdFetcher.get();
      if (!response.ok) {
        throw new Error("Failed to fetch metadata");
      }
      const data = await response.json();
      return data;
    },
    retry: 2,
    refetchOnWindowFocus: false,
    enabled: !!key,
  });

  return {
    metadata: metadata.data,
    isLoading: metadata.isLoading,
    isError: metadata.isError,
    error: metadata.error,
    refetch: metadata.refetch,
    isFetched: metadata.isFetched,
    isSuccess: metadata.isSuccess,
  };
};

export default useMetadata;
