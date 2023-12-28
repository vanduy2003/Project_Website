let elmAccordionFaq = document.querySelector("#accordionFaq");
let elmToppicId = document.querySelector("#toppicId");
let elmTtnQuestionSubmit = document.querySelector("#btnQuestionSubmit");
let elmModalSendQuetions = new bootstrap.Modal("#modalSendQuetions", {
  keyboard: false,
});
let isSubmitCompleted = false;
let btnQuestionSubmit = document.getElementById("btnQuestionSubmit");


function waitsubmit(){
  btnQuestionSubmit.classList.add("loading");
  setTimeout(() => {
    btnQuestionSubmit.classList.remove("loading");
    isSubmitCompleted = true; 
    sendSuccess();
    btnQuestionSubmit.disabled = false; 
  }, 1500);
}



elmToppicId.addEventListener("change", () => {
  getDataFaq(elmToppicId.value);
});

function sendSuccess() {
  if (!isSubmitCompleted) {
    return;
  }
  const name = $("#nameInput").val();
  const email = $("#emailInput").val();
  const content = $("#contentInput").val();
  elmModalSendQuetions.hide();
  showSuccessModal(name, content, email);
  isSubmitCompleted = false;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ...

elmTtnQuestionSubmit.addEventListener("click", () => {
  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");
  const contentInput = document.getElementById("contentInput");

  const name = nameInput.value;
  const email = emailInput.value;
  const toppicId = $("#topicIdInput").val();
  const content = contentInput.value;

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const contentError = document.getElementById("contentError");
  if (btnQuestionSubmit.disabled) {
    return; // Nếu nút đã bị disable, không thực hiện bất kỳ hành động gì
  }
  if (!name) {
    nameInput.classList.add("is-invalid");
    nameError.style.display = "block";
  } else {
    nameInput.classList.remove("is-invalid");
    nameError.style.display = "none";
  }

  if (!email) {
    emailInput.classList.add("is-invalid");
    emailError.textContent = "Vui lòng nhập địa chỉ email.";
    emailError.style.display = "block";
  } else if (!isValidEmail(email)) {
    emailInput.classList.add("is-invalid");
    emailError.textContent = "Địa chỉ email không hợp lệ.";
    emailError.style.display = "block";
  } else {
    emailInput.classList.remove("is-invalid");
    emailError.style.display = "none";
  }

  if (!content) {
    contentInput.classList.add("is-invalid");
    contentError.style.display = "block";
  } else {
    contentInput.classList.remove("is-invalid");
    contentError.style.display = "none";
  }

  if (!name || !email || !content) {
    return;
  }
  waitsubmit();

  const dataSend = {
    data: {
      nameQuestion: name,
      question: content,
      email: email,
      topic: toppicId,
    },
  };

  sendQuestion(toppicId, dataSend);
});

function sendQuestion(id, dataSend) {
  API_NEWS.post("hoi-daps", dataSend)
    .then(function (response) {
      console.log(response);
      sendSuccess();
    })
    .catch(function (error) {
      console.log(error);
      // alert("Có lỗi xảy ra khi gửi câu hỏi. Vui lòng thử lại sau.");
    });
}

function getDataFaq(topic) {
  return API_NEWS.get(`hoi-daps`, {
    params: {
      filters: {
        active: {
          $eq: true,
        },
        topic: {
          $eq: topic,
        },
      },
      populate: "*",
    },
  })
    .then((response) => {
      console.log(response.data.data);
      renderFaqData(response.data.data);
      // renderPostNews(response.data.data);
      // lastPage = response.data.meta.pagination.pageCount;
      // renderPaginationButton(page);
      // statusButton();
      // return response;
    })
    .catch((error) => {
      console.log(error);
    });
}

function renderFaqData(data) {
  let str = "";
  for (let i = 0; i < data.length; i++) {
    str += `
      <div class="accordion-item">
      <h2 class="accordion-header" id="flush-heading${data[i].id}">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${data[i].id}" aria-expanded="false" aria-controls="flush-collapse${data[i].id}">
        ${data[i].attributes.nameQuestion}: <br>
        ${data[i].attributes.question}
        </button>
      </h2>
      <div id="flush-collapse${data[i].id}" class="accordion-collapse collapse" aria-labelledby="flush-heading${data[i].id}" data-bs-parent="#accordionFaq">
      <div class="accordion-body">
      Trả lời: <br>
      ${data[i].attributes.answer}
      </div>
      </div>
    </div>
          `;
  }
  elmAccordionFaq.innerHTML = str;
}

function showSuccessModal(name, content, email) {
  const modalResultBody = document.getElementById("modalResultBody");
  const successMessage = `Cảm ơn ${name} đã gửi câu hỏi cho chúng tôi. Chúng tôi sẽ sớm phản hồi cho bạn qua email ${email}.`;
  modalResultBody.innerHTML = successMessage;
  const modal = new bootstrap.Modal(document.getElementById("modalResult"));
  modal.show();
}

// nhận dạng text không dấu
function removeDiacritics(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// tìm kiếm câu hỏi trong accordion-button
$(document).ready(function () {
  $("#searchInput").on("input", function () {
    let searchValue = removeDiacritics($(this).val().toLowerCase());
    $(".accordion-item").each(function () {
      let questionText = removeDiacritics(
        $(this).find(".accordion-button").text().toLowerCase()
      );
      if (questionText.includes(searchValue)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
});

getDataFaq(elmToppicId.value);

