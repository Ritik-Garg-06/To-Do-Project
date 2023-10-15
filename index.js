let HomeTab = document.querySelector(".Home-Name");
let TodayTab = document.querySelector(".Today-task-Name");
let WeekTab = document.querySelector(".Weekly-Tasks-Name");
let NotesTab = document.querySelector(".Notes-Name");
let HomeTab_Content = document.querySelector(".home-tasks-notes");
let TodayTab_Content = document.querySelector(".today-tasks-content");
let WeekTab_Content = document.querySelector(".weekly-tasks-content");
let NotesTab_Content = document.querySelector(".notes-content");
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

function switchTab(contentList) {
  // Hide all content sections
  ulElements.forEach((section) => {
    if (!section.classList.contains("hidden")) {
      section.classList.remove("visible");
      section.classList.add("hidden");
    }
  });

  // Show the corresponding content
  contentList.classList.add("visible");
  contentList.classList.remove("hidden");
}

HomeTab.addEventListener("click", () => {
  switchTab(HomeTab_Content);
});

TodayTab.addEventListener("click", () =>{
  switchTab(TodayTab_Content);
})

WeekTab.addEventListener("click", () => {
  switchTab(WeekTab_Content);
});

NotesTab.addEventListener("click", () => {
  switchTab(NotesTab_Content);
});

// Rest of your code remains the same

function promptadd() {
  blur.classList.remove("hidden");
  prompt.classList.remove("hidden");
  prompt.classList.add("visible");
}

function ClosePrompt() {
  blur.classList.add("hidden");
  prompt.classList.add("hidden");
  prompt.classList.remove("visible");
}

function openToDo() {
  if (Note_container.classList.contains("visible")) {
    Note_container.classList.remove("visible");
    Note_container.classList.add("hidden");
  }
  To_Do_container.classList.remove("hidden");
  To_Do_container.classList.add("visible");
}

function openNote() {
  if (To_Do_container.classList.contains("visible")) {
    To_Do_container.classList.remove("visible");
    To_Do_container.classList.add("hidden");
  }
  Note_container.classList.remove("hidden");
  Note_container.classList.add("visible");
}

plus_sign.addEventListener("click", promptadd);
close.addEventListener("click", ClosePrompt);
Prompt_add_To_do.addEventListener("click", openToDo);
Prompt_add_Note.addEventListener("click", openNote);
