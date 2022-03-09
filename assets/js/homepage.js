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
//you can plug in different usernames as a string to view their repos
getUserRepos("bganser15");
