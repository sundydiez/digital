function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

    const biscuit = getCookie("login");

    console.log(biscuit)

if (biscuit !== "true" && !window.location.pathname.includes('index.html')) {
    console.log("redirect");
    window.location.href = "./index.html";
}

if (biscuit === "true" && window.location.pathname.includes('index.html')) {
    window.location.href = "./numeral.html";
}
if (document.getElementById("loginForm")) {
    console.log(document.getElementById("loginForm"))
    document.getElementById("loginForm").addEventListener("submit", login);

    function login(e) { 
        e.preventDefault();
        
        const un = "digital@project.ui"
        const pw = "sir alerta";
        const errorMsg = document.getElementById("error");
        if (!(e.target.elements.password.value === pw || e.target.elements.password.value === pw)) {
            errorMsg.classList.remove("hidden");
            errorMsg.classList.add("show");
        } else {
            setCookie("login", "true", 60);
            window.location.href = "./numeral.html";
        }
    }
}


function logout() {
    console.log('logout')
    setCookie("login", "false");
    window.location.href = "./index.html";
}