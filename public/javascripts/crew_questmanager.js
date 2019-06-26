//look is quest is in webstorage
//if not call quest from db
var questdata;
var playerdata;
var allylist;

var rewardPos = 0;

document.getElementById("btn_start").addEventListener("click", function () {
    //setQuest();
    setAllies();
});
//show rewards by default if quest is already active
document.getElementById("btn_finish").addEventListener("click", function () {
    document.getElementById("btn_finish").disabled = true;
    allylist.unshift(playerdata.passcode)
    showRewards();
    //showAllyRewards();
});

document.getElementById("btn_cancel").addEventListener("click", function () {
    cancelQuest(playerdata.passcode);
});

document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'ally_btn'){
        //do something
        setQuest();
    }
});




document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'btn_reward'){
        //do something
        console.log(e.target.getAttribute('data-internalid'));
        finishQuest(playerdata.passcode ,e.target.getAttribute('data-badgeid'), e.target.getAttribute('data-internalid'), true);
    }
    else if(e.target && e.target.id== 'btn_reward_ally'){
        //do something
        console.log("finish quest with: " + allylist[rewardPos])
        if(rewardPos < allylist.length-1)
        finishQuest(allylist[rewardPos], e.target.getAttribute('data-badgeid'), e.target.getAttribute('data-internalid'), false);
        else
            finishQuest(allylist[rewardPos], e.target.getAttribute('data-badgeid'), e.target.getAttribute('data-internalid'), true);

    }
});

getQuest();
getPlayer();

function getPlayer(){
    var pc = getCookie("passcode_user");
    var lt = getCookie("playertype");

    //console.log("passcode cookie: " + pc);
    //console.log("playertype cookie: " + lt);

    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Post successful");

            if (req.responseText == "notfound") {
                document.getElementById("demo").innerHTML = "Falscher Passcode";
                //Cookie löschen und Autologout
            } else if (req.responseText == "nologindata") {
                //Delete Cookies and return to loginscreen
            } else {

                try {

                    var responseJSON = JSON.parse(req.responseText);
                    //console.log(JSON.stringify(responseJSON));

                    playerdata = responseJSON;

                    var questSingle = getCookie("quest_active");
                    var alreadyThere = false;

                    console.log("quests: " + JSON.stringify(playerdata.quests));


                    for(var i = 0; i < playerdata.quests.length; i++){
                        console.log(playerdata.quest_id);
                        if( playerdata.quests[i].quest_id == questSingle){
                            alreadyThere = true;
                            allylist = [];
                            allylist = playerdata.quests[i].quest_allies;
                            if(allylist == undefined)
                                allylist = [];
                            break;
                        }
                        else{
                            alreadyThere = false;
                        }
                    }

                    console.log("allylist: " + allylist)

                    if(!alreadyThere){
                        document.getElementById("btn_start").disabled = false;
                        document.getElementById("btn_finish").disabled = true;
                        document.getElementById("btn_cancel").disabled = true;
                    }
                    else{
                        document.getElementById("btn_finish").disabled = false;
                        document.getElementById("btn_start").disabled = true;
                        document.getElementById("btn_cancel").disabled = false;
                    }



                } catch (err) {
                    console.log(err);

                    document.getElementById("demo").innerHTML = err.message;

                }
            }

        }
    };
    req.open("POST", "/loginhandler", true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    req.send("passcode=" + pc + "&" + "requesttype=user_login");
}

function getQuest() {
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
                    //document.getElementById("demo").innerHTML = JSON.stringify(responsJSON);
                    document.getElementById("quest_name").innerHTML = responsJSON.quest_name;
                    document.getElementById("quest_department").innerText = responsJSON.quest_department;
                    questdata = responsJSON;

                                    }
                catch(err){
                    console.log(err);

                    document.getElementById("demo").innerHTML = err.message;

                }
            }

        }
    };
    req.open("POST", "/questhandler", true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    var passcodeReady = getCookie("passcode_crew");
    var questSingle = getCookie("quest_active");

    req.send("passcode="+passcodeReady + "&" + "requesttype=quest_single" + "&" + "questId=" + questSingle);
}

