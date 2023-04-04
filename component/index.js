const todoList = document.querySelector(".todo-list");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
let todos = [];

todoButton.addEventListener("click", function() {
  todoInput.classList.toggle("active");
})

todoForm.addEventListener("submit", submitTodo);

//화면이 로드 됐을 때 localstorage에 데이터가 있으면 출력
const getTodo = localStorage.getItem("todos");
if(getTodo) {
  const currentTodo = JSON.parse(getTodo);
  todos = currentTodo;
  todos.forEach(newTodo => insertTodo(newTodo));
}

//LocalStorage 저장
function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

//데이터 만들기
function submitTodo(e) {
  e.preventDefault();

  const newTodo = {
    id: Date.now(),
    text: todoInput.value,
    check: false
  };

  todos.push(newTodo);
  insertTodo(newTodo);
  save();
}

//추가기능
function insertTodo(newTodo) {
  const li = document.createElement("li");
  const text = document.createElement("span");
  const buttonBox = document.createElement("div");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  li.classList.add("todo-item", newTodo.check);
  li.id = newTodo.id;
  text.innerText = newTodo.text;
  editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  deleteButton.innerHTML = '<i class="fa-solid fa-eraser"></i>';
  todoInput.value = "";

  buttonBox.append(editButton, deleteButton);
  li.append(text, buttonBox);
  todoList.appendChild(li);

  deleteButton.addEventListener("click", deleteTodo);
  editButton.addEventListener("click", editTodo);
  li.addEventListener("click", checkTodo);
}

//삭제기능
function deleteTodo(e) {
  const li = e.target.parentElement.parentElement.parentElement;
  todos = todos.filter(todo => todo.id !== parseInt(li.id));
  li.remove();
  save();
}

//변경기능
function editTodo(e) {
  const li = e.target.parentElement.parentElement.parentElement;
  const text = li.children[0];
  const form = document.createElement("form");
  const input = document.createElement("input")
  
  input.placeholder = text.innerText;
  form.append(input);
  li.prepend(form);
  text.remove();

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const span = document.createElement("span");
    const find = todos.find(todo => todo.id === parseInt(li.id));
    const newText = input.value;

    find.text = newText;
    span.innerText = newText;
    li.prepend(span);
    form.remove();
  });
}