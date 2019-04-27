var currentButton = 0;
var colorHighlight = "#677b8c";
var colorDefault = "#2f3131";

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 13) {

    }
    /*
    else if(event.keyCode == 27){
        setTimeout(function () {
            window.location.href = "/terminal/status"; //will redirect to your blog page (an ex: blog.html)
        }, 100);
    }
    */

});

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 13) {
        //hand out reward
    }
    else if(event.keyCode == 27){
        setTimeout(function () {
            window.location.href = "/terminal/login"; //will redirect to your blog page (an ex: blog.html)
        }, 100);    }
    else if(event.keyCode == 38){
        //arrow up
        console.log("up")
        buttonUp();
    }
    else if(event.keyCode == 40){
        //arrow down
        console.log("down");
        buttonDown();
    }
});

prepareQuestion();

function prepareQuestion() {

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

                var responsJSON = JSON.parse(req.responseText);

                document.getElementById("answer_list").appendChild(makeUL(responsJSON));


                startupMenu();
            }

        }
    };
    req.open("POST", "/questhandler", true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    passcodeCrewVar = getCookie("passcode_crew");
    passcodeVar = getCookie("passcode_user");

    req.send("passcode="+passcodeVar + "&" + "requesttype=quest_terminal_upload_download" + "&" + "passcodecrew=2345");






}

function makeUL(array) {
    // Create the list element:
    var list = document.createElement('ul');
    var rand = array[Math.floor(Math.random() * array.length)];

    document.getElementById("question_text").innerHTML = rand.quest_question;


    for(var i =0; i < rand.quest_rewards.length; i++){

        var item = document.createElement('BUTTON');

        item.innerHTML = rand.quest_rewards[i].data_desc;
        item.setAttribute("data-internalid", i);
        item.className = "btn_question"
        item.id = ""+i;

        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}

function startupMenu() {

    var buttons = document.getElementsByClassName('btn_question');

    for(var i = 0; i < buttons.length; i++){
        if(i == 0){
            buttons[i].style.backgroundColor = colorHighlight;

        }
        else{
            buttons[i].style.backgroundColor = colorDefault;

        }
    }

}

function buttonUp(){
    currentButton--;

    var buttons = document.getElementsByClassName('btn_question');

    console.log("buttons: " + buttons.length + " current btn: " + currentButton);

    if(currentButton < 0){
        currentButton = buttons.length;
    }


    for(var i = 0; i < buttons.length; i++){

            buttons[i].style.backgroundColor = colorDefault;

    }

    buttons[currentButton].style.backgroundColor = colorHighlight;

}

function buttonDown(){
    currentButton++;


    var buttons = document.getElementsByClassName('btn_question');

    console.log("buttons: " + buttons.length + " current btn: " + currentButton);


    if(currentButton > buttons.length){
        currentButton = 0;
    }


    for(var i = 0; i < buttons.length; i++){

        buttons[i].style.backgroundColor = colorDefault;

    }

    buttons[currentButton].style.backgroundColor = colorHighlight;

}