import { app } from "./app.js";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
import cors from "cors";
import admin from "firebase-admin"
import serviceAccountKey from "./blog-fluent-firebase-adminsdk-mixb1-d6155942fd.json" assert { type: "json" };
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const { DB_USERNAME, DB_PASSWORD } = process.env;
connectDB(DB_USERNAME, DB_PASSWORD);
const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey)
})
// routes
app.use("/api/v1/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
