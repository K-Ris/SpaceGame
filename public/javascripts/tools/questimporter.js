document.getElementById("btn_submit").addEventListener("click", function () {
    console.log("test");
    validateForm();
});


function validateForm() {
    //var quest_id = document.forms["myForm"]["fname"].value;
    var quest_id = document.getElementById("quest_id").value;
    var quest_name = document.getElementById("quest_name").value;
    var quest_stagecount = document.getElementById("quest_stagecount").value;
    var quest_department = document.getElementById("quest_department").value;
    var quest_crew_id = document.getElementById("quest_crew_id").value;
    var quest_badge_req = document.getElementById("quest_badge_req").value;
    var quest_free_storage_req = document.getElementById("quest_free_storage_req").value;
    var quest_online_data_req = document.getElementById("quest_online_data_req").value;

    var quest_reward_1_badge_id = document.getElementById("quest_reward_1_badge_id").value;
    var quest_reward_1_data_reward = document.getElementById("quest_reward_1_data_reward").value;
    var quest_reward_1_data_target = document.getElementById("quest_reward_1_data_target").value;
    var quest_reward_1_data_desc = document.getElementById("quest_reward_1_data_desc").value;

    var quest_reward_2_badge_id = document.getElementById("quest_reward_2_badge_id").value;
    var quest_reward_2_data_reward = document.getElementById("quest_reward_2_data_reward").value;
    var quest_reward_2_data_target = document.getElementById("quest_reward_2_data_target").value;
    var quest_reward_2_data_desc = document.getElementById("quest_reward_2_data_desc").value;

    var quest_reward_3_badge_id = document.getElementById("quest_reward_3_badge_id").value;
    var quest_reward_3_data_reward = document.getElementById("quest_reward_3_data_reward").value;
    var quest_reward_3_data_target = document.getElementById("quest_reward_3_data_target").value;
    var quest_reward_3_data_desc = document.getElementById("quest_reward_3_data_desc").value;

    var quest_reward_4_badge_id = document.getElementById("quest_reward_4_badge_id").value;
    var quest_reward_4_data_reward = document.getElementById("quest_reward_4_data_reward").value;
    var quest_reward_4_data_target = document.getElementById("quest_reward_4_data_target").value;
    var quest_reward_4_data_desc = document.getElementById("quest_reward_4_data_desc").value;

    var quest_reward_5_badge_id = document.getElementById("quest_reward_5_badge_id").value;
    var quest_reward_5_data_reward = document.getElementById("quest_reward_5_data_reward").value;
    var quest_reward_5_data_target = document.getElementById("quest_reward_5_data_target").value;
    var quest_reward_5_data_desc = document.getElementById("quest_reward_5_data_desc").value;

    var quest_reward_6_badge_id = document.getElementById("quest_reward_6_badge_id").value;
    var quest_reward_6_data_reward = document.getElementById("quest_reward_6_data_reward").value;
    var quest_reward_6_data_target = document.getElementById("quest_reward_6_data_target").value;
    var quest_reward_6_data_desc = document.getElementById("quest_reward_6_data_desc").value;
    var quest_desc_stages = document.getElementById("quest_desc_stages").value;
    console.log(quest_id);
    console.log(quest_name);
    if (quest_id == "") {
        alert("Quest Id must be filled out");
        return false;
    }
    else if (quest_name == "") {
        alert("Quest Name must be filled out");
        return false;
    }
    else{
        console.log("call server");
        callServer(quest_id, quest_name, quest_stagecount, quest_department, quest_crew_id, quest_badge_req, quest_free_storage_req, quest_online_data_req,
            quest_reward_1_badge_id, quest_reward_1_data_reward, quest_reward_1_data_target, quest_reward_1_data_desc,
            quest_reward_2_badge_id, quest_reward_2_data_reward, quest_reward_2_data_target, quest_reward_2_data_desc,
            quest_reward_3_badge_id, quest_reward_3_data_reward, quest_reward_3_data_target, quest_reward_3_data_desc,
            quest_reward_4_badge_id, quest_reward_4_data_reward, quest_reward_4_data_target, quest_reward_4_data_desc,
            quest_reward_5_badge_id, quest_reward_5_data_reward, quest_reward_5_data_target, quest_reward_5_data_desc,
            quest_reward_6_badge_id, quest_reward_6_data_reward, quest_reward_6_data_target, quest_reward_6_data_desc,
            quest_desc_stages)
    }
}

