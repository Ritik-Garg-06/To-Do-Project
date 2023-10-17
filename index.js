let HomeTab = document.querySelector(".Home-Name");
let TodayTab = document.querySelector(".Today-task-Name");
let WeekTab = document.querySelector(".Weekly-Tasks-Name");
let NotesTab = document.querySelector(".Notes-Name");
let HomeTab_Content = document.querySelector(".home-tasks-notes");
let TodayTab_Content = document.querySelector(".today-tasks-content");
let WeekTab_Content = document.querySelector(".weekly-tasks-content");
let NotesTab_Content = document.querySelector(".notes-content");
let listContainer = document.querySelector(".right-container ul");
let plus_sign = document.querySelector(".left-lower-contents");
let main_container = document.querySelector(".container");
let prompt = document.querySelector(".Add-Task-Prompt");
let blur = document.querySelector(".blur");
let close = document.querySelector(".Close-Prompt");
let Prompt_add_To_do = document.querySelector(".To-Do");
let Prompt_add_Note = document.querySelector(".Note");
let Note_container = document.querySelector(".Prompt-right-container-Note");
let To_Do_container = document.querySelector(".Prompt-right-container-To-Do");
const rightContainer = document.querySelector(".right-container");
const ulElements = rightContainer.querySelectorAll("ul");
let InputBoxTitle = document.querySelector("#Create-Note-Title");
let InputBoxTitleForEdit = document.querySelector("#Create-Note-Title-forEdit");
let InputBoxDesc = document.querySelector("#Create-Note-Description");
let InputBoxDescForEdit = document.querySelector("#Create-Note-Description-forEdit");
let Update_Prompt = document.querySelector(".edit-container");
let priority = document.querySelectorAll('[name="options"]');
let priorityForEdit = document.querySelectorAll('[name="options-forEdit"]');
let close_edit_prompt = document.querySelector(".close-edit");
let updateButton = document.querySelector(".update-button");
let FormDueDate = document.querySelector("#Create-Note-Due-Date");
let FormDueDateForEdit = document.querySelector("#Create-Note-Due-Date-forEdit");
let curr_tab = HomeTab;
let curr_content = HomeTab_Content;
let taskIndex = 0;

function switchTab(contentList) {
  ulElements.forEach((section) => {
    if (!section.classList.contains("hidden")) {
      section.classList.add("hidden");
    }
  });
  contentList.classList.remove("hidden");
}

let tasks = [];

function addToDo() {
  if (InputBoxTitle.value === "") {
    alert("You must write something!");
  } else {
    // Get the task title and description from the input fields
    const taskText = InputBoxTitle.value;
    const taskDescription = InputBoxDesc.value;

    // Set default values for priority and due date
    let selectedValue = null;

    // Loop through the radio buttons to find the selected one
    for (const radioButton of priority) {
      if (radioButton.checked) {
        selectedValue = radioButton.value;
        break; // Exit the loop once a selected radio button is found
      }
    }// You can customize this later
    console.log(selectedValue);
    const taskDueDate = FormDueDate.value; // Get the current date and time as a default due date

    // Create a JSON object to represent the new task
    const newTask = {
      title: taskText, // Task title
      description: taskDescription, // Task description
      priority: selectedValue, // Task priority (set to default)
      dueDate: taskDueDate, // Task due date (set to the current date and time)
      category: curr_tab.classList.contains("Home-Name")
        ? "Home"
        : curr_tab.classList.contains("Today-task-Name")
        ? "Today"
        : curr_tab.classList.contains("Weekly-Tasks-Name")
        ? "Week"
        : "Other",
    };

    // Add the new task object to the existing tasks array
    tasks.push(newTask);

    // Get the index of the newly added task
    taskIndex = tasks.length - 1;

    // Create an HTML list item for the new task
    const li = document.createElement("li");
    li.textContent = newTask.title; // Display the task title in the list item

    // Store the task's index in the data-index attribute of the list item
    li.dataset.index = taskIndex;

    // Create an "Edit" button for the task
    const span1 = document.createElement("span");
    span1.innerHTML = '<img src="Images/edit.png" class="Update-Data"/>';

    // Create a "Delete" button for the task
    const span2 = document.createElement("span");
    span2.innerText = "\u00d7";
    span2.classList.add("Cross");

    // Add event listeners for the "Edit" and "Delete" buttons
    // span1.addEventListener("click", () => openEdit(taskIndex));
    // span2.addEventListener("click", () => deleteTask(taskIndex));

    // Append the "Edit" and "Delete" buttons to the list item
    li.appendChild(span1);
    li.appendChild(span2);

    // Append the new task item to the current content area (tab's task list)
    curr_content.appendChild(li);
  }

  // Clear the input fields and close the task creation prompt
  InputBoxTitle.value = "";
  InputBoxDesc.value = "";
  ClosePrompt();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks(
    curr_tab.classList.contains("Home-Name")
      ? "Home"
      : curr_tab.classList.contains("Today-task-Name")
      ? "Today"
      : "Week"
  );
}

