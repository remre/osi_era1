import React, { useState, useEffect } from "react";
import Input from "../base/Input";
import Button from "../base/Button";

interface EventFormProps {
  initialData?: {
    title: string;
    description: string;
    date: string;
    images: string[];
  };
  onSubmit: (data: {
    title: string;
    description: string;
    date: string;
    images: string[];
  }) => void;
  onCancel: () => void;
}

const EventForm: React.FC<EventFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    images: [] as string[],
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (key: string, value: string | string[]) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h2 className="text-lg font-semibold mb-2">
        {initialData ? "Edit Event" : "Create Event"}
      </h2>
      <Input
        type="text"
        value={formData.title}
        onChange={e => handleChange("title", e.target.value)}
        placeholder="Title"
        className="w-full p-2 mb-2 border rounded"
      />
      <textarea
        value={formData.description}
        onChange={e => handleChange("description", e.target.value)}
        placeholder="Description"
        className="w-full p-2 mb-2 border rounded"
      />
      <Input
        type="date"
        value={formData.date}
        onChange={e => handleChange("date", e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <div className="flex gap-2">
        <Button type="submit" className="!bg-green-500 text-white px-4 py-2">
          Save
        </Button>
        <Button
          onClick={onCancel}
          className="!bg-gray-500 text-white px-4 py-2"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EventForm;
