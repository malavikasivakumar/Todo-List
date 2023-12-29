const inputbox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");

document.addEventListener("DOMContentLoaded", function () {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => {
    addTaskFromStorage(task);
  });
});

function saveTasksToStorage() {
  const tasks = Array.from(listcontainer.children).map(task => {
    return {
      text: task.querySelector("span").innerHTML,
      checked: task.classList.contains("checked")
    };
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  if (inputbox.value.trim() === "") {
    alert("Fill up the blank!");
  } else {
    let li = createTaskElement(inputbox.value);
    listcontainer.appendChild(li);
    attachCheckboxEventListener(li);
    saveTasksToStorage();
  }

  inputbox.value = "";
}

function addTaskFromStorage(task) {
  let li = createTaskElement(task.text, task.checked);
  listcontainer.appendChild(li);
  attachCheckboxEventListener(li);
}

function createTaskElement(text, checked = false) {
  let li = document.createElement("li");
  li.classList.add("list-item");
  li.classList.toggle("checked", checked);

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = checked;
  li.appendChild(checkbox);

  let taskText = document.createElement("span");
  taskText.innerHTML = text;
  li.appendChild(taskText);

  let line = document.createElement("hr");
  line.classList.add("line");
  li.appendChild(line);

  let span = document.createElement("span");
  span.innerHTML = "\u00d7";
  li.appendChild(span);

  let editButton = document.createElement("button");
  editButton.innerHTML = "Edit";
  editButton.classList.add("edit-button");
  li.appendChild(editButton);

  editButton.addEventListener("click", function () {
    editTask(li);
  });

  span.addEventListener("click", function () {
    li.remove();
    saveTasksToStorage();
  });

  return li;
}

function attachCheckboxEventListener(li) {
  const checkbox = li.querySelector("input[type='checkbox']");
  checkbox.addEventListener("change", function () {
    li.classList.toggle("checked", checkbox.checked);
    saveTasksToStorage();
  });
}

function editTask(li) {
  const currentText = li.querySelector("span").innerHTML;
  inputbox.value = currentText;
  li.style.display = "none";

  let editInput = document.createElement("input");
  editInput.value = currentText;
  li.parentElement.insertBefore(editInput, li);

  let saveButton = document.createElement("button");
  saveButton.innerHTML = "Save";
  li.parentElement.insertBefore(saveButton, li);

  let originalCheckbox = li.querySelector('input[type="checkbox"]');
  let checkbox = originalCheckbox.cloneNode(true);
  checkbox.removeEventListener("change", handleCheckboxChange);

  saveButton.addEventListener("click", function () {
    let newLi = createTaskElement(editInput.value, checkbox.checked);
    listcontainer.appendChild(newLi);

    li.parentElement.replaceChild(newLi, li);
    editInput.remove();
    saveButton.remove();
    attachCheckboxEventListener(newLi);
    saveTasksToStorage();
  });

  checkbox.addEventListener("change", handleCheckboxChange);

  function handleCheckboxChange() {
    li.classList.toggle("checked", checkbox.checked);
  }
}

function deleteAllTasks() {
  listcontainer.innerHTML = "";
  saveTasksToStorage();
}

function deleteCheckedTasks() {
  const checkedItems = document.querySelectorAll(".list-item.checked");
  checkedItems.forEach(item => {
    item.remove();
  });
  saveTasksToStorage();
}

