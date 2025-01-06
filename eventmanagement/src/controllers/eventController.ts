import { Request, Response, NextFunction } from "express";
import Event from "../models/eventModel";
import { IEvent } from "../types/IEvent";
export const createEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("Controller: User in request:", req.user);

  if (!req.user || !req.user.id) {
    console.log("Controller: User not authenticated");
    res.status(401).json({ error: "Unauthorized: User not authenticated" });
    return;
  }

  const { title, description, date, images } = req.body;

  console.log("Controller: Request body:", req.body);

  if (!title || !date) {
    console.log("Controller: Missing required fields (title/date)");
    res.status(400).json({ error: "Title and date are required." });
    return;
  }

  try {
    const event = new Event({
      title,
      description: description || "No description provided",
      date,
      images: images || [],
      comments: [],
      createdBy: req.user.id,
    });

    await event.save();

    console.log("Controller: Event created successfully. Event:", event);

    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    console.error(
      "Controller: Error creating event:",
      (error as Error).message
    );
    res.status(500).json({
      error: "Failed to create event",
      details: (error as Error).message,
    });
  }
};

export const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    next(error);
  }
};

export const getEventById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    res.json(event);
  } catch (error) {
    next(error);
  }
};

export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { eventId } = req.params;
    const { user, content } = req.body;

    if (!user || !content) {
      res.status(400).json({ message: "User and content are required" });
      return;
    }

    const event = await Event.findById(eventId);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    event.comments.push({ user, content, createdAt: new Date() });
    await event.save();

    res.status(201).json({ message: "Comment added successfully", event });
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { eventId } = req.params;

    const event = await Event.findByIdAndDelete(eventId);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    if (event.createdBy !== req.user?.id?.toString()) {
      res
        .status(403)
        .json({ error: "Unauthorized: You cannot update this event" });
      return;
    }

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    next(error);
  }
};
export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { eventId } = req.params;
    const { title, description, date, images } = req.body;

    if (!eventId) {
      res.status(400).json({ error: "Event ID is required" });
      return;
    }

    const updatedData: Partial<IEvent> = {};
    if (title) updatedData.title = title;
    if (description) updatedData.description = description;
    if (date) updatedData.date = new Date(date);
    if (images) updatedData.images = images;

    const event = await Event.findById(eventId);
    if (!event) {
      res.status(404).json({ error: "Event not found" });
      return;
    }

    if (event.createdBy !== req.user?.id?.toString()) {
      res
        .status(403)
        .json({ error: "Unauthorized: You cannot update this event" });
      return;
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedEvent) {
      res.status(500).json({ error: "Failed to update the event" });
      return;
    }

    res
      .status(200)
      .json({ message: "Event updated successfully", updatedEvent });
  } catch (error) {
    console.error("Controller: Error updating event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
