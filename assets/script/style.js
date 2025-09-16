export function scaleEffect(element, scale = 1.25, transition = "transform 0.3s ease") {
  element.addEventListener("mouseenter", (event) => {
    event.target.style.transform = `scale(${scale})`;
    event.target.style.transition = transition;
  });

  element.addEventListener("mouseleave", (event) => {
    event.target.style.transform = "scale(1)";
  });
}

// Funzione per rendere un elemento trascinabile
export function makeDraggable(element) {
  if (!element) return;

  element.setAttribute("draggable", "true"); // serve per permettere il drag

  element.addEventListener("dragstart", (ev) => {
    ev.dataTransfer.setData("text/plain", ev.target.id);
    element.classList.add("dragstart");
  });
}

export function dragAndDrop(element) {
  if (!element) return;

  element.addEventListener("dragover", (ev) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  });

  element.addEventListener("drop", (ev) => {
    ev.preventDefault();
    const id = ev.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(id);
    if (draggedElement) {
      element.appendChild(draggedElement);
      draggedElement.classList.remove("dragstart");
    }
  });
}

  const darkModeBtn = document.querySelector(".dark-mode-btn");
  const lightModeBtn = document.querySelector(".light-mode-btn");
  const page = document.querySelector("html");
  const container = document.querySelector("#todo-list");

export function darkMode () {
page.classList.add("dark-theme");
container.style.backgroundColor="rgba(90, 90, 90, 1)";
darkModeBtn.classList.add("hidden");
lightModeBtn.classList.remove("hidden");
}

export function lightMode () {
page.classList.remove("dark-theme");
container.style.backgroundColor="rgb(238, 238, 238)";
lightModeBtn.classList.add("hidden");
darkModeBtn.classList.remove("hidden");
}