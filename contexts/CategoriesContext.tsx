import React, { createContext, useState, useContext } from "react";

interface Category {
  id: number;
  name: string;
  description: string;
}

interface CategoriesContextProps {
  categories: Category[];
  selectedCategories: Set<number>;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  setSelectedCategories: React.Dispatch<React.SetStateAction<Set<number>>>;
}

const CategoriesContext = createContext<CategoriesContextProps | undefined>(
  undefined,
);

export const CategoriesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Set<number>>(
    new Set(),
  );

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        selectedCategories,
        setCategories,
        setSelectedCategories,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }
  return context;
};

export default CategoriesContext;
