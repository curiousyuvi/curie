import express, { Request, Response } from "express";
import http from "http";
import cors from "cors";
import setupSocket from "./src/socket";
import roomRoute from "./src/routes/roomRoutes";
import musicRoute from "./src/routes/musicRoutes";
import dotenv from "dotenv";
import connectMongoDB from "./src/services/dbconnect";

global.rooms = new Map();

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? `${__dirname}/../.env`
      : `${__dirname}/../../.env`,
});

connectMongoDB();

const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);

const allowedOrigins = ["https://curie-xi.vercel.app", "http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
  allowedHeaders: ["postman-token", "Content-Type"],
};

if (process.env.NODE_ENV === "production") {
  app.use(cors(corsOptions));
} else {
  app.use(cors());
}

app.use(express.json());

app.use("/api/room", roomRoute);
app.use("/api/music", musicRoute);

app.get("/api/hello", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

setupSocket(server, corsOptions);

server.listen(port, () => {
  console.log("CURIE SERVER LISTENING ON PORT 5000...");
});
