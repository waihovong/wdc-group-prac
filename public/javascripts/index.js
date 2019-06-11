function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
}

var bookSide = document.getElementById("mySidemenu");
function openSM() {
  document.getElementById("mySidemenu").style.width = "450px";
  // document.getElementsByClassName("banner-img")[0].style.marginRight = "450px";
}

function closeSM() {
  document.getElementById("mySidemenu").style.width = "0";
  // document.getElementsByClassName("banner-img")[0].style.marginRight = "0";
}

function toNextDiv() {
  var scrolling = document.getElementById("second-content");
  scrolling.scrollIntoView();
}

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

var address;
function searchBarFunction(event) {
  address = document.getElementById("search-bar").value;
  if (event.keyCode == 13) {
    window.location.href = "booking.html";
  }
  return false;
}

function loadTimes() {
  var xhttp = new XMLHttpRequest(); 
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(xhttp.responseText);
      // document.getElementById("openTime1").innerHTML = data.openingTimes;
      myFunction(data);
    }
  }
  xhttp.open("GET", "restaurants.txt");
  xhttp.send();
}

function myFunction(data) {
  var string = "";
  var i;

  // var data = document.getElementsByClassName("openTime");
  for(i = 0; i < data.length; i++) {
    string += '<tr>' + '<th>' + data[i].day + '</th>' + '<td>' + data[i].openingTimes + '</td>' + '</tr>';
  }
  // document.getElementsByClassName("openTime")[1].innerHTML = string;
  document.getElementById("openingHours").innerHTML = string;
}



function restaurant() {
  // Create new AJAX request
  var xhttp = new XMLHttpRequest();

  // Define function that runs on response
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var restDetails = JSON.parse(this.responseText);

      restDetails.forEach(e => {
        var resName = e.name;
        var resAddress = e.address;
        var resCuisine = e.cuisine;
        var resPhone = e.phone;
        var resEmail = e.email;

        var vueinst = new Vue({
          el: '.main-container-booking',
          data: {
            restaurant: resName,
            address: resAddress,
            linkAddress: "https://maps.google.com/?q=" + resAddress,
            phone: resPhone,
            linkPhone: 'tel:' + resPhone,
            email: resEmail,
            linkEmail: 'mailto:' + resEmail
          },
        });
      });
    }
  };
  // Open connection
  xhttp.open("GET", "/restaurantINFO", true);

  // Send request
  xhttp.send();
}


// function getposts() {

//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {

//       var bposts = JSON.parse(this.responseText);

//       console.log(bposts);

//       var pdiv = document.getElementById('posts');
//       pdiv.innerHTML = '';

//       bposts.forEach(function (element) {
//         pdiv.innerHTML += '<div class="blogpost">\n' +
//           '   <span>' + element.timestamp + '</span>\n' +
//           '   <h3>' + element.title + '</h3>\n' +
//           '   <p>' + element.body + '</p>\n' +
//           '<div>\n';
//       });

//     }
//   };
//   xhttp.open("GET", "/getallposts?q=" + encodeURIComponent(document.getElementById('blogpostsearch').value), true);
//   xhttp.send();

// }

function onLogin() {
  console.log(1);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // alert('Welcome ' + xhttp.responseText);
      window.location.pathname = "./index.html"
      // document.getElementById("userSession").innerHTML = "My Account";
      console.log("account");

    } else if (this.readyState == 4 && this.status == 403) {
      alert('Username or Password Incorrect');
    }
  };
  xhttp.open("POST", "/signin", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify({ email: document.getElementById('email').value, pass: document.getElementById('pass').value }));
}

function onSignUp() {
  console.log(2);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      // alert('You have Signed up to UMAMI');
      var success = document.getElementById("logSuccess").innerHTML = "Sign Up Successful";
    } else if (this.readyState == 4 && this.status >= 400) {
      alert('Email address already in use, please use another email!!!!!!!!!!!!!!');
    }
  };
  
  xhttp.open("POST", "/signup", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify({name: document.getElementById('name2').value, email: document.getElementById('email2').value, pass: document.getElementById('pass2').value}))
}

function checkPasswords() {
  var passCheck2 = document.getElementById("pass2").value;
  var passCheck3 = document.getElementById("pass3").value;

  if(passCheck2 !== passCheck3) {
    alert("Password does not match");
    return false;
  } else {
    onSignUp();
  }
}

function managerSignIn() {
  console.log(3);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // alert('Welcome ' + xhttp.responseText);
      window.location.pathname = "./index.html"
      // document.getElementById("userSession").innerHTML = "My Account";
      console.log("you're the manager");

    } else if (this.readyState == 4 && this.status == 403) {
      alert('Username or Password Incorrect');
    }
  };
  xhttp.open("POST", "/managerlog", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify({ email: document.getElementById('email').value, pass: document.getElementById('pass').value }));
}

function restaurantSignUp() {
  console.log(4);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // alert('Welcome ' + xhttp.responseText);
      var success = document.getElementById("logSuccess").innerHTML = "Sign Up Successful";
      // document.getElementById("userSession").innerHTML = "My Account";
      console.log("A new restaurant has been added into the database!");

    } else if (this.readyState == 4 && this.status == 403) {
      alert('Username or Password Incorrect');
    }
  };
  xhttp.open("POST", "/resRegister", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify({ 
    name: document.getElementById('res_name').value,
    email: document.getElementById('res_email').value,
    address: document.getElementById('res_address').value,
    phone: document.getElementById('res_phone').value, 
    open: document.getElementById('res_open').value,
    cuisine: document.getElementById('res_cuisine').value, 
    pass: document.getElementById('pass2').value }));
}