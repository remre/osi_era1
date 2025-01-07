import React, { createContext, useContext, useState, useEffect } from "react";
import EventAxiosInstance from "../api/eventAxiosInstance";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  images: string[];
  comments: Comment[];
  attendees: string[];
  createdBy: string;
}

interface Comment {
  user: string;
  content: string;
  createdAt: string;
}

interface EventContextProps {
  events: Event[];
  fetchEvents: () => void;
  createEvent: (event: Partial<Event>) => Promise<void>;
  updateEvent: (eventId: string, updatedData: Partial<Event>) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
  addComment: (eventId: string, comment: Partial<Comment>) => Promise<void>;
  attendEvent: (eventId: string) => Promise<void>;
}

const EventContext = createContext<EventContextProps | undefined>(undefined);

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvent must be used within an EventProvider");
  }
  return context;
};

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [events, setEvents] = useState<Event[]>([]);

  const fetchEvents = async () => {
    try {
      const response = await EventAxiosInstance.get("/api/events");
      setEvents(response.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const createEvent = async (event: Partial<Event>) => {
    try {
      await EventAxiosInstance.post("/api/events", event);
      fetchEvents();
    } catch (err) {
      console.error("Error creating event:", err);
    }
  };

  const updateEvent = async (eventId: string, updatedData: Partial<Event>) => {
    try {
      await EventAxiosInstance.put(`/api/events/${eventId}`, updatedData);
      fetchEvents();
    } catch (err) {
      console.error("Error updating event:", err);
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      await EventAxiosInstance.delete(`/api/events/${eventId}`);
      fetchEvents();
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  const addComment = async (eventId: string, comment: Partial<Comment>) => {
    try {
      await EventAxiosInstance.post(`/api/events/${eventId}/comments`, comment);
      fetchEvents();
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const attendEvent = async (eventId: string) => {
    try {
      await EventAxiosInstance.post(`/api/events/${eventId}/attend`);
      fetchEvents();
    } catch (err) {
      console.error("Error joining event:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventContext.Provider
      value={{
        events,
        fetchEvents,
        createEvent,
        updateEvent,
        deleteEvent,
        addComment,
        attendEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
