const fs = window.require('fs');
// functions 
function readFromFile(file_path) {
    // let rawdata = fs.readFileSync("config/settings.json");
    let rawdata = fs.readFileSync(file_path);
    let settings = JSON.parse(rawdata);
    return settings;
}

function writeToFile( file_path, key, value, data=null) {
    if (data == null) {
        data = readFromFile(file_path);
        data[key] = value;
        data = JSON.stringify(data, null, 2);
    } else if (key == null && value == null) {
        data = JSON.stringify(data, null, 2);
    }

    fs.writeFileSync(file_path, data);
}


function initFiles() {
    if (!fs.existsSync("config")) {
        fs.mkdirSync("config");
    }
    if (!fs.existsSync("data")) {
        fs.mkdirSync("data");
    }


    if (!fs.existsSync("config/settings.json")) {
        fs.writeFileSync("config/settings.json", "{}");
        writeToFile("config/settings.json", "name", "user");
        writeToFile("config/settings.json", "key", "default");
    }
    if (!fs.existsSync("data/notes.json")) {
        fs.writeFileSync("data/notes.json", "{}");
    }
}



// ENCRYPTE AND DECRYPT FUNCTIONS
function isLetter (str) {
    return str.length === 1 && str.match(/[a-zA-Z]/i)
  }
   
function isUpperCase (character) {
    if (character === character.toUpperCase()) {
        return true
    }
    if (character === character.toLowerCase()) {
        return false
    }
}  

function encrypt (key, message) {
    let result = ''
   
    for (let i = 0, j = 0; i < message.length; i++) {
        const c = message.charAt(i)
        if (isLetter(c)) {
            if (isUpperCase(c)) {
            result += String.fromCharCode((c.charCodeAt(0) + key.toUpperCase().charCodeAt(j) - 2 * 65) % 26 + 65) // A: 65
            } else {
            result += String.fromCharCode((c.charCodeAt(0) + key.toLowerCase().charCodeAt(j) - 2 * 97) % 26 + 97) // a: 97
            }
        } else {
            result += c
            j--;
        }
        j = ++j % key.length
    }
    return result
  }
   
 
function decrypt (key, message) {
    let result = ''
   
    for (let i = 0, j = 0; i < message.length; i++) {
        const c = message.charAt(i)
        if (isLetter(c)) {
            if (isUpperCase(c)) {
            result += String.fromCharCode(90 - (25 - (c.charCodeAt(0) - key.toUpperCase().charCodeAt(j))) % 26)
            } else {
            result += String.fromCharCode(122 - (25 - (c.charCodeAt(0) - key.toLowerCase().charCodeAt(j))) % 26)
            }
        } else {
            result += c;
            j--;
        }
        j = ++j % key.length
    }
    return result
}


function getFullDate() {
    let full_date = new Date();
    let day = full_date.getDate();          day = day < 10 ? "0" + day : day;
    let month = full_date.getMonth() + 1;   month = month < 10 ? "0" + month : month;
    let year = full_date.getFullYear();

    let hour = full_date.getHours();        hour = hour < 10 ? "0" + hour : hour;
    let minute = full_date.getMinutes();    minute = minute < 10 ? "0" + minute : minute;
    let second = full_date.getSeconds();    second = second < 10 ? "0" + second : second;

    let date = day + "/" + month + "/" + year;
    let time = hour + ":" + minute + ":" + second;

    return date + " " + time;
}

    
function get_date_interval() {
    dt = new Date();
    start = new Date(dt.setDate(dt.getDate() - dt.getDay()));
    end = new Date(dt.setDate(dt.getDate() + 6));
    start = start.toLocaleDateString();
    end = end.toLocaleDateString();
    return start + " - " + end;
}





initFiles();
// const key = readFromFile().key;
const key = readFromFile("config/settings.json").key;


// Main process
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    // Set the date in the view
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    
    date = day + "/" + month + "/" + year;
    replaceText(`date`, date)

    replaceText('name', readFromFile("config/settings.json").name)


    // create a random text for the initial text of 5 letters
    var initial = ""
    var alphabet = "abcdefghijklmnopqrstuvwxyz"
    for (let i = 0; i < 5; i++) {
        initial += alphabet[Math.floor(Math.random() * alphabet.length)]
    }
    

    // Make the textarea auto-resize
    const tx = document.getElementsByTagName("textarea");
    for (let i = 0; i < tx.length; i++) {
        tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
        tx[i].addEventListener("input", OnInput, false);
    }
    function OnInput() {
        // this.style.height = 0;
        this.style.height = (this.scrollHeight) + "px";
    }




    // Get data from the form
    const form = document.getElementById("message-form")
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        const message = document.getElementById("message").value;
        const encrypted = encrypt(key, message);
        const decrypted = decrypt(key, encrypted);

        console.log("message: " + message);
        console.log("key: " + key);
        console.log("encrypted: " + encrypted);
        console.log("decrypted: " + decrypted);
        // alert("Message sent: " + message)


        // check if interval is already created
        var interval = get_date_interval();
        var data = readFromFile("data/notes.json");
        if (data[interval] == undefined) {
            data[interval] = {};
        }
        data[interval][getFullDate()] = encrypted;
        console.log(data);

        // write to file
        writeToFile("data/notes.json", null, null, data);
    })
})