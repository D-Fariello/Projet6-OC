// import {removeFilters, eventListenerLogin, isLoggedIn, handleLogout, modifierButton } from './login.js';
import {worksApiCall, displayWorks } from "./script.js";

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
    closeBtn.addEventListener('click', closeModal);



////////////// Adding pcitures to modal ///////////////
