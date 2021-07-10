const startgameBtn = document.getElementById('startgame');

let now = Date.now();
let toStart = new Date('07/09/2021 03:12:00 PM');
let toEnd = new Date('07/10/2021 04:35:00 PM');

if( now > toStart && now < toEnd) {
  startgameBtn.disabled = false;
  startgameBtn.innerText = "Enter event";
} else {
  startgameBtn.disabled = true;
  startgameBtn.innerText = "Event ended or not started yet";
}

var myAudio = document.getElementById("bgMusic");
var isPlaying = false;

myAudio.loop = true;

function togglePlay() {
  isPlaying ? myAudio.pause() : myAudio.play();
};

myAudio.onplaying = function() {
  isPlaying = true;
};
myAudio.onpause = function() {
  isPlaying = false;
};