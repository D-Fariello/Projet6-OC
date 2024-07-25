///////////// Variables ///////////////
const portfolio = document.getElementById("portfolio");
const projectSection = document.querySelector(".projectSection");
const gallery = document.querySelector(".gallery");


//////////// Function Fecth to get "Works" from API: ////////////

async function apiCall(){
    const response = await fetch ("http://localhost:5678/api/works");
    const works = await response.json();
    console.log("Fecthed info", works); 
}

////////////// Calling the function ////////////////

apiCall();