const todo_form = document.querySelector('.todo_form');
const todo_input = document.querySelector('.todo_form input');
const todo_ul = document.querySelector('.todo_list');
let arrTodo = [];

function saveTodo() {
    localStorage.setItem('todos', JSON.stringify(arrTodo));
}

function deleteTodo(button) {
    const removeLi = button.target.parentElement;
    arrTodo = arrTodo.filter( (newTodo) => String(newTodo.id) !== removeLi.id)
    saveTodo();
    removeLi.remove();
}

function insertTodo(newTodo) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const button = document.createElement('button');

    li.appendChild(span);
    li.appendChild(button);
    li.id = newTodo.id;
    span.innerText = newTodo.text;
    button.innerText = "X";
    todo_ul.appendChild(li);

    button.addEventListener('click', deleteTodo);
}

function submitTodo(event) {
    event.preventDefault();

    const newTodo = {
        text: todo_input.value,
        id: Date.now(),
    };

    todo_input.value = '';
    arrTodo.push(newTodo);
    insertTodo(newTodo);
    saveTodo();
}

todo_form.addEventListener('submit', submitTodo);
const savedTodo = localStorage.getItem('todos');

if(savedTodo !== null) {
    const parsedTodo = JSON.parse(savedTodo);
    
    arrTodo = parsedTodo;
    arrTodo.forEach(insertTodo);
}
