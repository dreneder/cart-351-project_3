// variable for the color management
let colorValue;
let entriesCache = [];

window.onload = async function () {


    
    console.log("script loaded");

    // contants for all elements being modified
    const collectButtons = this.document.getElementById("collect_buttons");
    const formContainer = this.document.getElementById("consult-form");
    const allButton = this.document.getElementById("all_collection");
    const ownButton = this.document.getElementById("own_collection");
    const journalHolder = this.document.getElementById("journal_holder");
    const welcomeCard = this.document.getElementById("welcome_card");
    const consultForm = this.document.querySelector("#consult-form");
    const entryCard = this.document.getElementById("entry_card");
    const usernameInput = this.document.getElementById("username");
    const tableRow = this.document.querySelector(".journal_table tbody tr");
    const startDate = this.document.getElementById("start_date");
    const selectDate = this.document.getElementById("select_date");
    const endDate = this.document.getElementById("end_date");


    if (formContainer) formContainer.style.display = "none";
    if (journalHolder) journalHolder.style.display = "none";
    if (entryCard) entryCard.style.display = "none";

    // to hide or show elements before the entries table
    if (ownButton) {
        ownButton.addEventListener("click", () => {
        collectButtons.style.display = "none";
        welcomeCard.style.display = "none";
        formContainer.style.display = "";
    });
};
if (allButton) {
    allButton.addEventListener("click", async () => {
        collectButtons.style.display = "none";
        welcomeCard.style.display = "none";
        journalHolder.style.display = "";
        entriesCache = await loadEntries();
        renderEntries(entriesCache, tableRow, entryCard, { startDate, selectDate, endDate });
    });
};

// handle form submit
if (consultForm) {
    consultForm.addEventListener("submit", async function (event) {
        
        event.preventDefault();
        console.log("submit clicked");

        const query = (usernameInput?.value || "").trim().toLowerCase();
        entriesCache = await loadEntries();
        const filtered = query
          ? entriesCache.filter((e) => (e.username || "").toLowerCase() === query)
          : entriesCache;

        journalHolder.style.display = "";
        formContainer.style.display = "none";

        if (filtered.length === 0) {
          if (tableRow) tableRow.innerHTML = "";
          if (startDate) startDate.innerHTML = "";
          if (endDate) endDate.innerHTML = "";
          if (selectDate) {
            selectDate.innerHTML = "It seems that this user has never created a journal,<br/>what are you waiting for?";
            selectDate.style.visibility = "visible";
          }
          return;
        }

        renderEntries(filtered, tableRow, entryCard, { startDate, selectDate, endDate });
            }
        )
    }
}


// map sentiment value (0-100) to rgb
function valueToColor(v) {
  let r, g, b = 0;

  if (v <= 50) {
    let t = v / 50;
    r = 255;
    g = Math.round(255 * t);
  } else {
    let t = (v - 50) / 50;
    r = Math.round(255 * (1 - t));
    g = 255;
  }

  return `rgb(${r}, ${g}, ${b})`;
}

// fetch entries from backend as JSON
async function loadEntries() {
  const res = await fetch("/collectiveEntries?format=json");
  const data = await res.json();
  return data.map(({ entry, username, sentiment, datetime }) => ({
    entry,
    username,
    sentiment: convertSentiment(sentiment),
    datetime,
  }));
}

// render timeline cells and hook click to show entry text
function renderEntries(entries, tableRow, cardContent, dateTime = {}) {
  if (!tableRow || !entries || entries.length === 0) return;

  const sorted = [...entries].sort((a, b) => {
    const da = new Date(a.datetime || 0).getTime();
    const db = new Date(b.datetime || 0).getTime();
    return da - db;
  });

  tableRow.innerHTML = "";
  if (dateTime.selectDate) {
    dateTime.selectDate.innerHTML = "";
  }

  sorted.forEach((item) => {
    const td = document.createElement("td");
    td.className = "journal_cell"; // entry cell
    td.innerHTML = "&nbsp;"; // empty visual only for click target
    td.title = item.datetime || "entry"; // shows datetime
    if (typeof item.sentiment === "number") {
      td.style.backgroundColor = valueToColor(item.sentiment); // color by sentiment
    }
    td.addEventListener("mouseenter", () => {
      if (dateTime.selectDate) {
        dateTime.selectDate.innerHTML = formatDateLabel(item.datetime); // center date label on hover
        dateTime.selectDate.style.visibility = "visible";
      }
    });
    td.addEventListener("click", () => {
      if (cardContent) {
        cardContent.style.display = ""; // reveal entry card
        cardContent.textContent = item.entry || "(no entry text)"; // entry body
        const bg = typeof item.sentiment === "number" ? valueToColor(item.sentiment) : "";
        if (bg) {
          cardContent.style.boxShadow = `inset 0 0 10px 10px ${bg}`; // match selected cell color
        }
      }
      const positiveLevel = document.getElementById("positive_level");
      if (positiveLevel) {
        positiveLevel.innerHTML = `This entry is ${item.sentiment}% positive`;
        positiveLevel.style.display = ""; // show sentiment label when card shows
      }
      console.log("sentiment value:", item.sentiment);
      if (dateTime.selectDate) dateTime.selectDate.innerHTML = formatDateLabel(item.datetime); // center date label
    });
    tableRow.appendChild(td); // add cell to row
  });

  if (dateTime.startDate) dateTime.startDate.innerHTML = formatDateLabel(sorted[0].datetime); // left date label
  if (dateTime.endDate) dateTime.endDate.innerHTML = formatDateLabel(sorted[sorted.length - 1].datetime); // right date label
}

// make a readable date label, used this documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
function formatDateLabel(dtStr) {
  if (!dtStr) return "";
  const d = new Date(dtStr);
  if (Number.isNaN(d.getTime())) return "";
  const month = d.toLocaleString("en", { month: "short" });
  const day = d.getDate();
  const year = d.getFullYear();
  return `${month} ${day}<br/>${year}`;
}

// convert sentiment from 0-1 to 0-100
function convertSentiment(s) {
  return typeof s === "number" ? Math.round(s * 100) : s;
}
