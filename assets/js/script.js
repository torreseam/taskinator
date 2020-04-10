var pageContentEl = document.querySelector("#page-content");
var formEl = document.querySelector("#task-form");
var taskToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var taskIdCounter = 0;

var taskFormHandler = function (event) {

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();
    var isEdit = formEl.hasAttribute("data-task-id");
    console.log(isEdit);
    // PUT THIS BELOW `var isEdit = ...` in `taskFormHandler()`

    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    // no data attribute, so create object as normal and pass to createTaskEl function
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };

        createTaskEl(taskDataObj);
    }

    // package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    createTaskEl(taskDataObj);

};

//function to complete task edit
var completeEditTask = function (taskName, taskType, taskId) {

    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");

    //reset form by removed task id and changing button back to normal
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};

// creates HTML elements per taskFormHandler input
var createTaskEl = function (taskDataObj) {
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    listItemEl.setAttribute("draggable", "true");

    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");

    //give it a class name
    taskInfoEl.className = "task-info";

    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    // adding select DOM to createTaskEl for form handler
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    // add entire list item to list
    taskToDoEl.appendChild(listItemEl);

    // incrase task counter for the next unique id
    taskIdCounter++;
};

// dynamically create HTML elements to edit form
var createTaskActions = function (taskId) {
    // creates div and assigns it class name
    var actionContanierEl = document.createElement("div");
    actionContanierEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContanierEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContanierEl.appendChild(deleteButtonEl);

    //drop down 'select' element
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContanierEl.appendChild(statusSelectEl);

    //creating array declarations for dropdown options
    var statusChoices = ["To Do", "In Progress", "Completed"];
    // for loop creating options
    for (var i = 0; i < statusChoices.length; i++) {
        // create the option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContanierEl;
};

// target El id for delete
var taskButtonHandler = function (event) {
    // get target elemet from event
    var targetEl = event.target
    //edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    // delete button was clicked
    else if (targetEl.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

// select li item with name of array place, and remove that li. Ran in taskButtonHandler on event click target delete button
var deleteTask = function (taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

var editTask = function (taskId) {
    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    //value (title and selector) of li now applied to input/select to edit
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    //select submit button to change button to show we are in edit mode
    document.querySelector("#save-task").textContent = "Save Task";
    //new edit attribute too the form li item
    formEl.setAttribute("data-task-id", taskId);
};

var taskStatusChangeHandler = function (event) {
    var taskStatusChangeHandler = function (event) {
        // get the task item's id
        var taskId = event.target.getAttribute("data-task-id");

        // get the currently selected option's value and convert to lowercase
        var statusValue = event.target.value.toLowerCase();

        // find the parent task item element based on the id
        var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    };

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }
};
// //Dragstart Handler 
//     var dragTaskHandler = function (event) {
//         var taskId = event.target.getAttribute("data-task-id");
//         console.log("Task ID:", taskId);
//         console.log("event", event);
//     }
// };


pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
pageContentEl.addEventListener("dragstart", dragTaskHandler);
formEl.addEventListener("submit", taskFormHandler);