var datamanipulator = 0;
var passcodeVar;
var passcodeCrewVar;

document.getElementById("button10-").addEventListener("click", function () {
    datamanipulator -= 10;
    document.getElementById("data_manipulator").innerHTML = datamanipulator;
});

document.getElementById("button10+").addEventListener("click", function () {
    datamanipulator += 10;
    document.getElementById("data_manipulator").innerHTML = datamanipulator;
});

document.getElementById("button50-").addEventListener("click", function () {
    datamanipulator -= 50;
    document.getElementById("data_manipulator").innerHTML = datamanipulator;
});

document.getElementById("button50+").addEventListener("click", function () {
    datamanipulator += 50;
    document.getElementById("data_manipulator").innerHTML = datamanipulator;
});

document.getElementById("button100-").addEventListener("click", function () {
    datamanipulator -= 100;
    document.getElementById("data_manipulator").innerHTML = datamanipulator;
});

document.getElementById("button100+").addEventListener("click", function () {
    datamanipulator += 100;
    document.getElementById("data_manipulator").innerHTML = datamanipulator;
});

document.getElementById("button100+").addEventListener("click", function () {
    datamanipulator += 100;
    document.getElementById("data_manipulator").innerHTML = datamanipulator;
});

document.getElementById("submit_btn").addEventListener("click", function () {
    submitData();
});


function submitData() {


    if(datamanipulator != 0){

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

                        document.getElementById("demo").innerHTML = JSON.stringify(responsJSON);
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

        req.send("passcode="+passcodeVar + "&" + "requesttype=update_data" + "&" + "passcodecrew=" +  passcodeCrewVar  + "&" + "dataamount=" + datamanipulator);

        datamanipulator = 0;
        document.getElementById("data_manipulator").innerHTML = datamanipulator;
    }


}