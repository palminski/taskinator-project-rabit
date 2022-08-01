let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");
let tasksInProgressEl = document.querySelector("#tasks-in-progress");
let tasksCompletedEl = document.querySelector("#tasks-completed");

let pageContentEl = document.querySelector("#page-content");
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

    let isEdit = formEl.hasAttribute("data-task-id");
    
    if (isEdit) {
        let taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    else {
        let taskDataObj = {
          name: taskNameInput,
          type: taskTypeInput
        };

        createTaskEl(taskDataObj);                                                                                             
    }
};

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
};

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
};

let taskButtonHandler = function(event){
    let targetEl = event.target;

    if (targetEl.matches(".edit-btn")){
        let taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }

    if (event.target.matches(".delete-btn")){
        let taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }

};

let editTask = function(taskId){
    console.log ("editing task #" + taskId);
    let taskSelected = document.querySelector(".task-item[data-task-id='"+taskId+"']");
    
    let taskName = taskSelected.querySelector("h3.task-name").textContent;
    let taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value =taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id",taskId);
};

let completeEditTask = function(taskName,taskType,taskId) {
    let taskSelected = document.querySelector(".task-item[data-task-id='"+taskId+"']");

    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
}

let deleteTask =function(taskId){
    let taskSelected = document.querySelector(".task-item[data-task-id='"+taskId+"']");
    taskSelected.remove();
};

let taskStatusChangeHandler = function(event){
    let taskId = event.target.getAttribute("data-task-id");
    let statusValue = event.target.value.toLowerCase();
    let taskSelected = document.querySelector(".task-item[data-task-id='"+taskId+"']");

    if (statusValue === "to do"){
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress"){
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed"){
        tasksCompletedEl.appendChild(taskSelected);
    }

    console.log (event.target);
    console.log (event.target.getAttribute("data-task-id"));
};


formEl.addEventListener("submit",taskFormHandler);
pageContentEl.addEventListener("click",taskButtonHandler);
pageContentEl.addEventListener("change",taskStatusChangeHandler);

//BUGS TO ADRESS
//Deleting an item while it is being edited will break page when save edit is clicked