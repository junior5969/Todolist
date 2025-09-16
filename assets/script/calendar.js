
//variabili esportate perche usate da task.js
import {addTask} from "./task.js";


//creiamo una variabile singleDayArrray il cui valore viene definito dal localStorage, se qui non vi è nessun contenuto allora crea un oggetto vuoto {}.
//JSON.parse converte in oggetto la stringa "todoListByDate utilizzata come indicatore del contenuto della variabile singleArrayDate"
//è una sorta di database, un oggetto, costituito da proprietà chiave:valore che sono data:array di task
export const singleArrayDate = JSON.parse(localStorage.getItem("todoListByDate")) || {};

export let selectedDate = null;


//variabili fuori da generate altrimenti vengono chiamate ad ogni generazione di calendario
const monthList = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
    "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
const dayList = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"];

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth() + 1;

function generateCalendar(year, month) {
  let calendarHTML = "<table class='calendar-structure'>";
  calendarHTML += `
    <thead>
      <tr>
        <th class="calendar-title" colspan="7">
          <div class="calendar-nav">
            <button id="prevMonth" class="nav-btn">◀</button>
            <span id="monthLabel">${monthList[month - 1]} ${year}</span>
            <button id="nextMonth" class="nav-btn">▶</button>
          </div>
        </th>
      </tr>
      <tr>`;
  for (let i = 0; i < 7; i++) {
    calendarHTML += `<th class='week-day-style'>${dayList[i]}</th>`;
  }
  calendarHTML += "</tr></thead><tbody>";

  const firstDay = new Date(year, month - 1, 1).getDay();
  const totalDays = new Date(year, month, 0).getDate();

  let day = 1;
  for (let i = 0; i < 6; i++) {
    calendarHTML += "<tr>";
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        calendarHTML += "<td></td>";
      } else if (day <= totalDays) {
        const dateStr = `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`;
        calendarHTML += `<td class='day-style' data-date='${dateStr}'>${day}</td>`;
        day++;
      } else {
        calendarHTML += "<td></td>";
      }
    }
    calendarHTML += "</tr>";
    if (day > totalDays) break;
  }

  calendarHTML += "</tbody></table>";
  return calendarHTML;
}


//la funzione updateCalendar genera il calendario
export function updateCalendar(addListCallback, listDetailsCallback) {
  const calendarContainer = document.getElementById("calendar");
  if (!calendarContainer) return;
  calendarContainer.innerHTML = generateCalendar(currentYear, currentMonth);

  //Al click di prevMonth o nextMonth si aggiornano currentMonth e currentYear, dopodichè ri richiama la funzione che genera il calendario per aggiornarlo alla nuova data
  document.getElementById("prevMonth").addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 1) {
      currentMonth = 12;
      currentYear--;
    }
    updateCalendar(addListCallback, listDetailsCallback); //addListCallback, listDetailsCallback sono i parametri della funzione (come a,b) che fanno riferimento ad addList per creare la lista e listDetails per creare il <p> con la data
  });

  document.getElementById("nextMonth").addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 12) {
      currentMonth = 1;
      currentYear++;
    }
    updateCalendar(addListCallback, listDetailsCallback);
  });


  //per ogni giorno selezionato, al suo click, si crea la variabile dateStr che corrisponde al valore della data cliccata
  //poi si associa questo valore a selectedDate, e si chiamano le funzioni
  document.querySelectorAll(".day-style").forEach((dayEl) => {
    dayEl.addEventListener("click", () => {
      const dateStr = dayEl.dataset.date;
        selectedDate = dateStr;  
      addListCallback();//genera la lista dei task per quella data
      listDetailsCallback(dateStr);//aggiorna l’etichetta con la data
       addTask();//rigenera la lista visiva
    });
  });
}


//funzione per creare <p> con data selezionata
export function listDetails(dateStr) {
  selectedDate = dateStr;
  const listContainer = document.querySelector(".list");
  const oldResume = document.querySelector(".date-label");
  //se vi è una label precedente la rimuove
  if (oldResume) oldResume.remove();

  const resume = document.createElement("p");
  resume.classList.add("date-label");
  resume.textContent = `${dateStr}`;
  //la sintassi è insertBefore(nuovoNodo, nodoDiRiferimento) quindi si inserisce resume prima della lista
  listContainer.insertBefore(resume, listContainer.firstChild);
}