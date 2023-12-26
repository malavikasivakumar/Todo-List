const inputbox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");

function addTask() {
  if (inputbox.value.trim() === "") {
    alert("Fill up the blank!");
  } else {
    let li = document.createElement("li");
    li.classList.add("list-item");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function () {
      li.classList.toggle("checked", checkbox.checked);
    });

    li.appendChild(checkbox);

    let taskText = document.createElement("span");
    taskText.innerHTML = inputbox.value;
    li.appendChild(taskText);

    let line = document.createElement("hr");
    line.classList.add("line");
    li.appendChild(line);

    listcontainer.appendChild(li);

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
    });
  }

  inputbox.value = "";
}

function editTask(li) {
  const currentText = li.firstChild.nodeValue;
  inputbox.value = currentText;
  li.style.display = "none";

  let editInput = document.createElement("input");
  editInput.value = currentText;
  li.parentElement.insertBefore(editInput, li);

  let saveButton = document.createElement("button");
  saveButton.innerHTML = "Save";
  li.parentElement.insertBefore(saveButton, li);

  // Clone the checkbox from the original li
  let checkbox = li.querySelector('input[type="checkbox"]').cloneNode(true);

  saveButton.addEventListener("click", function () {
    let newLi = document.createElement("li");
    newLi.classList.add("list-item");

    // Append the cloned checkbox to the new li
    newLi.appendChild(checkbox.cloneNode(true));

    let taskText = document.createElement("span");
    taskText.innerHTML = editInput.value;
    newLi.appendChild(taskText);

    let line = document.createElement("hr");
    line.classList.add("line");
    newLi.appendChild(line);

    listcontainer.appendChild(newLi);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    newLi.appendChild(span);

    let editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.classList.add("edit-button");
    newLi.appendChild(editButton);

    editButton.addEventListener("click", function () {
      editTask(newLi);
    });

    span.addEventListener("click", function () {
      newLi.remove();
    });

    li.parentElement.replaceChild(newLi, li);
    editInput.remove();
    saveButton.remove();
  });
}

function deleteAllTasks() {
  listcontainer.innerHTML = "";
}

function deleteCheckedTasks() {
  const checkedItems = document.querySelectorAll(".list-item.checked");
  checkedItems.forEach(item => item.remove());
}

listcontainer.addEventListener(
  "click",
  function (e) {
    const li = e.target.closest("li");

    if (li) {
      const checkbox = li.querySelector('input[type="checkbox"]');

      if (checkbox) {
        if (e.target === checkbox) {
          li.classList.toggle("checked", checkbox.checked);
        } else {
          checkbox.checked = !checkbox.checked;
          li.classList.toggle("checked", checkbox.checked);
        }
      }
    }
  },
  false
);
