const http = require("http");
const server = http.createServer((peticion, respuesta) => {
  respuesta.end("Hola banda que hacen?");
});
const conn = server.listen(8080, () => {
  console.log(`Servidor en funcionamiento: ${conn.address().port}`);
});
