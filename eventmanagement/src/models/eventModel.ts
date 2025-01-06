import mongoose, { Schema, Document } from "mongoose";
import { IEvent } from "../types/IEvent";

const commentSchema = new Schema(
  {
    user: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const eventSchema = new Schema<IEvent & Document>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    images: [{ type: String }],
    comments: [commentSchema],
    location: { type: String },
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
);

const Event = mongoose.model<IEvent & Document>("Event", eventSchema);

export default Event;
