import React from "react";

interface CalendarTileIndicatorProps {
  hasEvent: boolean;
}

const CalendarTileIndicator: React.FC<CalendarTileIndicatorProps> = ({
  hasEvent,
}) => {
  return hasEvent ? (
    <div className="bg-blue-300 rounded-full w-2 h-2 mx-auto"></div>
  ) : null;
};

export default CalendarTileIndicator;
