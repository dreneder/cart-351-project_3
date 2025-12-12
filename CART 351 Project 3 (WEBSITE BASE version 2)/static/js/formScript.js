// variables for the name, entry, time and sentiment score
let username;
let lastUsername;
let entry;
let time;
let sentiment;
let sentimentResult;
let sentimentReady = false;
let prediction 
let sentences 
let sentenceSentiment


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
        entryForm.addEventListener("submit", async function (event) {
                
                event.preventDefault();
                console.log("submit clicked");
                
                // captures values
                const formData = new FormData(event.target);
                username = formData.get("username");
                entry = formData.get("journalEntry");

                //breaks apart by "   .    ,    !    ?   "
                //find relevant substrings --> save sentences as array
                sentences = parseString(entry);
                sentenceSentiment = new Array(sentences.length);
                console.log(sentences);

                // Promise.all( )
 
                
                lastUsername = username || "";
        
                formContainer.style.display = "none";
                bufferContainer.style.display = "";


                // clear entry but keep name
                if (lastUsername && usernameInput) usernameInput.value = lastUsername;






                // //get sentiment and run time to find it
                const startTime = performance.now();
                // let sentimentValue = getSentiment();
                await sentimentHelper(sentences);
                const endTime = performance.now();


                console.log(`Sentiment analysis took ${endTime - startTime}ms`);
                

                //check predictions work in different scope, also test the different async?

                console.log("______________________ entry sentiment");
                console.log("prediction object:"+ prediction);
                console.log("prediction score:"+ prediction.score);
                console.log("prediction confidence:"+ prediction.confidence);

                console.log("______________________ sentence sentiment");
                console.log(sentences);
                console.log(sentenceSentiment);


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


//OLD
function getSentiment() {
// async function getSentiment() {
    console.log("getSentiment -> "+sentimentReady);

    //edge case checks

    // console.log("through cases");
    prediction = sentiment.predict(entry);
    // prediction = await sentiment.predict(entry);
    console.log("prediction finished");
    
    

    if (prediction && typeof prediction.confidence === "number") {
        sentimentResult = prediction.confidence; // store if you need it
        console.log("sentiment score:", prediction.confidence);
    }
    console.log("worked, Sentiment confidence: " + prediction.confidence);

    return prediction;
}


async function sentimentHelper(input) {
    //edge cases
    if (!sentimentReady || !sentiment|| !entry){
        console.log("not ready");
        return;
    } 

    console.log("senti helper reached");

    // Create an array of promises for each sentence sentiment prediction
    const sentimentPromises = input.map(async (sentence, index) => {
        console.log(`\tsenti helper processing sentence #${index}`);
        sentenceSentiment[index] = await sentiment.predict(sentence);
    });

    // Add the main entry sentiment prediction to the promises
    const mainSentimentPromise = (async () => {
        console.log("\tsenti helper processing main entry sentiment");
        prediction = await sentiment.predict(entry);
    })();

    // Wait for all promises to resolve
    console.log("waiting for all sentiment predictions");
    await Promise.all([...sentimentPromises, mainSentimentPromise]);

    console.log("all sentiment predictions completed");
}

function parseString(str) {
    // Split on comma, period, ? and !
    // filter empty strings
    const segments = str.split(/[.,?!]/)
                        .filter(s => s.length > 0);
    
    // console.log("Parsed segments:", segments);
    return segments;
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

// async function getSentimentString(input) {
    //     console.log("getSentimentString -> "+sentimentReady);

    //     //edge case checks
    //     if (!sentimentReady || !input){
    //         console.log("model not ready");
    //         return;
    //     } 
    //     if (!input){
    //         console.log("no entry");
    //         return;
    //     }


    //     let predictionOut = await sentiment.predict(input);
        
    //     // console.log("prediction finished");

    //     console.log("worked, Sentiment confidence: " + predictionOut.confidence);

    //     return predictionOut;
    //  }


// async function sentimentHelper(input) {
//     console.log("senti helper reached");

//     const sentimentPromises = input.map(async (sentence, index) => {
//         console.log(`\tsenti helper processing sentence #${index}`);
//         sentenceSentiment[index] = await sentiment.predict(sentence);
//     });

//     console.log("waiting for sentence sentiment");
    
//     await Promise.all(sentenceSentiment, getSentiment);




//     // for (let i = 0; i < input.length; i++) {
//     //     console.log("\tsenti helper loop#"+ i);
//     //     sentenceSentiment[i] = sentiment.predict(input[i]);
//     // }
//     console.log("senti helper loop done");
//     await Promise.allSettled(sentenceSentiment, getSentiment())
//     console.log("senti helper done");
    
// }