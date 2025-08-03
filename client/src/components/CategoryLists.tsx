import { Category } from "@/types/category";
import { ApiUrl } from "@/url/ApiUrl";
import { useFetcher } from "@/url/Fetcher";
import { useQuery } from "@tanstack/react-query";
import { useImperativeHandle } from "react";
import CategoryTile from "./CategoryTile";

const CategoryLists = ({ ref }: { ref: React.Ref<any> }) => {
  const categoryFetcher = useFetcher(ApiUrl.category.get.all);
  const { data, isLoading, isError, refetch } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await categoryFetcher.get();
      if (!response.ok) throw new Error("Network response was not ok");
      return await response.json();
    },
    retry: false,
  });

  useImperativeHandle(ref, () => ({
    refetch: () => refetch(),
  }));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading categories</div>;
  if (!data || data.length === 0) return <div>No categories found</div>;
  return (
    <ul className="flex flex-col gap-2 mt-4 overflow-y-auto max-h-[400px]">
      {data.map((category) => (
        <CategoryTile
          key={category._id}
          category={category}
          onDelete={() => refetch()}
        />
      ))}
    </ul>
  );
};

export default CategoryLists;
