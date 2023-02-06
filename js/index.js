const todo_form = document.querySelector('.todo_form');
const todo_input = document.querySelector('.todo_form input');
const todo_ul = document.querySelector('.todo_list');
let arrTodo = [];

function saveTodo() {
    localStorage.setItem('todos', JSON.stringify(arrTodo));
}

function checkedTodo(check) {
    const parentLi = check.target.parentElement;
    const backgroundImage = parentLi.querySelector('span:nth-child(1)');
    let currentCheck = parentLi.querySelector('span:nth-child(2)');
    let cnt = 0;

    for(let i = 0; i < arrTodo.length; i++) {
        if(String(arrTodo[i].id) === parentLi.id) {
            cnt = i;
        }
    }

    if(currentCheck.className === 'false') {
        currentCheck.className = 'true';
        arrTodo[cnt].check = 'true';
        backgroundImage.classList.add('checked');
    } else {
        currentCheck.className = 'false';
        arrTodo[cnt].check = 'false';
        backgroundImage.classList.remove('checked');
    }

    saveTodo();
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
    const checkbox = document.createElement('span');

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(button);
    li.id = newTodo.id;
    span.classList.add(newTodo.check);

    if(span.className === 'true') {
        checkbox.classList.add('checked');
    }

    span.innerText = newTodo.text;
    button.innerText = "X";
    todo_ul.appendChild(li);

    button.addEventListener('click', deleteTodo);
    checkbox.addEventListener('click', checkedTodo);
}

function submitTodo(event) {
    event.preventDefault();

    const newTodo = {
        text: todo_input.value,
        id: Date.now(),
        check: false,
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