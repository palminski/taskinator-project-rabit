let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");

let taskIdCounter = 0;


let taskFormHandler = function(event) {
    event.preventDefault();
    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeInput){
        alert("you need to put something in each section of the task form!");
        return false;
    }
    formEl.reset();
    let taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    createTaskEl(taskDataObj);                                                                                             
}

let createTaskEl = function(taskDataObj){
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    let taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>"+ taskDataObj.name +"</h3><span class='task-type'>"+ taskDataObj.type +"</span>";

    listItemEl.appendChild(taskInfoEl);
    let taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    
    tasksToDoEl.appendChild(listItemEl);
    taskIdCounter ++;
}

let createTaskActions = function(taskID) {
    let actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //Edit Button
    let editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskID);
    actionContainerEl.appendChild(editButtonEl);

    //Delete Button
    let deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskID);
    actionContainerEl.appendChild(deleteButtonEl);

    //Selection Dropdown
    let statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change"); //Why using set attribute instead of statusSelectEl.name or whatever?
    statusSelectEl.setAttribute("data-task-id",taskID);
    actionContainerEl.appendChild(statusSelectEl);
    let statusChoices = ["To Do","In Progress", "Completed"];

    for (let i = 0; i < statusChoices.length; i++) {
        let statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value",statusChoices[i]);
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
}

formEl.addEventListener("submit",taskFormHandler);