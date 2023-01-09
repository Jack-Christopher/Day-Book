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


    // Get data from the form
    const form = document.getElementById("message-form")
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        const name = document.getElementById("name").value;
        console.log("settings name: " + name);
        
        const key = document.getElementById("key").value;
        console.log("settings key: " + key);

        if (name != "") {
            writeToFile("config/settings.json", "name", name);
        }
        if (key != "") {
            writeToFile("config/settings.json", "key", key);
        }        
    })
})