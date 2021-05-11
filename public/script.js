document.querySelector("#Copyright").innerText = (new Date()).getFullYear();

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