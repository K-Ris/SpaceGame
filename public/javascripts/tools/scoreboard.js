// Load google charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

var users;

// Draw the chart and set the chart values
function drawChart() {

    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Post successful");

            if (req.responseText == "notfound") {
                document.getElementById("demo").innerHTML = "Falscher Passcode";
                //Cookie löschen und Autologout
            } else if (req.responseText == "nologindata") {
                //Delete Cookies and return to loginscreen
            } else {

                try {

                    var responseJSON = JSON.parse(req.responseText);

                    users = responseJSON;


                    var data = google.visualization.arrayToDataTable([
                        ['Task', 'Hours per Day'],
                        ['Work', 8],
                        ['Friends', 2],
                        ['Eat', 2],
                        ['TV', 2],
                        ['Gym', 2],
                        ['Sleep', 8]
                    ]);



                    var sicherheitDaten = 0;
                    var wissenschaftDaten = 0;
                    var körperlicheDaten = 0;
                    var spaßigeDaten = 0;
                    var datauserlist = [];

                    var objectCounter = 0;
                    users.forEach(function(obj) {
                        console.log(obj);
                        datauserlist.push({platz:0,"Spieler":obj.username, "Daten":obj.storage_sum});

                        if(obj.department == "Sicherheit"){
                            sicherheitDaten = sicherheitDaten + obj.storage_sum;
                        }
                        else if(obj.department == "Wissenschaft"){
                            wissenschaftDaten = wissenschaftDaten + obj.storage_sum;
                        }
                        else if(obj.department == "Körper&Geist"){
                            körperlicheDaten = körperlicheDaten + obj.storage_sum;
                        }
                        else if(obj.department == "Spaß"){
                            spaßigeDaten = spaßigeDaten + obj.storage_sum;
                        }
                    });

                    console.log(sicherheitDaten);
                    console.log(wissenschaftDaten);
                    console.log(körperlicheDaten);
                    console.log(spaßigeDaten);

                    var data = google.visualization.arrayToDataTable(
                        [
                            ['Task', 'Hours per Day'],
                            ['Sicherheit', sicherheitDaten],
                            ['Wissenschaft', wissenschaftDaten],
                            ['Körper&Geist', körperlicheDaten],
                            ['Spaß', spaßigeDaten]
                        ]

                    )

                    // Optional; add a title and set the width and height of the chart
                    var options = {'title':'Abteilungsdaten', 'width':550, 'height':400};

                    // Display the chart inside the <div> element with id="piechart"
                    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
                    chart.draw(data, options);

                    var topTen = [];

                    datauserlist.sort(dynamicSort("Daten"));
                    datauserlist.reverse();

                    if(datauserlist.length > 9){
                        for(var i = 0; i < 10; i++){
                            topTen.push(datauserlist[i]);
                            topTen[i].platz = i+1;
                        }
                    }

                    //document.getElementById('player_div').appendChild(makeUL(topTen));


                    let table = document.querySelector("table");
                    let dataset = Object.keys(topTen[0]);
                    generateTableHead(table, dataset);
                    generateTable(table, topTen)

                } catch (err) {
                    console.log(err);

                    //document.getElementById("demo").innerHTML = err.message;

                }
            }

        }
    };
    req.open("POST", "/loginhandler", true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    req.send("passcode=" + "02" + "&" + "requesttype=get_all_users");


}


function makeUL(array) {
    // Create the list element:
    var list = document.createElement('ul');

    for (var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(i+1 + " - " + array[i].username + " - " + array[i].data));

        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}