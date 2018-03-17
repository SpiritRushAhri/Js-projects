// Andrew Fancett 2-24-2018

// Define UI variables
// Select id with # select class with .

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load event listeners
loadEventListeners();

// Create function loadEventListeners
function loadEventListeners(){
  // Add task event
  form.addEventListener('submit',addTask);
  // For deleting tasks we need to use event delegation because there are multiple tasks and the list itself is dynamic
  // Remove task event
  taskList.addEventListener('click',removeTask);
  // Clear all tasks event
  clearButton.addEventListener('click',clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup',filterTasks);
  // DOM load event for storage
  document.addEventListener('DOMContentLoaded',getTasks);
}
// Add Task function takes in event object
function addTask(e){
  if(taskInput.value === ''){
    alert('Add a task');
  }
  // Create task which is li element
  const li = document.createElement('li');
  // Add class to li element
  li.className = 'collection-item';
  // Create the text node and append to li element
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class to link element
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append link to li element
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);

  // Store tasks in localstorage
  storeTask(taskInput.value);
  // Clear input for new task
  taskInput.value = '';
  // prevent default form behavior
  e.preventDefault();
}
// Store task function
function storeTask(task){
  let tasks;
  // check ls for any existing tasks
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }
  // If there are tasks store them, ls can only do strings
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  // Put tasks into array
  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));
}
// Get tasks from localStorage function
function getTasks(){
  let tasks;
  // check ls for any existing tasks
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }
  // If there are tasks store them, ls can only do strings
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  // loop through tasks that are there and add/create them
  tasks.forEach(function(task){
    // Create task which is li element
    const li = document.createElement('li');
    // Add class to li element
    li.className = 'collection-item';
    // Create the text node and append to li element
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class to link element
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li element
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
  });
}
// Remove task function
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    // targets i tag, to remove we want to take out the element completely, parent of i tag is a tag parent of a tag is ul!
    if(confirm('Are you sure you wish to delete item?')){
      e.target.parentElement.parentElement.remove();
      // Remove from localStorage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}
// Remove task from localStorage function
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  // check ls for any existing tasks
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }
  // If there are tasks store them, ls can only do strings
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    // Check if text is the same as task item
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Clear Tasks function
function clearTasks(){
  // Two ways
  // taskList.innerHTML = '';
  // Faster way to clear using loop
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
  // Clear from localStorage
  clearTasksFromLocalStorage();
}
// Clear tasks from localStorage function
function clearTasksFromLocalStorage(){
  localStorage.clear();
}
function filterTasks(e){
  // Get the value being typed in, use to lower case for easier matching
  const text = e.target.value.toLowerCase();

  // Get a list of all collection items to loop through and compare
  // Possible to use forEach because querySelectorAll returns a nodelist which can be looped through unlike an html collection which we would need to convert to array
  document.querySelectorAll('.collection-item').forEach(
    function(task){
      const item = task.firstChild.textContent;
      //if there is a match display, else do not display
      if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
      }
      else {
        task.style.display = 'none';
      }
    });
  }
