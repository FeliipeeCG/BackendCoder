const connection = {
  client: "sqlite3",
  connection: {
    filename: "./src/db/ecommerce.sqlite3",
  },
  useNullAsDefault: true,
};

export default connection;
