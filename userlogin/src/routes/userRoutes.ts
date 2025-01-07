import express from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} from "../controllers/userController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authenticateToken, getCurrentUser);
router.post("/logout", logoutUser);
router.post("/verify-token", authenticateToken, (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: "Token is valid",
      user: req.user, // Kullanıcı bilgilerini yanıt olarak dönüyoruz
    });
  } else {
    res.status(401).json({ error: "User not authenticated" });
  }
});

export default router;
