import dotenv from "dotenv";
import app from "./app.js";
import { connectDb } from "./config/db.js";

dotenv.config();

const port = process.env.PORT || 5000;

// For Vercel serverless functions
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }
  
  try {
    await connectDb();
    isConnected = true;
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

// For local development
if (process.env.NODE_ENV !== 'production') {
  connectDb()
    .then(() => {
      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    })
    .catch((error) => {
      console.error(error.message);
      process.exit(1);
    });
}

// For Vercel serverless
export default async (req, res) => {
  await connectToDatabase();
  return app(req, res);
};
