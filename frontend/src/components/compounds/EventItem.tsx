import React from "react";

interface EventItemProps {
  title: string;
  description: string;
  date: string;
  children?: React.ReactNode;
}

const EventItem: React.FC<EventItemProps> = ({
  title,
  description,
  date,
  children,
}) => {
  return (
    <div className="event-item mb-4 p-4 border rounded">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-700">{description}</p>
      <p className="text-gray-500">
        Date: {new Date(date).toLocaleDateString()}
      </p>
      {children}
    </div>
  );
};

export default EventItem;
