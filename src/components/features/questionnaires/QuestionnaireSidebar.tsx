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
  {
    id: "upper-extremity",
    emoji: "🦾",
    text: "Upper Extremity",
    disabled: false,
  },
  { id: "hip", emoji: "🦵", text: "Hip", disabled: false },
  { id: "knee", emoji: "🦵", text: "Knee", disabled: false },
  { id: "foot-ankle", emoji: "🦶", text: "Foot and Ankle", disabled: true },
  { id: "neck-back", emoji: "🦴", text: "Neck and Back", disabled: true },
  { id: "concussion", emoji: "🧠", text: "Concussion", disabled: true },
  { id: "general", emoji: "🩺", text: "General Health", disabled: false },
  {
    id: "lower-extremity",
    emoji: "🦵",
    text: "Lower Extremity (General)",
    disabled: true,
  },
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
    <aside
      className={cn(
        "fixed left-0 z-30 border-r bg-background transition-all duration-300 flex flex-col",
        "h-[calc(100vh-64px)]",
        isCollapsed ? "w-16" : "w-[250px] 2xl:w-[350px]"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
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
          <div className="flex-1 overflow-y-auto">
            <div className="px-4 py-4 border-b">
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

            <div className="px-2 py-2 space-y-1">
              <Button
                variant={selectedCategory === null ? "default" : "ghost"}
                className="w-full justify-start font-medium"
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
                  className={cn(
                    "w-full justify-start text-sm px-3 whitespace-normal h-auto relative pl-7",
                    category.disabled &&
                      "opacity-50 cursor-not-allowed hover:bg-transparent"
                  )}
                  onClick={() =>
                    !category.disabled && onCategorySelect(category.id)
                  }
                  disabled={category.disabled}
                >
                  <div
                    className={cn(
                      "absolute left-2 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full",
                      category.disabled
                        ? "bg-muted-foreground opacity-50"
                        : "bg-green-500"
                    )}
                  />
                  <span className="text-left break-words flex items-center gap-2">
                    <span className="text-lg">{category.emoji}</span>
                    <span>{category.text}</span>
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="shrink-0 border-t bg-muted/50 p-4">
            <div className="space-y-3">
              <div className="text-xs text-muted-foreground">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-muted-foreground opacity-50" />
                  <span>Coming Soon</span>
                </div>
              </div>
              <div className="text-[10px] text-muted-foreground/60">
                © 2024 PhysioEngine
              </div>
            </div>
          </div>
        </>
      )}

      {isCollapsed && (
        <div className="flex-1 flex flex-col">
          <div className="flex-1" />
          <div className="border-t bg-muted/50 p-4">
            <div className="text-[10px] text-muted-foreground/60 text-center">
              © 2024
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
