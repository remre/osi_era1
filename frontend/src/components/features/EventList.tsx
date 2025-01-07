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
    <ul className="mb-4">
      {events.map(event => (
        <EventItem
          key={event._id}
          title={event.title}
          description={event.description}
          date={event.date}
        >
          <EventActions
            onEdit={() => onEdit(event._id)}
            onDelete={() => onDelete(event._id)}
          />
        </EventItem>
      ))}
    </ul>
  );
};

export default EventList;
