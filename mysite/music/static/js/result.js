let apiResponse = JSON.parse(localStorage.getItem("apiResponse"));
let responseData = apiResponse ? apiResponse.result[0] : {};

let emotion = responseData["情緒"];
let mbti = responseData["MBTI"];
let composer = responseData["作曲家"] || "未知作曲家";
let player = responseData["演奏家"] || "未知演奏家";
let engSongName = responseData["曲目（英）"] || "未知英文曲名";
let description = responseData["作曲家簡介"] || "";
let ytLink = responseData["YT連結"];
$(".song-name").text(
  `您是 ${emotion}${composer}，依據您的心情我們將推薦給你這首歌 :`
);
$(".author").text(`作曲家為：${composer}`);
$(".player").text(`演奏家為：${player}`);
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
