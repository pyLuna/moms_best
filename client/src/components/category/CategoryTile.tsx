import { Category } from "@/types/category";
import { ApiUrl } from "@/url/ApiUrl";
import { useFetcher } from "@/url/Fetcher";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";

const CategoryTile = ({
  category,
  onDelete,
}: {
  category: Category;
  onDelete: () => void;
}) => {
  const deleteFetcher = useFetcher(
    ApiUrl.category.delete(category.category_id!)
  );

  const handleDelete = async () => {
    const response = await deleteFetcher.delete();
    if (!response.ok) {
      console.error("Failed to delete category");
      return;
    }
    onDelete();
    toast.success("Category deleted successfully");
  };

  return (
    <li className="flex flex-row gap-2 border rounded-md items-center p-4">
      <div className="flex flex-col grow">
        <h1 className="text-lg font-semibold">{category.category_name}</h1>
        <span className="text-sm text-gray-500">
          {category.category_id} | {category.from}
        </span>
      </div>

      <Button
        variant="destructive"
        onClick={handleDelete}
      >
        <Trash2Icon />
      </Button>
    </li>
  );
};

export default CategoryTile;
