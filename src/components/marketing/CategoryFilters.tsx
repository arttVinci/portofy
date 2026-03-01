import FilterButton from "../ui/FilterButton";

interface CategoryFiltersProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

export default function CategoryFilters({
  categories,
  activeCategory,
  setActiveCategory,
}: CategoryFiltersProps) {
  return (
    <div className="flex items-center gap-1.5 shrink-0">
      {categories.map((cat) => (
        <FilterButton
          key={cat}
          cat={cat}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      ))}
    </div>
  );
}
