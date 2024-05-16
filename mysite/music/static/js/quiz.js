document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("question").textContent =
    "這是您的第一個問題: 什麼是HTML的全稱？";
});

function submitAnswer() {
  var answer = document.getElementById("answer").value;
  alert("您的答案是: " + answer); // 實際應用中應該將答案發送到服務器進行驗證
}
