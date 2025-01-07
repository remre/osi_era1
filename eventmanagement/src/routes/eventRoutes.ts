import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  addComment,
  deleteEvent,
  attendEvent,
  updateEvent,
} from "../controllers/eventController";
import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware";

const router = express.Router();

router.get("/", getEvents);

router.get("/:eventId", getEventById);

router.post("/", verifyTokenMiddleware, createEvent);

router.put("/:eventId", verifyTokenMiddleware, updateEvent);

router.delete("/:eventId", verifyTokenMiddleware, deleteEvent);

router.post("/:eventId/attend", verifyTokenMiddleware, attendEvent);

router.post("/:eventId/comments", addComment);

export default router;
