//ggggg

const inputbox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");

function addTask() {
  if (inputbox.value.trim() === "") {
    alert("Fill up the blank!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputbox.value;
    li.classList.add("list-item");

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

  saveButton.addEventListener("click", function () {
    let newLi = document.createElement("li");
    newLi.innerHTML = editInput.value;
    newLi.classList.add("list-item");

    let line = document.createElement("hr");
    line.classList.add("line");
    newLi.appendChild(line);

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

listcontainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
    }
  },
  false
);
