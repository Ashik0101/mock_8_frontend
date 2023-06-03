const url = "https://mock-8-76ah.onrender.com/user";

let loginDiv = document.querySelector(".login");
let signupDiv = document.querySelector(".signup");
let confirmPass = document.querySelectorAll(".confirm_password");

let loginButton = document.getElementById("login-btn-div");
let signupButton = document.getElementById("signup-btn-div");
loginDiv.addEventListener("click", () => {
  loginButton.style.display = "block";
  signupButton.style.display = "none";
  confirmPass.forEach((el) => {
    el.style.display = "none";
  });
});
signupDiv.addEventListener("click", () => {
  loginButton.style.display = "none";
  signupButton.style.display = "block";
  confirmPass.forEach((el) => {
    el.style.display = "flex";
  });
});

signupButton.addEventListener("click", () => {
  let payload = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    confirm_password: document.getElementById("confirm_pass").value,
  };

  postSignupCredentials(payload);
});
function postSignupCredentials(payload) {
  fetch(`${url}/signup`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      alert(res.msg);
      if (res.msg == "Registration Successfull!") {
        loginButton.style.display = "block";
        signupButton.style.display = "none";
        confirmPass.forEach((el) => {
          el.style.display = "none";
        });
      }
    })
    .catch((err) => {
      console.log("some error while posting signup credentials :", err);
    });
}

loginButton.addEventListener("click", () => {
  let payload = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  postLoginCredentials(payload);
});

function postLoginCredentials(payload) {
  fetch(`${url}/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.msg == "Login Successfull") {
        localStorage.setItem("token", res.token);
        alert(res.msg);
        window.location.href = "postData.html";
      }
    })
    .catch((err) => {
      console.log("some error while posting login credentials :", err);
    });
}
