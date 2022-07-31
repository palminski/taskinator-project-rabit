let buttonEl = document.querySelector("#save-task");
let tasksToDoEl = document.querySelector("#tasks-to-do");
console.log(buttonEl);

let createTaskHandler = function() {
    let listItemEl = document.createElement("li");
    listItemEl.textContent = "Added a new task!";
    listItemEl.className = "task-item";
    tasksToDoEl.appendChild(listItemEl);
}

buttonEl.addEventListener("click",createTaskHandler);