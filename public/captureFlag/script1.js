// var que = document.getElementById('question').value;

// var ansInput = document.getElementById('answerInput');
// var ans;
// ansInput.addEventListener('keyup', function () {
//   ans = ansInput.value;
// });

const startgameBtn = document.getElementById('startgame');

let now = Date.now();
let toStart = new Date('07/12/2022 06:00:00 PM');
let toEnd = new Date('07/12/2022 11:00:00 PM');

// if (now > toStart && now < toEnd) {
//   startgameBtn.disabled = false;
//   startgameBtn.innerText = "Enter event";
// } else {
//   startgameBtn.disabled = true;
//   startgameBtn.innerText = "Event ended or not started yet";
// }

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


// const submitBtn = document.getElementById('submitBtn');
// const rightAnsAlert = document.getElementById('rightAnsAlert');
// const wrongAnsAlert = document.getElementById('wrongAnsAlert');
// const errorAnsAlert = document.getElementById('errorAnsAlert');

// submitBtn.disabled = true;

// const timer = document.getElementById('timer');


// let endtime = new Date('07/12/2022 08:00:00 PM').getTime();



// let day = Math.floor(diff / (1000*60*60*24));

// var trivia_timer = setInterval(Timer, 1000);



// function Timer() {
//   let current = new Date().getTime();

//   let diff = endtime - current;

//   let hour = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   let min = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//   let sec = Math.floor((diff % (1000 * 60)) / (1000));

//   timer.innerText = hour + ":" + min + ":" + sec;

//   if (hour <= 0 && min <= 0 && sec <= 0) {
//     stopTimer();
//     timer.innerText = "00:00:00";

//     ansInput.value = 'not answered';

//     let tosSubmit = document.getElementById('hunt-form');
//     tosSubmit.submit();

//   }
// }

// function stopTimer() {
//   clearInterval(trivia_timer);
// }

// function closeAlert(id) {
//   document.getElementById(id).style.display = 'none';
// }


// function requestServer() {
//   fetch(`/capture/checkAnswer/${que}/${ans}`)
//     .then(result => result.json())
//     .then(result => {
//       // console.log(result.cluemein);

//       switch (result.cluemein) {
//         case 0:
//           wrongAnsAlert.style.display = "inline";
//           rightAnsAlert.style.display = "none";
//           errorAnsAlert.style.display = "none";
//           submitBtn.disabled = true;
//           break;
//         case 1:
//           rightAnsAlert.style.display = "inline";
//           wrongAnsAlert.style.display = "none";
//           errorAnsAlert.style.display = "none";
//           submitBtn.disabled = false;
//           break;
//         case -1:
//           errorAnsAlert.style.display = "inline";
//           rightAnsAlert.style.display = "none";
//           wrongAnsAlert.style.display = "none";
//           submitBtn.disabled = true;
//           break;
//         default:
//           errorAnsAlert.style.display = "inline";
//           rightAnsAlert.style.display = "none";
//           wrongAnsAlert.style.display = "none";
//           submitBtn.disabled = true;
//       }
//     })
//     .catch(err => {
//       console.log(err);
//     })

// }


