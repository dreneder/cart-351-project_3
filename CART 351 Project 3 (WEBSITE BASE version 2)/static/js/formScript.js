// variables for the name, entry, time and sentiment score
let username;
let lastUsername;
let entry;
let time;
let sentiment;
let sentimentResult;
let sentimentReady = false;

window.onload = async function () {


    
    console.log("script loaded");

    // contants for all elements being modified
    const startContainer = this.document.getElementById("start-container");
    const formContainer = this.document.getElementById("form-container");
    const resultContainer = this.document.getElementById("form-result");
    const startButton = this.document.getElementById("start-button");
    const newEntryButton = this.document.getElementById("newentry-button");
    const entryForm = this.document.querySelector("#entry-form");
    const usernameInput = this.document.getElementById("username");
    const journalInput = this.document.getElementById("journalEntry");

    //OWEN - moved from preload b/c dosnt load in non p5

    // Initialize the sentiment analysis model
    sentiment = await ml5.sentiment("movieReviews");
    console.log("Sentiment object created:", sentiment);
    sentimentReady = true;
    console.log("sentiment model ready");   
    



    // if (startContainer) startContainer.style.display = "";
    if (formContainer) formContainer.style.display = "none";
    if (resultContainer) resultContainer.style.display = "none";

    // start button logic can be used to write the first or more entries
    if (startButton) {
        startButton.addEventListener("click", () => {
            startContainer.style.display = "none";
            resultContainer.style.display = "none";
            formContainer.style.display = "";

        });
    };
    
    // handle form submit
    if (entryForm) {
        entryForm.addEventListener(
            
            "submit", async function (event) {
                
                event.preventDefault();
                console.log("submit clicked");
                
                // captures values
                const formData = new FormData(event.target);
                username = formData.get("username");
                entry = formData.get("journalEntry");
                console.log( entry + " Entry being judged");
                
                lastUsername = username || "";
                
                // shows results
                resultContainer.style.display = "";
                formContainer.style.display = "none";
                event.target.reset();

                // clear entry but keep name
                if (lastUsername && usernameInput) usernameInput.value = lastUsername;
                getSentiment();
            }
        )
    }
    
    // allow writing another entry without losing the username
    if (newEntryButton) {
        newEntryButton.addEventListener("click", () => {
            resultContainer.style.display = "none";
            formContainer.style.display = "";
            if (lastUsername && usernameInput) usernameInput.value = lastUsername;
            if (journalInput) journalInput.value = "";
            if (journalInput) journalInput.focus();
        });
    }
}

// function preload() {
//     // Initialize the sentiment analysis model
//     sentiment = ml5.sentiment("MovieReviews", () => {
//     sentimentReady = true;
//     console.log("sentiment model ready");
//     });
// }

// function setup() {
//     noCanvas();
// }

async function getSentiment() {
    console.log(sentimentReady);

    //edge case checks
    if (!sentimentReady || !sentiment){
        console.log("model not ready");
        return;
    } 
    if (!entry){
        console.log("no entry");
        return;
    }
    console.log("through cases");
    
    

    let prediction = await sentiment.predict(entry);
    console.log("prediction object:"+ prediction);
    console.log("prediction score:"+ prediction.score);
    console.log("prediction confidence:"+ prediction.confidence);

    if (prediction && typeof prediction.score === "number") {
        sentimentResult = prediction.score; // store if you need it
        console.log("sentiment score:", prediction.score);
    }

function predictCallback() {
    console.log("worked, Sentiment confidence: " + prediction.confidence);
    return;
    
}


}
