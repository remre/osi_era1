import React from "react";
import EventItem from "../compounds/EventItem";
import EventComments from "../compounds/EventComments";
import JoinEventButton from "../compounds/JoinEventButton";

interface EventCalendarListProps {
  events: Array<{
    _id: string;
    title: string;
    description: string;
    date: string;
    images: string[];
    comments: Array<{ user: string; content: string; createdAt: string }>;
    attendees: string[];
    createdBy: string;
  }>;
}

const EventCalendarList: React.FC<EventCalendarListProps> = ({ events }) => {
  return (
    <div>
      {events.length > 0 ? (
        <ul>
          {events.map(event => {
            const eventDate = new Date(event.date);
            // Ensure consistent timezone handling
            const displayDate = new Date(
              Date.UTC(
                eventDate.getUTCFullYear(),
                eventDate.getUTCMonth(),
                eventDate.getUTCDate()
              )
            )
              .toISOString()
              .split("T")[0];

            return (
              <li key={event._id} className="mb-4 p-4 border rounded">
                <EventItem
                  title={event.title}
                  description={event.description}
                  date={displayDate}
                >
                  <JoinEventButton
                    eventId={event._id}
                    attendees={event.attendees}
                    createdBy={event.createdBy}
                  />
                  <EventComments
                    eventId={event._id}
                    comments={event.comments}
                  />
                </EventItem>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-500">No events on this date.</p>
      )}
    </div>
  );
};

export default EventCalendarList;
