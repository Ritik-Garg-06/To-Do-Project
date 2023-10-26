// Loading Contents From Local Storage

document.addEventListener("DOMContentLoaded", function () {
  loadTasksAndNotes();
  const storedImpCount = localStorage.getItem("impCount");
  impCount = 0;
  if (storedImpCount) {
    impCount = parseInt(storedImpCount, 10);
  }

  console.log("impCount:", impCount);
});

//COMMON SELECTORS

let blur = document.querySelector(".blur");
let theme_img = document.querySelector(".theme-img");
let theme = document.querySelector(".theme");

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
let Add_to_do_details_Microphone = document.querySelector(
  ".Add-to-do-details_Microphone"
);

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
let Edit_Desc_Microphone = document.querySelector(".Edit-desc-Microphone");

// NOTE CONTAINER SELECTORS

let Note_container = document.querySelector(".Prompt-right-container-Note");
let InputBoxTitleForNote = document.querySelector("#Create-Note-Title-forNote");
let InputBoxDescForNote = document.querySelector(
  "#Create-Note-Description-forNote"
);
let Add_Note_Microphone = document.querySelector(".Add-Note-Microphone");
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
let important = document.querySelector(".Important");

// Variable Declarations

let curr_tab = HomeTab;
curr_tab.classList.add("selected_value");

let curr_content = HomeTab_Content;
let taskIndex = 0;
let noteIndex = 0;
let curr_theme = "Day";
let currentDate = new Date();
let Default_date = currentDate.toISOString().split("T")[0];
let impCount = 0;

// Function to load Data from Local Storage

function loadTasksAndNotes() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }

  // Gathering contents of tasks array from local storage

  const storedNotes = localStorage.getItem("notes");
  if (storedNotes) {
    notes = JSON.parse(storedNotes);
    renderNote();
  }

  // Gathering contents of Notes array from local storage
}

// Changing Theme

theme.addEventListener("click", function () {
  if (curr_theme == "Night") {
    theme.innerHTML =
      "<img src='Images/moon.png' alt='Night' class = 'theme-img'>";
    document.body.classList.toggle("dark-theme");
    curr_theme = "Day";
    console.log(curr_theme);
  } else if (curr_theme == "Day") {
    theme.innerHTML =
      '<img src="Images/sun (1).png" alt="Night" class = "theme-img">';
    document.body.classList.toggle("dark-theme");
    curr_theme = "Night";
  }
});

// Function to Switch Tab

function switchTab(contentList, tabi) {
  ulElements.forEach((section) => {
    if (!section.classList.contains("hidden")) {
      section.classList.add("hidden");
    }
  });

  // AT FIRST ADDING HIDDEN CLASSS TO ALL TABS

  MainContainerLeftUL.forEach((li) => {
    const span = li.querySelector("span");
    if (span.classList.contains("selected_value")) {
      span.classList.remove("selected_value");
    }
  });
  contentList.classList.remove("hidden");
  tabi.classList.add("selected_value");

  // REMOVING HIDDEN CLASS FROM MY SELECTED TAB

  if (tabi == TodayTab) {
    FormDueDate.setAttribute("readonly", "true");
    FormDueDate.value = Default_date;
  } else {
    FormDueDate.removeAttribute("readonly");
  }

  // IF USER SELECTS THE TODAY TAB SETTING ITS DATE TO BE READ ONLY SO THAT USER CAN NOT EDIT THAT LATER
  if (tabi == WeekTab) {
    const maxDate = new Date();
    maxDate.setDate(currentDate.getDate() + 7);

    const maxDateStr = maxDate.toISOString().split("T")[0];

    FormDueDate.min = Default_date;
    FormDueDate.max = maxDateStr;
  } else {
    FormDueDate.removeAttribute("min");
    FormDueDate.removeAttribute("max");
  }

  // IF USER SELECTS THE WEEK TAB SETTING ITS DURATION TO ONE WEEK STARTING FROM TODAY
}

