// Getting Weather Degree starts using API and functions

let url = "https://api.openweathermap.org/data/2.5/weather?";
let apiKey = "66661ce8b7e3d9b44e11e712ae164816";

let completeUrl = `${url}q=Baku&appid=${apiKey}`;

fetch(completeUrl)
  .then((response) => response.json())
  .then((data) => getDegree(data));

function getDegree(data) {
  for (let value in data) {
    if (value === "main") {
      localStorage.setItem("weatherdegree", data["main"]["feels_like"]);
    }
  }
}

// Getting Weather Degree ends using API and functions

// Getting SpaceX News starts using API and function

fetch("https://api.spacexdata.com/v4/launches/latest")
  .then((response) => response.json())
  .then((data) => getAdvice(data));

function getAdvice(data) {
  for (let value in data) {
    if (value === "details") {
      localStorage.setItem("detail", data["details"]);
      return data["details"];
    } else if (value === "name") {
      localStorage.setItem("name", data["name"]);
      return data["name"];
    }
  }
}

// Getting SpaceX News using API and function ends

$(document).ready(() => {
  // Button selectors

  let addBtn = $(".add-task-btn");

  // Div selectors

  let mainDiv = $(".main-div");
  let weatherDiv = $(".weather-div");
  let quoteDiv = $(".quote-div");

  // Getting info from Local Storage

  let storedObj = localStorage.getItem("todos");
  let storedRemovedObj = localStorage.getItem("doneItems");
  let detailSpaceX = localStorage.getItem("detail");

  // Getting Date Info codes start
  let d = new Date();
  let dayOfWeek = d.getDay();
  let day = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();
  // Getting Date Info codes end

  // Important functions

  function showItemNumbers() {
    let storedObjects = JSON.parse(localStorage.getItem("todos"));
    let allItemNumber = 0;
    let importantItemNumber = 0;
    let semiimportantItemNumber = 0;
    let notimportantItemNumber = 0;

    if (storedObjects) {
      allItemNumber = storedObjects["datas"].length;
      for (let important in storedObjects["importance"]) {
        if (storedObjects["importance"][important] === "Important") {
          importantItemNumber++;
        } else if (
          storedObjects["importance"][important] === "Semi-Important"
        ) {
          semiimportantItemNumber++;
        } else {
          notimportantItemNumber++;
        }
      }
    }

    let allItemNumbersHTML = `<button class="btn number-btn">${allItemNumber}</button>`;
    let importantNumbersHTML = `<button class="btn number-btn">${importantItemNumber}</button>`;
    let semiimportantNumbersHTML = `<button class="btn number-btn">${semiimportantItemNumber}</button>`;
    let notimportantNumbersHTML = `<button class="btn number-btn">${notimportantItemNumber}</button>`;

    $(allItemNumbersHTML).appendTo($("#all-items"));
    $(importantNumbersHTML).appendTo($("#important-items"));
    $(semiimportantNumbersHTML).appendTo($("#semi-inportant-items"));
    $(notimportantNumbersHTML).appendTo($("#not-important-items"));
  }

  function showDoneItems() {
    $(".task-line-div").remove();

    // let storedTagArr = JSON.parse(storedRemovedObj)["toDo"];
    // let storedToDoArr = JSON.parse(storedRemovedObj)["tag"];

    if (storedRemovedObj) {
      const newObj = JSON.parse(storedRemovedObj);

      for (let i = 0; i < newObj["toDo"].length; i++) {
        let todo = `
        <div class="row task-line-div">
          <div class="col-md-8 name-of-task">
            <span class="name" style="margin-left: 1.5rem;">${i + 1}.  ${
          newObj["toDo"][i]
        }</span>
        <button class="btn btn-primary percentage-btn">${
          newObj["progress"][i]
        }</button>
          </div>
          <div class="col-md-4 button">
            <button id=${
              newObj["tag"][i]
            } class="btn btn-primary type-of-button">
              ${newObj["tag"][i]}
            </button>
          </div>
        </div>`;

        $(todo).appendTo(mainDiv);
      }
    }
  }

  function listByTag() {
    let buttonName = $(event.currentTarget).attr("id");
    let i = 0;

    console.log(buttonName);

    $(".task-line-div").remove();

    let storedTagArr = JSON.parse(storedObj)["tags"];
    let storedToDoArr = JSON.parse(storedObj)["datas"];
    let storedImportanceArr = JSON.parse(storedObj)["importance"];
    let storedProgressArr = JSON.parse(storedObj)["progress"];

    for (tags in storedTagArr) {
      if (buttonName === storedTagArr[tags]) {
        let tagList = `
        <div class="row task-line-div">
        <button class="btn btn-primary done-btn">Done</button>
            <button class="btn btn-primary remove-btn">Remove</button>
        <div class="col-md-8 name-of-task">
          <span style="margin-left: 1rem;" class="name"
            >${storedToDoArr[i]}</span
          >
          <button class="btn btn-primary percentage-btn">${storedProgressArr[i]}</button>
        </div>
        <div class="col-md-4 button">
        <button class="btn btn-primary importance-button" style="left: 180%; position: absolute; bottom: 0.2rem;">${storedImportanceArr[i]}</button>
          <button class="btn btn-primary type-of-button" style="left: 230%; position: absolute; bottom: 0.2rem;">${storedTagArr[tags]}</button>
        </div>
      </div>
      `;

        $(tagList).appendTo(mainDiv);
      }
      i++;
    }
  }

  function listByTagforDone() {
    let buttonName = $(event.currentTarget).attr("id");
    let i = 0;

    console.log(buttonName);

    $(".task-line-div").remove();

    let storedTagArr = JSON.parse(storedRemovedObj)["tag"];
    let storedToDoArr = JSON.parse(storedRemovedObj)["toDo"];

    for (tags in storedTagArr) {
      if (buttonName === storedTagArr[tags]) {
        let tagList = `
      <div class="row task-line-div">
      <div class="col-md-8 name-of-task">
        <span style="margin-left: 1rem;"
          >${storedToDoArr[i]}</span
        >
      </div>
      <div class="col-md-4 button">
        <button class="btn btn-primary type-of-button" style="float: right; right: 4rem">${storedTagArr[tags]}</button>
      </div>
  </div>
      `;

        $(tagList).appendTo(mainDiv);
      }
      i++;
    }
  }

  function done() {
    let localArr = [];
    let tagsLocalArr = [];
    let importanceLocalArr = [];
    let progressLocalArr = [];
    let storedObj = JSON.parse(localStorage.getItem("todos"));
    let removedObj = {
      toDo: [],
      tag: [],
      importance: [],
      progress: [],
    };

    let i = 0;

    const taskData = $(event.currentTarget).parent().find("span").text();

    for (let task in storedObj["datas"]) {
      if (taskData !== storedObj["datas"][task]) {
        localArr.push(storedObj["datas"][task]);
        tagsLocalArr.push(storedObj["tags"][i]);
        importanceLocalArr.push(storedObj["importance"][i]);
        progressLocalArr.push(storedObj["progress"][i]);
        i++;
      } else {
        if (storedRemovedObj) {
          let newObj = JSON.parse(localStorage.getItem("doneItems"));
          newObj["toDo"].push(storedObj["datas"][task]);
          newObj["tag"].push(storedObj["tags"][i]);
          newObj["importance"].push(storedObj["importance"][i]);
          newObj["progress"].push(storedObj["importance"][i]);
          localStorage.setItem("doneItems", JSON.stringify(newObj));
        } else {
          removedObj["toDo"].push(storedObj["datas"][task]);
          removedObj["tag"].push(storedObj["tags"][i]);
          removedObj["importance"].push(storedObj["importance"][i]);
          removedObj["progress"].push(storedObj["progress"][i]);
          localStorage.setItem("doneItems", JSON.stringify(removedObj));
        }
        i++;
      }
    }

    storedObj["datas"] = localArr;
    storedObj["tags"] = tagsLocalArr;
    storedObj["importance"] = importanceLocalArr;
    storedObj["progress"] = progressLocalArr;

    localStorage.setItem("todos", JSON.stringify(storedObj));

    doneAnimation();
  }

  function remove() {
    let localArr = [];
    let tagsLocalArr = [];
    let importanceLocalArr = [];
    let progressLocalArr = [];
    let storedObj = JSON.parse(localStorage.getItem("todos"));

    let i = 0;

    const taskData = $(event.currentTarget).parent().find("span").text();

    for (let task in storedObj["datas"]) {
      if (taskData !== storedObj["datas"][task]) {
        localArr.push(storedObj["datas"][task]);
        tagsLocalArr.push(storedObj["tags"][i]);
        importanceLocalArr.push(storedObj["importance"][i]);
        progressLocalArr.push(storedObj["progress"][i]);
        i++;
      } else {
        i++;
      }
    }

    storedObj["datas"] = localArr;
    storedObj["tags"] = tagsLocalArr;
    storedObj["importance"] = importanceLocalArr;
    storedObj["progress"] = progressLocalArr;

    localStorage.setItem("todos", JSON.stringify(storedObj));
  }

  function doneAnimation() {
    $("#main-section").slideUp(700, () => {
      $(".checked-div").css("display", "flex");
    });
    setTimeout(function () {
      $("#main-section").slideDown(700, function () {
        $(".checked-div").css("display", "none");
      });
    }, 2500);
    setTimeout(function () {
      location.reload();
    }, 3400);
  }

  function listByImportance(importanceDegree) {
    let newObj = JSON.parse(storedObj);

    $(".task-line-div").remove();

    for (let importance in newObj["importance"]) {
      if (importanceDegree === newObj["importance"][importance]) {
        let task = `<div class="row task-line-div">
        <div class="col-md-8 name-of-task">
          <button class="btn btn-primary done-btn">Done</button>
          <button class="btn btn-primary remove-btn">Remove</button>
          <span class="name" style="margin-left: 1.5rem;">${newObj["datas"][importance]}</span>
          <button class="btn btn-primary percentage-btn">${newObj["progress"][importance]}</button>
        </div>
        <div class="col-md-4 button">
        <button class="btn btn-primary importance-button" style="left: 230%; position: absolute; bottom: 0.2rem;">${newObj["importance"][importance]}</button>
          <button id = ${newObj["tags"][importance]} class="btn btn-primary type-of-button">
            ${newObj["tags"][importance]}
          </button>
        </div>
      </div>`;

        $(task).appendTo(mainDiv);
      }
    }
  }

  function changeDetails(taskName) {
    let newTaskName = localStorage.getItem("newTaskName");
    let newTagName = localStorage.getItem("newTagName");
    let newImportanceDegree = localStorage.getItem("newImportanceDegree");
    let newProgress = localStorage.getItem("newProgress");

    let localArr = [];
    let tagsLocalArr = [];
    let importanceLocalArr = [];
    let progressLocalArr = [];
    let storedObj = JSON.parse(localStorage.getItem("todos"));

    let i = 0;

    for (let task in storedObj["datas"]) {
      if (taskName !== storedObj["datas"][task]) {
        localArr.push(storedObj["datas"][task]);
        tagsLocalArr.push(storedObj["tags"][i]);
        importanceLocalArr.push(storedObj["importance"][i]);
        progressLocalArr.push(storedObj["progress"][i]);
        i++;
      } else {
        localArr.push(newTaskName);
        tagsLocalArr.push(newTagName);
        importanceLocalArr.push(newImportanceDegree);
        progressLocalArr.push(newProgress);
        i++;
      }
    }

    storedObj["datas"] = localArr;
    storedObj["tags"] = tagsLocalArr;
    storedObj["importance"] = importanceLocalArr;
    storedObj["progress"] = progressLocalArr;

    localStorage.setItem("todos", JSON.stringify(storedObj));
  }

  $("#slider").roundSlider({
    animation: true,
    editableTooltip: false,

    radius: 75,
    width: 14,
    handleSize: "24,12",
    handleShape: "square",
    sliderType: "min-range",
    value: 0,
  });

  if (storedObj) {
    const newObj = JSON.parse(storedObj);

    for (let i = 0; i < newObj["datas"].length; i++) {
      let todo = `
      <div class="row task-line-div">
              <div class="col-md-8 name-of-task">
                <button class="btn btn-primary done-btn">Done</button>
                <button class="btn btn-primary remove-btn">Remove</button>
                <span class="name" style="margin-left: 1.5rem;">${newObj["datas"][i]}</span>
                <button class="btn btn-primary edit-btn">
                        <i class="far fa-edit"></i>
                      </button>
                <button class="btn btn-primary percentage-btn">${newObj["progress"][i]}</button>
                
              </div>
              <div class="col-md-4 button">
                <button class="btn btn-primary importance-button" style="margin-right: 5rem">${newObj["importance"][i]}</button>
                <button id=${newObj["tags"][i]} class="btn btn-primary type-of-button" >
                ${newObj["tags"][i]}
                </button>
              </div>
            </div>`;

      $(todo).appendTo(mainDiv);
    }
  }

  showItemNumbers();

  quoteDiv.append(`<span class="advice-div-span">${detailSpaceX}</span>`); // Output SpaceX news data

  // Weather icon details

  let sunIcon = "fa-sun";
  let cloudIcon = "fa-cloud";

  // Finding Weather Degree

  // Showing User Profile Image

  let userImgDiv = $(".profile-div");

  let img;

  if (localStorage.getItem("userImage")) {
    img = `<img src="${localStorage.getItem("userImage")}" />`;
  } else {
    img = `<img src="images/user.png">`;
  }

  userImgDiv.append(img);

  // Icons and Weather Degree

  let icon = new String();

  let weatherDegree = Math.round(localStorage.getItem("weatherdegree")) - 272;

  if (weatherDegree >= 25) {
    icon = sunIcon;
  } else if (15 > weatherDegree && weatherDegree < 25) {
    icon = cloudIcon;
  }

  // Switching numbers to Month and Weekday

  switch (dayOfWeek) {
    case 1:
      dayOfWeek = "Bazar Ertəsi";
      break;
    case 2:
      dayOfWeek = "Çərşənbə Axşamı";
      break;
    case 3:
      dayOfWeek = "Çərşənbə";
      break;
    case 4:
      dayOfWeek = "Cümə Axşamı";
      break;
    case 5:
      dayOfWeek = "Cümə";
      break;
    case 6:
      dayOfWeek = "Şənbə";
      break;
    case 0:
      dayOfWeek = "Bazar";
      break;
  }

  switch (month) {
    case 1:
      month = "Yanvar";
      break;
    case 2:
      month = "Fevral";
      break;
    case 3:
      month = "Mart";
      break;
    case 4:
      month = "Aprel";
      break;
    case 5:
      month = "May";
      break;
    case 6:
      month = "Iyun";
      break;
    case 7:
      month = "Iyul";
      break;
    case 8:
      month = "Avqust";
      break;
    case 9:
      month = "Sentyabr";
      break;
    case 10:
      month = "Oktyabr";
      break;
    case 11:
      month = "Noyabr";
      break;
    case 12:
      month = "Dekabr";
      break;
  }

  weatherDiv.append(`<p class="time-cls">${dayOfWeek}</p>
  <p>${day} ${month} ${year}</p>
  <i class="fas ${icon}"></i>
  <p class="degree-cls">${weatherDegree}°C</p>
  <p class="weather-form-cls">Aydın</p>`);

  // On click button method's codes start

  $(".done-items-btn").on("click", () => {
    showDoneItems();

    $(".type-of-button").on("click", () => {
      listByTagforDone();
    });
  });

  // Add Button codes

  addBtn.on("click", () => {
    let value = $(".task-input").val();
    let tagInput = $(".tag-input").val();
    let importanceInput = $("#importanceSelection option:selected").text();

    let todoObj = {
      datas: [],
      tags: [],
      importance: [],
      progress: [],
    };

    if (storedObj) {
      const newObj = JSON.parse(storedObj);
      newObj["datas"].push(value);
      newObj["tags"].push(tagInput);
      newObj["importance"].push(importanceInput);
      newObj["progress"].push(0);
      localStorage.setItem("todos", JSON.stringify(newObj));
    } else {
      todoObj["datas"].push(value);
      todoObj["tags"].push(tagInput);
      todoObj["importance"].push(importanceInput);
      todoObj["progress"].push(0);
      localStorage.setItem("todos", JSON.stringify(todoObj));
    }

    location.reload();
  });

  $(".type-of-button").on("click", () => {
    listByTag();

    $(".done-btn").on("click", () => {
      done();
      doneAnimation();
    });
    $(".remove-btn").on("click", () => {
      remove();
      location.reload();
    });
  });

  $(".remove-btn").on("click", () => {
    remove();
    location.reload();
  });

  $(".done-btn").on("click", () => {
    done();
  });

  $("#all").on("click", () => location.reload());

  $(".importance-letter-btn").on("click", () => {
    let buttonId = $(event.currentTarget).attr("id");

    listByImportance(buttonId);

    $(".remove-btn").on("click", () => {
      remove();
      location.reload();
    });

    $(".done-btn").on("click", () => {
      done();
    });
  });

  // Adding edit button when cursor on the task line

  $(".task-line-div").hover(
    function () {
      let oldTaskName = $(".name-of-task", event.currentTarget)
        .parent()
        .find($(".name"))
        .text();
      let oldTagName = $(".button", event.currentTarget)
        .parent()
        .find(".type-of-button")
        .attr("id");
      let oldImportance = $(".button", event.currentTarget)
        .find(".importance-button")
        .text();
      $(".edit-btn", event.currentTarget).css("display", "unset");
      $(".edit-btn", event.currentTarget).on("click", () => {
        $(".edit-section > .container").css("display", "unset");
        $(".overlay").css("display", "unset");

        $(".save-btn").on("click", () => {
          let newTagName = $("#tagName").val();
          let newTaskName = $("#taskName").val();
          let newImportance = $("#importanceSelection2").val();
          let newProgress = $(".rs-tooltip-text").text();

          if (newTagName) {
            localStorage.setItem("newTagName", newTagName);
          } else {
            localStorage.setItem("newTagName", oldTagName);
          }
          if (newTaskName) {
            localStorage.setItem("newTaskName", newTaskName);
          } else {
            localStorage.setItem("newTaskName", oldTaskName);
          }
          if (newImportance) {
            localStorage.setItem("newImportanceDegree", newImportance);
          } else {
            localStorage.setItem("newImportanceDegree", oldImportance);
          }

          if (newProgress > 0) {
            localStorage.setItem("newProgress", newProgress);
          }

          $(".edit-section > .container").css("display", "none");
          $(".overlay").css("display", "none");

          changeDetails(oldTaskName);

          location.reload();
        });
      });
    },
    function () {
      $(".edit-btn").css("display", "none");
    }
  );

  // On click button method's codes end

  // Getting Profile details codes start

  let userName = localStorage.getItem("userName");
  let userEmail = localStorage.getItem("userEmail");
  let userNumber = localStorage.getItem("userNumber");

  if (userName) {
    $(".user-name-info").text(userName);
  } else {
    $(".user-name-info").text("Name Surname");
  }
  if (userEmail) {
    $(".user-mail-info").text(userEmail);
  } else {
    $(".user-mail-info").text("user@mail.com");
  }
  if (userNumber) {
    $(".user-number-info").text(userNumber);
  } else {
    $(".user-number-info").text("User Number");
  }

  // Getting Profile details codes end
});
