cookieValue = null;

// Get the cookie when the user clicks the button in "popup.html"
document.getElementById("btn1").onclick = () => {
    // NOTE: This chrome extension has access to only "aims.iith.ac.in" website
    // So only that cookie will be retrieved.
    // Getting cookie for a specific website did not work

    chrome.cookies.getAll({}, (cookie) => {
        if (cookie) {
            cookieValue = cookie[0].value;
            console.log("cookie found");
        } else {
            console.log("cookie doesn't exist");
        }
    });
};
