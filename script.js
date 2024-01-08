// script.js

// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Get references to HTML elements
    const addButton = document.getElementById('add-task-btn');
    const inputField = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Add event listeners to the "Add" button and input field for handling tasks
    addButton.addEventListener('click', () => addTask());
    inputField.addEventListener('keyup', (event) => {
        // Add task when the Enter key is pressed
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Function to add a new task to the task list
    function addTask() {
        // Get the trimmed text from the input field
        const taskText = inputField.value.trim();
        // Check if the input is not empty
        if (taskText) {
            // Create a new list item with task content
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <input type="checkbox" class="mark-complete">
                <span class="task-text">${taskText}</span>
                <div>
                    <i class="fas fa-edit edit-task"></i>
                    <i class="fas fa-trash-alt delete-task"></i>
                </div>
            `;
            // Append the new list item to the task list
            taskList.appendChild(listItem);
            // Clear the input field
            inputField.value = '';
            // Add event listeners to the new task item
            addTaskListeners(listItem);
            // Display an alert confirming the task addition
            alert('Task added!');
        }
    }

    // Function to add event listeners to specific elements within a task item
    function addTaskListeners(taskItem) {
        // Get references to delete button, edit button, checkbox, and task text
        const deleteButton = taskItem.querySelector('.delete-task');
        const editButton = taskItem.querySelector('.edit-task');
        const checkBox = taskItem.querySelector('.mark-complete');
        const taskText = taskItem.querySelector('.task-text');

        // Event listener for deleting a task
        deleteButton.addEventListener('click', () => {
            // Confirm deletion with a prompt and remove the task item if confirmed
            if (confirm("Are you sure you want to delete this task?")) {
                taskItem.remove();
            }
        });

        // Event listener for editing a task
        editButton.addEventListener('click', () => editTask(taskItem, taskText));

        // Event listener for marking a task as complete or incomplete
        checkBox.addEventListener('change', () => {
            taskItem.classList.toggle('task-completed', checkBox.checked);
        });
    }

    // Function to edit the text content of a task
    function editTask(taskItem, taskTextElement) {
        // Prompt the user to enter new text for the task, using the current text as the default value
        const newText = prompt("Edit your task:", taskTextElement.textContent);
        // Update the task text if a new text is provided and the prompt is not canceled
        if (newText !== null) {
            taskTextElement.textContent = newText;
        }
    }
});
