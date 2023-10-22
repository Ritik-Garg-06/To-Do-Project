//COMMON SELECTORS

let blur = document.querySelector(".blur");

// ADD TO-DO SELECTORS

let prompt = document.querySelector(".Add-Task-Prompt");
let close = document.querySelector(".Close-Prompt");
let Prompt_add_To_do = document.querySelector(".To-Do");
let Prompt_add_Note = document.querySelector(".Note");
let To_Do_container = document.querySelector(".Prompt-right-container-To-Do");
let InputBoxTitle = document.querySelector("#Create-Note-Title");
let InputBoxDesc = document.querySelector("#Create-Note-Description");
let priority = document.querySelectorAll('[name="options"]');
let FormDueDate = document.querySelector("#Create-Note-Due-Date");

// EDIT CONTAINER SELECTORS

let InputBoxTitleForEdit = document.querySelector("#Create-Note-Title-forEdit");
let InputBoxDescForEdit = document.querySelector(
  "#Create-Note-Description-forEdit"
);
let Update_Prompt = document.querySelector(".edit-container");
let priorityForEdit = document.querySelectorAll('[name="options-forEdit"]');
let close_edit_prompt = document.querySelector(".close-edit");
let updateButton = document.querySelector(".update-button");
let FormDueDateForEdit = document.querySelector(
  "#Create-Note-Due-Date-forEdit"
);

// NOTE CONTAINER SELECTORS

let Note_container = document.querySelector(".Prompt-right-container-Note");
let InputBoxTitleForNote = document.querySelector("#Create-Note-Title-forNote");
let InputBoxDescForNote = document.querySelector(
  "#Create-Note-Description-forNote"
);

//DETAIL CONTAINER SELECTORS

let DetailsContainer = document.querySelector(".details-container");
let detailsHeading = document.querySelector(".details-heading");
let detailsDescription = document.querySelector(".details-Description");
let detailDate = document.querySelector(".details-date");
let CloseDetails = document.querySelector(".cross-Details");

//MAIN CONATAINER SELECTORS

let plus_sign = document.querySelector(".left-lower-contents");
let main_container = document.querySelector(".container");
let HomeTab = document.querySelector(".Home-Name");
let TodayTab = document.querySelector(".Today-task-Name");
let WeekTab = document.querySelector(".Weekly-Tasks-Name");
let NotesTab = document.querySelector(".Notes-Name");
let HomeTab_Content = document.querySelector(".home-tasks-notes");
let HomeTab_Count = document.querySelector(".Home-count");
let TodayTab_Count = document.querySelector(".Today-count");
let WeeklyTab_Count = document.querySelector(".Weekly-count");
let NotesTab_Count = document.querySelector(".Notes-count");
let TodayTab_Content = document.querySelector(".today-tasks-content");
let WeekTab_Content = document.querySelector(".weekly-tasks-content");
let NotesTab_Content = document.querySelector(".notes-content");
let rightContainer = document.querySelector(".right-container");
let ulElements = rightContainer.querySelectorAll("ul");
let MainContainerLeft = document.querySelector(".Main-container-left-ul");
let MainContainerLeftUL = MainContainerLeft.querySelectorAll("li");

// DONE TILL HERE

let curr_tab = HomeTab;
curr_tab.classList.add("selected_value");

let curr_content = HomeTab_Content;
let taskIndex = 0;
let noteIndex = 0;

function switchTab(contentList, tabi) {
  ulElements.forEach((section) => {
    if (!section.classList.contains("hidden")) {
      section.classList.add("hidden");
    }
  });

  MainContainerLeftUL.forEach((li) => {
    const span = li.querySelector("span");
    if (span.classList.contains("selected_value")) {
      span.classList.remove("selected_value");
    }
  });
  contentList.classList.remove("hidden");
  tabi.classList.add("selected_value");
}

