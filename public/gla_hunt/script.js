var que = document.getElementById('question').value;

var ansInput = document.getElementById('answerInput');
var ans;
ansInput.addEventListener('keyup', function() {
    ans = ansInput.value;
});

const submitBtn = document.getElementById('submitBtn');
const rightAnsAlert = document.getElementById('rightAnsAlert');
const wrongAnsAlert = document.getElementById('wrongAnsAlert');
const errorAnsAlert = document.getElementById('errorAnsAlert');

submitBtn.disabled = true;

const timer = document.getElementById('timer');


let endtime = new Date('05/14/2021 12:43:00 PM').getTime();



// let day = Math.floor(diff / (1000*60*60*24));

var hunt_timer = setInterval(Timer, 1000);



function Timer(){ 
  let current = new Date().getTime();

  let diff = endtime - current;

  let hour = Math.floor( (diff % (1000*60*60*24)) / (1000*60*60) );
  let min = Math.floor( (diff % (1000*60*60)) / (1000*60) );
  let sec = Math.floor( (diff % (1000*60)) / (1000) );

  timer.innerText = hour + ":" + min + ":" + sec; 
  
  if(hour <= 0 && min <= 0 && sec <= 0) {
    stopTimer();
    timer.innerText = "00:00:00";

    ansInput.value = 'not answered';
  
    let tosSubmit = document.getElementById('hunt-form');
    tosSubmit.submit();

  }
}

function stopTimer() {
  clearInterval(hunt_timer);
}

function closeAlert(id) {
    document.getElementById(id).style.display = 'none';
}

function hide_loading(){
  var elements = document.getElementsByClassName("load_div");
    if (elements.length > 0) {
      elements[0].style.zIndex = "-2";
      // elements[0].style.opacity = "0.8";
      elements[0].style.transition = "3.5s";
    }
}
function hide_loading2(){
  var elements = document.getElementsByClassName("load_div");
    if (elements.length > 0) {
      elements[0].style.zIndex = "-2";
      elements[0].style.transition = "1.55s";
    }
}

function requestServer() {
        fetch(`/hunt/checkAnswer/${que}/${ans}`)
        .then(result => result.json())
        .then(result => {
        // console.log(result.cluemein);

        switch(result.cluemein) {
            case 0:
              wrongAnsAlert.style.display = "inline";
              rightAnsAlert.style.display = "none";
              errorAnsAlert.style.display = "none";
              submitBtn.disabled = true;
              break;
            case 1:
              rightAnsAlert.style.display = "inline";
              wrongAnsAlert.style.display = "none";
              errorAnsAlert.style.display = "none";
              submitBtn.disabled = false;
              break;
            case -1:
                errorAnsAlert.style.display = "inline";
                rightAnsAlert.style.display = "none";
                wrongAnsAlert.style.display = "none";
                submitBtn.disabled = true;
              break;
            default:
                errorAnsAlert.style.display = "inline";
                rightAnsAlert.style.display = "none";
                wrongAnsAlert.style.display = "none";
                submitBtn.disabled = true;
          }
        })
        .catch(err => {
            console.log(err);
        })

}


