document.getElementById("logout_link").addEventListener("click", function () {
    console.log("logout");
    logoutCrew();
});

function logoutCrew() {
    deleteAllCookies();
}