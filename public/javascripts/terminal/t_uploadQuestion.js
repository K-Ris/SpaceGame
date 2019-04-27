document.addEventListener('keydown', function(event) {
    if(event.keyCode == 13) {
        uploadData();
    }
    else if(event.keyCode == 27){
        location.href = '/terminal/status'
        return false;
    }
});