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
  let addBtn = $(".add-task-btn");
  let mainDiv = $(".main-div");
  let weatherDiv = $(".weather-div");

  if (storedObj) {
    const newObj = JSON.parse(storedObj);

    for (let task in newObj["datas"]) {
      let todo = `
      <div class="row task-line-div">
      <div class="col-md-8 name-of-task">
        <button class="btn btn-primary done-btn">Done</button>
        <span style="margin-left: 0.9rem;"
          >${newObj["datas"][task]}</span
        >
      </div>
      <div class="col-md-4 button">
        <button class="btn btn-primary type-of-button">Approved</button>
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
    let value = $(".form-control").val();

    let todoObj = {
      datas: [],
    };
    if (storedObj) {
      const newObj = JSON.parse(storedObj);
      newObj["datas"].push(value);
      localStorage.setItem("todos", JSON.stringify(newObj));
    } else {
      todoObj["datas"].push(value);
      localStorage.setItem("todos", JSON.stringify(todoObj));
    }

    let todo = `<div class="row task-line-div">
    <div class="col-md-8 name-of-task">
      <button class="btn btn-primary done-btn">Done</button>
      <span style="margin-left: 0.9rem;"
        >${value}</span
      >
    </div>
    <div class="col-md-4 button">
      <button class="btn btn-primary type-of-button">Approved</button>
    </div>
  </div>`;

    $(todo).appendTo(mainDiv);
    $(value).val("");

    location.reload();
  });

  $(".done-btn").on("click", () => {
    let localArr = [];
    let storedObj = JSON.parse(localStorage.getItem("todos"));
    const data = $(event.currentTarget).parent().find("span").text();
    for (let task in storedObj["datas"]) {
      if (data !== storedObj["datas"][task]) {
        localArr.push(storedObj["datas"][task]);
      }
    }
    storedObj["datas"] = localArr;
    localStorage.setItem("todos", JSON.stringify(storedObj));

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

  /*

  if (localStorage.getItem("userName")) {
    $(".user-name-info").text(localStorage.getItem("userName"));
    console.log("YEs");
  } else {
  }
  $(".user-setting").on("click", () => {
    $("#main-section").slideUp(700, () => {
      $(".changeProfileSettingsDiv").slideDown(700, () => {
        $(".changeProfileSettingsDiv").css("display", "flex");
      });
      $("#submitChanges").on("click", () => {
        let newUserNameInput = $("#gettinUserName").val();
        localStorage.setItem("userName", newUserNameInput);
        $("#main-section").slideDown(600, () => {
          location.reload();
        });
      });
    });
  });
  */
});
