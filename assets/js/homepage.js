var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var formSubmitHandler = function (event) {
  event.preventDefault();
  //check that event is working
  //console.log(event);

  // get value from input element
  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username");
  }
};

//user is a parameter...you can  pick a different username when calling the function
var getUserRepos = function (user) {
  // format the github api url..user is the user that you pass as an arguement
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  // make a request to the url
  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
    });
  });
};

userFormEl.addEventListener("submit", formSubmitHandler);
//you can plug in different usernames as a string to view their repos
//getUserRepos();
