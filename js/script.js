/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
const itemsPerPage = 9;

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(array, page) {
  const studentList = document.querySelector(".student-list");
  const start = page * itemsPerPage - itemsPerPage;
  const end = page * itemsPerPage - 1;
  for (let i = 0; i < array.length; i++) {
    if (i >= start && i <= end) {
      const showData = array[i];

      const liContainer = document.createElement("li");

      const studentDetails = document.createElement("div");
      studentDetails.classList.add("student-item", "cf");

      const imgEl = document.createElement("img");
      imgEl.classList.add("avatar");
      imgEl.setAttribute("src", showData.picture.large);
      imgEl.setAttribute("alt", `Profile Picture of ${showData.name}`);

      const nameEl = document.createElement("h3");
      nameEl.innerHTML = `${showData.name.title}. ${showData.name.first} ${showData.name.last}`;

      const emailEl = document.createElement("span");
      emailEl.classList.add("email");
      emailEl.innerText = `${showData.email}`;
      studentDetails.append(imgEl, nameEl, emailEl);

      const joinedDetails = document.createElement("div");
      joinedDetails.classList.add("joined-details");

      const dateJoinedEl = document.createElement("span");
      dateJoinedEl.classList.add("date");
      dateJoinedEl.innerText = `Joined ${showData.registered.date}`;
      joinedDetails.append(dateJoinedEl);

      liContainer.append(studentDetails, joinedDetails);

      studentList.append(liContainer);
    }
  }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(array) {
  const paginationContainer =
    document.getElementsByClassName("js-page-container")[0];
  const buttonsNeeded = Math.ceil(array.length / itemsPerPage);
  for (let i = 0; i < buttonsNeeded; i++) {
    const listEl = document.createElement("li");
    const buttonEl = document.createElement("button");
    buttonEl.setAttribute("type", "button");
    buttonEl.innerText = `${i + 1}`;
    listEl.appendChild(buttonEl);
    paginationContainer.appendChild(listEl);
  }
}

// Call functions
addPagination(data);
showPage(data, 1);
