window.onload = function () {
    
    console.log("script loaded");

    const startContainer = this.document.getElementById("start-container");
    const formContainer = this.document.getElementById("form-container");
    const startButton = this.document.getElementById("start-button");

    // const startButton = this.document.querySelector("start-button")
    
    if (formContainer) formContainer.style.display = "none";


    
    if (startButton) {
        // formContainer.style.display = "none";
        startButton.addEventListener("click", () => {
            startContainer.style.display = "none";
            startButton.style.display = "none";
            formContainer.style.display = "";
        });
        
    };

}