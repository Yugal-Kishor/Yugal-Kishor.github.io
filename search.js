// User Authentication Sign In and Sign Up


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      document.getElementById("userdiv").style.display="default" ;
      document.getElementById("logindiv").style.display="none";
      console.log("signed in");
  
    } else {
      // No user is signed in.
      document.getElementById("userdiv").style.display="default" ;
      document.getElementById("logindiv").style.display="default";
      console.log("Please Sign in. You are not signed in.");
  
    }
  });

function signin(){
    var userEmail = document.getElementById("email1").value;
    var userPass = document.getElementById("password1").value;
    

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(userCredential);
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error : " +errorMessage )  ;
    });
}

function OpenSignIn(){
    document.getElementById("SignIn").style.display="flex" ;
    document.getElementById("SignUp").style.display="none";

}
function OpenSignUp(){
    document.getElementById("SignIn").style.display="none";
    document.getElementById("SignUp").style.display="flex";

}

// Speech Recognition (Voice Search)

const searchForm = document.querySelector(".searching");
const searchFormInput = document.querySelector("#search");
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  console.log("browser support speech recognition")

  const micBtn = searchForm.querySelector("button");
  const micIcon = micBtn.querySelector("i");

  const recognition = new SpeechRecognition();
  micBtn.addEventListener("click", micBtnClick);
  function micBtnClick(){
    if (micIcon.classList.contains("fa-microphone")) {// Start Speech Recognition
      recognition.start();
      
    } 
    else {//Stop Speech Recognition
      
      recognition.stop();
      
    }
  }
  recognition.addEventListener("start", startSpeechRecognition);
  function startSpeechRecognition() {
    micIcon.classList.remove("fa-microphone");
    micIcon.classList.add("fa-microphone-alt");
    searchFormInput.focus();
    console.log("Speech Recognition Active");
      
  }
  recognition.addEventListener("end", endSpeechRecognition);
  function endSpeechRecognition() {
    micIcon.classList.remove("fa-microphone-alt");
    micIcon.classList.add("fa-microphone");
    searchFormInput.focus();
    console.log("Speech Recognition not Active");
  }

  recognition.addEventListener("result", resultofSpeehRecognition);
  function resultofSpeehRecognition(event){
    const transcript = event.results[0][0].transcript;
    searchFormInput.value = transcript;
    setTimeout(()=>{
      // searchForm.submit()
      

    }, 750)
  }


} else {
  console.log("browser does not support speech recognition")
  
}

// YouTube API

$(document).ready(() => {
  var API = "AIzaSyAJKu7caQTAYm3JpF4S6RKt6pESZr0kNV4"
  $(".searching").submit(function (event) {
    event.preventDefault()
    var search = $("#search").val()
    videoSearch(API, search, 15)
  })
  function videoSearch(key, search, maxResults) {
    $("#videos").empty()

    $.get("https://www.googleapis.com/youtube/v3/search?key=" + key + "&tye=video&part=snippet&maxResults=" + maxResults + "&q=" + search, function (data) {
      console.log(data)
      data.items.forEach(item => {
        video = `
            <iframe width="420" src="http://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen><iframe>
            `
        $("#videos").append(video)
      })
    })
  }
})


