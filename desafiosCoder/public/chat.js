let message = document.getElementById("message");
let username = document.getElementById("username");
let btn = document.getElementById("send");
let output = document.getElementById("output");
let actions = document.getElementById("actions");

btn.addEventListener("click", () => {
  socket.emit("chat:message", {
    username: username.value,
    message: message.value,
    date: new Date().toLocaleString(),
  });
  message.value = " ";
  message.focus();
  return false;
});

message.addEventListener("keypress", () => {
  socket.emit("chat:typing", username.value);
});

socket.on("chat:history", (data) => {
  actions.innerHTML = " ";
  output.innerHTML = data
    .map(
      (user) =>
        `<p>
  <strong class="message-user">${user.username} <span class="message-date">[ ${user.date} ]</span></strong>: <span class="message-txt">${user.message}</span>
  </p>`
    )
    .join(" ");
  return false;
});

socket.on("chat:typing", (data) => {
  actions.innerHTML = `<p></em>${data} Escribiendo.... </p>`;
});
