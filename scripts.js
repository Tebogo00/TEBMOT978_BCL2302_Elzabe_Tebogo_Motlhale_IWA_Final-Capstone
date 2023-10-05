//imported variables from data.js
import {authors, genres, books} from "./data.js"

//declaring the variables
const dataListItems = document.querySelector('[data-list-items]')
let startIndex = 0;
let endIndex = 36;

const extracted = books.slice(startIndex, endIndex)

const fragment = document.createDocumentFragment()
for (const {author, image, title, id, description, published} of extracted) {
    const preview = document.createElement('button')
    preview.className = 'preview'
    preview.dataset.id = id
    preview.dataset.title = title
    preview.dataset.image = image
    preview.dataset.subtitle = `${authors[author]} (${(new Date(published)).getFullYear()})`
    preview.dataset.description = description

    //template to structure the html then append the preview to fragment
    preview.innerHTML= /*html*/`
    <div>
    <image class='preview__image' src="${image}" alt="book pic"}/>
    </div>
    <div class='preview__info'>
    <h3 class='preview__title'>${title}</h3>
    <dt class='preview__author'> By ${authors[author]}</dt>
    </div>`
    fragment.appendChild(preview)
    }
    dataListItems.appendChild(fragment)
    
//for the books to display their details
//code to display book details
const detailsToggle = (event) => {
    const overlay1 = document.querySelector('[data-list-active]');
    const title = document.querySelector('[data-list-title]')
    const subtitle = document.querySelector('[data-list-subtitle]')
    const description = document.querySelector('[data-list-description]')
    const image1 = document.querySelector('[data-list-image]')
    const imageblur = document.querySelector('[data-list-blur]')

    event.target.dataset.id ? overlay1.style.display = "block" : undefined;
    event.target.dataset.description ? description.innerHTML = event.target.dataset.description : undefined;
    event.target.dataset.subtitle ? subtitle.innerHTML = event.target.dataset.subtitle : undefined;
    event.target.dataset.title ? title.innerHTML = event.target.dataset.title : undefined;
    event.target.dataset.image ? image1.setAttribute ('src', event.target.dataset.image) : undefined;
    event.target.dataset.image ? imageblur.setAttribute ('src', event.target.dataset.image) : undefined;
};

const detailsClose = document.querySelector('[data-list-close]')
detailsClose.addEventListener('click', (event) => {
document.querySelector("[data-list-active]").style.display = "none";
})
dataListItems.addEventListener('click', detailsToggle)

// Show More Button
 // Update the text of the "Show More" button to display how many more items will be displayed
const showMoreButton = document.querySelector('[data-list-button]')
const numItemsToShow = Math.min(books.length - endIndex,)
showMoreButton.innerHTML = `Show More <span style="opacity: 0.5">(${numItemsToShow})</span>`;

const fragment1 = document.createDocumentFragment()
showMoreButton.addEventListener('click', () => {
    startIndex += 36;
    endIndex += 36;

    const extracted = books.slice(startIndex, endIndex)
    for (const {author ,image, title, id , description, published} of extracted) {
        const preview = document.createElement('button')
        preview.className = 'preview'
        preview.dataset.id = id
        preview.dataset.title = title
        preview.dataset.image = image
        preview.dataset.subtitle = `${authors[author]} (${(new Date(published)).getFullYear()})`
        preview.dataset.description = description
        // preview.dataset.genre = genres
        preview.innerHTML= /*html*/`
        <div>
        <image class='preview__image' src="${image}" alt="book pic"}/>
        </div>
        <div class='preview__info'>
        <dt class='preview__title'>${title}<dt>
        <dt class='preview__author'> By ${authors[author]}</dt>
        </div>`
        fragment1.appendChild(preview)
    }
     dataListItems.appendChild(fragment1)
    // Update the text of the "Show More" button to display how many more items will be displayed
    const numItemsToShow = Math.min(books.length - endIndex,)
const showMoreButtonText = `Show More <span style="opacity: 0.5">(${numItemsToShow})</span>`
showMoreButton.innerHTML = showMoreButtonText;
})

// Search Button

//for my buttons
const searchbutton = document.querySelector("[data-header-search]");
const searchCancel = document.querySelector("[data-search-cancel]");

searchbutton.addEventListener('click', (event) => {
 document.querySelector("[data-search-overlay]").style.display = "block";
})
searchCancel.addEventListener('click', (event) => {
 document.querySelector("[data-search-overlay]").style.display = "none";
})

//Storing Search options of all genres and authors
const genresFragment = document.createDocumentFragment();
let element = document.createElement('option');
element.value = 'any';
element.innerText = 'All Genres';
genresFragment.appendChild(element);
for (let [id, name] of Object.entries(genres)) {
  const element = document.createElement('option');
  const value = id;
  const text = name;
  element.value = value;
  element.innerText = text;
  genresFragment.appendChild(element);
}
document.querySelector('[data-search-genres]').appendChild(genresFragment);

