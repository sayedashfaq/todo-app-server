import express from "express";
import { config as configDotenv } from "dotenv";
import cors from "cors";
import { connectDb } from "./config/connnectDB.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import todoRoutes from "./routes/todo.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swaggerdoc.json" assert { type: "json" };

const app = express();

app.use(cors());

//dotenv Config
configDotenv();

app.use(express.json());

const db_url = process.env.DATABASE_URL;

connectDb(db_url);
app.listen(process.env.PORT, () => console.log("server running "));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", authRoutes, todoRoutes, userRoutes);
