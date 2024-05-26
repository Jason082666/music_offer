let apiResponse = JSON.parse(localStorage.getItem("apiResponse"));
let responseData = apiResponse ? apiResponse.result[0] : {};


let composer = responseData["作曲家"] || "未知作曲家";
let engSongName = responseData["曲目（英）"] || "未知英文曲名";
let description = responseData["作曲家簡介"] || "";
let ytLink = responseData["YT連結"];

$(".author").text(`作曲家為：${composer}`);
$(".eng-song-name").text(`曲名：${engSongName}`);
$(".credits-text").text(description);
$(".video-container").html(ytLink);
$(".btn-container").on("click", ".startover", () => {
  localStorage.clear();
  window.location.href = "/";
});

$(".btn-container").on("click", ".buy-btn", () => {
  window.location.href = "/album";
});
