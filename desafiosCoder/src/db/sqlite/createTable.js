import knex from "knex";
import connection from "./connection.js";
const Knex = knex(connection);

Knex.schema
  .createTable("messages", (table) => {
    table.increments("id");
    table.string("username");
    table.string("message");
    table.string("date");
  })
  .then(() => console.log("Messages table created"))
  .catch((e) => {
    console.log("error!", e);
    throw e;
  })
  .finally(() => {
    Knex.destroy();
  });
