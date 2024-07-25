/*Variable or storing fetched data, not for referencing DOM elements. 
It is used to keep the project data that will be dynamically added to the DOM*/
let imageWorks; 


///////////// Variables ///////////////
const portfolio = document.getElementById("portfolio");
const projectSection = document.querySelector(".projectSection");
const gallery = document.querySelector(".gallery");


//////////// Function Fecth to get "Works" from API: ////////////

async function apiCall(){
    const response = await fetch ("http://localhost:5678/api/works");
    const works = await response.json();
    console.log("Fecthed info", works);
    imageWorks = works;
    displayWorks(); /*Calling this function here 
    to avoids the issue of having to wait for some other code to execute before the data is shown.*/
}

////////////// Calling the function ////////////////
apiCall();

//////////// Function to display Works //////////////

function displayWorks(items = imageWorks){ // adding these parameters so when displayWorks() is called it will automatically use imageWorks
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

