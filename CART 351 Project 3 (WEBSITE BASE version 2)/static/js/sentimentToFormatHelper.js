



function sentimentToColour(inSentiment) {
    //returns HSB based on sentiment
    //sets sentiment 0 --> blue
    let colVal = ((inSentiment* 3.6) + 200)%360
    let out = `hsl(${colVal}, ${45}%, ${100}%)`;
    return out;
}

function sentimentToFont(inSentiment) {

    let n = 7
    let condition = Math.floor(inSentiment/(100/n))
    let out;

    // Goudy Old Style
    // Andale Mono
    // Delius
    // Avant Garde
    // Optima
    // Walter Turncoat ??
    // Brush Script MT

    switch (condition) {
        case 0:
            out = "Goudy Old Style"
            break;


        case 1:
            out = "Andale Mono"
            break;


        case 2:
            out = "Delius"
            break;

        case 3:
            out = "Avant Garde"
            break;


        case 4:
            out = "Optima"
            break;


        case 5:
            out = "Walter Turncoat"
            break;


        case 6:
            out = "Brush Script MT"
            break;


        default:
            out = "Arial"
            break;
    }

    return out;
}

function sentimentArrToFont(inArr) {
    outArr = inArr.map(sentimentToFont)
    return outArr;
}
