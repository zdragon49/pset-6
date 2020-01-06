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
    document.getElementById("task-table").onclick = functionMod;

    document.getElementById("add-input").onclick = createTask;
}

const functionMod = function() {
    itemImportant();
    completedItem();
    goneItem();
}

const itemImportant = function() {
    priorityChanged = false;

    for (let i = 0; i < priorityButtons.length; i++) {
        priorityButtons[i].onclick = function() {
            if (items[i].prioritized === false) {
                const elementToPrioritize = elements[i];
                priorityButtons[i].style.color = "red";
                elements[0].before(elementToPrioritize);
                items[i].prioritized = true;

                const objectToMove = items[i];
                items.splice(i, 1);
                items.unshift(objectToMove);
                priorityChanged = true;
            }
            else if (items[i].prioritized) {
                const elementToPrioritize = elements[i];
                priorityButtons[i].style.color = "black";
                elements[elements.length - 1].after(elementToPrioritize);
                items[i].prioritized = false;

                const objectToMove = items[i];
                items.splice(i, 1);
                items.push(objectToMove);
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
            htmlCheckImage: null,
            htmlRemoveButton: null
        }

        toDoList.push(object);

        let x = toDoList.indexOf(object);

        toDoList[x].htmlRow = document.createElement("tr");
        toDoList[x].htmlRow.setAttribute("class", "table-row");
        document.getElementById("task-table").append(toDoList[x].htmlRow);

        toDoList[x].htmlPriorityButton = document.createElement("td");
        toDoList[x].htmlPriorityButton.setAttribute("class", "priority-button");
        toDoList[x].htmlPriorityButton.innerHTML = "!";
        elements[x].append(toDoList[x].htmlPriorityButton);

        toDoList[x].htmlText = document.createElement("td");
        toDoList[x].htmlText.innerHTML = toDoList[x].task;
        toDoList[x].htmlText.setAttribute("class", "text");
        elements[x].append(toDoList[x].htmlText);

        toDoList[x].htmlCompletedButton = document.createElement("td");
        toDoList[x].htmlCompletedButton.setAttribute("class", "completed-button");
        elements[x].append(toDoList[x].htmlCompletedButton);

        toDoList[x].htmlCheckImage = document.createElement("img");
        toDoList[x].htmlCheckImage.src = "images/check.png";
        toDoList[x].htmlCheckImage.setAttribute("class", "check");
        completedButtons[x].append(toDoList[x].htmlCheckImage);

        toDoList[x].htmlRemoveButton = document.createElement("td");
        toDoList[x].htmlRemoveButton.setAttribute("class", "remove-button");
        toDoList[x].htmlRemoveButton.innerHTML = "X";
        elements[x].append(toDoList[x].htmlRemoveButton);
    }
    document.getElementById("add-input").value = "";
};
