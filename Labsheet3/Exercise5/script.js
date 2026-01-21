let currentStage = 1;

// Temporary storage for user inputs
let userData = {
  name: "",
  age: "",
  email: "",
  phone: "",
  password: "",
  address: ""
};

// Show first stage initially
showStage(1);

// ------------------------------
// FUNCTION: SHOW STAGE
// ------------------------------
function showStage(num) {
  document.querySelectorAll(".stage").forEach(s => s.style.display = "none");
  document.getElementById("stage" + num).style.display = "block";

  updateProgress(num);
}

// ------------------------------
// PROGRESS BAR UPDATE
// ------------------------------
function updateProgress(stage) {
  let percentage = (stage - 1) * 33;
  document.getElementById("progressBar").style.width = percentage + "%";
}

// ------------------------------
// VALIDATION FOR EACH STAGE
// ------------------------------
function nextStage(stage) {
  if (validate(stage)) {
    currentStage = stage + 1;
    showStage(currentStage);
  }
}

function prevStage(stage) {
  currentStage = stage - 1;
  showStage(currentStage);
}

// ------------------------------
// STAGE VALIDATIONS
// ------------------------------
function validate(stage) {

  // Clear previous error
  document.getElementById("err" + stage).textContent = "";

  // STAGE 1 VALIDATION
  if (stage === 1) {
    let name = document.getElementById("name").value.trim();
    let age = document.getElementById("age").value;

    if (name === "" || age <= 0) {
      document.getElementById("err1").textContent = "Please enter valid name and age.";
      return false;
    }

    userData.name = name;
    userData.age = age;
  }

  // STAGE 2 VALIDATION
  if (stage === 2) {
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;

    if (!email.includes("@") || phone.length < 10) {
      document.getElementById("err2").textContent = "Enter valid email & phone.";
      return false;
    }

    userData.email = email;
    userData.phone = phone;
  }

  // STAGE 3 VALIDATION
  if (stage === 3) {
    let pass = document.getElementById("password").value;
    let cpass = document.getElementById("confirmPassword").value;

    if (pass.length < 6) {
      document.getElementById("err3").textContent = "Password must be at least 6 characters.";
      return false;
    }

    if (pass !== cpass) {
      document.getElementById("err3").textContent = "Passwords do not match.";
      return false;
    }

    userData.password = pass;
  }

  // STAGE 4 VALIDATION
  if (stage === 4) {
    let address = document.getElementById("address").value.trim();

    if (address.length < 5) {
      document.getElementById("err4").textContent = "Address must be at least 5 characters.";
      return false;
    }

    userData.address = address;
  }

  return true;
}

// ------------------------------
// FINAL SUBMIT
// ------------------------------
function submitForm() {
  if (validate(4)) {
    document.getElementById("successMsg").textContent =
      "Form submitted successfully! ✔";
    console.log("USER DATA:", userData);
  }
}
