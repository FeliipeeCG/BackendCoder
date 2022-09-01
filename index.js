const fs = require("fs");
class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }
  //Metodo Save
  save(objet) {
    const Pop = fs.readFileSync(this.archivo, "utf-8");
    const products = JSON.parse(Pop);
    const id =
      products.length > 0
        ? products[products.length - 1].id + 1
        : products.length + 1;
    const product = { id, ...objet };
    products.push(product);
    fs.writeFileSync(this.archivo, JSON.stringify(products, null, 2));
    return id;
  }
  //Filtro por ID
  getById(id) {
    const data = fs.readFileSync(this.archivo, "utf-8");
    const dataParseada = JSON.parse(data);
    const objet = dataParseada.find((objet) => objet.id === id);
    return objet;
  }
  //Obtener Todo
  getAll() {
    const data = fs.readFileSync(this.archivo, "utf-8");
    const dataParseada = JSON.parse(data);
    return dataParseada;
  }
  //Eliminar por la ID
  deleteById(id) {
    const data = fs.readFileSync(this.archivo, "utf-8");
    const dataParseada = JSON.parse(data);
    const dataFiltrada = dataParseada.filter((objet) => objet.id !== id);
    const dataString = JSON.stringify(dataFiltrada);
    fs.writeFileSync(this.archivo, dataString);
    return dataFiltrada;
  }
  //Eliminar Todo
  deleteAll() {
    fs.writeFileSync(this.archivo, "[]");
    return "[]";
  }
}
const contenedor = new Contenedor("products.txt");
const product1 = {
  title: "Funko Goku",
  price: 1200,
  image:
    "https://tap-multimedia-1172.nyc3.digitaloceanspaces.com/productimage/38896/889698396981.jpg",
  id: 1,
};
const product2 = {
  title: "Funko Kurama",
  price: 2000,
  image:
    "https://images.stockx.com/images/Funko-Pop-Anime-Naruto-Kurama-Super-Sized-Figure-73.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1649962850",
  id: 2,
};
const product3 = {
  title: "Funko Luffy",
  price: 1500,
  image:
    "https://cdn.shopify.com/s/files/1/0559/9513/8226/products/Luffytaro921-1_large.jpg?v=1636045263",
  id: 3,
};
const product4 = {
  title: "Funko Deku",
  price: 2000,
  image:
    "https://cdn.shopify.com/s/files/1/0362/6378/8588/products/funko_pop_anime_my_hero_academia_infinite_deku_with_eri_1008_889698519335_pop_700x.jpg?v=1657665613",
  id: 4,
};
const product5 = {
  title: "Funko Itachi",
  price: 1500,
  image:
    "https://cdn.shopify.com/s/files/1/0362/6378/8588/products/compra_funko_pop_anime_naruto_shippuden_anbu_itachi_1027_889698581493_1200x.jpg?v=1654033463",
  id: 5,
};
contenedor.save(product1);
contenedor.save(product2);
contenedor.save(product3);
contenedor.save(product4);
contenedor.save(product5);
console.log(contenedor.getById(2));
contenedor.deleteById(2);
console.log(contenedor.getAll());
