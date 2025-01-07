import mongoose, { Schema, Document } from "mongoose";
import { IEvent } from "../types/IEvent";

interface EventDocument extends IEvent, Document {}

const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: "No description provided" },
  date: { type: Date, required: true },
  images: { type: [String], default: [] },
  comments: [
    {
      user: { type: String, required: true },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdBy: { type: String, required: true },
  attendees: { type: [String], default: [] },
});

export default mongoose.model<EventDocument>("Event", EventSchema);
