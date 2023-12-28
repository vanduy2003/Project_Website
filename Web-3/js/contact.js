let elmBtnContactSubmit = document.querySelector("#btnContactSubmit");
let elmNameInput = document.querySelector("#nameInput");
let elmEmailInput = document.querySelector("#emailInput");
let elmSubjectInput = document.querySelector("#subjectInput");
let elmMessageInput = document.querySelector("#messageInput");
let elmErrorField = document.querySelector("#errorField");
let elmFormContact = document.querySelector(".form-contact");



elmFormContact.addEventListener("change", () =>{
  if(!elmErrorField.classList.contains("d-none")){
    elmErrorField.classList.add("d-none");
  }
})

function validateForm() {
  // Lấy giá trị từ các trường nhập liệu
  const name = elmNameInput.value;
  const email = elmEmailInput.value;
  const subject = elmSubjectInput.value;
  const message = elmMessageInput.value;



  // Kiểm tra các trường nhập liệu
  if (name.trim() === "") {
    elmErrorField.innerHTML = ("Vui lòng nhập Họ Tên.");
    elmErrorField.classList.remove("d-none");
    return false;
  }

  if (email.trim() === "") {
    elmErrorField.innerHTML = ("Vui lòng nhập Email.");
    elmErrorField.classList.remove("d-none");
    return false;
  }

  // Kiểm tra định dạng Email bằng biểu thức chính quy
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    elmErrorField.innerHTML = ("Định dạng Email không hợp lệ.");
    elmErrorField.classList.remove("d-none");
    return false;
  }

  if (subject.trim() === "") {
    elmErrorField.innerHTML = ("Vui lòng nhập Chủ Đề.");
    elmErrorField.classList.remove("d-none");
    return false;
  }

  if (message.trim() === "") {
    elmErrorField.innerHTML = ("Vui lòng nhập Họ Tên.");
    elmErrorField.classList.remove("d-none");
    return false;
  }

  // Nếu mọi thứ hợp lệ, cho phép gửi form
  return true;
}


function sendSuccess() {
  showSuccessModal(
    elmNameInput.value,
    elmMessageInput.value,
    elmEmailInput.value
  );
  elmSubjectInput.value = "";
  elmMessageInput.value = "";
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ...

elmBtnContactSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const dataSend = {
    data: {
      name: elmNameInput.value,
      email: elmEmailInput.value,
      title: elmSubjectInput.value,
      content: elmMessageInput.value,
    },
  };
  if(validateForm()){
    sendQuestion(dataSend);
  }
 
});

function sendQuestion(dataSend) {
  API_NEWS.post("lien-hes", dataSend)
    .then(function (response) {
      console.log(response);
      sendSuccess();
    })
    .catch(function (error) {
      console.log(error);
      // elmErrorField.innerHTML = ("Có lỗi xảy ra khi gửi câu hỏi. Vui lòng thử lại sau.");
    });
}

function showSuccessModal(name, content, email) {
  name, content, (email = "");
  const modalResultBody = document.getElementById("modalResultBody");
  const successMessage = `Cảm ơn ${name} đã gửi câu hỏi cho chúng tôi. Chúng tôi sẽ sớm phản hồi cho bạn qua email ${email}.`;
  modalResultBody.innerHTML = successMessage;
  const modal = new bootstrap.Modal(document.getElementById("modalResult"));
  modal.show();
}
