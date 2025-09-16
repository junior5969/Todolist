import { updateCalendar, listDetails } from "./calendar.js";
import { addTask } from "./task.js";
import { singleArrayDate, selectedDate } from "./calendar.js";
import { darkMode, lightMode } from "./style.js";


document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".addElement");
  const input = document.querySelector(".input-type");
  const listContainer = document.querySelector(".list");
  const darkModeBtn = document.querySelector(".dark-mode-btn");
  const lightModeBtn = document.querySelector(".light-mode-btn");

  listContainer.style.display = "none";

  function addList() {
    listContainer.style.display = "block";
    listContainer.style.backgroundColor = "white";
  }

  
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value.trim();
  if (!value) return;

  //si accede alla proprietà selectedDate dell'oggetto singleArrayDate e si crea un array vuoto se non vi è già un array esistente 
  if (!singleArrayDate[selectedDate]) {
    singleArrayDate[selectedDate] = [];
  }
//nell'array vuoto che è stato creato pusha la variabile value corrispondente al valore scritto nell'input
  singleArrayDate[selectedDate].push(value);

  //Salva i dati aggiornati nel localStorage, così non si perdono al refresh della pagina.
  localStorage.setItem("todoListByDate", JSON.stringify(singleArrayDate));
  input.value = "";
  //aggiorna la lista
  addTask(); 
});

  updateCalendar(addList, listDetails);

  darkModeBtn.addEventListener("click", darkMode);
  lightModeBtn.addEventListener("click", lightMode);
});
