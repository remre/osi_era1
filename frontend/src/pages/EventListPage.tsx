import React, { useState } from "react";
import { useEvent } from "../context/EventContext";

import CalendarWithEvents from "../components/compounds/CalendarWithEvents";
import EventCalendarList from "../components/features/EventCalendarList";
import UpcomingEvents from "../components/compounds/UpcomingEvent";

const AllEventsPage: React.FC = () => {
  const { events } = useEvent();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const selectedDateEvents = selectedDate
    ? events.filter(event => {
        const eventDate = new Date(event.date).toISOString().split("T")[0];
        const evenddate = new Date(selectedDate);
        evenddate.setDate(evenddate.getDate() + 1);
        const selectedDateStr = evenddate.toISOString().split("T")[0];

        return eventDate === selectedDateStr;
      })
    : [];

  return (
    <div className="p-6">
      <h1 className="title-first mb-6">All Events</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1  ">
          <CalendarWithEvents
            events={events}
            onDateSelect={date => {
              date.setHours(0, 0, 0, 0);
              setSelectedDate(date);
            }}
          />
        </div>

        <div className="flex-2">
          <h2 className="title-second mb-4">
            {selectedDate
              ? `Events on ${selectedDate.toDateString()}`
              : "Select a date to view events"}
          </h2>
          <EventCalendarList events={selectedDateEvents} />
        </div>
      </div>

      <UpcomingEvents />
    </div>
  );
};

export default AllEventsPage;
