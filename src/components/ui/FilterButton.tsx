interface FilterButtonProps {
  cat: string;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

export default function FilterButton({
  cat,
  activeCategory,
  setActiveCategory,
}: FilterButtonProps) {
  return (
    <button
      key={cat}
      onClick={() => setActiveCategory(cat)}
      className="px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all duration-150 cursor-pointer"
      style={{
        backgroundColor:
          activeCategory === cat ? "rgba(255,255,255,0.1)" : "transparent",
        color:
          activeCategory === cat
            ? "rgba(255,255,255,0.85)"
            : "rgba(255,255,255,0.35)",
        border:
          activeCategory === cat
            ? "1px solid rgba(255,255,255,0.15)"
            : "1px solid transparent",
      }}
    >
      {cat}
    </button>
  );
}
