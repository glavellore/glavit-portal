document.querySelector("#Copyright").innerText = (new Date()).getFullYear();

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
      elements[0].style.transition = "0.5s";
    }
}

// const startgameBtn = document.getElementById('startgame');

// let now = Date.now();
// let toStart = new Date('07/06/2021 10:20:00 PM');
// let toEnd = new Date('07/07/2021 11:05:00 PM');

// if( now > toStart && now < toEnd) {
//   startgameBtn.disabled = false;
//   startgameBtn.innerText = "Enter event";
// } else {
//   startgameBtn.disabled = true;
//   startgameBtn.innerText = "Event ended or not started yet";
// }
// script to control que visibility from admin side

// setInterval(function(){ 

//         fetch('./refresh')
//         .then(result => result.json())
//         .then(result => {
//         // console.log(result);
//         result.forEach((image) => {
//             if(image.visible == 'true') {
//                 // console.log(image);
//                 document.getElementById(image.name).style.filter = "blur(0px)";
//             } else {
//                 document.getElementById(image.name).style.filter = "blur(20px)";
//             }
//         });
        
//         })
//         .catch(err => {
//             console.log(err);
//         })

//  }, 5000);