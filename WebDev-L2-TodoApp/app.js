const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");

const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");

const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

const pendingTotal = document.getElementById("pendingTotal");
const completedTotal = document.getElementById("completedTotal");

const pendingEmpty = document.getElementById("pendingEmpty");
const completedEmpty = document.getElementById("completedEmpty");

const formMessage = document.getElementById("formMessage");

const currentDate = document.getElementById("currentDate");


let tasks = loadTasks();

function displayCurrentDate() {

    const today = new Date();

    const formattedDate =
        today.toLocaleDateString(
            "en-ZA",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

    currentDate.textContent = formattedDate;
}


function loadTasks() {

    try {

        const storedTasks =
            localStorage.getItem("taskflowTasks");

        if (!storedTasks) {
            return [];
        }

        const parsedTasks =
            JSON.parse(storedTasks);

        return Array.isArray(parsedTasks)
            ? parsedTasks
            : [];

    } catch (error) {

        console.error(
            "Unable to load tasks:",
            error
        );

        return [];
    }
}


function saveTasks() {

    localStorage.setItem(
        "taskflowTasks",
        JSON.stringify(tasks)
    );
}


function createTaskId() {

    if (
        typeof crypto !== "undefined" &&
        crypto.randomUUID
    ) {
        return crypto.randomUUID();
    }

    return (
        Date.now().toString() +
        Math.random()
            .toString(16)
            .slice(2)
    );
}


taskForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const taskText =
            taskInput.value.trim();

        if (!taskText) {

            showMessage(
                "Please enter a task."
            );

            return;
        }


        const newTask = {

            id: createTaskId(),

            text: taskText,

            completed: false,

            createdAt:
                new Date().toISOString(),

            completedAt: null

        };


        tasks.unshift(newTask);

        saveTasks();

        renderTasks();

        taskInput.value = "";

        formMessage.textContent = "";

        taskInput.focus();
    }
);


function showMessage(message) {

    formMessage.textContent = message;

    setTimeout(
        function () {

            formMessage.textContent = "";

        },
        2500
    );
}


function renderTasks() {

    pendingList.innerHTML = "";

    completedList.innerHTML = "";


    const pendingTasks =
        tasks.filter(
            task => !task.completed
        );


    const completedTasks =
        tasks.filter(
            task => task.completed
        );


    pendingTasks.forEach(
        function (task) {

            pendingList.appendChild(
                createTaskElement(task)
            );
        }
    );


    completedTasks.forEach(
        function (task) {

            completedList.appendChild(
                createTaskElement(task)
            );
        }
    );


    updateCounters(
        pendingTasks.length,
        completedTasks.length
    );


    updateEmptyStates(
        pendingTasks.length,
        completedTasks.length
    );
}


function createTaskElement(task) {

    const taskItem =
        document.createElement("article");

    taskItem.className =
        task.completed
            ? "task-item completed"
            : "task-item";


    taskItem.dataset.id = task.id;

    const taskMain =
        document.createElement("div");

    taskMain.className = "task-main";


    const completeButton =
        document.createElement("button");

    completeButton.className =
        "complete-btn";

    completeButton.type = "button";

    completeButton.textContent =
        task.completed
            ? "✓"
            : "";

    completeButton.setAttribute(
        "aria-label",
        task.completed
            ? "Mark task as pending"
            : "Mark task as complete"
    );


    completeButton.addEventListener(
        "click",
        function () {

            toggleTask(task.id);
        }
    );


    const taskContent =
        document.createElement("div");

    taskContent.className =
        "task-content";


    const taskText =
        document.createElement("p");

    taskText.className =
        "task-text";

    taskText.textContent =
        task.text;


    const taskTime =
        document.createElement("p");

    taskTime.className =
        "task-time";


    if (task.completed) {

        taskTime.textContent =
            "Completed " +
            formatTimestamp(
                task.completedAt
            );

    } else {

        taskTime.textContent =
            "Added " +
            formatTimestamp(
                task.createdAt
            );
    }


    taskContent.appendChild(taskText);
    taskContent.appendChild(taskTime);


    taskMain.appendChild(
        completeButton
    );

    taskMain.appendChild(
        taskContent
    );


    const taskActions =
        document.createElement("div");

    taskActions.className =
        "task-actions";


    const editButton =
        document.createElement("button");

    editButton.type = "button";

    editButton.className =
        "action-btn edit-btn";

    editButton.textContent = "Edit";


    editButton.addEventListener(
        "click",
        function () {

            enableEdit(
                task,
                taskItem,
                taskContent
            );
        }
    );


    const deleteButton =
        document.createElement("button");

    deleteButton.type = "button";

    deleteButton.className =
        "action-btn delete-btn";

    deleteButton.textContent =
        "Delete";


    deleteButton.addEventListener(
        "click",
        function () {

            deleteTask(task.id);
        }
    );


    taskActions.appendChild(
        editButton
    );

    taskActions.appendChild(
        deleteButton
    );


    taskItem.appendChild(
        taskMain
    );

    taskItem.appendChild(
        taskActions
    );


    return taskItem;
}


