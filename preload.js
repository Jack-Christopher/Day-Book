// preload.js

// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    
    date = day + "/" + month + "/" + year;
    replaceText(`date`, date)


    // create a random text for the initial text of 5 letters
    var initial = ""
    var alphabet = "abcdefghijklmnopqrstuvwxyz"
    for (let i = 0; i < 5; i++) {
        initial += alphabet[Math.floor(Math.random() * alphabet.length)]
    }
    
    // replaceText(`init`, initial)

    const tx = document.getElementsByTagName("textarea");
    for (let i = 0; i < tx.length; i++) {
        tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
        tx[i].addEventListener("input", OnInput, false);
    }
    function OnInput() {
        // this.style.height = 0;
        this.style.height = (this.scrollHeight) + "px";
    }
})