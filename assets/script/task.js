import { selectedDate, singleArrayDate, listDetails } from "./calendar.js";
import { scaleEffect,makeDraggable, dragAndDrop } from "./style.js";

const listContainer = document.querySelector(".list");

export function addTask() {
  listContainer.innerHTML = "";

  // mostra l’etichetta della data quando si seleziona una data
  if (selectedDate) listDetails(selectedDate);

  //si crea la variabile tasks e si accede alla proprietà selectedDate dell'oggetto singleArrayDate, se questa proprietà esiste allora tasks è l'array dei task
  //se non esiste si crea un array vuoto
  const tasks = singleArrayDate[selectedDate] || [];

  tasks.forEach((element, index) => {
    const li = document.createElement("li");
    li.setAttribute("draggable", true);
    li.id = `item-${index}-${Date.now()}`;
    li.classList.add("list-style");

    const liText = document.createElement("span");
    liText.textContent = element;
    liText.style.flexGrow = "1";

    const noDone = document.createElement("i");
    noDone.classList.add("bi", "bi-circle", "pointer");

    const eliminate = document.createElement("i");
    eliminate.classList.add("bi", "bi-trash", "pointer");

    const done = document.createElement("i");
    done.classList.add("bi", "bi-check-circle", "hidden", "pointer");

    const modified = document.createElement("i");
    modified.classList.add("bi", "bi-pencil", "pointer");

    const check = document.createElement("i");
    check.classList.add("bi", "bi-check-circle", "hidden", "pointer");

    noDone.addEventListener("click", () => {
      noDone.classList.add("hidden");
      done.classList.remove("hidden");
      li.style.textDecoration = "line-through";
      li.style.textDecorationColor = "red";
      done.style.color = "green";
    });

    done.addEventListener("click", () => {
      done.classList.add("hidden");
      noDone.classList.remove("hidden");
      liText.style.textDecoration = "none";
    });

    eliminate.addEventListener("click", () => {
      //Rimuovi 1 solo elemento in base al suo index".
      tasks.splice(index, 1);
      //Salva i dati aggiornati nel localStorage, così non si perdono al refresh della pagina.
      localStorage.setItem("todoListByDate", JSON.stringify(singleArrayDate));
      // aggiorna la lista per la data selezionata
      addTask();
    });

    modified.addEventListener("click", () => {
      const input = document.createElement("input");
      input.type = "text";
      input.value = element;
      input.classList.add("input-modified");
      // Sostituiamo il testo con l'input
      liText.innerHTML = "";
      liText.appendChild(input);
      modified.classList.add("hidden");
      modified.style.color="green";
      check.classList.remove("hidden");
    });


 check.addEventListener("click", () => {
    const input = liText.querySelector("input"); // Recupero l’input dentro liText
  const newValue = input.value.trim();
  if (newValue) {
    tasks[index] = newValue;
    localStorage.setItem("todoListByDate", JSON.stringify(singleArrayDate));
    addTask(); //Aggiorna la lista
  }
});

    scaleEffect(noDone);
    scaleEffect(eliminate);
    makeDraggable(li);
    dragAndDrop(listContainer);

    li.append(noDone, done, liText, modified, check, eliminate);
    listContainer.appendChild(li);
  });
}
