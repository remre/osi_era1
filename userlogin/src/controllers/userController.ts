import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../types/express";
import db from "../config/database";
const secretKey = process.env.JWT_SECRET || "your_secret_key";

export const registerUser = (req: Request, res: Response): void => {
  const { username, password } = req.body;
  console.log(req.body);

  // Check if the user already exists
  db.get(
    `SELECT * FROM users WHERE username = ?`,
    [username],
    (err: Error | null, user: User | undefined) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }

      if (user) {
        return res.status(400).json({ error: "User already exists" });
      }

      const hashedPassword = bcrypt.hashSync(password, 8);

      db.run(
        `INSERT INTO users (username, password) VALUES (?, ?)`,
        [username, hashedPassword],
        function (err: Error | null) {
          if (err) {
            return res.status(500).json({ error: "Failed to register user" });
          }
          // Return the newly created user's ID and username
          res.status(201).json({ id: this.lastID, username });
        }
      );
    }
  );
};

export const loginUser = (req: Request, res: Response): void => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  db.get(
    `SELECT * FROM users WHERE username = ?`,
    [username],
    (err: Error | null, user: User | undefined) => {
      if (err) {
        return res.status(500).json({ error: "Unable to query database" });
      }

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        secretKey,
        { expiresIn: "15m" }
      );

      // Set the token in an HTTP-only cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000,
        sameSite: "lax",
      });

      // Include the token in the response body
      res.status(200).json({ message: "Login successful", token });
    }
  );
};

export const getCurrentUser = (req: Request, res: Response): void => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  db.get(
    `SELECT id, username FROM users WHERE id = ?`,
    [userId],
    (err, user) => {
      console.log({ err, user }); // Debugging

      if (err) {
        res.status(500).json({ error: "Database error" });
        return;
      }
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json(user);
    }
  );
};

export const logoutUser = (req: Request, res: Response): void => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.status(200).json({ message: "Logout successful" });
};
