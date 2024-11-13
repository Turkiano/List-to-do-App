//global variables
let toDos = [];

const form = document.getElementById("add-todo");
const ul = document.createElement("ul");

//Save in Local storage
const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(toDos));
};

// Load saved tasks from local storage on page load
window.addEventListener("load", (e) => {
  // Retrieve tasks from local storage, or initialize with an empty array if no tasks are saved
  const savedTasks = localStorage.getItem("tasks");
  toDos = savedTasks ? JSON.parse(savedTasks) : [];

  // Render the tasks after loading from local storage
  renderTodos(toDos);
});

//to render input values
function renderTodos(array) {
  const container = document.querySelector(".taskContainer"); //to target the div class in HTML file
  ul.classList.add("taskList");
  ul.innerHTML = ""; // Clear the existing list to prevent duplication
  container.appendChild(ul); //to include uordered list into the container

  //to loop through the array
  array.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("task");

    const span = document.createElement("span"); //1. Declaring the [span] tag
    span.textContent = task; //  2.targeting all the task to be inside the span tag.

    const checkbox = createCheckbox();
    const taskLabel = document.createElement("div");
    taskLabel.classList.add("taskLable");
    taskLabel.appendChild(checkbox);
    taskLabel.appendChild(span);

    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("button-group");
    const deleteBtn = createDeleteButton();
    const editBtn = createEditButton();
    buttonGroup.appendChild(editBtn);
    buttonGroup.appendChild(deleteBtn);

    //3. Append span into list
    li.appendChild(taskLabel);
    li.appendChild(buttonGroup);

    ul.appendChild(li); // Append each list item to the unordered list
  });
  updateStats(); // Initial update to stats
  saveTasks();
}

//to render taks, every time we load
window.addEventListener("load", (e) => {
  renderTodos(toDos);
  saveTasks();
});

//to add new values to the list
function addTodo(value) {
  const ul = document.querySelector(".taskList");
  const li = document.createElement("li");
  const span = document.createElement("span"); //1. Declaring the [span] tag

  toDos.push(value); //to add the new value to the main array
  span.textContent = value; //to show the new tasks in the <li> tag
  li.classList.add("task");

  const checkbox = createCheckbox();
  const taskLabel = document.createElement("div");

  const buttonGroup = document.createElement("div");
  buttonGroup.classList.add("button-group");
  const deleteBtn = createDeleteButton();
  const editBtn = createEditButton();
  buttonGroup.appendChild(editBtn);
  buttonGroup.appendChild(deleteBtn);

  taskLabel.classList.add("taskLable");
  taskLabel.appendChild(checkbox);
  taskLabel.appendChild(span);

  li.appendChild(taskLabel);
  li.appendChild(buttonGroup);

  ul.appendChild(li);
  updateStats(); // Update stats when a new task is added
  saveTasks();
}

//to remove an item from the list
function removeToDo(selectedToDo) {
  // console.log("The selected Task: " + selectedToDo);
  const filteredToDo = toDos.filter((toDo) => {
    return toDo !== selectedToDo;
  });

  ul.innerHTML = ""; //to remove the deleted task
  toDos = filteredToDo; //to updated the tasks

  renderTodos(filteredToDo); //to render the list after removing
  updateStats(); // Update stats when a task is removed
  saveTasks();
}

//to capture the new value, when submitting
form.addEventListener("submit", (Element) => {
  const value = document.querySelector(".toDo-input").value;
  addTodo(value);
  Element.preventDefault();
});

function createDeleteButton() {
  const deleteBtn = document.createElement("button");
  const deleteImg = document.createElement("img");
  deleteBtn.classList.add("deleteBtn");

  deleteImg.src = "img/delete_icon.png";
  deleteImg.alt = "Delete";
  deleteImg.width = 20;
  deleteImg.height = 20;
  deleteBtn.appendChild(deleteImg);

  // Attach event listener to the delete button
  deleteBtn.addEventListener("click", (e) => {
    const selectedToDo = e.target
      .closest("li")
      .querySelector("span").textContent;
    removeToDo(selectedToDo);
  });

  return deleteBtn;
}

function createEditButton() {
  const editBtn = document.createElement("button");
  const editImg = document.createElement("img");
  editBtn.classList.add("editBtn");

  editImg.src = "img/edit_icon.png";
  editImg.alt = "Delete";
  editImg.width = 20;
  editImg.height = 20;
  editBtn.appendChild(editImg);

  // Attach event listener to the edit button
  editBtn.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    const span = li.querySelector("span");
    editToDo(span);
  });

  return editBtn;
}

function createCheckbox() {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");

  checkbox.addEventListener("change", (e) => {
    if (checkbox.checked) {
      e.target.closest("li").classList.add("completed");
    } else {
      e.target.closest("li").classList.remove("completed");
    }
    updateStats(); // Update stats when a task is removed
  });

  return checkbox;
}

// Function to edit a task
function editToDo(span) {
  const originalText = span.textContent;
  const input = document.createElement("input");
  input.type = "text";
  input.value = originalText;

  span.replaceWith(input);
  input.focus();

  // Listen for 'Enter' key to save the edit
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      saveEdit(input, span);
    }
  });

  // Alternatively, handle blur event to save the edit
  input.addEventListener("blur", () => {
    saveEdit(input, span);
  });
}

// Save the edited task
function saveEdit(input, span) {
  const newValue = input.value.trim();

  if (newValue) {
    span.textContent = newValue;
    input.replaceWith(span);

    // Update the main array
    const index = toDos.indexOf(input.defaultValue);
    if (index > -1) {
      toDos[index] = newValue;
    }
  } else {
    // If empty, revert back to original text
    input.replaceWith(span);
  }
}

const updateStats = () => {
  const totalTasks = toDos.length;
  const completeTask = document.querySelectorAll(".checkbox:checked").length;
  const progressPrecentage =
    totalTasks === 0 ? 0 : Math.round((completeTask / totalTasks) * 100);
  console.log(progressPrecentage);

  //Update progress bar width
  document.getElementById("progress").style.width = `${progressPrecentage}%`;

  //Update percentage and tasks count text
  document.getElementById("numbers").textContent = `${Math.round(
    progressPrecentage
  )}%`;
  document.querySelector(
    ".tasksNo"
  ).textContent = `${completeTask}/${totalTasks}`;

  if (toDos.length && completeTask === totalTasks) {
    blashConfetti();
  }
};

//Celebration complated tasks (animation)
const blashConfetti = () => {
  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  confetti({
    angle: randomInRange(55, 125),
    spread: randomInRange(50, 70),
    particleCount: randomInRange(50, 100),
    origin: { y: 0.6 },
  });
};
