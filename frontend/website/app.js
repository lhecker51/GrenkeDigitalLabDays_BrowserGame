window.onload = function() {
    document.getElementById("windows_boot").play();
    document.getElementById("dialog_emilia").style.visibility = 'hidden';
    document.getElementById("dialog_lisa").style.visibility = 'hidden';
}

document.getElementById("start_lisa").ondblclick = start
document.getElementById("stop_lisa").onclick = stop


window.transitionToPage = function(href) {
    document.querySelector('body').style.opacity = 0
    setTimeout(function() { 
        window.location.href = href
    }, 1000)
}

document.addEventListener('DOMContentLoaded', function(event) {
    document.querySelector('body').style.opacity = 1
})

function updateTime() {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const time = date.toLocaleTimeString();
    const day = date.toLocaleDateString(undefined, options);
    document.getElementById('time').innerHTML =
        `${time}`;
}
setInterval(updateTime, 1000);
updateTime();

function start() {
    document.getElementById("dialog_lisa").style.visibility = 'visible';
}

function stop() {
    document.getElementById("dialog_lisa").style.visibility = 'hidden';
}
