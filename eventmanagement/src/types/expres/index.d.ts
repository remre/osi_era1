import { JwtPayload } from "jsonwebtoken";

// Kullanıcı tipi
export interface CustomJwtPayload {
  id: number;
  username: string;
}

// express-serve-static-core üzerine ekleme
declare module "express-serve-static-core" {
  interface Request {
    user?: CustomJwtPayload; // Kullanıcı bilgilerini buraya ekliyoruz
  }
}
