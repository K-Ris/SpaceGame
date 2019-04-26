//look is quest is in webstorage
//if not call quest from db
var questdata;
var playerdata;
var allylist;

document.getElementById("btn_start").addEventListener("click", function () {
    setQuest();
    //setAllies();
});
//show rewards by default if quest is already active
document.getElementById("btn_finish").addEventListener("click", function () {
    showRewards();
});

document.getElementById("btn_cancel").addEventListener("click", function () {
    cancelQuest();
});



document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'btn_reward'){
        //do something
        console.log(e.target.getAttribute('data-internalid'));
        finishQuest(questdata.badge_id, e.target.getAttribute('data-internalid'));
    }
    else if(e.target && e.target.id == 'btn_submitAllies'){
        //ally button pressed
    }
});

getQuests();
getPlayer();

function getPlayer(){
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
                    //console.log(JSON.stringify(responseJSON));

                    playerdata = responseJSON;

                    var questSingle = getCookie("quest_active");
                    var alreadyThere = false;

                    console.log(playerdata.quests);


                    for(var i = 0; i < playerdata.quests.length; i++){
                        console.log(playerdata.quest_id);
                        if( playerdata.quests[i].quest_id == questSingle){
                            alreadyThere = true;
                            break;
                        }
                        else{
                            alreadyThere = false;
                        }
                    }

                    if(!alreadyThere){
                        document.getElementById("btn_start").disabled = false;
                        document.getElementById("btn_finish").disabled = true;
                        document.getElementById("btn_cancel").disabled = true;
                    }
                    else{
                        document.getElementById("btn_finish").disabled = false;
                        document.getElementById("btn_start").disabled = true;
                        document.getElementById("btn_cancel").disabled = false;
                    }

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

function getQuests() {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Post successful");

            //save cookie
            //document.cookie("passcode="+passcodeReady);
            if(req.responseText == "notfound"){
                document.getElementById("demo").innerHTML = "Falscher Passcode";
            }
            else {

                try{

                    var responsJSON = JSON.parse(req.responseText);
                    //document.getElementById("demo").innerHTML = JSON.stringify(responsJSON);
                    document.getElementById("quest_name").innerHTML = responsJSON.quest_name;
                    document.getElementById("quest_department").innerText = responsJSON.quest_department;
                    questdata = responsJSON;
                    allylist = responsJSON.quest_ally;
                    console.log("allylist: " + allylist)
                                    }
                catch(err){
                    console.log(err);

                    document.getElementById("demo").innerHTML = err.message;

                }
            }

        }
    };
    req.open("POST", "/questhandler", true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    var passcodeReady = getCookie("passcode_crew");
    var questSingle = getCookie("quest_active");

    req.send("passcode="+passcodeReady + "&" + "requesttype=quest_single" + "&" + "questId=" + questSingle);
}

function setAllies() {
    //create input field
    //create submit button

    var list = document.createElement('div');

    var ally1 = document.createElement('input');

    var ally2 = document.createElement('input');

    list.appendChild(ally1);
    list.appendChild(ally2);

    document.getElementById('ally_selection').appendChild(list);

}

function setQuest(){
    //call questhandler with "quest_update"
    //reload site
    var questSingle = getCookie("quest_active");

    var alreadyThere = false;

    for(var i = 0; i < playerdata.quests; i++){
        if( playerdata.quests[i].quest_id == questSingle){
            alreadyThere = true;
            break;
        }
        else{
            alreadyThere = false;
        }
    }

    if(alreadyThere){
        //quest already taken
    }
    else{
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Post successful");

                //save cookie
                //document.cookie("passcode="+passcodeReady);
                if(req.responseText == "notfound"){
                    document.getElementById("demo").innerHTML = "Falscher Passcode";
                }
                else {

                    try{

                        var responsJSON = JSON.parse(req.responseText);
                        //document.getElementById("demo").innerHTML = JSON.stringify(responsJSON);
                        questdata = responsJSON;
                        location.href='/crew_main';
                    }
                    catch(err){
                        console.log(err);

                        document.getElementById("demo").innerHTML = err.message;

                    }
                }

            }
        };
        req.open("POST", "/questhandler", true);
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        var passcodeReady = getCookie("passcode_user");
        var passcodeCrewReady = getCookie("passcode_crew");
        var questSingle = getCookie("quest_active");

        req.send("passcode="+passcodeReady + "&" + "passcodeCrew="+passcodeCrewReady +  "&" + "requesttype=quest_update" + "&" + "questId=" + questSingle);
    }
}

function cancelQuest(){

    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Post successful");

            //save cookie
            //document.cookie("passcode="+passcodeReady);
            if(req.responseText == "notfound"){
                document.getElementById("demo").innerHTML = "Falscher Passcode";
            }
            else {

                try{

                    var responsJSON = JSON.parse(req.responseText);
                    location.href='/crew_main';
                }
                catch(err){
                    console.log(err);

                    document.getElementById("demo").innerHTML = err.message;

                }
            }

        }
    };
    req.open("POST", "/questhandler", true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    var passcodeReady = getCookie("passcode_user");
    var passcodeCrewReady = getCookie("passcode_crew");
    var questSingle = getCookie("quest_active");

    req.send("passcode="+passcodeReady + "&" + "passcodeCrew="+passcodeCrewReady +  "&" + "requesttype=quest_cancel" + "&" + "questId=" + questSingle);
}

function showRewards() {
    document.getElementById('reward_list').appendChild(makeUL(questdata.quest_rewards));

}

function finishQuest(badge, reward){
    //call questhandler with "quest_finish"
    //first finish player
    //then go throug ally list

    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Post successful");

            //save cookie
            //document.cookie("passcode="+passcodeReady);
            if(req.responseText == "notfound"){
                document.getElementById("demo").innerHTML = "Falscher Passcode";
            }
            else if(req.responseText == "nofreestorage"){
                document.getElementById("demo").innerHTML = "Kein Freier Speicher!";
            }
            else {

                try{

                    var responsJSON = JSON.parse(req.responseText);

                    //document.getElementById("demo").innerHTML = JSON.stringify(responsJSON);
                    cancelQuest();

                }
                catch(err){
                    console.log(err);

                    document.getElementById("demo").innerHTML = err.message;

                }
            }

        }
    };
    req.open("POST", "/updatehandler", true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    passcodeCrewVar = getCookie("passcode_crew");
    passcodeVar = getCookie("passcode_user");

    //var checkedValue = document.getElementById("dataselector").checked;

    var updateMethod = "update_data";


    console.log("checked Value: " + updateMethod);

    req.send("passcode="+passcodeVar + "&" + "requesttype=finish_quest" + "&" + "passcodecrew=" +  passcodeCrewVar  + "&" + "dataamount=" + reward + "&" + "badgeid=" + badge + "&" + "questid=" + questdata.quest_id);

    datamanipulator = 0;
    document.getElementById("data_manipulator").innerHTML = datamanipulator;
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
        item.innerHTML = array[i].data_desc + " reward: " +array[i].data_reward;
        item.setAttribute("data-internalid", array[i].data_reward);
        item.setAttribute("data-badgeid", array[i].badge_id);
        item.id = "btn_reward";



        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}