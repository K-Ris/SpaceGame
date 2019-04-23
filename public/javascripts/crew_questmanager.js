//look is quest is in webstorage
//if not call quest from db
var questdata;

document.getElementById("btn_start").addEventListener("click", function () {
    setQuest();
});
document.getElementById("btn_finish").addEventListener("click", function () {
    finishQuest();
});

getPlayer();
getQuests();

function getPlayer(){

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

}

function finishQuest(){

}