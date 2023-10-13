let plus_sign = document.querySelector(".left-lower-contents");
let main_container = document.querySelector(".container");
let prompt = document.querySelector('.Insert-Prompt');
let blur = document.querySelector('.blur');
let close = document.querySelector('.Close-Prompt');


function promptadd()
{
    blur.classList.remove('hidden');   
    prompt.classList.remove('hidden');
    prompt.classList.add('visible');
}

function ClosePrompt()
{
    blur.classList.add('hidden');   
    prompt.classList.add('hidden');
    prompt.classList.remove('visible');
}

plus_sign.addEventListener("click",promptadd);
close.addEventListener("click",ClosePrompt);