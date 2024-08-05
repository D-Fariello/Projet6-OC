import {removeFilters} from './login.js';

/*Variable*/

export let imageWorks; // The variable will be assigned a value later, such as after fetching data from an API.
let categories = [] // This variable is ready to be used as an array from the moment it is declared.


///////////// Variables ///////////////
const portfolio = document.getElementById("portfolio");
const projectSection = document.querySelector(".projectSection");
const gallery = document.querySelector(".gallery");


//////////// Function Fecth to get "Works" from API: ////////////

export async function worksApiCall() {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    console.log("Fecthed Works", works);
    imageWorks = works;
    displayWorks(); /*Calling this function here 
    to avoids the issue of having to wait for some other code to execute before the data is shown.*/
}

////////////// Calling the function ////////////////
worksApiCall();

//////////// Function to display Works //////////////

export function displayWorks(items = imageWorks) { // adding these parameters so when displayWorks() is called it will automatically use imageWorks
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
    displayFilters();
}

////////////// Calling the function ////////////////
categoriesApiCall();

/////////////// Function to create filters //////////////////

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

/////////////// Function to filter buttons //////////////////

function triageWorks(category) {
    if (category === "Tous") {
        displayWorks(imageWorks); // Show all works if "Tous" is selected
    } else {
        const filteredWorks = imageWorks.filter(work => work.category.name === category);
        displayWorks(filteredWorks);
    }
}


// Use the imported functions
function setupPage() {
    removeFilters();
}

// Call the function to set up the page
setupPage();
