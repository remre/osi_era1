import React from "react";
import Calendar from "react-calendar";
import CalendarTileIndicator from "../base/CalendarTileIndicator";

interface CalendarWithEventsProps {
  events: Array<{ date: string }>;
  onDateSelect: (date: Date) => void;
}

const CalendarWithEvents: React.FC<CalendarWithEventsProps> = ({
  events,
  onDateSelect,
}) => {
  const tileContent = ({ date }: { date: Date }) => {
    const formattedDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    )
      .toISOString()
      .split("T")[0];

    const hasEvent = events.some(event => {
      const eventDate = new Date(event.date);
      const eventDateStr = new Date(
        Date.UTC(
          eventDate.getUTCFullYear(),
          eventDate.getUTCMonth(),
          eventDate.getUTCDate()
        )
      )
        .toISOString()
        .split("T")[0];
      return eventDateStr === formattedDate;
    });

    return <CalendarTileIndicator hasEvent={hasEvent} />;
  };

  const adjustDateForUTC = (date: Date): Date => {
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );

    return utcDate;
  };

  return (
    <Calendar
      onChange={value => onDateSelect(adjustDateForUTC(value as Date))}
      tileContent={tileContent}
      className="w-full"
      minDetail="month"
      showNeighboringMonth={false}
    />
  );
};

export default CalendarWithEvents;
