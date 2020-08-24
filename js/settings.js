$(document).ready(() => {
  // Getting Last Login Date codes start

  let newDate = new Date();

  let month = newDate.getMonth() + 1;
  let day = newDate.getDate();
  let year = newDate.getFullYear();
  let timeHours = newDate.getHours();
  let timeMinute = newDate.getMinutes();

  let dataText = $(".last-login-info");

  if (localStorage.getItem("lastLoginDate") !== null) {
    let lastLoginMonth = JSON.parse(localStorage.getItem("lastLoginDate"))[
      "Month"
    ];
    let lastLoginDay = JSON.parse(localStorage.getItem("lastLoginDate"))["Day"];
    let lastLoginYear = JSON.parse(localStorage.getItem("lastLoginDate"))[
      "Year"
    ];

    let lastLoginHour = JSON.parse(localStorage.getItem("lastLoginDate"))[
      "TimeHours"
    ];
    let lastLoginMinute = JSON.parse(localStorage.getItem("lastLoginDate"))[
      "TimeMinute"
    ];

    if (0 <= lastLoginMinute && lastLoginMinute <= 10) {
      lastLoginMinute = `0${lastLoginMinute}`;
    }

    if (0 <= lastLoginHour && lastLoginHour <= 10) {
      lastLoginHour = `0${lastLoginHour}`;
    }

    dataText.text(
      ` Son dəyişiklik: ${lastLoginDay} ${lastLoginMonth} ${lastLoginYear} ${lastLoginHour}:${lastLoginMinute}  `
    );
  } else {
    dataText.text(`Profil bölməsinə ilk giriş`);
  }

  switch (month) {
    case 1:
      month = "Yan";
      break;
    case 2:
      month = "Fev";
      break;
    case 3:
      month = "Mar";
      break;
    case 4:
      month = "Apr";
      break;
    case 5:
      month = "May";
      break;
    case 6:
      month = "İyn";
      break;
    case 7:
      month = "İyl";
      break;
    case 8:
      month = "Avq";
      break;
    case 9:
      month = "Sen";
      break;
    case 10:
      month = "Okt";
      break;
    case 11:
      month = "Noy";
      break;
    case 12:
      month = "Dek";
      break;
  }

  let getImg = localStorage.getItem("userImage");
  let imgDiv = $(".img-div");

  if (getImg) {
    $(`<img class="user-img" src="${getImg}" />`).appendTo($(imgDiv));
  } else {
    $(`<img class="user-img" src="images/user.png" />`).appendTo($(imgDiv));
  }

  let buttonSave = $(".save-btn");

  buttonSave.on("click", () => {
    let userNameVal = $("#userName").val();
    let userNumber = $("#userNumber").val();
    let userEmail = $("#userEmail").val();

    if (userNameVal) {
      localStorage.setItem("userName", userNameVal);
    }
    if (userNumber) {
      localStorage.setItem("userNumber", userNumber);
    }
    if (userEmail) {
      localStorage.setItem("userEmail", userEmail);
    }

    let lastLoginObject = {
      Month: month,
      Day: day,
      Year: year,
      TimeHours: timeHours,
      TimeMinute: timeMinute,
    };

    // Getting Last Login Date codes end

    localStorage.setItem("lastLoginDate", JSON.stringify(lastLoginObject));
  });
});
