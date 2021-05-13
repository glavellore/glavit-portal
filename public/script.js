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