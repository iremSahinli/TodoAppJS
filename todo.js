const addForm = document.querySelector(".add");
const listTodo = document.querySelector(".todos");
const selectedDate = document.querySelector('input[name="datetime"]');
const search = document.querySelector(".search input");

const generateTemplate = (todo, dateTime) => {
  const time = new Date(dateTime).toLocaleString("tr-TR");
  const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center flex-column align-items-start">
      <div class="d-flex w-100 justify-content-between">
        <span class="todo-text">${todo}</span>
        <div>
          <i class="fa-solid fa-pen-to-square edit mr-2" style="cursor:pointer"></i>
          <i class="fa-solid fa-eraser delete" style="cursor:pointer"></i>
        </div>
      </div>
      <small class="text-light mt-2 todo-time">Tarih: ${time}</small>
    </li>
  `;
  listTodo.innerHTML += html;
};

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = addForm.add.value.trim();
  const dateTime = selectedDate.value;

  //! girilen veri uzunluğu 0 dan büyükse işlem yapsın.
  if (todo.length > 0 && dateTime) {
    generateTemplate(todo, dateTime);
    addForm.reset();
  }
});

//!Silme işlemi:
listTodo.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.closest("li").remove();
  }

  //!Görev güncelleme:
  if (e.target.classList.contains("edit")) {
    const listItem = e.target.closest("li");
    const textEl = listItem.querySelector(".todo-text");
    const timeEl = listItem.querySelector(".todo-time");

    if (!textEl || !timeEl) {
      return;
    }
    const currentText = textEl.textContent;
    const currentTime = timeEl.textContent.replace("Tarih: ", "");

    const updateText = prompt("Yeni görev:", currentText);
    const updateTime = prompt("Yeni tarih:", currentTime);

    if (updateText && updateTime) {
      textEl.textContent = updateText;
      timeEl.textContent = updateTime;
    }
  }
});

//!Filtreleme işlemini yapacak metot:
const filters = (term) => {
  Array.from(listTodo.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add("filtered"));

  Array.from(listTodo.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove("filtered"));
};

search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filters(term);
});
