var loginStrg = "";

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 48){
        //alert("0");
        loginStrg += "0";
    }
    else if(event.keyCode == 49){
        loginStrg += "1";
    }
    else if(event.keyCode ==50){
        loginStrg += "2";
    }
    else if(event.keyCode ==51){
        loginStrg += "3";
    }
    else if(event.keyCode == 52){
        loginStrg += "4";
    }
    else if(event.keyCode ==53){
        loginStrg += "5";
    }
    else if(event.keyCode == 54){
        loginStrg += "6";
    }
    else if(event.keyCode == 55){
        loginStrg += "7";
    }
    else if(event.keyCode == 56){
        loginStrg += "8";
    }
    else if(event.keyCode == 57) {
        loginStrg += "9";
    }
    else if(event.keyCode == 73) {
        firstContact();
    }
    else if(event.keyCode == 79) {
        resetContact();
    }

    else if (event.keyCode == 13) {
        console.log(loginStrg);

        if(loginStrg == ""){

        }else{

            inputCode(loginStrg);

        }

        loginStrg = "";
    }
});

function firstContact(){
    document.getElementById("text_title").innerHTML = "";

    document.getElementById("text_main").innerHTML = "Lieber Klon, danke fürs Anstecken! Ich schau mir deine Daten an, bitte dreh nochmal langsam deinen Space-Stecker im Uhrzeigersinn...";

}

function resetContact(){
    document.getElementById("text_title").innerHTML = "Hey du süßer Klon";

    document.getElementById("text_main").innerHTML = "Du kannst dich mit deinem Space-Stecker anmelden!";

}

function inputCode() {


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

                   // document.getElementById("demo").innerHTML = req.responseText;

                    setCookie("passcode_user", responsJSON.passcode, 1);
                    setCookie("playertype", "user", 1);

                    location.href='/terminal/status';

                }
                catch(err){
                    console.log(err);

                    document.getElementById("demo").innerHTML = err.message;

                }
            }
            //resetCode();

        }
    };
    req.open("POST", "/loginhandler", true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    req.send("passcode="+loginStrg + "&" + "requesttype=user_login");

}