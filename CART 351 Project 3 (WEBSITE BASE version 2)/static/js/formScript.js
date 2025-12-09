window.onload = function () {
    
    console.log("script loaded");

    const startContainer = this.document.getElementById("start-container");
    const formContainer = this.document.getElementById("form-container");
    const resultContainer = this.document.getElementById("form-result");
    const startButton = this.document.getElementById("start-button");

    // const startButton = this.document.querySelector("start-button")
    
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

}