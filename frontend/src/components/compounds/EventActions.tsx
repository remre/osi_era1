import React from "react";
import Button from "../base/Button";

interface EventActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const EventActions: React.FC<EventActionsProps> = ({ onEdit, onDelete }) => {
  return (
    <div className="flex gap-2 mt-2">
      <Button onClick={onEdit} className="!bg-yellow-500 text-white px-2 py-1">
        Edit
      </Button>
      <Button onClick={onDelete} className="!bg-red-500 text-white px-2 py-1">
        Delete
      </Button>
    </div>
  );
};

export default EventActions;
