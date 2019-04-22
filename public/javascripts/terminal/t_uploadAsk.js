document.getElementById("btn_no").addEventListener("click", function () {

    location.href = '/terminal/status'
});

document.getElementById("btn_yes").addEventListener("click", function () {

    uploadData();
    location.href = '/terminal/uploadQuestion'
});

function uploadData() {
    //upload data
}
