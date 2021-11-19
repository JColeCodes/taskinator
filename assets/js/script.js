// Assign Variables
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// Function for form submission
var taskFormHandler = function(event) {
    event.preventDefault();
    // Grab submitted values if something is submitted
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    formEl.reset();

    // Make object for the task data
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    }
    createTaskEl(taskDataObj);
};

// Function for adding new list element
var createTaskEl = function(taskDataObj) {
    // Add new list element
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // Custom id for each task
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // Create div with content
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    // Append into window
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskInfoEl);
    listItemEl.appendChild(taskActionsEl);
    tasksToDoEl.appendChild(listItemEl);

    // Increase for next unique task ID
    taskIdCounter++
};

// Function for creating actions for the tasks (i.e. edit, delete)
var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // Edit Button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);

    // Delete Button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);

    // Dropdown for status selection
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(statusSelectEl);
    // Dropdown choices
    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
};

// Function for clicking task buttons
var taskButtonHandler = function(event) {
    var targetEl = event.target;

    // Edit Button Click
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    // Delete Button Click
    else if (targetEl.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

// Edit task
var editTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='"+ taskId + "']");

    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
}

// Delete task
var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='"+ taskId + "']");
    taskSelected.remove();
}

formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);