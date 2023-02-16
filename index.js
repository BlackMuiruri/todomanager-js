const addForm = document.querySelector(".add");
const tasks = document.querySelector(".tasks");
const clearAll = document.querySelector(".clear");
const messageSpan = document.querySelector(".message span ");
const searchForm = document.querySelector(".search");

addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = addForm.task.value.trim();
  if (value.length) {
    tasks.innerHTML += `<li>
                            <span>${value}</span>
                            <i class="bi bi-trash-fill delete"></i>
                        </li>`;
    addForm.reset();
    updateMessage();
  }
});

tasks.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    activateAnimation($(event.target.parentElement))
  }
});

clearAll.addEventListener("click", (event) => {
  const taskItems = tasks.querySelectorAll("li");
  taskItems.forEach((item) => {
    activateAnimation($(item))
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
  let = backgroundcolor = "#E84A5F";
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