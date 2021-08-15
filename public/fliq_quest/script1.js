const startgameBtn = document.getElementById('startgame');

let now = Date.now();
let toStart = new Date('08/15/2021 04:05:00 PM');
let toEnd = new Date('08/15/2021 04:10:00 PM');

if( now > toStart && now < toEnd) {
  startgameBtn.disabled = false;
  startgameBtn.innerText = "Enter event";
} else if(now < toStart){
  startgameBtn.disabled = true;
  var trivia_timer = setInterval(Timer, 1000);
} else {
  startgameBtn.disabled = true;
  startgameBtn.innerText = "Event ended or not started yet";
}



function Timer(){ 
  let current = new Date().getTime();
  let startTime = toStart.getTime();
  let diff = startTime - current;

  let hour = Math.floor( (diff % (1000*60*60*24)) / (1000*60*60) );
  let min = Math.floor( (diff % (1000*60*60)) / (1000*60) );
  let sec = Math.floor( (diff % (1000*60)) / (1000) );

  startgameBtn.innerText = "Event will start in " + hour + ":" + min + ":" + sec; 
  
  if(hour <= 0 && min <= 0 && sec <= 0) {
    stopTimer();
    startgameBtn.innerText = "Enter event";
    startgameBtn.disabled = false;
  }
}

function stopTimer() {
  clearInterval(trivia_timer);
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