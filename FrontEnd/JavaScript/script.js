/*Variable*/

let imageWorks; // The variable will be assigned a value later, such as after fetching data from an API.
let categories = [] // This variable is ready to be used as an array from the moment it is declared.


///////////// Variables ///////////////
const portfolio = document.getElementById("portfolio");
const projectSection = document.querySelector(".projectSection");
const gallery = document.querySelector(".gallery");


//////////// Function Fecth to get "Works" from API: ////////////

async function worksApiCall() {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    console.log("Fecthed Works", works);
    imageWorks = works;
    displayWorks();
    photoSelection(); /*Calling these functions here 
    to avoids the issue of having to wait for some other code to execute before the data is shown.*/
}

////////////// Calling the function ////////////////
worksApiCall();

//////////// Function to display Works //////////////

function displayWorks(items = imageWorks) { // adding these parameters so when displayWorks() is called it will automatically use imageWorks
    if (!items) // If Items do not have anything, ensure there is data to display
        return;

    gallery.innerHTML = ""; // Clear extisting content

    items.forEach(item => {
        const figure = document.createElement("figure");

        const img = document.createElement("img");
        img.src = item.imageUrl;
        img.alt = item.title;
        figure.appendChild(img);

        const figcaption = document.createElement("figcaption");
        figcaption.textContent = item.title;
        figure.appendChild(figcaption);

        gallery.appendChild(figure);
    });
}

//////////// Function Fecth to get "Categories" from API: ////////////

async function categoriesApiCall() {
    const categoryRespose = await fetch("http://localhost:5678/api/categories");

    categories = await categoryRespose.json();
    console.log("Fetched Categories", categories);


    // Populate the category dropdown
    const categorySelect = document.getElementById("category");
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id;  // Store the category id as the option value
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });

    displayFilters();
}

////////////// Calling the function ////////////////
categoriesApiCall();

/////////// Function to create filters ///////////////

function displayFilters() {
    const filterDiv = document.createElement("div");
    filterDiv.classList.add("filterDiv");

    const button = document.createElement("button");
    button.classList.add("filterButton");

    button.textContent = "Tous";
    button.addEventListener("click", () => triageWorks("Tous"));
    filterDiv.appendChild(button);

    categories.forEach(category => {
        const categoryButton = document.createElement("button");
        categoryButton.classList.add("filterButton");

        categoryButton.textContent = category.name;
        categoryButton.addEventListener("click", () => triageWorks(category.name));
        filterDiv.appendChild(categoryButton);
    });

    projectSection.appendChild(filterDiv);

    // Calling RemoveFilters after filterDiv is added to the DOM
    removeFilters()
}

///////// Remove Filters ////////////

function removeFilters() {
    const filterDiv = document.querySelector(".filterDiv");
    const token = localStorage.getItem("token");

    if (filterDiv) {
        if (token) {
            filterDiv.style.display = "none";
        } else {
            filterDiv.style.display = "flex";
        }
    }
}

/////////// Function to filter buttons ///////////

function triageWorks(category) {
    if (category === "Tous") {
        displayWorks(imageWorks); // Show all works if "Tous" is selected
    } else {
        const filteredWorks = imageWorks.filter(work => work.category.name === category);
        displayWorks(filteredWorks);
    }
}



/////////////////////////////////////// Modal //////////////////////////////////////////////


///////////// Variables //////////////

const modal = document.querySelector(".modal");
const gallerySelection = document.querySelector(".gallery-selection");


///////////////// Open modal //////////////

function openModal() {
    const overlay = document.querySelector(".overlay");
    const modal = document.querySelector(".modal");

    overlay.style.display = "block";
    modal.style.display = "block";

}

// Event listener for opening the modal
const modifyBtn = document.getElementById("modify-btn");
modifyBtn.addEventListener('click', openModal);



//////////////// Close Modal /////////////////


function closeModal() {
    const overlay = document.querySelector(".overlay");
    const modal = document.querySelector(".modal");

    overlay.style.display = "none";
    modal.style.display = "none";
}

// Event listener for closing the modal
const closeBtn = document.querySelector(".close-btn");
const overlay = document.querySelector(".overlay");
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);


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
        trashIcon.dataset.id = item.id;
        figure.appendChild(trashIcon);

        gallerySelection.appendChild(figure);

        // Add event listener for deleting the work
        trashIcon.addEventListener('click', removeWork);
    });

}

