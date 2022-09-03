function bodyOnLoadFunctions() {
    var script = document.createElement("script");
    script.src = "scripts/bundle.js";
    script.type = "text/javascript";
    document.head.appendChild(script);
}

function toggleLeftNavbar() {
    let navbar = document.getElementsByClassName('left-navbar')[0];
    let content = document.getElementsByClassName('main-content')[0];
    console.log(navbar.offsetLeft);
    if (navbar.offsetLeft >= 0) {
        navbar.style.left = '-200pt';
        content.style.left = '0';
        content.style.width = '100vw';
    } else {
        navbar.style.left = '0';
        content.style.left = '200pt';
        content.style.width = 'calc(100vw - 200pt)';
    }
}