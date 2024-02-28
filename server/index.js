import { app } from "./app.js";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
import cors from "cors";
import admin from "firebase-admin";
import { serviceAccountKey } from "./blog-fluent-firebase-adminsdk-mixb1-d6155942fd.js";
import authRoutes from "./routes/authRoutes.js";
import publishBlogRoutes from "./routes/publishBlogRoutes.js";
import aws from "aws-sdk";

dotenv.config();
const { DB_USERNAME, DB_PASSWORD } = process.env;
connectDB(DB_USERNAME, DB_PASSWORD);
const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200,
};
// Middlewares
app.use(cors(corsOptions));

// firebase admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

// s3
export const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/blog", publishBlogRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
