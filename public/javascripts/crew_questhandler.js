//login
//get userstats
//get all quests
//show quests that are active first (green)
//show quests that are available second (yellow)
//show quests that are unavailable third (red)

updateUser();

function updateUser() {

    var pc = getCookie("passcode_user");
    var lt = getCookie("playertype");

    //console.log("passcode cookie: " + pc);
    //console.log("playertype cookie: " + lt);

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

                    document.getElementById("demo").innerHTML = JSON.stringify(responseJSON);

                    var questArray = [];

                    for(var i = 0; i < responseJSON.quest_names.length; i++){
                        questArray.push(responseJSON.quest_names[i].quest_name);
                    }


                    document.getElementById('quest_list').appendChild(makeUL(questArray));

                } catch (err) {
                    console.log(err);

                    document.getElementById("demo").innerHTML = err.message;

                }
            }

        }
    };
    req.open("POST", "/loginhandler", true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    req.send("passcode=" + pc + "&" + "requesttype=user_stats");

}


function makeUL(array) {
    // Create the list element:
    var list = document.createElement('div');

    for (var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('BUTTON');
        //item.id =

        // Set its contents:
        //item.appendChild(document.createTextNode(array[i]));
        item.innerHTML = array[i];

        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}