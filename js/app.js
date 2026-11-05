
(function () {
    let currentFilter = "all";

    function getTodoList() {
        return document.getElementById("todo-list");
    }

    function updateCounter() {
        const todoList = getTodoList();
        const counter = document.getElementById("counter");

        if (!todoList || !counter) return;

        let remaining = 0;

        for (const item of todoList.children) {
            if (!item.classList.contains("completed")) {
                remaining++;
            }
        }

        counter.textContent = remaining + " item(s) left";
    }

    function showError(show) {
        const errorMsg = document.getElementById("error-msg");

        if (!errorMsg) return;

        if (show) {
            errorMsg.classList.remove("hidden");
            errorMsg.hidden = false;
            errorMsg.style.display = "";
        } else {
            errorMsg.classList.add("hidden");
            errorMsg.hidden = true;
            errorMsg.style.display = "";
        }
    }

    function applyFilter() {
        const todoList = getTodoList();

        if (!todoList) return;

        for (const item of todoList.children) {
            const isCompleted = item.classList.contains("completed");

            if (currentFilter === "all") {
                item.style.display = "";
            } else if (currentFilter === "active") {
                item.style.display = isCompleted ? "none" : "";
            } else if (currentFilter === "done") {
                item.style.display = isCompleted ? "" : "none";
            }
        }
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

    // Expose function required by the provided tests
    window.addItem = addTodo;

    function initApp() {
        const form = document.getElementById("todo-form");
        const todoList = getTodoList();

        const filterAll = document.getElementById("filter-all");
        const filterActive = document.getElementById("filter-active");
        const filterDone = document.getElementById("filter-done");

        // Handle form submission (button and Enter)
        if (form) {
            form.addEventListener("submit", function (event) {
                event.preventDefault();
                addTodo();
            });
        }

        // Event delegation for deleting and completing items
        if (todoList) {
            todoList.addEventListener("click", function (event) {

                // Delete an item
                const deleteBtn = event.target.closest(".delete-btn");

                if (deleteBtn && todoList.contains(deleteBtn)) {
                    deleteBtn.closest("li").remove();

                    applyFilter();
                    updateCounter();
                    return;
                }

                // Toggle completion
                const itemText = event.target.closest(".item-text");

                if (itemText && todoList.contains(itemText)) {
                    const li = itemText.closest("li");

                    li.classList.toggle("completed");

                    applyFilter();
                    updateCounter();
                }
            });
        }

        // Show all items
        if (filterAll) {
            filterAll.addEventListener("click", function () {
                currentFilter = "all";
                applyFilter();
            });
        }

        // Show active items
        if (filterActive) {
            filterActive.addEventListener("click", function () {
                currentFilter = "active";
                applyFilter();
            });
        }

        // Show completed items
        if (filterDone) {
            filterDone.addEventListener("click", function () {
                currentFilter = "done";
                applyFilter();
            });
        }

        updateCounter();
    }

    // Initialize immediately because the script is at the end of body
    initApp();

})(); 