// class for a paste
class Paste {
    constructor(title, content, author) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.date = this.#generateDate();
    }

    // Private method to generate the current date
    // This method is only accessible from within the class
    // It cannot be called from outside the class
    // The # symbol is used to denote a private method
    #generateDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        return `${year}/${month}/${day} ${hours}:${minutes}`; // 2023/6/23 13:35
    }
}

// Function to create a paste object and add it to the pasteFeed array in local storage
function createPaste(e) {
    e.preventDefault();

    // ## GET DATA OPTION A ##
    // Get the data from the form using the DOM
    const pasteTitle = document.getElementById('title').value;
    const pasteContent = document.getElementById('paste').value;

    // ## GET DATA OPTION B ##
    // Get the data from the form
    /* 
    const data = new FormData(e.target);
    const pasteTitle = data.get('title');
    const pasteContent = data.get('paste'); 
    */

    // ## CREATE OBJECT OPTION A ##
    // Create a new paste object
    // A new new object gets created each time the function is called
    /* 
    const paste = {
        title: pasteTitle,
        content: pasteContent,
        author: 'Anonymous',
        date: generateDate() // Function at the bottom of this file
    } 
    */

    // ## CREATE OBJECT OPTION B ##
    // Create a new paste object using the Paste class
    const paste = new Paste(pasteTitle, pasteContent, 'Anonymous');

    // Fetch the pasteFeed array from local storage (If there is nothing in local storage, pasteArray will be null)
    let pasteArray = JSON.parse(localStorage.getItem('pasteFeed'));

    // If pasteArray is null, turn it into an empty array and add the paste object to it
    if (pasteArray === null) {
        pasteArray = [];
        pasteArray.push(paste);
        localStorage.setItem('pasteFeed', JSON.stringify(pasteArray));
        // Else add the paste object to the pasteArray and update local storage by stringifying the pasteArray
        // This will overwrite the previous pasteArray in local storage with the new pasteArray
    } else {
        pasteArray.push(paste);
        localStorage.setItem('pasteFeed', JSON.stringify(pasteArray));
    }

    // Relocate to index.html
    window.location.href = '/index.html';
}

// Fetch the pasteFeed array from local storage and display the pastes
// If pasteFeed is null, display a default message
function displayPastes() {
    // Fetch the pasteFeed array from local storage (If there is nothing in local storage, pasteArray will be null)
    const pasteArray = JSON.parse(localStorage.getItem('pasteFeed'));
    // Get the first element with the class feed from the DOM 
    let feedBody = document.querySelector('.feed');

    // Check if pasteArray is null
    // If it is, concatenate a default message to the feedBody innerHTML
    if (pasteArray === null) {
        feedBody.innerHTML += `
            <div class="feedItem">    
                <p>"Ain't Nothing Going On But The Rent" - Gwen Guthrie</p>
                <p><a href="/pages/create-paste.html">Create</a></p>
            </div>
        `
        // If pasteArray is not null, loop through the array of paste objects and concatenate each paste to the feedBody innerHTML
    } else {
        for (let i = 0; i < pasteArray.length; i++) {
            feedBody.innerHTML += `
                <div class="feedItem">
                    <h2>${pasteArray[i].title}</h2>
                    <hr>
                    <p>${pasteArray[i].content}</p>
                    <div class="post-meta">
                        <p>Author: ${pasteArray[i].author}</p>
                        <p>posted: ${pasteArray[i].date}</p>
                    </div>
                </div>
            `
        }
    }
}

// Function to calculate the total number of pastes
function calculateTotalPastes() {
    // Get the span element with the id totalPastesCount from the DOM
    const totalPastesSpan = document.getElementById('totalPastesCount');
    // Fetch the pasteFeed array from local storage (If there is nothing in local storage, pasteArray will be null)
    const pasteArray = JSON.parse(localStorage.getItem('pasteFeed'));
    // Declare a variable to store the total number of pastes
    let totalPastes = 0;

    // Check if pasteArray is null
    // If it is not null, set totalPastes to the length of the pasteArray
    if (pasteArray != null) {
        totalPastes = pasteArray.length;
    }

    // Set the innerHTML of the totalPastesSpan to the totalPastes
    totalPastesSpan.innerHTML = totalPastes;
}

// Function to populate the home page
// This function is called when the home page loads
function populateHomePage() {
    displayPastes();
    calculateTotalPastes();
}

// Function to generate the current date
// This function is only used if the Paste class is not used
function generateDate() {
    // Get the current date and time using the Date object
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Return the date and time as a string
    return `${year}/${month}/${day} ${hours}:${minutes}`; // 2023/6/23 13:35
}