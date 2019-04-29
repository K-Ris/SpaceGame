//login
//get userstats
//get all quests
//show quests that are active first (green)
//show quests that are available second (yellow)
//show quests that are unavailable third (red)

var userQuestArray;
var userdata;

document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'btn_quest'){
        //do something
        console.log(e.target.getAttribute('data-internalid'));
        setCookie("quest_active", e.target.getAttribute('data-internalid'), 1);
        location.href='/crew_questmanager';
    }
});

updateUserQuests();

function updateUserQuests() {

    var pc = getCookie("passcode_user");
    var lt = getCookie("playertype");

    console.log(pc);

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

                    userdata = responseJSON;
                    //document.getElementById("demo").innerHTML = JSON.stringify(responseJSON);

                    userQuestArray = responseJSON.quests;

                    updateAllQuests();

                    //document.getElementById('quest_list').appendChild(makeUL(questArray));

                    //loop through questlist and make active quests green

                } catch (err) {
                    console.log(err);

                    document.getElementById("demo").innerHTML = err.message;

                }
            }

        }
    };
    req.open("POST", "/loginhandler", true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    req.send("passcode=" + pc + "&" + "requesttype=user_login");

}

function updateAllQuests() {

    var pc = getCookie("passcode_user");
    var lt = getCookie("playertype");

    console.log(pc);

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

                    //document.getElementById("demo").innerHTML = JSON.stringify(responseJSON);
                    console.log(JSON.stringify(responseJSON));

                    var questArray = responseJSON;


                    document.getElementById('quest_list_all').appendChild(makeUL(questArray));

                } catch (err) {
                    console.log(err);

                    document.getElementById("demo").innerHTML = err.message;

                }
            }

        }
    };
    req.open("POST", "/questhandler", true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    req.send("passcode=" + pc + "&" + "requesttype=quest_download");

}


function makeUL(array) {

    console.log(array);
    console.log(userQuestArray);

    var  questlist = [];

    //Allgemeine Liste wird nicht angezeigt!
    // Create the list element:
    var list = document.createElement('div');

    var crewid = getCookie("id_crew");
    //console.log("Crew ID: " + crewid);

    //console.log(userQuestArray.length)
    for(var i = 0; i < userQuestArray.length; i++){
        //console.log("quest array: " + userQuestArray[i].quest_id);
        //console.log(array.length);
        questlist = questlist + userQuestArray[i].quest_id;
        console.log("questlist: " +questlist);

        for(var j = 0; j < array.length; j++){
            //console.log("array id: " + array[j].quest_id);

            if (userQuestArray[i].quest_id == array[j].quest_id) {
                // Create the list item:
                var item = document.createElement('BUTTON');
                //item.id =

                // Set its contents:
                //item.appendChild(document.createTextNode(array[i]));
                item.innerHTML = array[j].quest_name;
                item.setAttribute("data-internalid", array[j].quest_id);
                item.id = "btn_quest";




                // Add it to the list:
                list.appendChild(item);

                item.style.background = '#70cf79';
                break;
            }
        }


    }

    console.log("userQuest Array: " + JSON.stringify(userQuestArray))
    for (var k = 0; k < array.length; k++) {

        //console.log("array: " + array[k].quest_crew_id);

        if(parseInt(array[k].quest_crew_id) == crewid){

            var inList = false;

            for(var u = 0; u < userdata.quests_done.length; u++){
                if(userdata.quests_done[u] == parseInt(array[k].quest_id)){
                    inList = true;
                    break
                }
                else{
                    inList = false;
                }
            }

            for(var q = 0; q < userQuestArray.length; q++){
                console.log(userQuestArray[q].quest_id)
                if(userQuestArray[q].quest_id == parseInt(array[k].quest_id)){
                    inList = true;
                    break
                }
                else{
                    inList = false;
                }
            }

            if(!inList){
                //füge quest zur liste

                // Create the list item:
                var item = document.createElement('BUTTON');
                //item.id =

                // Set its contents:
                //item.appendChild(document.createTextNode(array[i]));
                item.innerHTML = array[k].quest_name;
                item.setAttribute("data-internalid", array[k].quest_id);
                item.id = "btn_quest";

                // Add it to the list:
                list.appendChild(item);

            }

        }


    }


    // Finally, return the constructed list:
    return list;
}