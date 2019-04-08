var passcode = ["0", "0", "0", "0"];
var passcounter = 0;


document.getElementById("btn_matrix_1").addEventListener("click", function () {
    inputCode(1);
});


document.getElementById("btn_matrix_2").addEventListener("click", function () {
    inputCode(2);
});


document.getElementById("btn_matrix_3").addEventListener("click", function () {
    inputCode(3);
});


document.getElementById("btn_matrix_4").addEventListener("click", function () {
    inputCode(4);
});

document.getElementById("btn_matrix_5").addEventListener("click", function () {
    inputCode(5);
});

document.getElementById("btn_matrix_6").addEventListener("click", function () {
    inputCode(6);
});

document.getElementById("btn_matrix_7").addEventListener("click", function () {
    inputCode(7);
});

document.getElementById("btn_matrix_8").addEventListener("click", function () {
    inputCode(8);
});

document.getElementById("btn_matrix_9").addEventListener("click", function () {
    inputCode(9);
});

document.getElementById("btn_matrix_O").addEventListener("click", function () {
    resetCode();
});

//document.getElementById("btn_back").addEventListener("click", function(){
//    resetCode();
//    location.href='/login'
//});


function inputCode(code) {
    passcode[passcounter] = code;

    passcounter++;

    if (passcounter == 1) {
        document.getElementById("p_code_1").innerHTML = code;

    } else if (passcounter == 2) {
        document.getElementById("p_code_2").innerHTML = code;

    } else if (passcounter == 3) {
        document.getElementById("p_code_3").innerHTML = code;

    } else if (passcounter == 4) {
        document.getElementById("p_code_4").innerHTML = code;
        //login
        //location.href='/crew_main'

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

                        setCookie("passcode", responsJSON.passcode, 1);
                        setCookie("playertype", "user", 1);

                        location.href='/user_stats';

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

        var passcodeReady = passcode.join('');

        req.send("passcode="+passcodeReady + "&" + "requesttype=users");

        resetCode();
    }




}

function resetCode() {
    passcode = ["0", "0", "0", "0"];
    passcounter = 0;
    document.getElementById("p_code_1").innerHTML = "0";
    document.getElementById("p_code_2").innerHTML = "0";
    document.getElementById("p_code_3").innerHTML = "0";
    document.getElementById("p_code_4").innerHTML = "0";
}
