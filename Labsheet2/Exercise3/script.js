let taskId = 0;

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskName = taskInput.value.trim();

    if (taskName === "") {
        alert("Please enter a task name");
        return;
    }

    const task = document.createElement("div");
    task.className = "task";
    task.draggable = true;
    task.id = "task" + taskId++;

    const date = new Date().toLocaleDateString();
    task.innerHTML = `<strong>${taskName}</strong><br><small>${date}</small>`;

    task.ondragstart = drag;

    document.getElementById("todo").appendChild(task);
    taskInput.value = "";
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();

    const taskId = event.dataTransfer.getData("text");
    const task = document.getElementById(taskId);
    const column = event.target.closest(".column");

    column.appendChild(task);

    if (column.id === "completed") {
        task.classList.add("completed");
        document.getElementById("message").textContent =
            "Task Completed Successfully";
    } else {
        task.classList.remove("completed");
        document.getElementById("message").textContent = "";
    }
}
