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
    <div className="event-item mb-4 p-4  w-full flex flex-col bg-white">
      <h3 className="title-second">Event Title:{title}</h3>
      <p className="body-input">Description{description}</p>
      <p className="text-gray-500">
        Date: {new Date(date).toLocaleDateString()}
      </p>
      {children}
    </div>
  );
};

export default EventItem;
