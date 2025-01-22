import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const AddButton = ({ onClick, label }: { onClick: () => void; label: string }) => {
  return (
    <Button onClick={onClick} variant="outline" className="mt-4 flex items-center">
      <Plus className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
};

export default AddButton;