function callServer(quest_id, quest_name, quest_stagecount, quest_department, quest_crew_id, quest_badge_req, quest_free_storage_req, quest_online_data_req,
                    quest_reward_1_badge_id, quest_reward_1_data_reward, quest_reward_1_data_target, quest_reward_1_data_desc,
                    quest_reward_2_badge_id, quest_reward_2_data_reward, quest_reward_2_data_target,quest_reward_2_data_desc,
                    quest_reward_3_badge_id, quest_reward_3_data_reward, quest_reward_3_data_target,quest_reward_3_data_desc,
                    quest_reward_4_badge_id, quest_reward_4_data_reward, quest_reward_4_data_target,quest_reward_4_data_desc,
                    quest_reward_5_badge_id, quest_reward_5_data_reward, quest_reward_5_data_target,quest_reward_5_data_desc,
                    quest_reward_6_badge_id, quest_reward_6_data_reward, quest_reward_6_data_target,quest_reward_6_data_desc,
                    quest_desc_stages
){

    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Post successful");

            //save cookie
            //document.cookie("passcode="+passcodeReady);
            if(req.responseText == "wronginput"){
                //document.getElementById("demo").innerHTML = "Falscher Passcode";
            }
            else {

                try{

                    var responsJSON = JSON.parse(req.responseText);
                }
                catch(err){
                    console.log(err);

                    document.getElementById("demo").innerHTML = err.message;

                }
            }

        }
    };
    req.open("POST", "/tools/questimporthandler", true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    req.send("quest_id="+quest_id + "&" + "quest_name="+quest_name + "&" + "quest_stagecount="+quest_stagecount
        + "&" + "quest_department="+quest_department+ "&" +"quest_crew_id="+quest_crew_id + "&" + "quest_badge_req=" + quest_badge_req + "&" + "quest_free_storage_req="+quest_free_storage_req
        + "&" + "quest_online_data_req="+quest_online_data_req

        + "&" + "quest_reward_1_badge_id="+quest_reward_1_badge_id + "&" + "quest_reward_1_data_reward="+quest_reward_1_data_reward
        + "&" + "quest_reward_1_data_target=" + quest_reward_1_data_target + "&" + "quest_reward_1_data_desc=" + quest_reward_1_data_desc

        + "&" + "quest_reward_2_badge_id=" + quest_reward_2_badge_id + "&" + "quest_reward_2_data_reward=" + quest_reward_2_data_reward
        + "&" + "quest_reward_2_data_target=" + quest_reward_2_data_target +"&" + "quest_reward_2_data_desc=" + quest_reward_2_data_desc

        + "&" + "quest_reward_3_badge_id=" + quest_reward_3_badge_id + "&" + "quest_reward_3_data_reward=" + quest_reward_3_data_reward
        + "&" + "quest_reward_3_data_target=" + quest_reward_3_data_target +"&" + "quest_reward_3_data_desc=" + quest_reward_3_data_desc

        + "&" + "quest_reward_4_badge_id=" + quest_reward_4_badge_id + "&" + "quest_reward_4_data_reward=" + quest_reward_4_data_reward
        + "&" + "quest_reward_4_data_target=" + quest_reward_4_data_target +"&" + "quest_reward_4_data_desc=" + quest_reward_4_data_desc

        + "&" + "quest_reward_5_badge_id=" + quest_reward_5_badge_id + "&" + "quest_reward_5_data_reward=" + quest_reward_5_data_reward
        + "&" + "quest_reward_5_data_target=" + quest_reward_5_data_target +"&" + "quest_reward_5_data_desc=" + quest_reward_5_data_desc

        + "&" + "quest_reward_6_badge_id=" + quest_reward_6_badge_id + "&" + "quest_reward_6_data_reward=" + quest_reward_6_data_reward
        + "&" + "quest_reward_6_data_target=" + quest_reward_6_data_target +"&" + "quest_reward_6_data_desc=" + quest_reward_6_data_desc
        + "&" + "quest_desc_stages=" + quest_desc_stages
    );
}