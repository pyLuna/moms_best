import SubmitButton from "@/components/form/submit.button";
import { Button } from "@/components/ui/button";
import { ComboboxPopover } from "@/components/ui/combobox";
import LabeledInput from "@/components/ui/labeled.input";
import LabeledTextarea from "@/components/ui/labeled.textarea";
import { useCategories } from "@/contexts/CategoryProvider";
import { Items } from "@/types/misc";
import { useState } from "react";

export default function CreateForumPage() {
  const [category_id, setCategoryId] = useState<string>("Select Category");
  const { forum } = useCategories();

  const mutatedData = forum?.map((category) => {
    return {
      value: category.category_id,
      label: category.category_name,
    } as Items;
  });

  return (
    <>
      <section className="flex flex-col gap-4 md:gap-10 w-full place-self-center page">
        <h1 className="text-lg md:text-2xl font-bold text-center">
          Create Post
        </h1>
        <form className="flex flex-row justify-between gap-4 md:gap-8 md:min-h-[550px]">
          <div className="w-full hidden md:block h-full border rounded-lg"></div>
          <article className="w-full flex flex-col gap-4 md:gap-8">
            <ComboboxPopover
              selectedValue={category_id}
              items={mutatedData!}
              label="Share it on"
              placeholder="Select Category"
              onChange={(value) => setCategoryId(value)}
            />
            <LabeledInput
              label="Title"
              type="text"
              name="title"
              placeholder="Share your thoughts"
            />
            <LabeledTextarea
              label="Content"
              name="content"
              rows={10}
              placeholder="Write your post content here"
            />
          </article>
        </form>
        <div className="flex flex-row gap-4 md:gap-8 mt-4 md:mt-0">
          <Button
            className="w-1/3"
            variant="outline"
            type="button"
          >
            Cancel
          </Button>
          <SubmitButton className="grow">Share to everyone</SubmitButton>
        </div>
      </section>
    </>
  );
}
