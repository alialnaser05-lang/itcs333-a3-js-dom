(function() {
  let currentFilter = 'all';

  function getTodoList() {
    return document.getElementById('todo-list');
  }

  function getCounter() {
    return document.getElementById('counter');
  }

  function updateCounter() {
    const todoList = getTodoList();
    const counter = getCounter();
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
    const todoList = getTodoList();
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

  function addItem(textParam) {
    const todoInput = document.getElementById('todo-input');
    const todoList = getTodoList();
    const errorMsg = document.getElementById('error-msg');

    const text = (typeof textParam === 'string' ? textParam : (todoInput ? todoInput.value : '')).trim();

    if (text === '') {
      if (errorMsg) errorMsg.style.display = 'block';
      return false;
    }
    if (errorMsg) errorMsg.style.display = 'none';

    if (!todoList) return false;

    const li = document.createElement('li');
    li.innerHTML = `<span class="item-text">${text}</span> <button class="delete-btn">Delete</button>`;
    todoList.appendChild(li);

    if (todoInput) todoInput.value = '';
    updateCounter();
    applyFilter();
    return true;
  }

  // Expose addItem globally for the test suite
  window.addItem = addItem;

  function initApp() {
    const addBtn = document.getElementById('add-btn');
    const todoInput = document.getElementById('todo-input');
    const todoList = getTodoList();
    const filterAll = document.getElementById('filter-all');
    const filterActive = document.getElementById('filter-active');
    const filterDone = document.getElementById('filter-done');

    if (addBtn && !addBtn.dataset.bound) {
      addBtn.dataset.bound = 'true';
      addBtn.addEventListener('click', () => addItem());
    }

    if (todoInput && !todoInput.dataset.bound) {
      todoInput.dataset.bound = 'true';
      todoInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          addItem();
        }
      });
    }

    if (todoList && !todoList.dataset.bound) {
      todoList.dataset.bound = 'true';
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

    if (filterAll && !filterAll.dataset.bound) {
      filterAll.dataset.bound = 'true';
      filterAll.addEventListener('click', () => {
        currentFilter = 'all';
        applyFilter();
      });
    }

    if (filterActive && !filterActive.dataset.bound) {
      filterActive.dataset.bound = 'true';
      filterActive.addEventListener('click', () => {
        currentFilter = 'active';
        applyFilter();
      });
    }

    if (filterDone && !filterDone.dataset.bound) {
      filterDone.dataset.bound = 'true';
      filterDone.addEventListener('click', () => {
        currentFilter = 'done';
        applyFilter();
      });
    }

    updateCounter();
  }

  document.addEventListener('DOMContentLoaded', initApp);
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initApp();
  }
})();