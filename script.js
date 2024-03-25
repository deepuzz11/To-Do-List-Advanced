let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="checkbox" onclick="toggleCompleted(${index})" ${task.completed ? 'checked' : ''}>
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <span class="due-date">${task.dueDate ? 'Due: ' + task.dueDate : ''}</span>
            <div>
                <button onclick="editTask(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    const dueDate = document.getElementById('dueDate').value;

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    tasks.push({ text: taskText, completed: false, dueDate: dueDate });
    taskInput.value = '';
    document.getElementById('dueDate').value = '';
    renderTasks();
}

function toggleCompleted(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function editTask(index) {
    const newText = prompt('Enter new task text:', tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText.trim();
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function clearAllTasks() {
    if (confirm('Are you sure you want to clear all tasks?')) {
        tasks = [];
        renderTasks();
    }
}

renderTasks();
