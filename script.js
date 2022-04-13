import StorageUpdater from "./StorageUpdater.js";
import toggleClass from "./Utilities.js";

const storage = new StorageUpdater();

const tasks = storage.tasks;

const container = document.querySelector(".tasks");
const template = document.querySelector("#task");

const createForm = document.querySelector(".create-task");
const inputField = document.querySelector(".create-task-textarea");
const createButton = document.querySelector(".create-task-submit");


tasks.forEach((data) => {
  createTask({ data });
});


inputField.addEventListener("input", () => {
  createButton.disabled = !inputField.value;
});


createForm.addEventListener("submit", (element) => {
 element.preventDefault(); 
  //without preventDefault, page would reload on each submit
 
  const value = inputField.value; //value method
  
  if (value) {
    const data = {
      value,
      checked: false,
    };
    
    storage.create(data);

    createTask({ data });

    createForm.reset();
  }
});


function createTask({ data }) {

  const clone = template.content.cloneNode(true);

  const task = clone.querySelector(".task");
  const checkbox = clone.querySelector(".checkbox");
  const taskText = clone.querySelector(".task-text");
  const deleteButton = clone.querySelector(".task-delete");

  taskText.innerHTML = data.value;

  checkbox.checked = data.checked;
  if (checkbox.checked) {
    task.classList.add("task--done");
  }

  checkbox.addEventListener("input", () => {
    data.checked = checkbox.checked;

    toggleClass(data.checked, task, "task--done");

    storage.update(data);
  });

  taskText.addEventListener("input", () => {
    data.value = taskText.innerHTML;

    storage.update(data);
  });

  deleteButton.addEventListener("click", () => {
    storage.delete(data);

    task.remove();
  });

  container.appendChild(clone);
}
