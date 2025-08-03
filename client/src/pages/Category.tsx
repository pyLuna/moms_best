import CategoryLists from "@/components/CategoryLists";
import SubmitButton from "@/components/form/submit.button";
import { ComboboxPopover } from "@/components/ui/combobox";
import LabeledInput from "@/components/ui/labeled.input";
import { ApiUrl } from "@/url/ApiUrl";
import { useFetcher } from "@/url/Fetcher";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";

const fromCategories = [
  {
    value: "products",
    label: "Products",
  },
  {
    value: "forum",
    label: "Forum",
  },
  {
    value: "report",
    label: "Report",
  },
];

export default function CategoryPage() {
  const categoryFetcher = useFetcher(ApiUrl.category.create);
  const [categoryId, setCategoryId] = useState("");
  const [isPending, startTransition] = useTransition();
  const listsRef = useRef<any>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    startTransition(async () => {
      if (isPending) return; // Prevent multiple submissions
      if (!categoryId) {
        toast.warning("Please select a category type.");
        return;
      }
      const formData = new FormData(event.target as HTMLFormElement);
      formData.append("from", categoryId);

      const data = Object.fromEntries(formData.entries());
      const result = await categoryFetcher.post(data);

      const body = await result.json();
      if (!result.ok) {
        console.error("Failed to create category:", body.error);
        toast.error(`${body.error || "Please try again."}`);
        return;
      }

      toast.success("Category created successfully!");
      listsRef.current?.refetch();
    });
  };
  return (
    <div className="page w-full md:w-1/2 lg:w-1/3 mx-auto place-self-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <ComboboxPopover
          items={fromCategories}
          label="Category will be used for"
          selectedValue={categoryId}
          onChange={setCategoryId}
        ></ComboboxPopover>
        <LabeledInput
          required
          label="Category ID"
          name="category_id"
        ></LabeledInput>
        <LabeledInput
          required
          label="Category Name"
          name="category_name"
        ></LabeledInput>
        <SubmitButton>Create Category</SubmitButton>
      </form>
      <CategoryLists ref={listsRef} />
    </div>
  );
}
