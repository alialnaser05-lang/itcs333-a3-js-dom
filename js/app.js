document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.getElementById('todo-input');
  const addBtn = document.getElementById('add-btn');
  const todoList = document.getElementById('todo-list');
  const errorMsg = document.getElementById('error-msg');
  const counter = document.getElementById('counter');
  const filterAll = document.getElementById('filter-all');
  const filterActive = document.getElementById('filter-active');
  const filterDone = document.getElementById('filter-done');

  let currentFilter = 'all';

  // Update live counter of remaining items
  function updateCounter() {
    const items = todoList.querySelectorAll('li');
    let leftCount = 0;
    items.forEach(item => {
      if (!item.classList.contains('completed')) {
        leftCount++;
      }
    });
    if (counter) {
      counter.textContent = `${leftCount} item(s) left`;
    }
  }

  // Apply active filter to list items
  function applyFilter() {
    const items = todoList.querySelectorAll('li');
    items.forEach(item => {
      const isCompleted = item.classList.contains('completed');
      if (currentFilter === 'all') {
        item.style.display = '';
      } else if (currentFilter === 'active') {
        item.style.display = isCompleted ? 'none' : '';
      } else if (currentFilter === 'done') {
        item.style.display = isCompleted ? '' : 'none';
      }
    });
  }

  // Add a new task item
  function addTodo() {
    const text = todoInput.value.trim();
    if (text === '') {
      if (errorMsg) errorMsg.style.display = 'block';
      return;
    }
    if (errorMsg) errorMsg.style.display = 'none';

    const li = document.createElement('li');
    li.innerHTML = `<span>${text}</span> <button class="delete-btn">Delete</button>`;
    todoList.appendChild(li);

    todoInput.value = '';
    updateCounter();
    applyFilter();
  }

  // Event Listeners for adding items
  if (addBtn) {
    addBtn.addEventListener('click', addTodo);
  }
  if (todoInput) {
    todoInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        addTodo();
      }
    });
  }

  // Event Delegation on #todo-list (Single listener for toggling & deleting)
  if (todoList) {
    todoList.addEventListener('click', (e) => {
      const li = e.target.closest('li');
      if (!li) return;

      if (e.target.classList.contains('delete-btn')) {
        li.remove();
      } else {
        li.classList.toggle('completed');
      }
      updateCounter();
      applyFilter();
    });
  }

  // Filter Button Listeners
  if (filterAll) {
    filterAll.addEventListener('click', () => {
      currentFilter = 'all';
      applyFilter();
    });
  }
  if (filterActive) {
    filterActive.addEventListener('click', () => {
      currentFilter = 'active';
      applyFilter();
    });
  }
  if (filterDone) {
    filterDone.addEventListener('click', () => {
      currentFilter = 'done';
      applyFilter();
    });
  }

  // Initial counter check
  updateCounter();
});