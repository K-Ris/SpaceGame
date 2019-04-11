document.getElementById("btn_log").addEventListener("click", function(){

    location.href='/user_log'
});

updateUser();

function updateUser(){

    var pc = getCookie("passcode");
    var lt = getCookie("playertype");

    //console.log("passcode cookie: " + pc);
    //console.log("playertype cookie: " + lt);

    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Post successful");

            if(req.responseText == "notfound"){
                document.getElementById("demo").innerHTML = "Falscher Passcode";
                //Cookie löschen und Autologout
            }
            else {

                try{

                    var responseJSON = JSON.parse(req.responseText);

                    document.getElementById("demo").innerHTML = req.responseText;
                }
                catch(err){
                    console.log(err);

                    document.getElementById("demo").innerHTML = err.message;

                }
            }

        }
    };
    req.open("POST", "/loginhandler", true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    req.send("passcode="+pc + "&" + "requesttype=user_stats");

}