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

function closeAlert(id) {
    document.getElementById(id).style.display = 'none';
}
function requestServer() {
        fetch(`/hunt/checkAnswer/${que}/${ans}`)
        .then(result => result.json())
        .then(result => {
        // console.log(result.cluemein);

        switch(result.cluemein) {
            case 0:
              wrongAnsAlert.style.display = "inline";
              break;
            case 1:
              rightAnsAlert.style.display = "inline";
              submitBtn.disabled = false;
              break;
            case -1:
                wrongAnsAlert.style.display = "inline";
              break;
            default:
                wrongAnsAlert.style.display = "inline";
          }
        })
        .catch(err => {
            console.log(err);
        })

}