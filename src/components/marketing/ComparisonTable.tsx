import ChecklistIcon from "./ChecklistIcon";
interface ComparisonTableProps {
  item: {
    label: string;
    feature1: boolean | string;
    feature2: boolean | string;
    feature3: boolean | string;
  };
  i: number;
  itemLength: number;
}

export default function ComparisonTable({
  item,
  i,
  itemLength,
}: ComparisonTableProps) {
  return (
    <div
      key={item.label}
      className="grid grid-cols-4 px-5 py-3.5"
      style={{
        backgroundColor: i % 2 === 0 ? "#0e0e14" : "#0a0a0f",
        borderBottom:
          i < itemLength - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
      }}
    >
      <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.5)" }}>
        {item.label}
      </p>
      <ChecklistIcon val={item.feature1} />
      <ChecklistIcon val={item.feature2} />
      <ChecklistIcon val={item.feature3} />
    </div>
  );
}