function setAllies() {
    //create input field
    //create submit button

    var list = document.createElement('div');
    list.id = "ally_list"

    var ally1Text = document.createElement('p');
    ally1Text.innerHTML = "Choose Ally 1";
    var ally1 = document.createElement('input');
    ally1.id = "ally_form1"
    ally1.maxLength = 2;

    var ally2Text = document.createElement('p');
    ally2Text.innerHTML = "Choose Ally 2";
    var ally2 = document.createElement('input');
    ally2.id = "ally_form2"
    ally2.maxLength = 2;

    var ally3Text = document.createElement('p');
    ally3Text.innerHTML = "Choose Ally 2";
    var ally3 = document.createElement('input');
    ally3.id = "ally_form3"
    ally3.maxLength = 2;

    var allyButton = document.createElement('BUTTON');
    allyButton.id = "ally_btn";
    allyButton.innerHTML = "Starte Quest"

    var allyBreak = document.createElement('br')

    list.appendChild(ally1Text);
    list.appendChild(ally1);
    list.appendChild(ally2Text);
    list.appendChild(ally2);
    list.appendChild(ally3Text);
    list.appendChild(ally3);
    list.appendChild(allyBreak)
    list.appendChild(allyButton);

    document.getElementById('ally_selection').appendChild(list);

}

function setQuest(){
    //call questhandler with "quest_update"
    //reload site
    var questSingle = getCookie("quest_active");

    var alreadyThere = false;

    var questAllies = [];

    console.log(document.getElementById('ally_form1').value)

    if(document.getElementById('ally_form1').value != "")
        questAllies.push(document.getElementById('ally_form1').value);

    if(document.getElementById('ally_form2').value != "")
        questAllies.push(document.getElementById('ally_form2').value);

    if(document.getElementById('ally_form3').value != "")
        questAllies.push(document.getElementById('ally_form3').value);

    console.log(questAllies);

    for(var i = 0; i < playerdata.quests; i++){
        if( playerdata.quests[i].quest_id == questSingle){
            alreadyThere = true;
            break;
        }
        else{
            alreadyThere = false;
        }
    }

    if(alreadyThere){
        //quest already taken
    }
    else{

        if(questAllies != undefined && questAllies.length > 0){
            console.log("looop")
            questAllies.unshift(playerdata.passcode);
            console.log(questAllies);

            for(var j = 0; j < questAllies.length; j++){

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

                                //var responsJSON = JSON.parse(req.responseText);
                                //document.getElementById("demo").innerHTML = JSON.stringify(responsJSON);
                                //questdata = responsJSON;
                                if(j >= questAllies.length){

                                    location.href='/crew_main';
                                }
                            }
                            catch(err){
                                console.log(err);

                                document.getElementById("demo").innerHTML = err.message;

                            }
                        }

                    }
                };
                req.open("POST", "/questhandler", true);
                req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

                var passcodeReady = getCookie("passcode_user");
                var passcodeCrewReady = getCookie("passcode_crew");
                var questSingle = getCookie("quest_active");

                var allylistRelative = questAllies;

                allylistRelative = allylistRelative.filter(function(item) {
                    return item != questAllies[j];
                });

                console.log("quest ally: " + questAllies[j])
                console.log("quest relative: " + allylistRelative)

                req.send("passcode="+questAllies[j] + "&" + "passcodeCrew="+passcodeCrewReady +  "&" + "requesttype=quest_update" + "&" + "questId=" + questSingle + "&" + "questallies=" + allylistRelative.toString());
            }
        }
        else{

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
                            //document.getElementById("demo").innerHTML = JSON.stringify(responsJSON);
                            questdata = responsJSON;
                            location.href='/crew_main';
                        }
                        catch(err){
                            console.log(err);

                            document.getElementById("demo").innerHTML = err.message;

                        }
                    }

                }
            };
            req.open("POST", "/questhandler", true);
            req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            var passcodeReady = getCookie("passcode_user");
            var passcodeCrewReady = getCookie("passcode_crew");
            var questSingle = getCookie("quest_active");

            req.send("passcode="+passcodeReady + "&" + "passcodeCrew="+passcodeCrewReady +  "&" + "requesttype=quest_update" + "&" + "questId=" + questSingle + "&" + "questallies=" + questAllies.toString());
        }

    }
}

