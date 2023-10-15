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
let InputBoxDesc = document.querySelector("#Create-Note-Description");
let curr_tab = HomeTab;
let curr_content = HomeTab_Content;

function switchTab(contentList) {
  ulElements.forEach((section) => {
    if (!section.classList.contains("hidden")) {
      section.classList.add("hidden");
    }
  });
  contentList.classList.remove("hidden");
}

function addToDo() {
  if (InputBoxTitle.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = InputBoxTitle.value;

    let span1 = document.createElement("span");
    span1.innerHTML = '<i class="fas fa-pencil-alt"></i>';
    span1.classList.add("Cross", "Update-Data");
    li.appendChild(span1);
    
    let span2 = document.createElement("span");
    span2.innerText = "\u00d7";
    span2.classList.add("Cross");
    li.appendChild(span2);

    if (curr_tab == HomeTab) {
      HomeTab_Content.appendChild(li);
    } else if (curr_tab == TodayTab) {
      TodayTab_Content.appendChild(li);
    } else if (curr_tab == WeekTab) {
      WeekTab_Content.appendChild(li);
    }
  }
  InputBoxTitle.value = "";
  InputBoxDesc.value = "";
  ClosePrompt();
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
  content.addEventListener(
    "click",
    function (e) {
      if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
      } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
      }
    },
    false
  );
}
