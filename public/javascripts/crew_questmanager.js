//look is quest is in webstorage
//if not call quest from db

getQuests();

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
                    document.getElementById("demo").innerHTML = responsJSON;

                }
                catch(err){
                    console.log(err);

                    document.getElementById("demo").innerHTML = err.message;

                }
            }


            resetCode();

        }
    };
    req.open("POST", "/questhandler", true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    var passcodeReady = getCookie("passcode_crew")

    req.send("passcode="+passcodeReady + "&" + "requesttype=quest_download");
}