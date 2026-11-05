function initTodoApp() {
  const todoInput = document.getElementById('todo-input');
  const addBtn = document.getElementById('add-btn');
  const todoList = document.getElementById('todo-list');
  const errorMsg = document.getElementById('error-msg');
  const counter = document.getElementById('counter');
  const filterAll = document.getElementById('filter-all');
  const filterActive = document.getElementById('filter-active');
  const filterDone = document.getElementById('filter-done');

  let currentFilter = 'all';

  function updateCounter() {
    if (!todoList || !counter) return;
    const items = todoList.querySelectorAll('li');
    let leftCount = 0;
    items.forEach(item => {
      if (!item.classList.contains('completed')) {
        leftCount++;
      }
    });
    counter.textContent = `${leftCount} item(s) left`;
  }

  function applyFilter() {
    if (!todoList) return;
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

  function addTodo() {
    if (!todoInput || !todoList) return;
    const text = todoInput.value.trim();
    if (text === '') {
      if (errorMsg) errorMsg.style.display = 'block';
      return;
    }
    if (errorMsg) errorMsg.style.display = 'none';

    const li = document.createElement('li');
    li.innerHTML = `<span class="item-text">${text}</span> <button class="delete-btn">Delete</button>`;
    todoList.appendChild(li);

    todoInput.value = '';
    updateCounter();
    applyFilter();
  }

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

  updateCounter();
}

// Safely initialize whether DOM is ready or loading
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTodoApp);
} else {
  initTodoApp();
}