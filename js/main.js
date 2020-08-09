// Getting Weather Degree starts using API and functions

let url = "http://api.openweathermap.org/data/2.5/weather?";
let apiKey = "66661ce8b7e3d9b44e11e712ae164816";

let completeUrl = `${url}q=Baku&appid=${apiKey}`;

fetch(completeUrl)
  .then((response) => response.json())
  .then((data) => getDegree(data));

function getDegree(data) {
  for (let value in data) {
    if (value === "main") {
      localStorage.setItem("weatherdegree", data["main"]["feels_like"]);
      return data["main"]["feels_like"];
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

  let advice = localStorage.getItem("advice");

  let d = new Date();
  let dayOfWeek = d.getDay();
  let dayOfWeekWord = new String();
  let day = d.getDate();
  let month = d.getMonth() + 1;
  let monthByName = new String();
  let year = d.getFullYear();

  let sunIcon = "fa-sun";
  let rainIcon = "fa-cloud-rain";
  let cloudIcon = "fa-cloud";

  // Finding Weather Degree

  let icon = new String();

  console.log(dayOfWeek);

  let weatherDegree = Math.round(localStorage.getItem("weatherdegree")) - 272;

  console.log(weatherDegree);

  if (weatherDegree > 25) {
    icon = sunIcon;
  } else if (weatherDegree < 25 && weatherDegree > 15) {
    icon = cloudIcon;
  }

  switch (dayOfWeek) {
    case 1:
      dayOfWeekWord = "Bazar Ertəsi";
      break;
    case 2:
      dayOfWeekWord = "Çərşənbə Axşamı";
      break;
    case 3:
      dayOfWeekWord = "Çərşənbə";
      break;
    case 4:
      dayOfWeekWord = "Cümə Axşamı";
      break;
    case 5:
      dayOfWeekWord = "Cümə";
      break;
    case 6:
      dayOfWeekWord = "Şənbə";
      break;
    case 0:
      dayOfWeekWord = "Bazar";
      break;
  }

  switch (month) {
    case 1:
      monthByName = "January";
      break;
    case 2:
      monthByName = "Fevral";
      break;
    case 3:
      monthByName = "Mart";
      break;
    case 4:
      monthByName = "Aprel";
      break;
    case 5:
      monthByName = "May";
      break;
    case 6:
      monthByName = "Iyun";
      break;
    case 7:
      monthByName = "Iyul";
      break;
    case 8:
      monthByName = "Avqust";
      break;
    case 9:
      monthByName = "Sentyabr";
      break;
    case 10:
      monthByName = "Oktyabr";
      break;
    case 11:
      monthByName = "Noyabr";
      break;
    case 12:
      monthByName = "Dekabr";
      break;
  }

  weatherDiv.append(`<p class="time-cls">${dayOfWeekWord}</p>
  <p>${day} ${monthByName} ${year}</p>
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

  $(".quote-div").append(`<span class="advice-div-span">${advice}</span>`);
});
