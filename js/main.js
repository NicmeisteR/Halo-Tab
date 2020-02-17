let $ = function (id) { return document.getElementById(id); };
const apiKey = "";

document.getElementById("search").addEventListener("click", search);

async function search() {
    try {
        response = await get($("gamertag").value);
    }
    finally {
        response.forEach(item => {
            Object.keys(item).forEach(function(key){
                $("stats").insertAdjacentHTML('beforeend', `<p class="stats-text">${key}: ${statsObject[key]}</p>`);
            });
        });


    }
}

async function get(gamertag) {
    return new Promise(function (resolve, reject){
        fetch(
            `https://haloapi.nicmeister.cloud/`, {
            "method": "POST",
            "body": {
                "gamertag": gamertag,
                "token": apiKey,
                "query": "ranks"
              }
        })
        .then(response => {
            console.log(response);
            if (response.ok) { // if HTTP-status is 200-299
                // get the response body (the method explained below)
                let json = response.json();
                resolve(json);
            } else {
                alert("HTTP-Error: " + response.status);
            }
        })
        .catch(err => {
            console.log(err);
        });
    })
}