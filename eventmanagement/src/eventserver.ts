import dotenv from "dotenv";
import app from "./eventapp";
import connectDB from "./config/nosqldatabase";

connectDB();

dotenv.config();

const PORT: number = parseInt(process.env.PORT || "5001", 10);

app.listen(PORT, () => {
  console.log(`EventManagement service is running on http://localhost:${PORT}`);
});
