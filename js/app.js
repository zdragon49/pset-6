let toDoList = [];

let elements = document.getElementsByClassName("table-row");
let priorityButtons = document.getElementsByClassName("priority-button");
let completedButtons = document.getElementsByClassName("completed-button");
let removeButtons = document.getElementsByClassName("delete-button");
let text = document.getElementsByClassName("text");

let priorityChanged;
let completionChanged;
let itemRemoved;

window.onload = function() {
    document.getElementById("task-table").onclick = runModificationFunctions;

    document.getElementById("add-input").onclick = createTask;
}

const runModificationFunctions = function() {
    itemImportant();
    completedItem();
    goneItem();
}

const itemImportant = function() {
    priorityChanged = false;

    for (let x = 0; x < priorityButtons.length; x++) {
        priorityButtons[x].onclick = function() {
            if (toDoList[x].prioritized === false) {
                const elementToPrioritize = elements[x];
                priorityButtons[x].style.color = "red";
                elements[0].before(elementToPrioritize);
                toDoList[x].prioritized = true;

                const objectToMove = toDoList[x];
                toDoList.splice(x, 1);
                toDoList.unshift(objectToMove);
                priorityChanged = true;
            }
            else if (toDoList[x].prioritized) {
                const elementToPrioritize = elements[x];
                priorityButtons[x].style.color = "black";
                elements[elements.length - 1].after(elementToPrioritize);
                toDoList[x].prioritized = false;

                const objectToMove = toDoList[x];
                toDoList.splice(x, 1);
                toDoList.push(objectToMove);
                priorityChanged = true;
            }
        };

        if (priorityChanged) {
            break;
        }
    }
};

const completedItem = function() {
    completionChanged = false;

    for (let i = 0; i < completedButtons.length; i++) {
        completedButtons[i].onclick = function() {
            if (toDoList[i].completed === false) {
                completedButtons[i].style.setProperty("text-decoration", "line-through");
                toDoList[i].completed = true;
            }
            else if (toDoList[i].completed) {
                completedButtons[i].style.setProperty("text-decoration", "none");
                toDoList[i].completed = false;
            }
        }

        completedButtons[i].onclick;

        if (priorityChanged) {
            break;
        }
    }
}

const goneItem = function() {
    itemRemoved = false;

    for (let i = 0; i < removeButtons.length; i++) {
        removeButtons[i].onclick = function() {
            const elementToRemove = elements[i];
            elementToRemove.remove();
            toDoList.splice(i, 1);
            itemRemoved = true;
        };

        if (itemRemoved) {
            break;
        }
    }
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
