const app = require("./app");
const server = app.listen(app.get("port"), () => {
  console.log(`Servidor express iniciado en puerto ${app.get("port")}`);
});
server.on("error", (error) => {
  console.log(`Error !!!: ${error}`);
});
const SocketIO = require("socket.io");
const io = SocketIO(server);
const Container = require("./models/container");
const contenedor = new Container("products.json");
const Messages = [
  { username: "Juan", message: "Holiss" },
  { username: "Nico", message: "Llego el bobo" },
  { username: "Angela", message: "hi" },
];
io.on("connection", (socket) => {
  console.log(`New Connection: ${socket.id}`);
  socket.on("new-product", async (object) => {
    const data = await contenedor.save(object);
    data === null && socket.emit("new-product", object.title);
  });
  socket.on("chat:message", (data) => {
    Messages.push(data);
    io.sockets.emit("chat:message", data);
  });
  socket.on("chat:typing", (data) => {
    socket.broadcast.emit("chat:typing", data);
  });
});
