const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const ageInput = document.getElementById("age");
const roleInput = document.getElementById("role");
const skillsContainer = document.getElementById("skillsContainer");
const skillsInput = document.getElementById("skills");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const feedback = document.getElementById("feedback");

roleInput.addEventListener("change", handleRoleChange);
emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);
confirmPasswordInput.addEventListener("input", matchPassword);

document.getElementById("regForm").addEventListener("submit", function (e) {
  if (!validateForm()) {
    e.preventDefault();
    feedback.textContent = "Please fix errors before submitting.";
  }
});


function handleRoleChange() {
  const role = roleInput.value;

  skillsContainer.classList.toggle("hidden", role !== "student");

  passwordInput.classList.remove("valid", "invalid");
  confirmPasswordInput.classList.remove("valid", "invalid");
  feedback.textContent = "";
}


function validateEmail() {
  const val = emailInput.value;

  if (!val.endsWith("@gmail.com")) {
    markInvalid(emailInput, "Email must end with @gmail.com");
    return false;
  }

  markValid(emailInput);
  return true;
}


function validatePassword() {
  const pwd = passwordInput.value;
  const role = roleInput.value;

  const strong = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/; // admin
  const medium = /^(?=.*\d).{6,}$/; // teacher
  const basic = /.{4,}$/; // student

  if (role === "admin" && !strong.test(pwd)) {
    markInvalid(passwordInput, "Admin: 8 chars, 1 uppercase, 1 number, 1 special.");
    return false;
  }

  if (role === "teacher" && !medium.test(pwd)) {
    markInvalid(passwordInput, "Teacher: 6 chars + number required.");
    return false;
  }

  if (role === "student" && !basic.test(pwd)) {
    markInvalid(passwordInput, "Student: Minimum length 4 characters.");
    return false;
  }

  markValid(passwordInput);
  return true;
}


function matchPassword() {
  if (passwordInput.value !== confirmPasswordInput.value) {
    markInvalid(confirmPasswordInput, "Passwords do not match.");
    return false;
  }
  markValid(confirmPasswordInput);
  return true;
}



function markInvalid(input, message) {
  input.classList.add("invalid");
  input.classList.remove("valid");
  feedback.textContent = message;
}

function markValid(input) {
  input.classList.add("valid");
  input.classList.remove("invalid");
  feedback.textContent = "";
}

function validateForm() {
  return (
    nameInput.value.trim() !== "" &&
    validateEmail() &&
    ageInput.value > 0 &&
    validatePassword() &&
    matchPassword()
  );
}
