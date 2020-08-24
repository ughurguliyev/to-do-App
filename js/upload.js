var feedback = function (res) {
  if (res.success === true) {
    var get_link = res.data.link.replace(/^http:\/\//i, "https://");

    localStorage.setItem("userImage", get_link);
  }
};

new Imgur({
  clientid: "8dc92fe93087062",
  callback: feedback,
});
