var isTesting = false;

var passcodes = ["01", "02", "03", "99"];
var datas = [-10, -50, -100, 50, 100, 10];

document.getElementById("btn_trans").addEventListener("click", function () {
    isTesting = !isTesting;
    stressTest();
});

function stressTest() {



    var data = datas[Math.floor(Math.random()*datas.length)];
    var passcode = passcodes[Math.floor(Math.random()*passcodes.length)];
    submitData(passcode, data);

}

function submitData(passcode, data) {


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

                var data1 = datas[Math.floor(Math.random()*datas.length)];
                var passcode1 = passcodes[Math.floor(Math.random()*passcodes.length)];
                stressTest();

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
    req.open("POST", "/updatehandler", true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    req.send("passcode="+passcode + "&" + "requesttype=" + "update_data" + "&" + "passcodecrew=" +  "2345"  + "&" + "dataamount=" + data);

    datamanipulator = 0;
    document.getElementById("data_manipulator").innerHTML = datamanipulator;


}

function startTransfer(){
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

                    document.getElementById("demo").innerHTML = req.responseText;

                    setCookie("passcode_user", responsJSON.passcode, 1);
                    setCookie("playertype", "user", 1);

                    location.href='/user_stats';

                }
                catch(err){
                    console.log(err);

                    document.getElementById("demo").innerHTML = err.message;

                }
            }
            resetCode();

        }
    };
    req.open("POST", "/tools/dbtransferhandler", true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    req.send("passcode="+ "99" + "&" + "requesttype=transfer");
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}