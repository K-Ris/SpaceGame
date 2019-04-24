//look is quest is in webstorage
//if not call quest from db
var questdata;
var playerdata;

document.getElementById("btn_start").addEventListener("click", function () {
    setQuest();
});
//show rewards by default if quest is already active
document.getElementById("btn_finish").addEventListener("click", function () {
    showRewards();
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
                    console.log(JSON.stringify(responseJSON));

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
                    }
                    else{
                        document.getElementById("btn_finish").disabled = false;
                        document.getElementById("btn_start").disabled = true;
                        //also create finish buttons

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

function showRewards(){

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

    req.send("passcode="+passcodeReady + "&" + "passcodeCrew="+passcodeCrewReady +  "&" + "requesttype=quest_finish" + "&" + "questId=" + questSingle);
}

function finishQuest(){
    //call questhandler with "quest_finish"

}