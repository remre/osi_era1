import axios from "axios";
import { Request, Response, NextFunction } from "express";

export const verifyTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log("Middleware: Token verification started");

  // Extract token from cookies or Authorization header
  const token = req.cookies.token || req.header("Authorization")?.split(" ")[1];

  console.log("Middleware: Token received:", token);

  if (!token) {
    console.log("Middleware: Token missing");
    res.status(401).json({ error: "Access token missing" });
    return;
  }

  try {
    console.log("Middleware: Sending token to UserLogin service");

    // Send token to the UserLogin service for verification
    const response = await axios.post(
      "http://localhost:4000/api/users/verify-token",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Middleware: Token verification response:", response.data);

    // Attach user data to the request object
    req.user = response.data.user;
    console.log("Middleware: User set in request:", req.user);

    next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Middleware: Token verification failed:", error.message);
    res.status(403).json({ error: "Invalid or expired token" });
  }
};
