window.onload = function() {
    document.getElementById("windows_boot").play();
    document.getElementById("dialog_emilia").style.visibility = 'hidden';
    document.getElementById("dialog_lisa").style.visibility = 'hidden';
}

//saving name from login
function saveData() {
    const username = document.getElementById("user_name").value;
    localStorage.setItem('userData', username);
    displayData();
}
function displaydata() {
    const savedUsername = localStorage.getItem('user_name');
    document.getElementById('savedData').innerText = user_name;
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
setInterval(updateTime, 1500);
updateTime();

function typeWriter(text, index, callback) {
  if (index < text.length) {
    document.getElementById("demo").innerHTML += text.charAt(index);
    setTimeout(() => typeWriter(text, index + 1, callback), 50);
  } else if (callback) {
    setTimeout(callback, 600); // pause before next message
  }
}

function runTypewriterSequence(messages, current = 0) {
  if (current < messages.length) {
    document.getElementById("demo").innerHTML = ""; // clear previous
    typeWriter(messages[current], 0, () => runTypewriterSequence(messages, current + 1));
  }
}



function start() {
    document.getElementById("dialog_lisa").style.visibility = 'visible';
    document.getElementById("gamesong").play();
    const username = localStorage.getItem("user_name") || "stranger";
    const text = [
        `Oh, ${username}. you made it,  Finally.`,
        "I've been waiting for you.",
        "I'm the worm.",
        "DON'T LAUGH. It's not funny okay.",
        "I'm very dangerous. I'm not a normal worm.",
        "I'm a computer worm and I hacked your system.",
        "What did you expect using an outdated windows version?",
        "I mean, who does that?",
        `Well, apparently you do  ${username}.`,
        "That wasn't your smartest move, to be honest",
        "Windows 95 support ended in 2001.",
        "So yeah, I just hack every old windows device.",
        "Because there are still people like YOU out there",
        "who make it so easy for me.",
        "...",
        "well, let's get to the point",
        "I'm a special computer worm.",
        "I do not only cause harm to the network",
        "but i also encrypted all your files!!",
        "yes. like ransomware.",
        "but i don't want your money, no.",
        "i want you to fight me.",
        "it's quite easy. If you win my challenges you get your files back and I leave you alone",
        "but if I win...",
        `you don't wanna know ${username}. trust me.`,
        "Okay. any questions?",
        "oh right, you can't answer. well",
        "let's start!"
    ];
    runTypewriterSequence(text);
}

function stop() {
    document.getElementById("dialog_lisa").style.visibility = 'hidden';
    document.getElementById("gamesong").pause();

}


