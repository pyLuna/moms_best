import useCategory from "@/hooks/useCategory";
import { Category } from "@/types/category";
import { createContext, ReactNode, useContext } from "react";

type CategoryContextType = {
  categories: Category[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
  forum?: Category[];
  products?: Category[];
};

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const categories = useCategory();

  return (
    <CategoryContext.Provider value={categories}>
      {children}
    </CategoryContext.Provider>
  );
};

const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoryProvider");
  }
  return context;
};

export default CategoryProvider;
export { CategoryContext, useCategories };
