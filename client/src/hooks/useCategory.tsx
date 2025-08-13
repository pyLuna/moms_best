import { useUser } from "@/contexts/UserContext";
import { Category } from "@/types/category";
import { ApiUrl } from "@/url/ApiUrl";
import { useFetcher } from "@/url/Fetcher";
import { useQuery } from "@tanstack/react-query";

export default function useCategory() {
  const categoryFetcher = useFetcher(ApiUrl.category.get.all);
  const user = useUser();
  const {
    data: categories,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      console.log("Getting categories");
      const response = await categoryFetcher.get();
      return await response.json();
    },
    refetchOnWindowFocus: false,
    enabled: !user.user, // Only fetch if user is available
    retry: 1, // Retry once on failure
    staleTime: 1000 * 60 * 60 * 24, // 1 day
  });

  const forum = isLoading ? [] : categories?.filter((c) => c.from === "forum");
  const products = isLoading
    ? []
    : categories?.filter((c) => c.from === "product");

  return { categories, isLoading, isError, error, refetch, forum, products };
}
