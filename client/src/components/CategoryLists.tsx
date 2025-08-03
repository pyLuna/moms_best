import { ApiUrl } from "@/url/ApiUrl";
import { useFetcher } from "@/url/Fetcher";
import { useQuery } from "@tanstack/react-query";
import { useImperativeHandle } from "react";

interface Category {
  _id?: string;
  category_id: string;
  category_name: string;
  from: "product" | "forum" | "report";
  count: number;
  is_deleted?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
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
    <ul className="flex flex-col gap-4 mt-4">
      {data.map((category) => (
        <li
          key={category._id}
          className="flex flex-col gap-2 p-4 border rounded"
        >
          <h1 className="text-lg font-semibold">{category.category_name}</h1>
          <span className="text-sm text-gray-500">
            {category.category_id} | {category.from}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default CategoryLists;
