const addForm = document.querySelector(".add");
const listTodo = document.querySelector(".todos");
const selectedDate = document.querySelector('input[name="datetime"]');
const search = document.querySelector(".search input");

const generateTemplate = (todo, dateTime) => {
  const time = new Date(dateTime).toLocaleString("tr-TR");
  const html = `
     <li class="list-group-item d-flex justify-content-between align-items-center flex-column align-items-start">
      <div class="d-flex w-100 justify-content-between">
        <span>${todo}</span>
        <i class="fa-solid fa-eraser delete"></i>
      </div>
      <small class="text-black mt-2">Tarih: ${time}</small>
      </div>
    </li>
    `;
  //!Her yeni eklenen eleman için listeyi html yapısına ekleme.
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
    e.target.parentElement.remove();
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
