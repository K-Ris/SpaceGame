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

prepareQuestion();

function prepareQuestion() {
    document.getElementById("answer_list").appendChild(makeUL());
}

function makeUL(array) {
    // Create the list element:
    var list = document.createElement('ul');

    for (var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(array[i]));

        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}