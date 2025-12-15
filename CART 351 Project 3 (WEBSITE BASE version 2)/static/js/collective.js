// import sentimentToFormatHelper from './sentimentToFormatHelper.js';

let loadedEntries = false
let data
let formatter = new sentimentHelper();
let entriesArray
let displayStack = []
let bookshelf

// 

window.onload = async function () {
    console.log("collective.js loaded");
    let startButton = this.document.getElementById("all_collection");
    bookshelf = this.document.getElementById("journal_holder");
    console.log("Bookshelf:", bookshelf);
    

    //get stuff from mongo db
    const fetching = await fetch("/get-entries");

    data = await fetching.json();
    console.log("Fetched entries:", data);
    formatter.testing()

    let parsedEntries = data.map(entry => {
        return {
            username: entry.username,
            entry: entry.entry,
            time: entry.datetime,
            //string to workable float
            sentiment: entry.sentiment.map(s => parseFloat(s))
        };
    });
    console.log(parsedEntries);

    //add entries in order

    if(!loadedEntries){
        startButton.addEventListener("click", () => {
            startButton.style.display = "none";
            bookshelf.style.display = "";
            addEntries(parsedEntries);

            // while (!displayStack.empty) {
            //     bookshelf.appendChild(displayStack.pop())
            // }





        });
    }


}





function addEntries(entriesArray) {

    for (i = 0; i < entriesArray.length; i++){    
        
        let box = document.createElement('div');
        box.className = 'entry-box';

        // Style box ****CHANGE HERE TO CHANGE BOX APPEARANCE***********
        box.classList.add("boxNum"+i);
        box.style.padding = '20px';
        box.style.margin = '10px auto';
        box.style.backgroundColor = formatter.sentimentToColour(entriesArray[i]['sentiment'][0]);

        box.style.maxWidth = '800px';
        box.style.width = 'fit-content';

        //set sentences with helper function
        formatter.addSentences(box,entriesArray[i]['entry'],entriesArray[i]['sentiment'])
            
        bookshelf.appendChild(box);
        displayStack.push(box)

    }

    
}