const authorsFragment = document.createDocumentFragment();
element = document.createElement('option');
element.value = 'any';
element.innerText = 'All Authors';
authorsFragment.appendChild(element);
for (let [id, name] of Object.entries(authors)) {
    const element = document.createElement('option');
    const value = id;
    const text = name;
    element.value = value;
    element.innerText = text;
    authorsFragment.appendChild(element);
  }
document.querySelector('[data-search-authors]').appendChild(authorsFragment);

// Code for search specific books and displaying on datalistItems after removing the previous searches
const searchFilter = document.querySelector('[data-search-form]') 
const dataListMessage = document.querySelector('[data-list-message]')
const dataSearchForm = document.querySelector('[data-search-form]')
const datasearchOverlay = document.querySelector('[data-search-overlay]')
searchFilter.addEventListener('submit', (event)=>{
    event.preventDefault();
    dataListItems.innerHTML = ''

   const formData = new FormData(event.target)
    const title1 = formData.get('title');
    const genre1 = formData.get('genre');
    const author1 = formData.get('author');

const filteredBooks = [];
for (let i = 0; i < books.length; i++) {
  const book = books[i];
  // if genre and author are not selected, filter by title only
  if (genre1 === 'any' && author1 === 'any') {
   if (book.title.toLowerCase().includes(title1.toLowerCase())){
    filteredBooks.push(book);
   }
  }
  // if genre is not selected, filter by title and author
  if (genre1 === 'any') {
    if (book.title.toLowerCase().includes(title1.toLowerCase()) && book.author === author1){
     filteredBooks.push(book);
    }
   }
   // if title is not entered, filter by author and genre
   if (title1 === '') {
    if (book.author === author1 && book.genres.includes(genre1)){
     filteredBooks.push(book);
    }
   }
   // if neither title nor author are selected, filter by genre only
   if (title1 === '' && author1 === 'any' ) {
    if (book.genres.includes(genre1)){
     filteredBooks.push(book);
    }
   }
   // display message if no books match filters
   if (filteredBooks.length > 0){
    dataListItems.style.display = 'block'
    dataListMessage.style.display = 'none'
    showMoreButton.disabled = true
   } else{
    dataListMessage.style.display = 'block'
    dataListItems.style.display = 'none'
    showMoreButton.disabled = true
   }
}
// create fragment to hold filtered books
const fragment2 = document.createDocumentFragment()
    for (const {author ,image, title, id , description, published} of filteredBooks) {
        const preview = document.createElement('button')
        preview.className = 'preview'
        preview.dataset.id = id
        preview.dataset.title = title
        preview.dataset.image = image
        preview.dataset.subtitle = `${authors[author]} (${(new Date(published)).getFullYear()})`
        preview.dataset.description = description
        preview.dataset.genre = genres
        // create preview button with book information
        preview.innerHTML= /*html*/`
        <div>
        <image class='preview__image' src="${image}" alt="book pic"}/>
        </div>
        <div class='preview__info'>
        <dt class='preview__title'>${title}<dt>
        <dt class='preview__author'> By ${authors[author]}</dt>
        </div>`
 // append preview button to fragment
         fragment2.appendChild(preview)
         }
 // add filtered books to message area
   dataListItems.append(fragment2)
   dataListItems.style.display = 'grid'
   dataSearchForm.reset()
   datasearchOverlay.style.display = 'none'
    })

//Settings Button

//declaring the variables 
const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}

// button for opening and closing the settings overlay
const settingbutton = document.querySelector("[data-header-settings]")
const settingCancel = document.querySelector('[data-settings-cancel]')

settingbutton.addEventListener('click', (event) => {
 document.querySelector("[data-settings-overlay]").style.display = "block";
})
settingCancel.addEventListener('click', (event) => {
document.querySelector("[data-settings-overlay]").style.display = "none";
})

//to change theme to dark or light
const dataSettingsTheme = document.querySelector('[data-settings-theme]')
const saveButton = document.querySelector("body > dialog:nth-child(5) > div > div > button.overlay__button.overlay__button_primary")

saveButton.addEventListener('click', (event) =>{
    event.preventDefault()
  if (dataSettingsTheme.value === 'day') {
    document.querySelector('body').style.setProperty('--color-dark', day.dark)
    document.querySelector('body').style.setProperty('--color-light', day.light)
    document.querySelector("[data-settings-overlay]").style.display = "none";
  }
  if (dataSettingsTheme.value === 'night') {
    document.querySelector('body').style.setProperty('--color-dark', night.dark)
    document.querySelector('body').style.setProperty('--color-light', night.light)
    document.querySelector("[data-settings-overlay]").style.display = "none";
      }
} )