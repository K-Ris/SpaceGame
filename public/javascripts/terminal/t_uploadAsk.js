document.addEventListener('keydown', function(event) {
    if(event.keyCode == 13) {
        uploadData();
    }
    else if(event.keyCode == 27){
        setTimeout(function () {
            window.location.href = "/terminal/status"; //will redirect to your blog page (an ex: blog.html)
        }, 100);
    }
});

function changeToStatus() {
    window.location.href='/terminal/status';

}

function uploadData() {
    //upload data
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
                location.href = '/terminal/uploadQuestion'


            }

        }
    };
    req.open("POST", "/updatehandler", true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    passcodeCrewVar = getCookie("passcode_crew");
    passcodeVar = getCookie("passcode_user");

    req.send("passcode="+passcodeVar + "&" + "requesttype=upload_data" + "&" + "passcodecrew=2345");

    //datamanipulator = 0;
    //document.getElementById("data_manipulator").innerHTML = datamanipulator;
}