//////////////// Delete Work /////////////////

async function removeWork(e) {
    const trashIcon = e.target;
    const figure = trashIcon.closest('figure');
    const id = trashIcon.dataset.id;
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Remove the item from the local imageWorks array
        imageWorks = imageWorks.filter(item => item.id != id);

        // Re-render the gallery
        photoSelection();

        displayWorks();

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}



/////////////////////////////////////// Add Photo Page //////////////////////////////////////////////


///////////// Variables //////////////

const addPhoto = document.querySelector(".add-photo");
const picsSelection = document.querySelector(".pics-selection");
const addPicsBtn = document.querySelector(".add-pictures-btn");
const closingButton = document.querySelector(".close-button");
const overlayAddPics = document.querySelector(".overlay");
const addPhotoBtn = document.querySelector(".validation-photo-btn");
const arrowLeft = document.querySelector(".arrow-left");

///////////////// Open  Add Photo Page //////////////
function openAddPhotoPage() {
    overlayAddPics.style.display = "block";
    modal.style.display = "none";
    addPhoto.style.display = "block";
}

// Event listener for opening the Add Photo Page 
addPicsBtn.addEventListener('click', openAddPhotoPage);

arrowLeft.addEventListener('click', function () {
    closeAddPhotoPage();
    openModal();
});

//////////////// Close Add Photo Page  /////////////////
function closeAddPhotoPage() {
    overlayAddPics.style.display = "none";
    addPhoto.style.display = "none";
}

closingButton.addEventListener('click', function () {
    closeAddPhotoPage();
    closeModal();
});


// Event listener for closing the Add Photo Page 
overlayAddPics.addEventListener('click', closeAddPhotoPage);


////////////// Add Photo Button Click ////////////
addPhotoBtn.addEventListener('click', function () {
    // Perform any additional actions for adding a photo here

    // Close the modal after adding the photo
    closeAddPhotoPage();
});


/////////////////////////////////////// Add Photo Functionalities //////////////////////////////////////////////


///////////// Variables //////////////
const photoInput = document.getElementById("photo");
const newPicturesImg = document.querySelector(".new-pictures");
const formAddPics = document.getElementById("form-add-pics");

////////////// Event listener for image preview //////////////
photoInput.addEventListener("change", function () {
    const file = photoInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            newPicturesImg.src = e.target.result;
            newPicturesImg.style.display = "block";
        };
        reader.readAsDataURL(file);
    }

    // Validate file type (e.g., accept only images)
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
        return;
    }

    // Validate file size (e.g., max 2MB)
    const maxSizeInMB = 2;
    if (file.size > maxSizeInMB * 1024 * 1024) {
        return;
    }

    showImage()
});

function showImage(){
    const iconImg = document.querySelector(".fa-regular.fa-image");
    const photoUploadBtn = document.querySelector(".photo-upload-btn");
    const photoNote = document.querySelector(".photo-note");

    if (iconImg && photoUploadBtn && photoNote) {
        if (iconImg.style.display === "none") {
            iconImg.style.display = "block";
            photoUploadBtn.style.display = "block"; // Show the upload button
            photoNote.style.display = "block"; // Show the note
            newPicturesImg = true;
        } else {
            iconImg.style.display = "none";
            photoUploadBtn.style.display = "none"; // Hide the upload button
            photoNote.style.display = "none"; // Hide the note
            newPicturesImg = false;
        }
    }

}

////////////// Event listener for adding a new photo //////////////
formAddPics.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData();
    const title = document.getElementById("title").value;
    const categoryId = document.getElementById("category").value;
    const file = photoInput.files[0];

    if (!title || !categoryId || !file) {
        return;
    }

    formData.append("title", title);
    formData.append("category", categoryId);
    formData.append("image", file);

    try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Erreur lors de l'ajout de la photo");
        }

        const newWork = await response.json();
        imageWorks.push(newWork);
        displayWorks();
        photoSelection();

        // Reset form and close the modal
        formAddPics.reset();
        newPicturesImg.style.display = "none";
        closeAddPhotoPage();

    } catch (error) {
        console.error("Erreur:", error);
    }
});
