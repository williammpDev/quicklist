const form = document.querySelector("form");
const new_item = document.getElementById("new-item");

// Manipulando o input new_item para receber somente letras
new_item.addEventListener("input", () => {
  const hasCharactersRegex = /\d+/g;
  new_item.value = new_item.value.replace(hasCharactersRegex, "");
});

form.onsubmit = (event) => {
  event.preventDefault();
  console.log(new_item.value);
};
