import React from "react";
import EventCard from "../base/EventCard";
import { useAuth } from "../../context/AuthContext";
import { useEvent } from "../../context/EventContext";

const UpcomingEvents: React.FC = () => {
  const { user } = useAuth();
  const { events } = useEvent();

  // Kullanıcının katıldığı ve gelecekteki etkinlikleri filtrele
  const upcomingJoinedEvents = events.filter(event => {
    const isFutureEvent = new Date(event.date) > new Date();
    const isUserJoined = event.attendees.includes((user?.id || "").toString());
    return isFutureEvent && isUserJoined;
  });

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingJoinedEvents.length > 0 ? (
          upcomingJoinedEvents.map(event => (
            <EventCard
              key={event._id}
              title={event.title}
              description={event.description}
              date={event.date}
            />
          ))
        ) : (
          <p className="text-gray-500">You have no upcoming events.</p>
        )}
      </ul>
    </div>
  );
};

export default UpcomingEvents;
