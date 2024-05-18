$(".list-group-item").click(function () {
  $(".list-group-item").removeClass("highlighted");
  $(this).addClass("highlighted");
});
