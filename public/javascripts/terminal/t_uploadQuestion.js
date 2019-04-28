var currentButton = 0;
var colorHighlight = "#677b8c";
var colorDefault = "#2f3131";

var terminalQuest;

var questionAsked = false;

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 13 && !questionAsked) {
        //hand out reward
        var buttons = document.getElementsByClassName('btn_question');

        var rewardPos = parseInt(buttons[currentButton].getAttribute('data-internalid'));

        var badgeReward = terminalQuest.quest_rewards[currentButton].badge_id;

        console.log(badgeReward + " " + buttons[rewardPos].innerHTML);

        uploadBadge(badgeReward);
    }
    if(questionAsked && event.keyCode == 13) {
        setTimeout(function () {
            window.location.href = "/terminal/status";
        }, 100);
    }
    else if(event.keyCode == 27 && questionAsked){
        setTimeout(function () {
            window.location.href = "/terminal/status";
        }, 100);
    }
    else if(event.keyCode == 38 && !questionAsked){
        //arrow up
        console.log("up")
        buttonUp();
    }
    else if(event.keyCode == 40 && !questionAsked){
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

function uploadBadge(badge){
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

                //var responsJSON = JSON.parse(req.responseText);


                setUploadFinish();
            }

        }
    };
    req.open("POST", "/updatehandler", true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    passcodeCrewVar = getCookie("passcode_crew");
    passcodeVar = getCookie("passcode_user");

    req.send("passcode="+passcodeVar + "&" + "requesttype=update_badge" + "&" + "passcodecrew=2345" + "&" + "badgeid=" + badge);
}

function makeUL(array) {
    // Create the list element:
    var list = document.createElement('ul');

    terminalQuest = array[Math.floor(Math.random() * array.length)];

    document.getElementById("question_text").innerHTML = terminalQuest.quest_question;


    for(var i =0; i < terminalQuest.quest_rewards.length; i++){

        var item = document.createElement('li');

        item.innerHTML = terminalQuest.quest_rewards[i].data_desc;
        item.setAttribute("data-internalid", i);
        item.className = "btn_question"
        item.id = ""+i;

        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}

function setUploadFinish(){
    //remove text
    //set new text
    //disable unused buttons
    //enable escape
    questionAsked = true;

    document.getElementById("title_1").innerHTML = "";
    document.getElementById("title_2").innerHTML = "";
    document.getElementById("question_text").innerHTML = "";

    document.getElementById("answer_list").innerHTML = '';

    document.getElementById("title_finish").innerHTML = "Als Dank für deine Mithilfe gebe ich dir ein neues Abzeichen";
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
        currentButton = buttons.length-1;
    }


    for(var i = 0; i < buttons.length; i++){

            buttons[i].style.backgroundColor = colorDefault;

    }

    console.log("current Button: " + currentButton)
    buttons[currentButton].style.backgroundColor = colorHighlight;

}

function buttonDown(){
    currentButton++;


    var buttons = document.getElementsByClassName('btn_question');

    console.log("buttons: " + buttons.length + " current btn: " + currentButton);


    if(currentButton > buttons.length-1){
        currentButton = 0;
    }


    for(var i = 0; i < buttons.length; i++){

        buttons[i].style.backgroundColor = colorDefault;

    }

    buttons[currentButton].style.backgroundColor = colorHighlight;

}