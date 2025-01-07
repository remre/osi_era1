import { useState } from "react";

import { useEvent } from "../context/EventContext";
import { useAuth } from "../context/AuthContext";
import EventForm from "../components/compounds/EventForm";
import EventList from "../components/features/EventList";

const MyEventsPage = () => {
  const { events, createEvent, updateEvent, deleteEvent } = useEvent();
  const { user } = useAuth();
  const [currentEdit, setCurrentEdit] = useState<{
    eventId?: string;
    title: string;
    description: string;
    date: string;
    images: string[];
  } | null>(null);

  const myEvents = events.filter(
    event => event.createdBy === user?.id?.toString()
  );

  const handleCreate = async (data: typeof currentEdit) => {
    if (!data) return;
    await createEvent(data);
    setCurrentEdit(null);
  };

  const handleUpdate = async (data: typeof currentEdit) => {
    if (!data?.eventId) return;
    await updateEvent(data.eventId, data);
    setCurrentEdit(null);
  };

  const handleDelete = async (eventId: string) => {
    await deleteEvent(eventId);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Events</h1>
      {currentEdit ? (
        <EventForm
          initialData={currentEdit}
          onSubmit={(data: typeof currentEdit) =>
            currentEdit.eventId ? handleUpdate(data) : handleCreate(data)
          }
          onCancel={() => setCurrentEdit(null)}
        />
      ) : (
        <button
          onClick={() =>
            setCurrentEdit({
              title: "",
              description: "",
              date: "",
              images: [],
            })
          }
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Create New Event
        </button>
      )}
      <EventList
        events={myEvents}
        onEdit={(id: string) => {
          const event = myEvents.find(e => e._id === id);
          if (event) {
            setCurrentEdit({
              eventId: event._id,
              title: event.title,
              description: event.description,
              date: new Date(event.date).toISOString().split("T")[0],
              images: event.images,
            });
          }
        }}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default MyEventsPage;
