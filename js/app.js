document.addEventListener('DOMContentLoaded', () => {
  setupTodoApp();
});

if (document.readyState === 'interactive' || document.readyState === 'complete') {
  setupTodoApp();
}

function setupTodoApp() {
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
    if (!todoList) return;
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

  if (addBtn && !addBtn.dataset.listenerAttached) {
    addBtn.dataset.listenerAttached = 'true';
    addBtn.addEventListener('click', addTodo);
  }

  if (todoInput && !todoInput.dataset.listenerAttached) {
    todoInput.dataset.listenerAttached = 'true';
    todoInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        addTodo();
      }
    });
  }

  if (todoList && !todoList.dataset.listenerAttached) {
    todoList.dataset.listenerAttached = 'true';
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

  if (filterAll && !filterAll.dataset.listenerAttached) {
    filterAll.dataset.listenerAttached = 'true';
    filterAll.addEventListener('click', () => {
      currentFilter = 'all';
      applyFilter();
    });
  }

  if (filterActive && !filterActive.dataset.listenerAttached) {
    filterActive.dataset.listenerAttached = 'true';
    filterActive.addEventListener('click', () => {
      currentFilter = 'active';
      applyFilter();
    });
  }

  if (filterDone && !filterDone.dataset.listenerAttached) {
    filterDone.dataset.listenerAttached = 'true';
    filterDone.addEventListener('click', () => {
      currentFilter = 'done';
      applyFilter();
    });
  }

  updateCounter();
}