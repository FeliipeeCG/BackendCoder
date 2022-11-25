const socket = io();
const form = document.querySelector("#products-form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const thumbnail = document.querySelector("#thumbnail");

async function render(products) {
  const response = await fetch("./formProducts.hbs");
  const template = await response.text();
  const HBStemplate = Handlebars.compile(template);
  const html = HBStemplate({ products: products });
  document.querySelector("#output-products").innerHTML = html;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  socket.emit("new-product", {
    title: title.value,
    price: price.value,
    thumbnail: thumbnail.value,
  });

  title.value = "";
  price.value = "";
  thumbnail.value = "";

  title.focus();
});

socket.on("product:all", (products) => {
  render(products);
});

socket.on("new-product", (data) => {
  data.status === true
    ? alert(`Ya existe el producto ${data.product.title} en el sistema`)
    : alert(`Se ha agregado el producto ${data.product.title}`);
});