let tasks = [];
function addToDo() {
  if (InputBoxTitle.value === "") {
    alert("You must write something!");
  } else {
    const taskText = InputBoxTitle.value;
    const taskDescription = InputBoxDesc.value;

    let selectedValue = null;

    for (const radioButton of priority) {
      if (radioButton.checked) {
        selectedValue = radioButton.value;
        break;
      }
    }

    const taskDueDate = FormDueDate.value;

    const newTask = {
      title: taskText,
      description: taskDescription,
      priority: selectedValue,
      dueDate: taskDueDate,
      checked: false,
      category: curr_tab.classList.contains("Home-Name")
        ? "Home"
        : curr_tab.classList.contains("Today-task-Name")
        ? "Today"
        : curr_tab.classList.contains("Weekly-Tasks-Name")
        ? "Week"
        : "Other",
    };

    tasks.push(newTask);

    taskIndex = tasks.length - 1;

    const li = document.createElement("li");
    li.textContent = newTask.title;

    if (tasks.length != 0) {
      HomeTab_Count.innerText = tasks.length;
    } else {
      HomeTab_Count.innerText = "";
    }

    if (tasks.filter((task) => task.category === "Today").length != 0) {
      TodayTab_Count.innerText = tasks.filter(
        (task) => task.category === "Today"
      ).length;
    }

    if (tasks.filter((task) => task.category === "Week").length != 0) {
      WeeklyTab_Count.innerText = tasks.filter(
        (task) => task.category === "Week"
      ).length;
    }

    if (tasks.filter((task) => task.category === "Today").length == 0) {
      TodayTab_Count.innerText = "";
    }

    if (tasks.filter((task) => task.category === "Week").length == 0) {
      WeeklyTab_Count.innerText = "";
    }

    li.dataset.index = taskIndex;

    const span1 = document.createElement("span");
    span1.innerHTML = '<img src="Images/edit.png" class="Update-Data"/>';

    const span2 = document.createElement("span");
    span2.innerText = "\u00d7";
    span2.classList.add("Cross");

    const span3 = document.createElement("span");
    span3.innerText = newTask.dueDate;
    span3.classList.add("Li-Date");

    const span4 = document.createElement("div");
    span4.innerText = "Details";
    span4.classList.add("Details-ToDo");

    li.appendChild(span1);
    li.appendChild(span2);
    li.appendChild(span3);
    li.appendChild(span4);

    li.classList.add("list-item-with-border");
    li.style.setProperty("--border-color", selectedValue);

    if (curr_tab == TodayTab) {
      HomeTab_Content.appendChild(li);
      var liClone = li.cloneNode(true);
      TodayTab_Content.appendChild(liClone);
    } else if (curr_tab == WeekTab) {
      HomeTab_Content.appendChild(li);
      var liClone2 = li.cloneNode(true);
      WeekTab_Content.appendChild(liClone2);
    } else if (curr_tab == HomeTab) {
      HomeTab_Content.appendChild(li);
    }
  }

  InputBoxTitle.value = "";
  InputBoxDesc.value = "";

  for (radioButton of priority) {
    radioButton.checked = false;
  }
  ClosePrompt();
}

let notes = [];

function addNote() {
  if (InputBoxTitleForNote.value === "") {
    alert("You must write something in Note!");
  } else {
    const taskText = InputBoxTitleForNote.value;
    const taskDescription = InputBoxDescForNote.value;

    let selectedValue = null;

    const newNote = {
      title: taskText,
      description: taskDescription,
    };

    notes.push(newNote);

    noteIndex = notes.length - 1;

    NotesTab_Count.innerText = notes.length;
    console.log(notes.length);

    const noteDiv = document.createElement("div");
    const noteUpperContainer = document.createElement("div");
    const noteTitle = document.createElement("div");
    const noteUpperContainerTools = document.createElement("div");
    const span2 = document.createElement("span");
    span2.innerText = "\u00d7";
    span2.classList.add("Cross-Note");
    const noteDesc = document.createElement("div");

    noteDiv.classList.add("Note-container");
    noteTitle.classList.add("Note-Title");
    noteDesc.classList.add("Note-Desc");
    noteDesc.contentEditable = true;
    noteUpperContainer.classList.add("noteUpperContainer");

    noteTitle.textContent = newNote.title;
    noteDesc.textContent = newNote.description;

    noteDiv.dataset.index = noteIndex;

    noteUpperContainerTools.appendChild(span2);
    noteUpperContainer.appendChild(noteTitle);
    noteUpperContainer.appendChild(noteUpperContainerTools);
    noteDiv.appendChild(noteUpperContainer);
    noteDiv.appendChild(noteDesc);

    span2.addEventListener("click", function () {
      const noteDiv = this.closest(".Note-container");
      if (noteDiv) {
        const noteIndex = noteDiv.dataset.index;
        deleteNote(noteIndex);
      }
    });

    NotesTab_Content.insertBefore(noteDiv, NotesTab_Content.firstChild);
  }

  InputBoxTitleForNote.value = "";
  InputBoxDescForNote.value = "";

  ClosePrompt();
}

