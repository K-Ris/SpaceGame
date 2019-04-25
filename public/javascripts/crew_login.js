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

document.getElementById("btn_matrix_a").addEventListener("click", function () {
    inputCode("a");
});

document.getElementById("btn_matrix_b").addEventListener("click", function () {
    inputCode("b");
});

document.getElementById("btn_matrix_c").addEventListener("click", function () {
    inputCode("c");
});

document.getElementById("btn_matrix_O").addEventListener("click", function () {
    resetCode();
});

document.getElementById("btn_matrix_0").addEventListener("click", function () {
    inputCode("0");
});

//document.getElementById("btn_back").addEventListener("click", function(){
//    resetCode();
//    location.href='/login'
//});

autologin();

function autologin(){

    var passcode = getCookie("passcode_crew");

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

                    console.log(JSON.stringify(responsJSON));


                    setCookie("passcode_crew", responsJSON.passcode, 1);
                    setCookie("playertype", "crew", 1);
                    setCookie("id_crew", responsJSON.crew_id , 1,);


                    location.href='/crew_select';
                }
                catch(err){
                    console.log(err);

                    document.getElementById("demo").innerHTML = err.message;

                }
            }

            resetCode();

        }
    };
    req.open("POST", "/loginhandler", true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");


    req.send("passcode="+passcode + "&" + "requesttype=crew_login");

}

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

                        console.log(JSON.stringify(responsJSON));


                        setCookie("passcode_crew", responsJSON.passcode, 1);
                        setCookie("playertype", "crew", 1);
                        setCookie("id_crew", responsJSON.crew_id , 1,);


                        location.href='/crew_select';
                    }
                    catch(err){
                        console.log(err);

                        document.getElementById("demo").innerHTML = err.message;

                    }
                }

                resetCode();

            }
        };
        req.open("POST", "/loginhandler", true);
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        var passcodeReady = passcode.join('');

        req.send("passcode="+passcodeReady + "&" + "requesttype=crew_login");

    }




}

function resetCode() {
    passcode = ["0", "0", "0", "0"];
    passcounter = 0;
    document.getElementById("p_code_1").innerHTML = "-";
    document.getElementById("p_code_2").innerHTML = "-";
    document.getElementById("p_code_3").innerHTML = "-";
    document.getElementById("p_code_4").innerHTML = "-";
}