// FUNCTION TO OPEN THE PROMPT {TO ADD NOTES OR TASKS}
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

// ARRAY OF OBJECTS TO STORE ALL THE TASKS IRRESPECTIVE OF THEIR TAB
let tasks = [];

// FUNCTION TO DISPLAY AND ADD TASKS IN ARRAY
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

    if (FormDueDate.value == "") {
      FormDueDate.value = Default_date;
    }
    const taskDueDate = FormDueDate.value;

    // CREATED AN OBJECT TO INSERT INSIDE TASKS ARRAY
    const newTask = {
      title: taskText,
      description: taskDescription,
      priority: selectedValue,
      dueDate: taskDueDate,
      checked: false,
      imp: false,
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

    const span5 = document.createElement("span");
    span5.innerHTML = '<img src="Images/star-unchecked.png" alt="Imp">';
    span5.classList.add("Important");

    li.appendChild(span1);
    li.appendChild(span2);
    li.appendChild(span3);
    li.appendChild(span4);
    li.appendChild(span5);

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

  localStorage.setItem("tasks", JSON.stringify(tasks));
  ClosePrompt();
}

// FUNCTION TO DELETE ANY TASK FROM ARRAY
function deleteTask(index) {
  if (tasks[index].imp == true) {
    impCount--;
    localStorage.setItem("impCount", impCount);
  }
  tasks.splice(index, 1);
  taskIndex = 0;
  renderTasks();
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// FUNCTION TO DISPLAY TASKS IF ANY TASK IS DELETED
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

    if (task.imp == false) {
      const span5 = document.createElement("span");
      span5.innerHTML = '<img src="Images/star-unchecked.png" alt="Imp">';
      span5.classList.add("Important");
      li.appendChild(span5);
    } else if (task.imp == true) {
      const span5 = document.createElement("span");
      span5.innerHTML = '<img src="Images/star-checkked.png" alt="img">';
      span5.classList.add("Important", "Imp-checked");
      li.appendChild(span5);
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

// ARRAY TO STORE NOTES
let notes = [];

// FUNCTION TO DISPLAY ADD NOTES IN ARRAY
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
    // INSERTING NEW NODE BEFORE THE FIRST NODE
    NotesTab_Content.insertBefore(noteDiv, NotesTab_Content.firstChild);
  }

  InputBoxTitleForNote.value = "";
  InputBoxDescForNote.value = "";

  localStorage.setItem("notes", JSON.stringify(notes));
  ClosePrompt();
}

// FUNCTION TO REMOVE NOTE FROM ARRAY
function deleteNote(index) {
  notes.splice(index, 1);
  renderNote();
  localStorage.setItem("notes", JSON.stringify(notes));
}

// IF A USER DELETES ONE NOTE THIS WILL CLEAR THE WHOLE NOTES_CONTENT AND RE WRITES AGAIN EXCEPT THAT NOTE
function renderNote() {
  // FIRST IT WILL CLEAR ALL THE CONTENTS
  NotesTab_Content.innerHTML = "";

  // UPDATE THE COUNT OF TOTAL NOTES
  if (notes.length == 0) {
    NotesTab_Count.innerText = "";
  } else {
    NotesTab_Count.innerText = notes.length;
  }
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

// FUNCTION TO CLOSE THE PROMPT OF ADD NOTES/TASKS
function ClosePrompt() {
  InputBoxDescForNote.value = "";
  InputBoxTitleForNote.value = "";
  InputBoxDesc.value = "";
  InputBoxTitle.value = "";
  blur.classList.add("hidden");
  prompt.classList.add("hidden");
}

// FUNCTION TO SWITCH FROM NOTE TO TODO 
function openToDo() {
  if (!Note_container.classList.contains("hidden")) {
    Note_container.classList.add("hidden");
  }
  To_Do_container.classList.remove("hidden");
}

// FUNCTION TO SWITCH FROM TODO TO NOTE 
function openNote() {
  if (!To_Do_container.classList.contains("hidden")) {
    To_Do_container.classList.add("hidden");
  }
  Note_container.classList.remove("hidden");
}

// FUNCTION TO OPEN THE EDIT CONTAINER

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

// FUNCTION TO DO TASK ON EDIT CONTAINER

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

  localStorage.setItem("tasks", JSON.stringify(tasks));
  CloseEdit();
}

