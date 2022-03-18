var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function (repo) {
  var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        //calling the function to add data to display
        displayIssues(data);
      });
    } else {
      alert("There was a problem with your request!");
    }
  });
  console.log(repo);
};
//issues being passed is the data that was passed through when the function was calling in getRepoIssues
var displayIssues = function (issues) {
  //is repo has no open issues
  if (issues.length === 0) {
    issueContainerEl.textContent = "This repo has no open issues!";
    return;
  }
  for (var i = 0; i < issues.length; i++) {
    //create a link element to take users to the issue on GH
    var issueEl = document.createElement("a");
    issueEl.classList = "list item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issues[i].html_url);
    issueEl.setAttribute("target", "_blank");
    //create span to hold issue title
    var titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;
    //append to container
    issueEl.appendChild(titleEl);
    //create type element
    var typeEl = document.createElement("span");
    //check if issue is an issue or pull request
    if (issues[i].pull_request) {
      typeEl.textContent = "(Pull Request)";
    } else {
      typeEl.textContent = "(Issue)";
    }
    //append to container
    issueEl.appendChild(typeEl);
    issueContainerEl.appendChild(issueEl);
  }
};

//padding the user and repo we want to access in getRepoIssues
getRepoIssues("bganser15/coding-quiz");
