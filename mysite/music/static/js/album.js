let apiResponse = JSON.parse(localStorage.getItem("apiResponse"));
let responseData = apiResponse ? apiResponse.result[0] : {};

let albumTitle = responseData["專輯名稱"] || "未知專輯";
let albumArtist = responseData["演奏家"] || "未知演奏家";
let albumPrice = responseData["價錢"] || "未知價格";
let albumPlatform = responseData["購買平台"] || "未知平台";
let buyLink = responseData["購買連結"] || "#";

$(".album-title").text(`專輯名稱：${albumTitle}`);
$(".album-artist").text(`演奏家：${albumArtist}`);
$(".album-price").text(`價格：${albumPrice}`);
$(".album-platform").text(`購買平台：${albumPlatform}`);
$(".buy-btn").attr("href", buyLink);

$(".btn-container").on("click", ".startover", () => {
  localStorage.clear();
  window.location.href = "/";
});
