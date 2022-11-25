const app = require("./app");
import { Server as WebSocketServer } from "socket.io";
import http from "http";
const server = http.createServer(app);
const io = new WebSocketServer(server);
// DATABASE
import MySQLConn from "./DB/mysql/connection.js";
import SQLiteConn from "./DB/sqlite/connection.js";
import Container from "./src/models/container.js";
const DBprod = new Container(MySQLConn, "Products");
//! CONTENEDOR MENSAJES
import Messages from "./src/models/chat";
const DBmsg = new Messages(SQLiteConn, "Messages");
//! STARTING SERVER

server.listen(app.get("port"), () => {
  console.log(`Express Server connected on port ${app.get("port")}`);
});
server.on("error", (error) => {
  console.log(`Error !!!: ${error}`);
});

io.on("connection", async (socket) => {
  console.log(`New Connection: ${socket.id}`);

  const products = await DBprod.getAll();
  socket.emit("product:all", products);

  socket.on("product:new", async (object) => {
    const data = await DBprod.save(object);
    data === null
      ? socket.emit("product:submit", { product: object, status: true })
      : socket.emit("product:submit", { product: object, status: false });
    io.sockets.emit("product:all", products);
  });

  const allMessages = await DBmsg.readMessages();
  socket.emit("chat:history", allMessages);

  socket.on("chat:message", async (data) => {
    const allMessages = await DBmsg.saveMessage(data);
    io.sockets.emit("chat:history", allMessages);
  });
  socket.on("chat:typing", (data) => {
    socket.broadcast.emit("chat:typing", data);
  });
});
