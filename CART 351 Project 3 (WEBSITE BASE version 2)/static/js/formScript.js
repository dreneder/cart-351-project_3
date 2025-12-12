// variables for the name, entry, time and sentiment score
let username;
let lastUsername;
let entry;
let time;
let sentiment;
let sentimentResult;
let sentimentReady = false;
let prediction 

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
    const sentimentResultFeedback = this.document.getElementById("percentageToInsert");
    const bufferContainer = this.document.getElementById("await-result");

    //OWEN - moved from preload b/c dosnt load in non p5

    // Initialize the sentiment analysis model
    sentiment = await ml5.sentiment("movieReviews");
    console.log("Sentiment object created:", sentiment);
    sentimentReady = true;
    console.log("sentiment model ready");   
    



    // if (startContainer) startContainer.style.display = "";
    if (formContainer) formContainer.style.display = "none";
    if (resultContainer) resultContainer.style.display = "none";
    if (bufferContainer) bufferContainer.style.display = "none";

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
                // console.log( entry + " Entry being judged");
                
                lastUsername = username || "";
                
                formContainer.style.display = "none";
                bufferContainer.style.display = "";


                // clear entry but keep name
                if (lastUsername && usernameInput) usernameInput.value = lastUsername;
                let sentimentValue = await getSentiment();

                //check predictions work in different scope, also find what values to take?
                console.log("prediction object:"+ prediction);
                console.log("prediction score:"+ prediction.score);
                console.log("prediction confidence:"+ prediction.confidence);

                // shows results
                bufferContainer.style.display = "none";
                resultContainer.style.display = "";
                formContainer.style.display = "none";
                event.target.reset();

                //update the HTML page to show confidence 
                sentimentResultFeedback.innerHTML = "<i id = \" percentageToInsert\"> "+(Math.ceil(prediction.confidence * 100 ))+"%</i>"
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



async function getSentiment() {
    console.log("getSentiment -> "+sentimentReady);

    //edge case checks
    if (!sentimentReady || !sentiment){
        console.log("model not ready");
        return;
    } 
    if (!entry){
        console.log("no entry");
        return;
    }
    // console.log("through cases");
    
    

    prediction = await sentiment.predict(entry);
    console.log("prediction finished");
    
    

    if (prediction && typeof prediction.confidence === "number") {
        sentimentResult = prediction.confidence; // store if you need it
        console.log("sentiment score:", prediction.confidence);
    }



    console.log("worked, Sentiment confidence: " + prediction.confidence);

    return prediction;
}


    // function predictCallback() {
    //     console.log("worked, Sentiment confidence: " + prediction.confidence);
    //     return;
        
    // }

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