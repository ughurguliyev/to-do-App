// First User Info

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
  let storedObj = localStorage.getItem("todos");
  let storedRemovedObj = localStorage.getItem("doneItems");
  let addBtn = $(".add-task-btn");
  let mainDiv = $(".main-div");
  let weatherDiv = $(".weather-div");

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
            <span style="margin-left: 1.5rem;">${i + 1}.  ${
          newObj["toDo"][i]
        }</span>
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

  $(".done-items-btn").on("click", () => {
    showDoneItems();

    $(".type-of-button").on("click", () => {
      listByTagforDone();
    });
  });

  function listByTag() {
    let buttonName = $(event.currentTarget).attr("id");
    let i = 0;

    console.log(buttonName);

    $(".task-line-div").remove();

    let storedTagArr = JSON.parse(storedObj)["tags"];
    let storedToDoArr = JSON.parse(storedObj)["datas"];

    for (tags in storedTagArr) {
      if (buttonName === storedTagArr[tags]) {
        let tagList = `
      <div class="row task-line-div">
      <button class="btn btn-primary done-btn">Done</button>
          <button class="btn btn-primary remove-btn">Remove</button>
      <div class="col-md-8 name-of-task">
        <span style="margin-left: 1rem;"
          >${storedToDoArr[i]}</span
        >
      </div>
      <div class="col-md-4 button">
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
    let storedObj = JSON.parse(localStorage.getItem("todos"));

    let removedObj = {
      toDo: [],
      tag: [],
    };

    let i = 0;

    const taskData = $(event.currentTarget).parent().find("span").text();

    for (let task in storedObj["datas"]) {
      if (taskData !== storedObj["datas"][task]) {
        localArr.push(storedObj["datas"][task]);
        tagsLocalArr.push(storedObj["tags"][i]);
        i++;
      } else {
        if (storedRemovedObj) {
          let newObj = JSON.parse(localStorage.getItem("doneItems"));
          newObj["toDo"].push(storedObj["datas"][task]);
          newObj["tag"].push(storedObj["tags"][i]);
          localStorage.setItem("doneItems", JSON.stringify(newObj));
        } else {
          removedObj["toDo"].push(storedObj["datas"][task]);
          removedObj["tag"].push(storedObj["tags"][i]);
          localStorage.setItem("doneItems", JSON.stringify(removedObj));
        }
        i++;
      }
    }

    storedObj["datas"] = localArr;
    storedObj["tags"] = tagsLocalArr;

    localStorage.setItem("todos", JSON.stringify(storedObj));
  }

  function remove() {
    let localArr = [];
    let tagsLocalArr = [];
    let storedObj = JSON.parse(localStorage.getItem("todos"));

    let i = 0;

    const taskData = $(event.currentTarget).parent().find("span").text();

    for (let task in storedObj["datas"]) {
      if (taskData !== storedObj["datas"][task]) {
        localArr.push(storedObj["datas"][task]);
        tagsLocalArr.push(storedObj["tags"][i]);
        i++;
      } else {
        i++;
      }
    }

    storedObj["datas"] = localArr;
    storedObj["tags"] = tagsLocalArr;

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

  if (storedObj) {
    const newObj = JSON.parse(storedObj);

    for (let i = 0; i < newObj["datas"].length; i++) {
      let todo = `
      <div class="row task-line-div">
        <div class="col-md-8 name-of-task">
          <button class="btn btn-primary done-btn">Done</button>
          <button class="btn btn-primary remove-btn">Remove</button>
          <span style="margin-left: 1.5rem;">${newObj["datas"][i]}</span>
        </div>
        <div class="col-md-4 button">
          <button id=${newObj["tags"][i]} class="btn btn-primary type-of-button">
            ${newObj["tags"][i]}
          </button>
        </div>
      </div>`;

      $(todo).appendTo(mainDiv);
    }
  }

  // Getting Date Info codes start

  let d = new Date();
  let dayOfWeek = d.getDay();
  let day = d.getDate();
  let month = d.getMonth() + 1;

  let year = d.getFullYear();

  // Getting Date Info codes end

  let detailSpaceX = localStorage.getItem("detail");

  // Weather icon details

  let sunIcon = "fa-sun";
  let rainIcon = "fa-cloud-rain";
  let cloudIcon = "fa-cloud";

  // Finding Weather Degree

  let userImgDiv = $(".profile-div");

  let img;

  if (localStorage.getItem("userImage")) {
    img = `<img src="${localStorage.getItem("userImage")}" />`;
  } else {
    img = `<img src="images/user.png">`;
  }

  userImgDiv.append(img);

  let icon = new String();

  let weatherDegree = Math.round(localStorage.getItem("weatherdegree")) - 272;

  if (weatherDegree >= 25) {
    icon = sunIcon;
  } else if (weatherDegree < 25 && weatherDegree > 15) {
    icon = cloudIcon;
  }

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
      month = "January";
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
  <p class="weather-form-cls">Əsasən aydın</p>`);

  addBtn.on("click", () => {
    let value = $(".task-input").val();
    let tagInput = $(".tag-input").val();

    let todoObj = {
      datas: [],
      tags: [],
    };

    if (storedObj) {
      const newObj = JSON.parse(storedObj);
      newObj["datas"].push(value);
      newObj["tags"].push(tagInput);
      localStorage.setItem("todos", JSON.stringify(newObj));
    } else {
      todoObj["datas"].push(value);
      todoObj["tags"].push(tagInput);
      localStorage.setItem("todos", JSON.stringify(todoObj));
    }

    let todo = `<div class="row task-line-div">
    <div class="col-md-8 name-of-task">
      <button class="btn btn-primary done-btn">Done</button>
      <button class="btn btn-primary remove-btn">Remove</button>
      <span style="margin-left: 1.5rem;">${value}</span>
    </div>
    <div class="col-md-4 button">
      <button id = ${tagInput} class="btn btn-primary type-of-button">
        ${tagInput}
      </button>
    </div>
  </div>`;

    $(todo).appendTo(mainDiv);
    $(value).val("");

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
    doneAnimation();
  });

  $(".quote-div").append(
    `<span class="advice-div-span">${detailSpaceX}</span>`
  );

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
});
