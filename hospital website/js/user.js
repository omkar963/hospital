

/**
 * 
 * @param {HTMLFormElement} form
 * @param {string} location
 * @param {string} session_id
 */
function send_data(form, location, session_id) {


    // collect the form data while iterating over the inputs
    var data = {};
    for (var i = 0, ii = form.length; i < ii; ++i) {
        var input = form[i];
        if (input.name) {
            data[input.name] = input.value;
        }
    }
    data['session_id'] = session_id
    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open("POST", location, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
           data = JSON.parse(this.responseText)
           if ("session_id" in data) {
               localStorage.setItem("session_id", data["session_id"]);
               console.log("Stored session id");
            } else {
               localStorage.setItem("session_id", "");
            
           }

           console.log(data);
        }
    });
    // send the collected data as JSON
    xhr.send(JSON.stringify(data));

    xhr.onloadend = function () {
    };
}