function renderTasks(category) {
  const taskList = curr_content;
  taskList.innerHTML = ""; // Clear the task list

  tasks
    .filter((task) => task.category === category)
    .forEach((task, index) => {
      const li = document.createElement("li");
      li.textContent = task.title;
      li.dataset.index = index;

      const span1 = document.createElement("span");
      span1.innerHTML = '<img src="Images/edit.png" class="Update-Data"/>';

      const span2 = document.createElement("span");
      span2.innerText = "\u00d7";
      span2.classList.add("Cross");

      // span1.addEventListener("click", (e) =>
      //   openEdit(e.target.parentElement.dataset.index)
      // );
      // span2.addEventListener("click", (e) =>
      //   deleteTask(e.target.parentElement.dataset.index)
      // );

      li.appendChild(span1);
      li.appendChild(span2);

      taskList.appendChild(li);
    });
}

function promptadd() {
  blur.classList.remove("hidden");
  prompt.classList.remove("hidden");
}

function ClosePrompt() {
  blur.classList.add("hidden");
  prompt.classList.add("hidden");
}

function openToDo() {
  if (!Note_container.classList.contains("hidden")) {
    Note_container.classList.add("hidden");
  }
  To_Do_container.classList.remove("hidden");
}

function openNote() {
  if (!To_Do_container.classList.contains("hidden")) {
    To_Do_container.classList.add("hidden");
  }
  Note_container.classList.remove("hidden");
}

function handleItemClick(e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
  }
}
function openEdit(taskIndex) {
  // Get the task object from the tasks array using the provided taskIndex
  console.log(taskIndex);
  const task = tasks[taskIndex];
  console.log(task);

  // Populate the input fields in the edit prompt with task information
  InputBoxTitleForEdit.value = task.title;
  InputBoxDescForEdit.value = task.description;
  FormDueDateForEdit.value = task.dueDate;
  priorityForEdit.value = task.priority;

  // Store the task index for later use when saving the edited task
  taskTextForEditing = taskIndex;

  // Show the edit prompt by removing the "hidden" class
  blur.classList.remove("hidden");
  Update_Prompt.classList.remove("hidden");

  // Add an event listener to the "Update" button in the edit prompt
  updateButton.addEventListener("click",function(){
    editToDo(taskTextForEditing)
  });
}

function editToDo(taskTextForEditing) {
  // Get the modified title and description from the input fields in the edit prompt
  const modifiedTitle = InputBoxTitleForEdit.value;
  const modifiedDescription = InputBoxDescForEdit.value;
  const modifiedDate = FormDueDateForEdit.value;
  const modifiedPriority = null;

    // Loop through the radio buttons to find the selected one
    for (const radioButton of priority) {
      if (radioButton.checked) {
        selectedValue = radioButton.value;
        break; // Exit the loop once a selected radio button is found
      }
    }

  // Get the index of the task you want to edit (this should be stored somewhere, like taskTextForEditing)
  const EditIndex = taskTextForEditing;

  // Update the task with the modified title and description
  tasks[EditIndex].title = modifiedTitle;
  tasks[EditIndex].description = modifiedDescription;
  tasks[EditIndex].dueDate = modifiedDate;
  tasks[EditIndex].priority = modifiedPriority;
  console.log(modifiedPriority);

  renderTasks(curr_tab.classList.contains("Home-Name") ? "Home" : "Today");

  CloseEdit();
}



function CloseEdit() {
  blur.classList.add("hidden");
  Update_Prompt.classList.add("hidden");
}
close_edit_prompt.addEventListener("click", CloseEdit);
plus_sign.addEventListener("click", promptadd);
close.addEventListener("click", ClosePrompt);
Prompt_add_To_do.addEventListener("click", openToDo);
Prompt_add_Note.addEventListener("click", openNote);

attachClickListener(HomeTab_Content);
attachClickListener(TodayTab_Content);
attachClickListener(WeekTab_Content);
attachClickListener(NotesTab_Content);

HomeTab.addEventListener("click", () => {
  switchTab(HomeTab_Content);
  curr_tab = HomeTab;
  curr_content = HomeTab_Content;
});

TodayTab.addEventListener("click", () => {
  switchTab(TodayTab_Content);
  curr_tab = TodayTab;
  curr_content = TodayTab_Content;
});

WeekTab.addEventListener("click", () => {
  switchTab(WeekTab_Content);
  curr_tab = WeekTab;
  curr_content = WeekTab_Content;
});

NotesTab.addEventListener("click", () => {
  switchTab(NotesTab_Content);
  curr_tab = NotesTab;
  curr_content = NotesTab_Content;
});

function attachClickListener(content) {
  content.addEventListener("click", function (e) {
    const listItem = e.target.closest("li");
    if (listItem) {
      if (e.target.tagName === "LI") {
        listItem.classList.toggle("checked");
      } else if (e.target.classList.contains("Update-Data")) {
        console.log(listItem.dataset.index);
        openEdit(listItem.dataset.index);
      } else if (e.target.classList.contains("Cross")) {
        deleteTask(listItem.dataset.index);
      }
    }
  });
}

