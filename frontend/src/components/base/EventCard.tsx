import React from "react";

interface EventCardProps {
  title: string;
  description: string;
  date: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, description, date }) => {
  return (
    <div className="p-4 border rounded shadow-sm hover:shadow-md transition bg-white ">
      <h3 className="title-second mb-2">{title}</h3>
      <p className="body-input mb-2">{description}</p>
      <p className="text-sm text-blue-500">
        {new Date(date).toLocaleDateString()}
      </p>
    </div>
  );
};

export default EventCard;
