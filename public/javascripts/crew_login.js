
var passcode = ["0","0","0","0"];
var passcounter = 0;


document.getElementById("btn_matrix_1").addEventListener("click", function(){
    inputCode(1);
});


document.getElementById("btn_matrix_2").addEventListener("click", function(){
    inputCode(2);
});


document.getElementById("btn_matrix_3").addEventListener("click", function(){
    inputCode(3);
});


document.getElementById("btn_matrix_4").addEventListener("click", function(){
    inputCode(4);
});

document.getElementById("btn_matrix_5").addEventListener("click", function(){
    inputCode(5);
});

document.getElementById("btn_matrix_6").addEventListener("click", function(){
    inputCode(6);
});

document.getElementById("btn_matrix_7").addEventListener("click", function(){
    inputCode(7);
});

document.getElementById("btn_matrix_8").addEventListener("click", function(){
    inputCode(8);
});

document.getElementById("btn_matrix_9").addEventListener("click", function(){
    inputCode(9);
});

document.getElementById("btn_back").addEventListener("click", function(){
    resetCode();
    location.href='/login'
});


function inputCode(code) {
    passcode[passcounter] = code;




    if(passcounter == 0){
        document.getElementById("p_code_1").innerHTML = code;

    }
    else if(passcounter == 1){
        document.getElementById("p_code_2").innerHTML = code;

    }
    else if(passcounter == 2){
        document.getElementById("p_code_3").innerHTML = code;

    }
    else if(passcounter == 3){
        document.getElementById("p_code_4").innerHTML = code;
        //login
        location.href='/crew_main'
    }

    passcounter++;
}

function resetCode(){
    passcode = ["0","0","0","0"];
    passcounter = 0;
}