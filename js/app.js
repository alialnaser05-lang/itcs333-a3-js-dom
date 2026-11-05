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
        const errorMsg = getErrorMsg();

        const text = (typeof textParam === "string" ? textParam : (todoInput ? todoInput.value : "")).trim();

        if (text === "") {
            if (errorMsg) errorMsg.hidden = false;
            return;
        }

        if (errorMsg) errorMsg.hidden = true;
        if (!todoList) return;

        const li = document.createElement("li");
        const span = document.createElement("span");
        const deleteBtn = document.createElement("button");

        span.textContent = text;
        span.className = "item-text"; // Ensure test suite finds .item-text

        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.type = "button";

        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);

        if (todoInput) todoInput.value = "";

        applyFilter();
        updateCounter();
    }

    // Expose addItem globally so Jest tests can call it directly
    window.addItem = addTodo;

    function initApp() {
        const addBtn = document.getElementById("add-btn");
        const todoInput = document.getElementById("todo-input");
        const todoList = getTodoList();
        const filterAll = document.getElementById("filter-all");
        const filterActive = document.getElementById("filter-active");
        const filterDone = document.getElementById("filter-done");

        if (addBtn && !addBtn.dataset.bound) {
            addBtn.dataset.bound = "true";
            addBtn.addEventListener("click", () => addTodo());
        }

        if (todoInput && !todoInput.dataset.bound) {
            todoInput.dataset.bound = "true";
            todoInput.addEventListener("keydown", function (event) {
                if (event.key === "Enter") {
                    addTodo();
                }
            });
        }

        if (todoList && !todoList.dataset.bound) {
            todoList.dataset.bound = "true";
            todoList.addEventListener("click", function (event) {
                const deleteBtn = event.target.closest(".delete-btn");

                if (deleteBtn && todoList.contains(deleteBtn)) {
                    deleteBtn.closest("li").remove();
                    applyFilter();
                    updateCounter();
                    return;
                }

                const itemText = event.target.closest("li");
                if (itemText && todoList.contains(itemText)) {
                    itemText.classList.toggle("completed");
                    applyFilter();
                    updateCounter();
                }
            });
        }

        if (filterAll) {
            filterAll.addEventListener("click", function () {
                currentFilter = "all";
                applyFilter();
            });
        }

        if (filterActive) {
            filterActive.addEventListener("click", function () {
                currentFilter = "active";
                applyFilter();
            });
        }

        if (filterDone) {
            filterDone.addEventListener("click", function () {
                currentFilter = "done";
                applyFilter();
            });
        }

        updateCounter();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initApp);
    } else {
        initApp();
    }
})(); 