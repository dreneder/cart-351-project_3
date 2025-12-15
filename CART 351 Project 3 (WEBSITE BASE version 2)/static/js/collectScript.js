let colorValue;


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


    if (formContainer) formContainer.style.display = "none";
    if (journalHolder) journalHolder.style.display = "none";

    // to hide or show elements before the entries table
    if (ownButton) {
        ownButton.addEventListener("click", () => {
        collectButtons.style.display = "none";
        welcomeCard.style.display = "none";
        formContainer.style.display = "";
    });
};
if (allButton) {
    allButton.addEventListener("click", () => {
        collectButtons.style.display = "none";
        welcomeCard.style.display = "none";
        journalHolder.style.display = "";
    });
};

// handle form submit
if (consultForm) {
    consultForm.addEventListener("submit", async function (event) {
        
        event.preventDefault();
        console.log("submit clicked");
        
        journalHolder.style.display = "";
        formContainer.style.display = "none";
            }
        )
    }


}


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