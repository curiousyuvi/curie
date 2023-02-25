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
      ? `${__dirname}/../../.env`
      : `${__dirname}/../.env`,
});

connectMongoDB();

const port = process.env.PORT || 5000;
const app = express();

let allowedOrigin = "http://localhost:3000";

if (process.env.NODE_ENV === "production") {
  allowedOrigin = "https://curie-xi.vercel.app";
}

const corsOptions = {
  origin: allowedOrigin,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/room", roomRoute);
app.use("/api/music", musicRoute);

app.get("/api/hello", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

const server = http.createServer(app);

setupSocket(server, corsOptions);

server.prependListener("request", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
});

server.listen(port, () => {
  console.log("CURIE SERVER LISTENING ON PORT 5000...");
});
