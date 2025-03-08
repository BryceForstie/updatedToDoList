const tasksContainer = document.getElementById('tasksContainer');
const taskInput = document.getElementById('taskInput');
const submitBtn = document.getElementById('submitBtn');
const sortBtn = document.getElementById('sortBtn')

const toDoList = [];

function addTodo(taskText) {
    toDoList.push ({
        name : taskText,
        checked : false,
        uniqueId : 0
    });
    updateUniqueId();
    createTaskElements(taskText);
    elementUniqueId();
};

function createTaskElements(taskText) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('taskDivs')
    const taskP = document.createElement('taskP');
    taskP.textContent = taskText;
    const taskCheckBox = document.createElement('input');
    taskCheckBox.type = 'checkbox';
    taskCheckBox.classList.add('taskCheckBoxs');
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'remove';
    removeBtn.classList.add('removeBtns');
    removeBtn.style.display = 'none';

    const removeBtns = document.getElementsByClassName('removeBtns')
    taskCheckBox.addEventListener('change', function(e) {
        if (e.target.checked) {
            removeBtns[e.target.parentElement.id].style.display = 'inline-block';
        } else {
            removeBtns[e.target.parentElement.id].style.display = 'none';
        }
    });

    removeBtn.addEventListener('click', function(e) {
        toDoList.splice(e.target.parentElement.id, 1);
        e.target.parentElement.remove();
        updateUniqueId();
        elementUniqueId();
    });

    taskDiv.appendChild(taskCheckBox);
    taskDiv.appendChild(taskP);
    taskDiv.appendChild(removeBtn);
    tasksContainer.appendChild(taskDiv);
};

function updateUniqueId() {
    for (let i = 0; i < toDoList.length; i++) {
        toDoList[i].uniqueId = i;
    };
};

function resetDisplay() {
    tasksContainer.innerHTML = '';
    for (let i = 0; i < toDoList.length; i++) {
        createTaskElements(toDoList[i].name);
    };
    elementUniqueId();
};

function sort() {
    toDoList.sort((a, b) => a.name.localeCompare(b.name));
    updateUniqueId();
    resetDisplay();
};

const taskDivs = document.getElementsByClassName('taskDivs')
function elementUniqueId() { 
    for (let i = 0; i < toDoList.length; i++) {
        taskDivs[i].id = toDoList[i].uniqueId;
    };
};

submitBtn.addEventListener('click', function(e) {
    e.preventDefault();
    addTodo(taskInput.value);
    taskInput.value = '';
});

sortBtn.addEventListener('click', function(e) {
    e.preventDefault();
    sort();
})