function renderNote() {
  NotesTab_Content.innerHTML = "";
  if (notes.length == "0") {
    NotesTab_Count.innerText = "";
  }
  NotesTab_Count.innerText = notes.length;
  notes.forEach((note, index) => {
    console.log(notes.length);
    const noteDiv = document.createElement("div");
    const noteUpperContainer = document.createElement("div");
    const noteTitle = document.createElement("div");
    const noteUpperContainerTools = document.createElement("div");
    const span2 = document.createElement("span");
    span2.innerText = "\u00d7";
    span2.classList.add("Cross-Note");
    const noteDesc = document.createElement("div");

    noteDiv.classList.add("Note-container");
    noteTitle.classList.add("Note-Title");
    noteDesc.classList.add("Note-Desc");
    noteDesc.contentEditable = true;
    noteUpperContainer.classList.add("noteUpperContainer");

    noteTitle.textContent = note.title;
    noteDesc.textContent = note.description;

    noteDiv.dataset.index = index;

    noteUpperContainerTools.appendChild(span2);
    noteUpperContainer.appendChild(noteTitle);
    noteUpperContainer.appendChild(noteUpperContainerTools);
    noteDiv.appendChild(noteUpperContainer);
    noteDiv.appendChild(noteDesc);

    span2.addEventListener("click", function () {
      const noteDiv = this.closest(".Note-container");
      if (noteDiv) {
        const noteIndex = noteDiv.dataset.index;
        deleteNote(noteIndex);
      }
    });

    NotesTab_Content.insertBefore(noteDiv, NotesTab_Content.firstChild);
  });
}

function deleteNote(index) {
  notes.splice(index, 1);
  renderNote();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}
function renderTasks() {
  // Clear all category containers
  HomeTab_Content.innerHTML = "";
  TodayTab_Content.innerHTML = "";
  WeekTab_Content.innerHTML = "";

  if (tasks.length != 0) {
    HomeTab_Count.innerText = tasks.length;
  } else {
    HomeTab_Count.innerText = "";
  }

  if (tasks.filter((task) => task.category === "Today").length != 0) {
    TodayTab_Count.innerText = tasks.filter(
      (task) => task.category === "Today"
    ).length;
  }

  if (tasks.filter((task) => task.category === "Week").length != 0) {
    WeeklyTab_Count.innerText = tasks.filter(
      (task) => task.category === "Week"
    ).length;
  }

  if (tasks.filter((task) => task.category === "Today").length == 0) {
    TodayTab_Count.innerText = "";
  }

  if (tasks.filter((task) => task.category === "Week").length == 0) {
    WeeklyTab_Count.innerText = "";
  }

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.title;
    let selectedValue = task.priority;
    li.dataset.index = index;

    const span1 = document.createElement("span");
    span1.innerHTML = '<img src="Images/edit.png" class="Update-Data"/>';

    const span2 = document.createElement("span");
    span2.innerText = "\u00d7";
    span2.classList.add("Cross");

    const span3 = document.createElement("span");
    span3.innerText = task.dueDate;
    span3.classList.add("Li-Date");

    const span4 = document.createElement("div");
    span4.innerText = "Details";
    span4.classList.add("Details-ToDo");

    li.appendChild(span1);
    li.appendChild(span2);
    li.appendChild(span3);
    li.appendChild(span4);

    if (!li.classList.contains("list-item-with-border")) {
      li.classList.add("list-item-with-border");
      li.style.setProperty("--border-color", selectedValue);
    }
    if (task.checked == true) {
      li.classList.add("checked");
    }

    if (task.category === "Home") {
      HomeTab_Content.appendChild(li);
    } else if (task.category === "Week") {
      WeekTab_Content.appendChild(li);
      var liClone2 = li.cloneNode(true);
      HomeTab_Content.appendChild(liClone2);
    } else if (task.category === "Today") {
      TodayTab_Content.appendChild(li);
      var liClone = li.cloneNode(true);
      HomeTab_Content.appendChild(liClone);
    }
  });
}

