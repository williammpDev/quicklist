const form = document.querySelector("form");
const ul = document.querySelector("ul.list");
const new_item = document.getElementById("new-item");
const alertBox = document.querySelector(".alert");
const closeAlertButton = alertBox.querySelector("button");
const ALERT_DURATION_MS = 3000;
let alertTimeoutId;

// Prevent users from entering numbers in the input field
new_item.addEventListener("input", () => {
  const hasCharactersRegex = /\d+/g;
  new_item.value = new_item.value.replace(hasCharactersRegex, "");
});

form.onsubmit = (event) => {
  event.preventDefault();
  const value = new_item.value.trim();
  if (value) {
    addItemToList(value);
    new_item.value = "";
    new_item.focus();
  } else {
    alert("Por favor, insira um item válido.");
  }
};

function addItemToList(item) {
  const li = document.createElement("li");

  const label = document.createElement("label");
  const input = document.createElement("input");
  input.type = "checkbox";
  const span = document.createElement("span");
  span.classList.add("text-paragraph");
  span.textContent = item;
  label.append(input, span);

  const button = document.createElement("button");
  button.setAttribute("aria-label", "Remover item");
  const img = document.createElement("img");
  img.src = "./icons/trash.png";
  img.setAttribute("alt", "");
  button.appendChild(img);

  li.append(label, button);

  ul.appendChild(li);
}

// Event delegation for removing items
ul.addEventListener("click", (event) => {
  const removeButton = event.target.closest(
    'button[aria-label="Remover item"]',
  );
  if (!removeButton) return;

  removeButton.closest("li").remove();
  showAlert();
});

closeAlertButton.addEventListener("click", hideAlert);

function showAlert() {
  alertBox.classList.remove("hidden");

  // Reset the timer so rapid removals keep the alert visible
  clearTimeout(alertTimeoutId);
  alertTimeoutId = setTimeout(hideAlert, ALERT_DURATION_MS);
}

function hideAlert() {
  alertBox.classList.add("hidden");
  clearTimeout(alertTimeoutId);
}
