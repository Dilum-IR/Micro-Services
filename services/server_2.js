const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const server_2_routes = require("./api/Server_2/server_2_routes");
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", server_2_routes);
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

server.listen(5002, () => {
  console.log(`Server_2 listening on port ${5002}`);
});
