
const questions = [
  {
    id: 1,
    text: "What is your name?",
    type: "text",
    required: true,
    maxLength: 30
  },
  {
    id: 2,
    text: "What is your gender?",
    type: "radio",
    required: true,
    options: ["Male", "Female", "Other"]
  },
  {
    id: 3,
    text: "Which programming languages do you know?",
    type: "checkbox",
    required: true,
    options: ["JavaScript", "Python", "C++", "Java"],
    minSelect: 1,
    maxSelect: 3
  }
];

const surveyForm = document.getElementById("surveyForm");
const formMessage = document.getElementById("formMessage");
const submitBtn = document.getElementById("submitBtn");


function buildForm() {
  questions.forEach(q => {
    let block = document.createElement("div");
    block.classList.add("question-block");

    let label = document.createElement("label");
    label.textContent = q.text + (q.required ? " *" : "");
    block.appendChild(label);

    // TEXT INPUT
    if (q.type === "text") {
      let input = document.createElement("input");
      input.type = "text";
      input.id = "q_" + q.id;
      input.style.width = "100%";
      input.style.padding = "8px";
      block.appendChild(input);
    }

    // RADIO BUTTONS
    if (q.type === "radio") {
      q.options.forEach(opt => {
        let radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "q_" + q.id;
        radio.value = opt;

        let span = document.createElement("span");
        span.textContent = " " + opt;

        block.appendChild(radio);
        block.appendChild(span);
        block.appendChild(document.createElement("br"));
      });
    }

    // CHECKBOXES
    if (q.type === "checkbox") {
      q.options.forEach(opt => {
        let cb = document.createElement("input");
        cb.type = "checkbox";
        cb.name = "q_" + q.id;
        cb.value = opt;

        let span = document.createElement("span");
        span.textContent = " " + opt;

        block.appendChild(cb);
        block.appendChild(span);
        block.appendChild(document.createElement("br"));
      });
    }

    // Validation message
    let msg = document.createElement("div");
    msg.id = "msg_" + q.id;
    msg.classList.add("validation-msg");
    block.appendChild(msg);

    surveyForm.appendChild(block);
  });
}

buildForm();

function validateSurvey() {
  let isValid = true;

  questions.forEach(q => {
    let msgBox = document.getElementById("msg_" + q.id);
    msgBox.textContent = "";

    if (q.type === "text") {
      let value = document.getElementById("q_" + q.id).value.trim();

      if (q.required && value === "") {
        msgBox.textContent = "This field is required.";
        isValid = false;
      } else if (q.maxLength && value.length > q.maxLength) {
        msgBox.textContent = `Maximum ${q.maxLength} characters allowed.`;
        isValid = false;
      }
    }

    if (q.type === "radio") {
      let selected = document.querySelector(`input[name="q_${q.id}"]:checked`);

      if (q.required && !selected) {
        msgBox.textContent = "Please select an option.";
        isValid = false;
      }
    }

    if (q.type === "checkbox") {
      let selected = [...document.querySelectorAll(`input[name="q_${q.id}"]:checked`)];

      if (q.required && selected.length === 0) {
        msgBox.textContent = "Please select at least one option.";
        isValid = false;
      } else if (q.minSelect && selected.length < q.minSelect) {
        msgBox.textContent = `Select at least ${q.minSelect} options.`;
        isValid = false;
      } else if (q.maxSelect && selected.length > q.maxSelect) {
        msgBox.textContent = `Select at most ${q.maxSelect} options.`;
        isValid = false;
      }
    }
  });

  return isValid;
}


submitBtn.addEventListener("click", function () {
  if (validateSurvey()) {
    formMessage.style.color = "green";
    formMessage.textContent = "Survey submitted successfully!";
  } else {
    formMessage.style.color = "red";
    formMessage.textContent = "Please correct errors before submitting.";
  }
});