function toggleTask(taskId) {

    const task =
        tasks.find(
            task =>
                task.id === taskId
        );


    if (!task) {
        return;
    }


    task.completed =
        !task.completed;


    if (task.completed) {

        task.completedAt =
            new Date().toISOString();

    } else {

        task.completedAt = null;
    }


    saveTasks();

    renderTasks();
}


function deleteTask(taskId) {

    tasks =
        tasks.filter(
            task =>
                task.id !== taskId
        );


    saveTasks();

    renderTasks();
}


function enableEdit(
    task,
    taskItem,
    taskContent
) {

    const taskActions =
        taskItem.querySelector(
            ".task-actions"
        );


    taskActions.style.display =
        "none";


    taskContent.innerHTML = "";


    const editContainer =
        document.createElement("div");

    editContainer.className =
        "edit-container";


    const editInput =
        document.createElement("input");

    editInput.type = "text";

    editInput.className =
        "edit-input";

    editInput.value =
        task.text;

    editInput.maxLength = 120;


    const editActions =
        document.createElement("div");

    editActions.className =
        "edit-actions";


    const saveButton =
        document.createElement("button");

    saveButton.type = "button";

    saveButton.className =
        "save-btn";

    saveButton.textContent =
        "Save";


    const cancelButton =
        document.createElement("button");

    cancelButton.type = "button";

    cancelButton.className =
        "cancel-btn";

    cancelButton.textContent =
        "Cancel";


    editActions.appendChild(
        saveButton
    );

    editActions.appendChild(
        cancelButton
    );


    editContainer.appendChild(
        editInput
    );

    editContainer.appendChild(
        editActions
    );


    taskContent.appendChild(
        editContainer
    );


    editInput.focus();

    editInput.select();


    saveButton.addEventListener(
        "click",
        function () {

            saveEdit(
                task.id,
                editInput.value
            );
        }
    );


    cancelButton.addEventListener(
        "click",
        function () {

            renderTasks();
        }
    );


    editInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                saveEdit(
                    task.id,
                    editInput.value
                );
            }


            if (event.key === "Escape") {

                renderTasks();
            }
        }
    );
}


function saveEdit(
    taskId,
    newText
) {

    const cleanText =
        newText.trim();


    if (!cleanText) {

        alert(
            "Task cannot be empty."
        );

        return;
    }


    const task =
        tasks.find(
            task =>
                task.id === taskId
        );


    if (!task) {
        return;
    }


    task.text = cleanText;


    saveTasks();

    renderTasks();
}


function updateCounters(
    pending,
    completed
) {

    pendingTotal.textContent =
        pending;

    completedTotal.textContent =
        completed;


    pendingCount.textContent =
        pending === 1
            ? "1 pending"
            : `${pending} pending`;


    completedCount.textContent =
        completed === 1
            ? "1 completed"
            : `${completed} completed`;
}


function updateEmptyStates(
    pending,
    completed
) {

    pendingEmpty.style.display =
        pending === 0
            ? "block"
            : "none";


    completedEmpty.style.display =
        completed === 0
            ? "block"
            : "none";
}


function formatTimestamp(dateString) {

    if (!dateString) {
        return "";
    }


    const date =
        new Date(dateString);


    return date.toLocaleString(
        "en-ZA",
        {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit"
        }
    );
}


displayCurrentDate();

renderTasks();