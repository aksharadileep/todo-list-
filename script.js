let tasks = [];
let workoutMinutes = 0;
let waterGlasses = 0;

function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);
    input.value = '';
    renderTasks();
    updateStats();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
        updateStats();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
    updateStats();
}

function renderTasks() {
    const tasksList = document.getElementById('tasksList');
    
    if (tasks.length === 0) {
        tasksList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clipboard-list"></i>
                <p>No tasks yet. Add your first task to get started!</p>
            </div>
        `;
        return;
    }

    tasksList.innerHTML = tasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}">
            <div class="task-checkbox" onclick="toggleTask(${task.id})">
                ${task.completed ? '<i class="fas fa-check"></i>' : ''}
            </div>
            <div class="task-text">${task.text}</div>
            <button class="task-delete" onclick="deleteTask(${task.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    
    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = completed;
    document.getElementById('taskCount').textContent = `${total} task${total !== 1 ? 's' : ''}`;
}

function updateWorkout() {
    const minutes = prompt('How many minutes did you workout?', '30');
    if (minutes && !isNaN(minutes) && minutes > 0) {
        workoutMinutes = parseInt(minutes);
        document.getElementById('workoutDisplay').textContent = workoutMinutes + ' minutes';
    }
}

function addWater() {
    waterGlasses++;
    document.getElementById('waterDisplay').textContent = waterGlasses + ' glass' + (waterGlasses !== 1 ? 'es' : '');
}

function toggleSleep() {
    alert('Remember to get 6 hours of sleep for optimal performance!');
}

document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Initial load
updateStats();
renderTasks();