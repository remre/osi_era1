import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  addComment,
  deleteEvent,
  updateEvent,
} from "../controllers/eventController";
import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware";

const router = express.Router();

router.get("/", getEvents);

router.get("/:eventId", getEventById);

router.post("/", verifyTokenMiddleware, createEvent);

router.put("/:eventId", verifyTokenMiddleware, updateEvent);

router.post("/:eventId/comments", verifyTokenMiddleware, addComment);

router.delete("/:eventId", verifyTokenMiddleware, deleteEvent);

export default router;
