let apiResponse = JSON.parse(localStorage.getItem("apiResponse"));
let responseData = apiResponse.result[0];
console.log(responseData);

let composer = responseData["作曲家"] || "未知作曲家";
let engSongName = responseData["曲目（英）"] || "未知英文曲名";
let chSongName = responseData["曲目（中）"] || "未知中文曲名";
let description = responseData["作曲家簡介"] || "";
let ytLink = responseData["YT連結"];

$(".author").text(`作曲家為：${composer}`);
$(".eng-song-name").text(`英文曲名：${engSongName}`);
$(".ch-song-name").text(`中文取名：${chSongName}`);
$(".credits-text").text(description);
$(".video-container").html(ytLink);
