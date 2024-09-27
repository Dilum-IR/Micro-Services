const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./api/Server_1/user");
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", userRoutes);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log(`User connected -> ${socket.id}`);
});

server.listen(5001, () => {
  console.log(`Server_1 listening on port ${5001}`);
});