// FUNCTION TO CLOSE THE EDIT CONTAINER

function CloseEdit() {
  InputBoxDescForEdit.value = "";
  InputBoxTitleForEdit.value = "";
  blur.classList.add("hidden");
  Update_Prompt.classList.add("hidden");
}

// FUNCTION TO OPEN THE DETAILS

function openDetails(taskIndex) {
  detailsHeading.innerText = tasks[taskIndex].title;
  detailsDescription.innerText = tasks[taskIndex].description;
  detailDate.innerText = tasks[taskIndex].dueDate;

  blur.classList.remove("hidden");
  DetailsContainer.classList.remove("hidden");
}

// FUNCTION TO CLOSE DETAILS CONTAINER

function DetailClose() {
  blur.classList.add("hidden");
  DetailsContainer.classList.add("hidden");
}

// FUNCTION TO UPDATE THE ELEMENT ON WHICH PRIORITY IS SET AND TO INCREASE THE PRIORITY COUNT

function priorityTask(index) {
  const taskToMove = tasks[index];
  tasks.splice(index, 1);
  tasks.unshift(taskToMove);
  renderTasks();
  localStorage.setItem("tasks", JSON.stringify(tasks));
  if (taskToMove.imp) {
    impCount++;
    localStorage.setItem("impCount", impCount);
  }
  console.log(impCount);
}

// FUNCTION TO PUT THE LI BACK IF ITS PRIORITY IS REMOVED

function putBack(Index) {
  const taskToMove = tasks[Index];
  tasks.splice(Index, 1);
  tasks.splice(impCount - 1, 0, taskToMove);
  renderTasks();
  localStorage.setItem("tasks", JSON.stringify(tasks));
  if (!taskToMove.imp) {
    impCount--;
    localStorage.setItem("impCount", impCount);
  }
  console.log(impCount);
}

// EVENT LISTENERS STARTED

// FUNCTION TO ADD EVENT LISTENERS ON THE LI ELEMENT

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
      } else if (e.target.parentNode.classList.contains("Important")) {
        if (e.target.parentNode.classList.contains("Imp-checked")) {
          e.target.parentNode.classList.remove("Imp-checked");
          e.target.parentNode.innerHTML =
            '<img src="Images/star-unchecked.png" alt="Imp">';
          tasks[listItem.dataset.index].imp = false;
          putBack(listItem.dataset.index);
        } else {
          e.target.parentNode.classList.add("Imp-checked");
          e.target.parentNode.innerHTML =
            '<img src="Images/star-checked.png" alt="Imp">';
          tasks[listItem.dataset.index].imp = true;
          priorityTask(listItem.dataset.index);
        }
      }
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
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

Add_to_do_details_Microphone.addEventListener("click", function () {
  var recognition = new webkitSpeechRecognition();
  recognition.lang = "en-GB";
  recognition.onresult = function (event) {
    console.log(event.results[0][0].transcript);
    InputBoxDesc.value = event.results[0][0].transcript;
  };
  recognition.start();
});

Add_Note_Microphone.addEventListener("click", function () {
  var recognition = new webkitSpeechRecognition();
  recognition.lang = "en-GB";
  recognition.onresult = function (event) {
    console.log(event.results[0][0].transcript);
    InputBoxDescForNote.value = event.results[0][0].transcript;
  };
  recognition.start();
});

Edit_Desc_Microphone.addEventListener("click", function () {
  var recognition = new webkitSpeechRecognition();
  recognition.lang = "en-GB";
  recognition.onresult = function (event) {
    console.log(event.results[0][0].transcript);
    InputBoxDescForEdit.value = event.results[0][0].transcript;
  };
  recognition.start();
});
