// User Authentication Sign In and Sign Up

function signup() {
    var createUserEmail = document.getElementById("email").value;
    var createUserPass = document.getElementById("password").value;
    var confirmUserPass = document.getElementById("conpassword").value;
    
    if (createUserPass == confirmUserPass) {
      firebase.auth().createUserWithEmailAndPassword(createUserEmail, createUserPass)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      
      
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
      window.alert("Error : " +errorMessage )  ;


    });
      
    } else {
      window.alert("Error : Password not matching")
      
    }
      
  
    

  }
    
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      document.getElementById("userdiv").style.display="block" ;
      document.getElementById("logindiv").style.display="none";
      console.log("signed in");
      
      
      } else {
        // No user is signed in.
        document.getElementById("userdiv").style.display="none" ;
        document.getElementById("logindiv").style.display="block";
        console.log("Please Sign in");
        
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

function logout() {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  location.reload();

  }).catch((error) => {
    // An error happened.
  });
  
}


function updateProf() {
  document.getElementById("updateContent").style.display="block";
  
}
function cross() {
  document.getElementById("updateContent").style.display="none";

}
function update1() {
  var uform = document.getElementById("uform");
  var profname = document.getElementById("name").value;
  var contact = document.getElementById("number1").value;
  auth.onAuthStateChanged(user => {
  if (user) {
      db.ref('user/'+user.uid).set({
      Name: profname,
      ContactNo: contact
    })
  }
})
uform.reset();
cross();
  
}

// retriving username
auth.onAuthStateChanged(user => {
  const username = document.getElementById('welcomeUser');
  if (user) {
    db.ref('user/'+user.uid).on('value',function(snapshot) {
          username.innerText = "Welcome, "+ snapshot.val().Name + ":"+ snapshot.val().ContactNo;
      })
  }
  
})



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
    
  }


} else {
  console.log("browser does not support speech recognition")
  
}



//categories add delete
const catContainer = document.getElementById('cat-container');

function renderData(individualDoc) {
  

  // parent div
  let parentDiv = document.createElement("div");
  parentDiv.className = "container cat-box";
  parentDiv.setAttribute('data-id', individualDoc.id);

  // cat div
  let catDiv = document.createElement("h3");
  catDiv.className="catDiv";
  catDiv.textContent = individualDoc.data().catg;
  
  
  let catDiv1 = document.createElement("div");
  catDiv1.className="catDiv1";
  catDiv1.id= "catDiv1"+catDiv.textContent;

  $("#catDiv1"+catDiv.textContent).empty()

  $.get("https://www.googleapis.com/youtube/v3/search?key=AIzaSyAFxJU1TDOKwbqkamdOtLHmTlFdYa0w5HA&type=video&part=snippet&maxResults=3&q=" + catDiv.textContent, function (data) {
      console.log(data)
      data.items.forEach(item => {
        video1 = `
            <button class="videocont"><iframe  src="http://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen><iframe></button>
            `
        $("#catDiv1"+catDiv.textContent).append(video1)
      })
    })

  
  



  // button
  let trash = document.createElement("button");

  let i = document.createElement("i");
  i.className = "fas fa-trash";

  // appending
  trash.appendChild(i);

  parentDiv.appendChild(catDiv);
  parentDiv.appendChild(trash);
  parentDiv.appendChild(catDiv1);

  catContainer.appendChild(parentDiv);

    // trash clicking event
    trash.addEventListener('click', e => {
        let id = e.target.parentElement.parentElement.getAttribute('data-id');
        auth.onAuthStateChanged(user => {
            if (user) {
                fs.collection(user.uid).doc(id).delete();
            }
        })
    })
}


// adding catg to firestore database
const form = document.getElementById('form');
let date = new Date();
let time = date.getTime();
let counter = time;

form.addEventListener('submit', e => {
  e.preventDefault();
  const catg = form['catg'].value;
  // console.log(catg);
  let id = counter += 1;
  form.reset();
  auth.onAuthStateChanged(user => {
      if (user) {
          fs.collection(user.uid).doc('_' + id).set({
              id: '_' + id,
              catg
          }).then(() => {
              console.log('category added');
          }).catch(err => {
              //console.log(err.message);
          })
      }
      else {
          // console.log('user is not signed in to add todos');
      }
  })
})

// realtime listners
auth.onAuthStateChanged(user => {
  if (user) {
      fs.collection(user.uid).onSnapshot((snapshot) => {
          let changes = snapshot.docChanges();
          changes.forEach(change => {
              if (change.type == "added") {
                  renderData(change.doc);
              }
              else if (change.type == 'removed') {
                  let li = catContainer.querySelector('[data-id=' + change.doc.id + ']');
                  catContainer.removeChild(li);
              }
          })
      })
  }
})

// YouTube API

$(document).ready(() => {
  var API = "AIzaSyAFxJU1TDOKwbqkamdOtLHmTlFdYa0w5HA"
  $(".searching").submit(function (event) {
    event.preventDefault()
    var search = $("#search").val()
    // videoSearch(API, search, 9)
    document.getElementById("videos").style.display="flex";
    $("#searchresult").text("search results for : "+search)

  })


  function videoSearch(key, search, maxResults) {
    $("#videos").empty()

    $.get("https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search, function (data) {
      //console.log(data)
      data.items.forEach(item => {
        video = `
            <button class="videocont"><iframe src="http://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen><iframe></button>
            `
        $("#videos").append(video)
      })
    }) 
  }

  

})


