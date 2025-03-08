const tasksContainer = document.getElementById('tasksContainer');
const taskInput = document.getElementById('taskInput');
const submitBtn = document.getElementById('submitBtn');
const sortBtn = document.getElementById('sortBtn')

const toDoList = [];
// adds a todo item to the array, and creats a new element
function addTodo(taskText) {
    toDoList.push ({
        name : taskText,
        uniqueId : 0
    });
    updateUniqueId();
    createTaskElements(taskText);
    elementUniqueId();
};
// create vars that sore ele info > adding classes to elements to use HTML Collections for removing items of class> adding checkbox/removeBtns > adding event listeners for them as well > appending all the sht to the tasklist container
function createTaskElements(taskText) {
    // vars for element creation
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
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'complete';
    completeBtn.classList.add('completeBtns');
    completeBtn.style.display = 'none';
    const removeBtns = document.getElementsByClassName('removeBtns');
    const completeBtns = document.getElementsByClassName('completeBtns');
    taskCheckBox.addEventListener('change', function(e) {
        if (e.target.checked) {
            removeBtns[e.target.parentElement.id].style.display = 'inline-block';
            completeBtns[e.target.parentElement.id].style.display = 'inline-block';
        } else {
            removeBtns[e.target.parentElement.id].style.display = 'none';
            completeBtns[e.target.parentElement.id].style.display = 'none';
        }
    });
    //adding event listeners within the function, I do not know if I can access these from outside so I did it here
    removeBtn.addEventListener('click', function(e) {
        toDoList.splice(e.target.parentElement.id, 1);
        e.target.parentElement.remove();
        updateUniqueId();
        elementUniqueId();
    });

    completeBtn.addEventListener('click', function(e) {
        e.target.parentElement.style.background = 'green';
    })
    // appending a single task to task container
    taskDiv.appendChild(taskCheckBox);
    taskDiv.appendChild(taskP);
    taskDiv.appendChild(completeBtn);
    taskDiv.appendChild(removeBtn);
    tasksContainer.appendChild(taskDiv);
};
// function to loop through toDoList and add or update unique Ids in sequencial order. I call this if we sort, or remove an item to make sure ids are always 1,2,3...
function updateUniqueId() {
    for (let i = 0; i < toDoList.length; i++) {
        toDoList[i].uniqueId = i;
    };
};
// sorts toDoList array, updates the ids in seq. order, removes all divs then re-creates them in sorted order
function sort() {
    toDoList.sort((a, b) => a.name.localeCompare(b.name));
    updateUniqueId();
    tasksContainer.innerHTML = '';
    for (let i = 0; i < toDoList.length; i++) {
        createTaskElements(toDoList[i].name);
    };
    elementUniqueId();
};
// adds ids to div elements that match unique ids from toDoList
const taskDivs = document.getElementsByClassName('taskDivs')
function elementUniqueId() { 
    for (let i = 0; i < toDoList.length; i++) {
        taskDivs[i].id = toDoList[i].uniqueId;
    };
};

function onLoad() {
submitBtn.addEventListener('click', function(e) {
    e.preventDefault();
    addTodo(taskInput.value);
    taskInput.value = '';
});

sortBtn.addEventListener('click', function(e) {
    e.preventDefault();
    sort();
})
};

onLoad();