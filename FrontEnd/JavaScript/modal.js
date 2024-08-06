
// import {worksApiCall, imageWorks} from './script.js';

///////////// Variables //////////////

let imageWorks; 
const modal = document.querySelector(".modal");
const gallerySelection = document.querySelector(".gallery-selection");


///////////////// Open modal //////////////

function openModal(){
    const overlay = document.querySelector(".overlay");
    const modal = document.querySelector(".modal");

    overlay.style.display= "block";
    modal.style.display= "block";

}

// Event listener for opening the modal
    const modifyBtn = document.getElementById("modify-btn");
    modifyBtn.addEventListener('click', openModal);



//////////////// Close Modal /////////////////


function closeModal(){
    const overlay = document.querySelector(".overlay");
    const modal = document.querySelector(".modal");

    overlay.style.display= "none";
    modal.style.display= "none";
    modal.classList.remove("open-modal");
}

// Event listener for closing the modal
    const closeBtn = document.querySelector(".close-btn");
    const overlay = document.querySelector(".overlay");
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);




//////////// Function Fecth to get "Works" from API: ////////////

async function worksApiCall() {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    console.log("Fecthed Works", works);
    imageWorks = works;
    photoSelection(); /*Calling this function here 
    to avoids the issue of having to wait for some other code to execute before the data is shown.*/
}

////////////// Calling the function ////////////////
worksApiCall();


////////////// Photo Selection (Gallery) ///////////////

function photoSelection(items = imageWorks) { // adding these parameters so when displayWorks() is called it will automatically use imageWorks
    if (!items) // If Items do not have anything, ensure there is data to display
        return;

    gallerySelection.innerHTML = ""; // Clear extisting content

    items.forEach(item => {
        const figure = document.createElement("figure");
        figure.classList.add("figure-img");

        const img = document.createElement("img");
        img.src = item.imageUrl;
        img.alt = item.title;
        img.classList.add("img-selection");
        figure.appendChild(img);

        const figcaption = document.createElement("figcaption");
        figure.appendChild(figcaption);

        const trashIcon = document.createElement("i");
        trashIcon.classList.add("fa-regular", "fa-trash-can");
        figure.appendChild(trashIcon);

        gallerySelection.appendChild(figure);
    });

}

