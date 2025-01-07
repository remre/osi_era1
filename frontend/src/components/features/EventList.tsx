import React from "react";
import EventItem from "../compounds/EventItem";
import EventActions from "../compounds/EventActions";

interface EventListProps {
  events: Array<{
    _id: string;
    title: string;
    description: string;
    date: string;
    comments: Array<{ user: string; content: string; createdAt: string }>;
    images: string[];
  }>;
  onEdit: (eventId: string) => void;
  onDelete: (eventId: string) => void;
}
const EventList: React.FC<EventListProps> = ({ events, onEdit, onDelete }) => {
  return (
    <ul className="flex flex-col min-w-4xl gap-6">
      {events.map(event => (
        <li
          key={event._id}
          className="p-4 border rounded shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
        >
          <EventItem
            title={event.title}
            description={event.description}
            date={event.date}
          >
            <div className="mt-4">
              <EventActions
                onEdit={() => onEdit(event._id)}
                onDelete={() => onDelete(event._id)}
              />
            </div>
          </EventItem>
        </li>
      ))}
    </ul>
  );
};

export default EventList;
