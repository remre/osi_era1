/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useEvent } from "../../context/EventContext";
import { useAuth } from "../../context/AuthContext";
import Button from "../base/Button";

interface JoinEventButtonProps {
  eventId: string;
  attendees: string[];
  createdBy: string;
}

const JoinEventButton: React.FC<JoinEventButtonProps> = ({
  eventId,
  attendees = [],
  createdBy,
}) => {
  const { attendEvent } = useEvent();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleJoinEvent = async () => {
    try {
      setLoading(true);
      await attendEvent(eventId);
      setMessage("You have successfully joined the event!");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        "An error occurred while joining the event.";
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const userId = user?.id?.toString() || "";
  const alreadyJoined = attendees.includes(userId);
  const isOwnEvent = createdBy === userId;

  return (
    <div>
      {alreadyJoined ? (
        <p className="text-green-500">You have already joined this event.</p>
      ) : isOwnEvent ? (
        <p className="text-yellow-500">You cannot join your own event.</p>
      ) : (
        <Button onClick={handleJoinEvent} disabled={loading}>
          {loading ? "Joining..." : "Join Event"}
        </Button>
      )}
      {message && <p className="mt-2 text-blue-500">{message}</p>}
    </div>
  );
};

export default JoinEventButton;
