let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");


let createTaskHandler = function(event) {
    event.preventDefault();

    let listItemEl = document.createElement("li");
    listItemEl.textContent = "Added a new task!";
    listItemEl.className = "task-item";
    tasksToDoEl.appendChild(listItemEl);
}

formEl.addEventListener("submit",createTaskHandler);