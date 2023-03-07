import { read, addTask, deleteTask } from "./storage.js"

const addForm = document.querySelector(".add");
const tasks = document.querySelector(".tasks");
const clearAll = document.querySelector(".clear");
const messageSpan = document.querySelector(".message span ");
const searchForm = document.querySelector(".search");

(function init() {
  fetchTasks();
})();

function templateGenerator({ taskId, title }) {
  return `<li data-id="${taskId}">
            <span>${title}</span>
            <i class="bi bi-trash-fill delete" data-id="${taskId}"></i>
          </li>`;
}

function taskToDOM(task) {
  tasks.innerHTML += templateGenerator(task)
  updateMessage();
}

function tasksToDOM(tasks) {
  tasks.forEach(task => taskToDOM(task))
}

function fetchTasks() {
  const tasks = read();
  tasksToDOM(tasks)
}

addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = addForm.task.value.trim();
  if (value.length) {
    taskToDOM(addTask(value));
    addForm.reset();
  }
});

function deleteAndAnimation(element) {
  const taskId = Number(element.dataset.id);
  deleteTask(taskId);
  activateAnimation($(element))
}

tasks.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    deleteAndAnimation(event.target.parentElement);
  }
});

clearAll.addEventListener("click", (event) => {
  const taskItems = tasks.querySelectorAll("li");
  taskItems.forEach((item) => {
    deleteAndAnimation(item);
  });
});

function updateMessage() {
  const textLength = tasks.children.length;
  messageSpan.textContent = `You have ${textLength} pending tasks.`;
}

searchForm.addEventListener("keyup", (event) => {
  const term = searchForm.task.value.trim().toLowerCase();
  filterTask(term);
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
})

function filterTask(term) {
  Array.from(tasks.children)
    .filter((task) => {
      return !task.textContent.toLowerCase().includes(term);
    })
    .forEach((task) => {
      task.classList.add("hide");
    });

  Array.from(tasks.children)
    .filter((task) => {
      return task.textContent.toLowerCase().includes(term);
    })
    .forEach((task) => {
      task.classList.remove("hide");
    });
}

searchForm.addEventListener("click", (event) => {
  if (event.target.classList.contains("reset")) {
    searchForm.reset();
    const term = searchForm.task.value.trim();
    filterTask(term);
  }
});

function activateAnimation(parent) {
  let backgroundcolor = "#E84A5F";
  var tl = new TimelineMax();
  tl.to(parent, 1, { backgroundColor: backgroundcolor, ease: Power4.easeOut })
    .to(parent, 0.5, {
      x: "-400px",
      ease: Bounce.easeOut,
    })
    .call(() => {
      parent[0].remove();
      updateMessage();
    });
}