function promptadd() {
  blur.classList.remove("hidden");
  prompt.classList.remove("hidden");
  if (curr_tab == NotesTab) {
    if (Prompt_add_Note.classList.contains("hidden")) {
      Prompt_add_Note.classList.remove("hidden");
    }
    Prompt_add_To_do.classList.add("hidden");
    To_Do_container.classList.add("hidden");
    Note_container.classList.remove("hidden");
  } else {
    if (Prompt_add_To_do.classList.contains("hidden")) {
      Prompt_add_To_do.classList.remove("hidden");
    }
    Prompt_add_Note.classList.add("hidden");
    To_Do_container.classList.remove("hidden");
    Note_container.classList.add("hidden");
  }
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
function editToDo(taskIndex) {
  const modifiedTitle = InputBoxTitleForEdit.value;
  const modifiedDescription = InputBoxDescForEdit.value;
  const modifiedDate = FormDueDateForEdit.value;

  let selectedValue = null;
  for (const radioButton of priorityForEdit) {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
      break;
    }
  }

  let modifiedPriority = selectedValue;

  const EditIndex = taskIndex;

  tasks[EditIndex].title = modifiedTitle;
  tasks[EditIndex].description = modifiedDescription;
  tasks[EditIndex].dueDate = modifiedDate;
  tasks[EditIndex].priority = modifiedPriority;

  renderTasks(
    curr_tab.classList.contains("Home-Name")
      ? "Home"
      : curr_tab.classList.contains("Today-task-Name")
      ? "Today"
      : "Week"
  );

  CloseEdit();
}

function openEdit(taskIndex) {
  const task = tasks[taskIndex];
  InputBoxTitleForEdit.value = task.title;
  InputBoxDescForEdit.value = task.description;
  FormDueDateForEdit.value = task.dueDate;

  for (const radioButton of priorityForEdit) {
    if (radioButton.value === task.priority) {
      radioButton.checked = true;
    }
  }

  updateButton.addEventListener("click", function () {
    editToDo(taskIndex);
  });

  blur.classList.remove("hidden");
  Update_Prompt.classList.remove("hidden");
}

function CloseEdit() {
  blur.classList.add("hidden");
  Update_Prompt.classList.add("hidden");
}

function openDetails(taskIndex) {
  detailsHeading.innerText = tasks[taskIndex].title;
  detailsDescription.innerText = tasks[taskIndex].description;
  detailDate.innerText = tasks[taskIndex].dueDate;

  blur.classList.remove("hidden");
  DetailsContainer.classList.remove("hidden");
}

function DetailClose() {
  blur.classList.add("hidden");
  DetailsContainer.classList.add("hidden");
}

close_edit_prompt.addEventListener("click", CloseEdit);
CloseDetails.addEventListener("click", DetailClose);
plus_sign.addEventListener("click", promptadd);
close.addEventListener("click", ClosePrompt);
Prompt_add_To_do.addEventListener("click", openToDo);
Prompt_add_Note.addEventListener("click", openNote);

attachClickListener(HomeTab_Content);
attachClickListener(TodayTab_Content);
attachClickListener(WeekTab_Content);
attachClickListener(NotesTab_Content);

HomeTab.addEventListener("click", () => {
  switchTab(HomeTab_Content, HomeTab);
  curr_tab = HomeTab;
  curr_content = HomeTab_Content;
});

TodayTab.addEventListener("click", () => {
  switchTab(TodayTab_Content, TodayTab);
  curr_tab = TodayTab;
  curr_content = TodayTab_Content;
});

WeekTab.addEventListener("click", () => {
  switchTab(WeekTab_Content, WeekTab);
  curr_tab = WeekTab;
  curr_content = WeekTab_Content;
});

NotesTab.addEventListener("click", () => {
  switchTab(NotesTab_Content, NotesTab);
  curr_tab = NotesTab;
  curr_content = NotesTab_Content;
});

function attachClickListener(content) {
  content.addEventListener("click", function (e) {
    const listItem = e.target.closest("li");
    if (listItem) {
      if (e.target.tagName === "LI") {
        if (listItem.classList.contains("checked")) {
          listItem.classList.remove("checked");
          tasks[listItem.dataset.index].checked = false;
        } else {
          listItem.classList.add("checked");
          tasks[listItem.dataset.index].checked = true;
        }
      } else if (e.target.classList.contains("Update-Data")) {
        openEdit(listItem.dataset.index);
      } else if (e.target.classList.contains("Cross")) {
        deleteTask(listItem.dataset.index);
      } else if (e.target.classList.contains("Details-ToDo")) {
        openDetails(listItem.dataset.index);
      }
    }
  });
}