function cancelQuest(player, islast){

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

                    if(islast){
                        location.href='/crew_main';

                    }
                    else{
                        rewardPos++;
                        showRewards();
                    }


                }
                catch(err){
                    console.log(err);

                    document.getElementById("demo").innerHTML = err.message;

                }
            }

        }
    };
    req.open("POST", "/questhandler", true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    var passcodeReady = getCookie("passcode_user");
    var passcodeCrewReady = getCookie("passcode_crew");
    var questSingle = getCookie("quest_active");

    req.send("passcode="+player + "&" + "passcodeCrew="+passcodeCrewReady +  "&" + "requesttype=quest_cancel" + "&" + "questId=" + questSingle);
}

function showRewards() {

    console.log("allylist length: " + allylist.length)
    console.log("reward pos: " + rewardPos)

    if(allylist.length == 0){
        document.getElementById("reward_player").innerHTML = playerdata.passcode;
        document.getElementById('reward_list').innerHTML = "";
        document.getElementById('reward_list').appendChild(makeULplayerOnly(questdata.quest_rewards));

    }
    else{

        document.getElementById("reward_player").innerHTML = allylist[rewardPos];
        document.getElementById('reward_list').innerHTML = "";
        document.getElementById('reward_list').appendChild(makeULallies(questdata.quest_rewards));

        //var allyButton = document.createElement('BUTTON');
        //allyButton.id = "btn_finish_ally";
        //allyButton.innerHTML = "Quest für" + playerdata.passcode + " abschließen";
    }

}

function finishQuest(player, badge, reward, islast){
    //call questhandler with "quest_finish"
    //first finish player
    //then go throug ally list

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

                try{

                    //var responsJSON = JSON.parse(req.responseText);

                    //document.getElementById("demo").innerHTML = JSON.stringify(responsJSON);
                    cancelQuest(player, islast);

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

    passcodeCrewVar = getCookie("passcode_crew");
    passcodeVar = getCookie("passcode_user");

    //var checkedValue = document.getElementById("dataselector").checked;

    var updateMethod = "update_data";


    console.log("Quest badge reward: " + badge);

    req.send("passcode="+player + "&" + "requesttype=finish_quest" + "&" + "passcodecrew=" +  passcodeCrewVar  + "&" + "dataamount=" + reward + "&" + "badgeid=" + badge + "&" + "questid=" + questdata.quest_id);

    //datamanipulator = 0;
    //document.getElementById("data_manipulator").innerHTML = datamanipulator;
}

function makeULplayerOnly(array) {


    // Create the list element:
    var list = document.createElement('div');

    for (var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('BUTTON');
        //item.id =

        // Set its contents:
        //item.appendChild(document.createTextNode(array[i]));
        item.innerHTML = array[i].data_desc + " reward: " +array[i].data_reward;
        item.setAttribute("data-internalid", array[i].data_reward);
        item.setAttribute("data-badgeid", array[i].badge_id);
        item.id = "btn_reward";



        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}

function makeULallies(array) {


    // Create the list element:
    var list = document.createElement('div');

    for (var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('BUTTON');
        //item.id =

        // Set its contents:
        //item.appendChild(document.createTextNode(array[i]));
        item.innerHTML = array[i].data_desc + " reward: " +array[i].data_reward;
        item.setAttribute("data-internalid", array[i].data_reward);
        item.setAttribute("data-badgeid", array[i].badge_id);
        item.setAttribute("data-ally", allylist[rewardPos]);
        item.id = "btn_reward_ally";



        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}