let plus_sign = document.querySelector(".left-lower-contents");
let main_container = document.querySelector(".blur");

function promptadd()
{
    console.log("Clicked");
    main_container.classList.add('active');
}

plus_sign.addEventListener("click",promptadd);