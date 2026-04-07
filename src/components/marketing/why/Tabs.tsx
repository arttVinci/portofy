import TabsList from "./TabsList";
import TabsContent from "./TabsContent";

interface TabsProps {
  content: {
    title: string;
    description: string;
    shortDescription: string;
    eyebrow: string;
    content: React.ReactNode;
  }[];
  activeTab: number;
  setActiveTab: (index: number) => void;
}

export default function Tabs({ content, activeTab, setActiveTab }: TabsProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 px-4">
      {/* Left Side: Tab List */}
      <TabsList
        content={content}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Right Side: Tab Content Viewer */}
      <TabsContent content={content} activeTab={activeTab} />
    </div>
  );
}
