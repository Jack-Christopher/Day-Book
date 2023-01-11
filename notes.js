const fs = window.require('fs');
// functions 
function readFromFile(file_path) {
    // let rawdata = fs.readFileSync("config/settings.json");
    let rawdata = fs.readFileSync(file_path);
    let settings = JSON.parse(rawdata);
    return settings;
}

// function writeToFile( file_path, key, value, data=null) {
//     if (data == null) {
//         data = readFromFile(file_path);
//         data[key] = value;
//         data = JSON.stringify(data, null, 2);
//     } else if (key == null && value == null) {
//         data = JSON.stringify(data, null, 2);
//     }

//     fs.writeFileSync(file_path, data);
// }

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


// const key = readFromFile("config/settings.json").key;


// Main process
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }


    // Get main object
    const main = document.getElementById("main");

    // create cards in main with each message from data/notes.json
    let notes = readFromFile("data/notes.json");

    // console.log(notes);

    // using the next example of list group
    // <div class="card" style="width: 18rem;">
    //     <div class="card-header">
    //         Featured
    //     </div>
    //     <ul class="list-group list-group-flush">
    //         <li class="list-group-item">Cras justo odio</li>
    //         <li class="list-group-item">Dapibus ac facilisis in</li>
    //         <li class="list-group-item">Vestibulum at eros</li>
    //     </ul>
    // </div>

    // apply it to the notes
    for (var prop in notes) {
        if (notes.hasOwnProperty(prop)) {
            // console.log(prop, notes[prop]);
            // create card
            let card = document.createElement("div");
            card.className = "card";
            card.id = prop;
            main.appendChild(card);

            // create card header
            let card_header = document.createElement("div");
            card_header.className = "card-header";
            card_header.innerText = prop;
            card.appendChild(card_header);


            // create card body for each property
            let card_body = document.createElement("ul");
            card_body.className = "list-group list-group-flush";
            card.appendChild(card_body);

            // create list item for each property
            for (var prop2 in notes[prop]) {
                if (notes[prop].hasOwnProperty(prop2)) {
                    let card_body_item = document.createElement("li");
                    let date = prop2.split(" ")[0] + ": ";
                    card_body_item.className = "list-group-item";
                    card_body_item.innerText = date + notes[prop][prop2];
                    card_body.appendChild(card_body_item);
                }
            }
        }

        // add a <br> after each card
        main.appendChild(document.createElement("br"));
    }
})
