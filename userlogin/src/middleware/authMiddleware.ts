import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload as JWTJwtPayload, VerifyErrors } from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "your_secret_key";

// Define custom payload interface
interface CustomJwtPayload {
  id: number;
  username: string;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: CustomJwtPayload;
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Token kontrolü: Önce Authorization Header, sonra Cookie
  const token = req.cookies.token || req.header("Authorization")?.split(" ")[1];

  if (!token) {
    console.log("Access token missing");
    res.status(401).json({ error: "Access token missing" });
    return;
  }

  // Token doğrulama
  jwt.verify(
    token,
    secretKey,
    (err: VerifyErrors | null, decoded: JWTJwtPayload | string | undefined) => {
      if (err) {
        console.error("user login Token verification failed:", err.message);
        res.status(403).json({ error: "Invalid or expired token" });
        return;
      }

      if (!decoded || typeof decoded === "string") {
        console.error("Invalid token format");
        res.status(403).json({ error: "Invalid token format" });
        return;
      }

      // Token'den kullanıcı bilgilerini çıkar ve isteğe ekle
      req.user = decoded as CustomJwtPayload;
      console.log("Token verified, user:", req.user);
      console.log("user login Middleware: Token received:", token);

      next();
    }
  );
};
