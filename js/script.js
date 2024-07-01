/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
const paginationContainer = document.querySelector(".js-page-container");
const studentListContainer = document.querySelector(".student-list");
const itemsPerPage = 9;

// Displays students into the container
function showPage(array, page) {
  studentListContainer.innerHTML = ``;
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

      studentListContainer.append(liContainer);
    }
  }
}

// Added number of buttons
function addPagination(array) {
  paginationContainer.innerHTML = ``;
  const buttonsNeeded = Math.ceil(array.length / itemsPerPage);
  for (let i = 0; i < buttonsNeeded; i++) {
    const listEl = document.createElement("li");
    const buttonEl = document.createElement("button");
    buttonEl.setAttribute("type", "button");
    buttonEl.innerText = `${i + 1}`;
    listEl.appendChild(buttonEl);
    paginationContainer.appendChild(listEl);
  }

  const firstButton = paginationContainer.querySelector("button");
  firstButton.classList.add("active");
  //   Adds event listener to change displayed page
  paginationContainer.addEventListener("click", (e) => {
    closestButton = e.target.closest("button");
    if (closestButton) {
      const currentActiveButton = document.querySelector(".active");
      currentActiveButton.classList.remove("active");
      closestButton.classList.add("active");
      studentListContainer.innerHTML = ``;
      showPage(array, closestButton.innerHTML);
    }
  });
}

//Add searchbar
const header = document.querySelector("header");

const label = document.createElement("label");
label.setAttribute("for", "search");
label.classList.add("student-search");

const inputName = document.createElement("span");
inputName.innerText = "Search by name";

const input = document.createElement("input");
input.id = "search";
input.setAttribute("placeholder", "Search by name...");

const inputButton = document.createElement("button");
inputButton.setAttribute("type", "button");

const buttonImg = document.createElement("img");
buttonImg.setAttribute("src", "img/icn-search.svg");
buttonImg.setAttribute("alt", "Search icon");
inputButton.append(buttonImg);

label.append(inputName, input, inputButton);

header.appendChild(label);

// Filter classlist with user input
const inputBar = document.querySelector("input");
inputBar.addEventListener("keyup", () => {
  const filteredData = [];
  const userInput = inputBar.value.toLowerCase();

  for (let i = 0; i < data.length; i++) {
    const student = data[i];
    const studentName =
      `${student.name.title}. ${student.name.first} ${student.name.last}`.toLowerCase();
    if (studentName.includes(userInput)) {
      filteredData.push(student);
    }

    if (filteredData.length > 0) {
      addPagination(filteredData);
      showPage(filteredData, 1);
    } else {
      studentListContainer.innerText = `No results found`;
      paginationContainer.innerHTML = "";
    }
  }
});

// Call functions
addPagination(data);
showPage(data, 1);
