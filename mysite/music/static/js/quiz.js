let answers = [];
$(".list-group-item").click(function () {
  $(".list-group-item").removeClass("highlighted");
  $(this).addClass("highlighted");
});

$.ajax({
  url: "/api/questions",
  method: "GET",
  success: function (data) {
    localStorage.setItem("questions", JSON.stringify(data));
    displayQuestion(0);
  },
  error: function (error) {
    console.error("Error fetching questions:", error);
  },
});

function displayQuestion(index) {
  let questions = JSON.parse(localStorage.getItem("questions"));
  $(".list-group-item").removeClass("highlighted");
  if (questions && questions.length > index) {
    $(".card-text").text(questions[index]);
    $(".card-header").text(`第 ${index + 1} 題`);
    localStorage.setItem("currentQuestionIndex", index);
  } else if (index === questions.length) {
    $(".card-text").text("您此刻的心情偏向？");
    $(".card-header").text("最後一題");
    $(".list-group").html(`
      <li class="list-group-item">快樂</li>
      <li class="list-group-item">悲傷</li>
      <li class="list-group-item">興奮</li>
      <li class="list-group-item">憤怒</li>
    `);

    localStorage.setItem("currentQuestionIndex", index);
    $(".control-btn").hide();
    $(".card-body").append(
      '<button class="btn btn-secondary submit-btn">送出答案</button>'
    );
  }
}

$(".card-body").on("click", ".control-btn", function () {
  let currentIndex =
    parseInt(localStorage.getItem("currentQuestionIndex")) || 0;
  let selectedOption = $(".highlighted").index();
  if (selectedOption === -1) {
    alert("請選擇一個選項！");
  } else {
    if (selectedOption === 0) {
      answers.push(1);
    } else {
      answers.push(0);
    }
    displayQuestion(currentIndex + 1);
  }
});

$(".list-group").on("click", ".list-group-item", function () {
  $(".list-group-item").removeClass("highlighted");
  $(this).addClass("highlighted");
});

$(".card-body").on("click", ".submit-btn", function () {
  let selectedMood = $(".list-group-item.highlighted").index();
  if (selectedMood === -1) {
    alert("請選擇一個選項！");
  } else {
    answers.push(selectedMood + 1);
    console.log(answers);

    $.ajax({
      url: "/api/checkanswer",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ answers: answers }),
      success: function (response) {
        console.log("API response:", response);
        localStorage.setItem("apiResponse", JSON.stringify(response));
        window.location.href = "/result";
      },
      error: function (xhr, status, error) {
        console.error(error);
      },
    });
  }
});
