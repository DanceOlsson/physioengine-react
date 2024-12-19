import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState } from "react";

interface QuestionnaireSidebarProps {
  className?: string;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
  onSearch: (query: string) => void;
}

const categories = [
  { id: "knee", label: "Knee" },
  { id: "hip", label: "Hip" },
  { id: "arm", label: "Arm" },
  { id: "general", label: "General" },
];

export function QuestionnaireSidebar({
  className,
  isCollapsed,
  onToggleCollapse,
  selectedCategory,
  onCategorySelect,
  onSearch,
}: QuestionnaireSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div
      className={cn(
        "border-r bg-background transition-all duration-300",
        isCollapsed ? "w-16" : "w-[250px]",
        className
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between p-4">
          {!isCollapsed && <span className="font-semibold">Filters</span>}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="h-8 w-8"
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </div>

        {!isCollapsed && (
          <>
            <div className="px-4 pb-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="px-2">
              <Button
                variant={selectedCategory === null ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => onCategorySelect(null)}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "ghost"
                  }
                  className="w-full justify-start"
                  onClick={() => onCategorySelect(category.id)}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
