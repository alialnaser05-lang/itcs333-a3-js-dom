
(function () {
    let currentFilter = "all";

    function getTodoList() {
        return document.getElementById("todo-list");
    }

    function getCounter() {
        return document.getElementById("counter");
    }

    function getErrorMsg() {
        return document.getElementById("error-msg");
    }

    // Show or hide the error message
    function showError(show) {
        const errorMsg = getErrorMsg();

        if (!errorMsg) return;

        errorMsg.hidden = !show;
        errorMsg.style.display = show ? "" : "none";

        if (show) {
            errorMsg.classList.remove("hidden");
        } else {
            errorMsg.classList.add("hidden");
        }
    }

    // Update the counter
    function updateCounter() {
        const todoList = getTodoList();
        const counter = getCounter();

        if (!todoList || !counter) return;

        const items = todoList.querySelectorAll("li");

        let remaining = 0;

        items.forEach(function (item) {
            if (!item.classList.contains("completed")) {
                remaining++;
            }
        });

        counter.textContent = remaining + " item(s) left";
    }

    // Apply the selected filter
    function applyFilter() {
        const todoList = getTodoList();

        if (!todoList) return;

        const items = todoList.querySelectorAll("li");

        items.forEach(function (item) {
            const isCompleted = item.classList.contains("completed");

            if (currentFilter === "all") {
                item.style.display = "";
            } else if (currentFilter === "active") {
                item.style.display = isCompleted ? "none" : "";
            } else if (currentFilter === "done") {
                item.style.display = isCompleted ? "" : "none";
            }
        });
    }

    // Add a new item
    function addTodo(textParam) {
        const todoInput = document.getElementById("todo-input");
        const todoList = getTodoList();

        const text = (
            typeof textParam === "string"
                ? textParam
                : (todoInput ? todoInput.value : "")
        ).trim();

        if (text === "") {
            showError(true);
            return;
        }

        if (!todoList) return;

        showError(false);

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.className = "item-text";
        span.textContent = text;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.type = "button";

        li.appendChild(span);
        li.appendChild(deleteBtn);

        todoList.appendChild(li);

        if (todoInput) {
            todoInput.value = "";
        }

        applyFilter();
        updateCounter();
    }

    // Required by the provided Jest tests
    window.addItem = addTodo;

    function initApp() {
        const addBtn = document.getElementById("add-btn");
        const todoInput = document.getElementById("todo-input");
        const todoList = getTodoList();

        const filterAll = document.getElementById("filter-all");
        const filterActive = document.getElementById("filter-active");
        const filterDone = document.getElementById("filter-done");

        // Add using button
        if (addBtn) {
            addBtn.addEventListener("click", function () {
                addTodo();
            });
        }

        // Add using Enter
        if (todoInput) {
            todoInput.addEventListener("keydown", function (event) {
                if (event.key === "Enter") {
                    addTodo();
                }
            });
        }

        // Event delegation
        if (todoList) {
            todoList.addEventListener("click", function (event) {

                // Delete item
                const deleteBtn = event.target.closest(".delete-btn");

                if (deleteBtn && todoList.contains(deleteBtn)) {
                    deleteBtn.closest("li").remove();

                    applyFilter();
                    updateCounter();
                    return;
                }

                // Toggle completed status
                const itemText = event.target.closest(".item-text");

                if (itemText && todoList.contains(itemText)) {
                    const li = itemText.closest("li");

                    li.classList.toggle("completed");

                    applyFilter();
                    updateCounter();
                }
            });
        }

        // Filter: All
        if (filterAll) {
            filterAll.addEventListener("click", function () {
                currentFilter = "all";
                applyFilter();
            });
        }

        // Filter: Active
        if (filterActive) {
            filterActive.addEventListener("click", function () {
                currentFilter = "active";
                applyFilter();
            });
        }

        // Filter: Completed
        if (filterDone) {
            filterDone.addEventListener("click", function () {
                currentFilter = "done";
                applyFilter();
            });
        }

        updateCounter();
    }

    // Initialize the application
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initApp);
    } else {
        initApp();
    }

})();