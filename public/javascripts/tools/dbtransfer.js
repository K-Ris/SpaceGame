document.getElementById("btn_trans").addEventListener("click", function () {
    startTransfer();
});

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