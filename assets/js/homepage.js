//DOM elements to get user input in search
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
//DOM elements to display repo info
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var formSubmitHandler = function (event) {
  event.preventDefault();
  //check that event is working
  //console.log(event);

  // get value from input element and remove any extra spaces the user may have entered
  var username = nameInputEl.value.trim();

  if (username) {
    //runs inputted username as an argument through get user repos
    getUserRepos(username);
    //sets input box to empty after submitting
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
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        //turns response into json data
        response.json().then(function (data) {
          displayRepos(data, user);
        });
        //if there is a 404 error
      } else {
        alert("Error: GitHub User Not Found");
      }
    })
    //function to catch 500 errors
    .catch(function (error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method
      alert("Unable to connect to GitHub");
    });
};

//function to display repos u=on page
var displayRepos = function (repos, searchTerm) {
  // check if api returned any repos..since the data is stored in an array it checks for an empty array
  if (repos.length === 0) {
    //adds no repos found to repo container
    repoContainerEl.textContent = "No repositories found.";
    return;
  }
  console.log(repos);
  console.log(searchTerm);
  // clear old content
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;
  // loop over repos
  for (var i = 0; i < repos.length; i++) {
    // format repo name
    //for each repo..under owner show the login/repo name (the . allows you to view nested data)
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    // create a container for each repo and give it classes
    var repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    //adds link to the repo el to the single repo page
    repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);
    console.log(repoEl);

    // create a span element to hold repository name. adds the reponame we created from above variable
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // append to container..adds span to each div
    repoEl.appendChild(titleEl);

    // create a status element to display number off
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
      //sets  x icon
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" +
        repos[i].open_issues_count +
        " issue(s)";
    } else {
      //sets check icon that there or no open repos
      statusEl.innerHTML =
        "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    // append to container
    repoEl.appendChild(statusEl);

    // append container to the dom..adds each div to the main container
    repoContainerEl.appendChild(repoEl);
  }
};
userFormEl.addEventListener("submit", formSubmitHandler);
//you can plug in different usernames as a string to view their repos
//getUserRepos();
