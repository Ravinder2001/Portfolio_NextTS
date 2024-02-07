import { ChevronDown, ChevronRight, Trash2, PencilLine, ExternalLink } from "lucide-react";

const LucideIcons = ({ name, size, color }: { name: string; size?: number; color?: string }) => {
  switch (name) {
    case "arrow-right":
      return <ChevronRight size={size} color={color} />;
    case "arrow-down":
      return <ChevronDown size={size} color={color} />;
    case "delete":
      return <Trash2 size={size} color={color} />;
    case "edit":
      return <PencilLine size={size} color={color} />;
    case "visit":
      return <ExternalLink  size={size} color={color} />;
    default:
      return null;
  }
};

export default LucideIcons;
