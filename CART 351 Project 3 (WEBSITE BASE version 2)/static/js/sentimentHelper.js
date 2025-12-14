class sentimentHelper {
    
    
    constructor() {
        
    }


    // sentimentToColour(inSentiment) {
    //     //returns HSB based on sentiment
    //     //sets sentiment happy - medium - blue
    //     //red to blue through purple
    //     let colVal = 240 * (1 - inSentiment);
    //     // PLAY AROUND W THIS COLOUR
    //     let out = `hsl(${colVal}, ${60}%, ${90}%)`;
    //     return out;
    // }
    sentimentToColour(inSentiment) {
    // 180° (cyan/teal) → 280° (purple) → 10° (red-orange/coral)
    let colVal = inSentiment < 0.5
        ? 180 + ((inSentiment) * 200)      // Teal to purple
        : 280 + ((inSentiment - 0.5) * 100); // Purple wraps to coral
    colVal = colVal % 360;
    let out = `hsl(${colVal}, 65%, 82%)`;
    return out;
}

    sentimentToFont(inSentiment, elementRef) {

        let n = 5
        let condition = Math.floor(inSentiment/(100/n))
        let out;

        // Goudy Old Style
        // Andale Mono
        // Avant Garde
        // Optima
        // Brush Script MT
        // arial


        elementRef.classList.remove("font-arial")
        elementRef.classList.remove("font-goudy");
        elementRef.classList.remove("font-andale");
        elementRef.classList.remove("font-avant-garde");
        elementRef.classList.remove("font-optima");
        elementRef.classList.remove("font-brush-script");


        // .font-goudy 

        // .font-andale 

        // .font-avant-garde

        // .font-optima 

        // .font-brush-script


        switch (condition) {
            case 0:
                // out = "Goudy Old Style"
                
        
                break;

            case 1:
                elementRef.classList.add("font-andale");
                // out = "Andale Mono"
                break;

            case 2:
                // out = "Avant Garde"
                elementRef.classList.add("font-avant-garde");
                break;

            case 3:
                // out = "Optima"
                elementRef.classList.add("font-optima");
                break;

            case 4:
                // out = "Brush Script MT"
                elementRef.classList.add("font-brush-script");
                break;

            default:
                // out = "Arial"
                elementRef.classList.add("font-arial")
                break;
        }

        return out;
    }

    parseString(str) {
        // Split on comma, period, ? and !
        // filter empty strings
        const segments = str.split(/[.,?!]/)
                            .filter(s => s.length > 0);
        
        // console.log("Parsed segments:", segments);
        return segments;
    }

    // adds sentences to a parent block given the entry and the sentiment array
    addSentences(parentToAppend, entryText, sentimentArray){
        //create vars
        let sentences = this.parseString(entryText);
        let children = [];

        console.log("Sentences:", sentences);
        console.log("Sentiment Array:", sentimentArray);

        for (let i = 0; i < sentences.length; i++) {
            console.log(`Sentiment for sentence ${i}:`, sentimentArray[i]);

            //loop for each sentence and matching sentiment value
            parentToAppend.innerHTML +=  "<i id =\"entrySentence"+i+"\"> "+sentences[i]+"</i>";
            //find the created element from parent block
            let ref = parentToAppend.querySelector("#entrySentence"+i)
            ref.style.color = '#1D1E18'; 
            //add the font class to the sentence
            this.sentimentToFont(sentimentArray[i+1] *100, ref);
            children.push(ref)


        }

        return children;
        //return array of children for ease of use later
    }

    testing() {
        console.log("reached testing sentiment helper");
            
    }


    // function sortEntries(){

    // }
}


