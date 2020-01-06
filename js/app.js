let toDoList = [];

let elements = document.getElementsByClassName("table-row");
let priorityButtons = document.getElementsByClassName("priority-button");
let completedButtons = document.getElementsByClassName("completed-button");
let removeButtons = document.getElementsByClassName("delete-button");

let priorityChanged;
let completionChanged;
let itemRemoved;

window.onload = function() {
    document.getElementById("task-table").onclick = runModificationFunctions;

    document.getElementById("add-input").onclick = createTask;
}

const runModificationFunctions = function() {
    prioritizeItem();
    markAsComplete();
    removeItem();
}

const createTask = function() {
    let input = document.getElementById("user-input").value;
    if (input === "") {}
    else {
        let object = {
            task: input,
            prioritized: false,
            completed: false,
            htmlRow: null,
            htmlPriorityButton: null,
            htmlText: null,
            htmlCompletedButton: null,
            htmlRemoveButton: null
        }


        toDoList.push(object);

        let i = toDoList.indexOf(object);

        toDoList[i].htmlRow = document.createElement("tr");
        toDoList[i].htmlRow.setAttribute("class", "table-row");
        document.getElementById("task-table").append(toDoList[i].htmlRow);

       toDoList[i].htmlPriorityButton = document.createElement("td");
        toDoList[i].htmlPriorityButton.setAttribute("class", "priority-button");
        toDoList[i].htmlPriorityButton.innerHTML = "!";
        elements[i].append(toDoList[i].htmlPriorityButton);

        toDoList[i].htmlText = document.createElement("td");
        toDoList[i].htmlText.innerHTML = toDoList[i].task;
        toDoList[i].htmlText.setAttribute("class", "completed-button");
        elements[i].append(toDoList[i].htmlText);


        toDoList[i].htmlRemoveButton = document.createElement("td");
        toDoList[i].htmlRemoveButton.setAttribute("class", "delete-button");
        toDoList[i].htmlRemoveButton.innerHTML = "X";
        elements[i].append(toDoList[i].htmlRemoveButton);
    }
    document.getElementById("user-input").value = "";
}
