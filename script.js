function validateForm() {
    var centerName = document.getElementById("centerName").value;
    var code = document.getElementById("code").value;

    if (centerName === "") {
        alert("Center Name is required");
        return false;
    }

    if (code === "") {
        alert("Code is required");
        return false;
    }

    return true;
}

function welcome() {
    var centerName = document.getElementById("centerName").value;
    var code = document.getElementById("code").value;

    // Assuming you want to open Home.html only if both fields are filled
    if (validateForm()) {
        // Redirect to Home.html
        window.location.href = 'C:\\Users\\Nidhishree G\\Documents\\Hal 13 Team Sadhna\\Home.html';
    }
}
