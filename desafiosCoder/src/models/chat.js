import knex from "knex";

export default class Messages {
  constructor(config, table) {
    this.knex = knex(config);
    this.table = table;
  }
  async saveMessage(object) {
    try {
      await this.knex.insert(object).into(this.table);
      return await this.knex.select("*").from(this.table);
    } catch (error) {
      console.error(`Se produjo un error en saveMessage:${error}`);
    }
  }
  async readMessages() {
    try {
      return await this.knex.select("*").from(this.table);
    } catch (error) {
      console.error(`Se produjo un error en readMessages:${error}`);
    }
  }
}
