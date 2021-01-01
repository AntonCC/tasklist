const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

// Load all event listeners
loadEventListeners()
// Local Storage for tasks

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks)
  form.addEventListener('submit', addTask)
  taskList.addEventListener('click', removeTask)
  clearBtn.addEventListener('click', clearTasks)
  filter.addEventListener('keyup', filterTasks)
}

function getTasks() {
  let tasks;
  if(!localStorage.getItem('tasks')) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(task => {
    const li = document.createElement('li')
    li.className = 'collection-item'
    li.innerText = task

    const link = document.createElement('a')
    link.className = 'delete-item secondary-content'
    link.innerHTML = '<i class="fa fa-remove"></i>'
    li.appendChild(link)

    taskList.appendChild(li)
  })
}

function addTask(e) {
  e.preventDefault()
  if(!taskInput.value.trim()) {
    return alert('Please enter a task.')
  }

  const li = document.createElement('li')
  li.className = 'collection-item'
  li.innerText = taskInput.value

  const link = document.createElement('a')
  link.className = 'delete-item secondary-content'
  link.innerHTML = '<i class="fa fa-remove"></i>'

  li.appendChild(link)
  taskList.appendChild(li)

  storeTaskInLocalStorage(taskInput.value)

  taskInput.value = ''
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if(!localStorage.getItem('tasks')) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.push(task)

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function removeTask(e) {
  if(e.target.classList.contains('fa-remove')) {
    let task = e.target.parentNode.parentNode.innerText
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.splice(tasks.indexOf(task))

    localStorage.setItem('tasks', JSON.stringify(tasks))

    e.target.parentNode.parentNode.remove()
  }
}

function clearTasks(e) {
  taskList.innerHTML = ''
  localStorage.removeItem('tasks')
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase()

  document
  .querySelectorAll('.collection-item')
  .forEach(task => {
    const item = task.textContent

    if(!item.includes(text)) {
      task.style.display = 'none'
    } else {
      task.style.display = 'block'
    }
  })
}



