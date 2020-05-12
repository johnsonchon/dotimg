const nav = document.querySelector('.nav')
window.onscroll = () => {
    const top = window.scrollY
    if (top >= 100) {
        nav.classList.add('nav-shadow')
    } else {
        nav.classList.remove('nav-shadow')
    }
}

// up arrow
const up = document.querySelector('.up');

window.onscroll = () => {
    const top = window.scrollY
    if (top >= 900) {
        up.classList.remove('up-none')
    } else {
        up.classList.add('up-none')
    }
}

up.addEventListener('click', function() {
    window.scroll({
        top: 350,
        behavior: 'smooth' 
      });
})

// Search
const form = document.querySelector('form');
const divFocus = document.querySelector('.focus')

form.addEventListener('click', function () {
    divFocus.classList.remove('remove')
})

divFocus.addEventListener('click', function () {
    this.classList.add('remove');
})

form.addEventListener('submit', function (e) {
    let searchedPic = e.target.elements.searchResult.value;
    console.log(searchedPic);
    localStorage.clear();
    localStorage.setItem('Search', searchedPic);
})

// -------------------------------------------------

// Get search input
let searchInput = document.querySelector('.search-input');
let searchH = document.querySelector('.search-h')

let searchStorage = localStorage.getItem('Search');

searchInput.textContent = searchStorage;
searchH.textContent = searchStorage;

// -------------------------------------------------

const photoGal = document.querySelector('.photo-gal');
let photoLink = document.querySelector('.photo-link');



// Call Pexel API
const getPexel = function () {
    const pexelApiKey = '563492ad6f917000010000014416bb2cd26f4d4cadfc4d2d3ef7796b';
    let myHeader = new Headers();
    myHeader.append('Authorization', pexelApiKey)
    fetch('https://api.pexels.com/v1/search?query=' + searchStorage + '&per_page=300&page=1', {
        method: 'GET',

        headers: myHeader,

        body: JSON.stringify()
    }).then(function (response) {
        // console.log(response)
        return response.json();

    }).then(function (data) {
        // console.log(data);
        for (let i = 0; i < data.photos.length; i++) {
            // const photoGal = document.querySelector('.photo-gal');

            let photoLink = document.createElement('a');
            photoLink.classList.add('photo-link');

            let photo = document.createElement('img')
            photo.classList.add('photos');

            photoLink.appendChild(photo);
            photoGal.appendChild(photoLink);
            // console.log(data.hits[i])
            photo.src = data.photos[i].src.medium;
            photoLink.href = data.photos[i].url;

        }
    });



};

getPexel();



// Call Pixabay API
const getPixa = function () {
    const pixaApiKey = "4282776-27fa57906aa34123504a6dc56";

    fetch('https://pixabay.com/api/?key=' + pixaApiKey + '&q=' + searchStorage + '&image_type=photo&per_page=200', {
        method: 'GET',
        body: JSON.stringify()
    }).then(function (response) {
        return response.json();

    }).then(function (data) {
        // console.log(data);

        for (let i = 0; i < data.hits.length; i++) {

            let photoLink = document.createElement('a');
            photoLink.classList.add('photo-link');

            let photo = document.createElement('img')
            photo.classList.add('photos');

            photoLink.appendChild(photo);
            photoGal.appendChild(photoLink);
            // console.log(data.hits[i])
            photo.src = data.hits[i].largeImageURL;
            photoLink.href = data.hits[i].pageURL;

        }
    });
}


// Call UnSplash API
const getUnsplash = function () {
    const unSplashApiKey = 'lkkeMCpDMXhbk_sMdthHgqCZCvBI2QJj_Wjq2rqdXo4';
    let myHeader = new Headers();

    myHeader.append('Authorization', unSplashApiKey)

    fetch('https://api.unsplash.com/search/photos/?&per_page=200&query=' + searchStorage + '&client_id=' + unSplashApiKey, {
        method: 'GET',

        headers: myHeader,

        body: JSON.stringify()
    }).then(function (response) {
        // console.log(response)
        return response.json();

    }).then(function (data) {
        console.log(data);
        for (let i = 0; i < data.results.length; i++) {

            let photoLink = document.createElement('a');
            photoLink.classList.add('photo-link');

            let photo = document.createElement('img')
            photo.classList.add('photos');

            photoLink.appendChild(photo);
            photoGal.appendChild(photoLink);
            // console.log(data.hits[i])
            photo.src = data.results[i].urls.regular;
            photoLink.href = data.results[i].links.html;

        }
    });
};



// // Call flickr API
// const getFlickr = function () {
//     const flickrApiKey = '12e2241d32f1e3ad155cfc6b5def8e3d';
//     let myHeader = new Headers();

//     myHeader.append('Authorization', flickrApiKey)

//     fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + flickrApiKey + '&per_page=500&tags=' + searchStorage + '&format=json&nojsoncallback=1', {
//         method: 'GET',

//         // headers: myHeader,

//         body: JSON.stringify()
//     }).then(function (response) {
//         console.log(response)
//         return response.json();

//     }).then(function (data) {
//         console.log(data);
//         for (let i = 0; i < data.photos.photo.length; i++) {

//             let photoLink = document.createElement('a');
//             photoLink.classList.add('photo-link');

//             let photo = document.createElement('img')
//             photo.classList.add('photos');

//             photoLink.appendChild(photo);
//             photoGal.appendChild(photoLink);
//             // console.log(data.hits[i])
//             photo.src = data.results[i].urls.regular;
//             photoLink.href = data.results[i].links.html;

//         }
//     });
// };




// -------------------------------------------------
// tab click
const pexelTab = document.querySelector('.pexel-tab');
const pixaTab = document.querySelector('.pixa-tab');
const unsplashTab = document.querySelector('.unsplash-tab');


const removeActive = function () {
    pexelTab.classList.remove('tab-active');
    pixaTab.classList.remove('tab-active');
    unsplashTab.classList.remove('tab-active');

};

const removeMid = function () {
    pixaTab.classList.remove('mid-tab');
    unsplashTab.classList.remove('mid-tab');
};

const addMid = function () {
    pixaTab.classList.add('mid-tab');
    unsplashTab.classList.add('mid-tab');
};

// On button click function for tabs
pexelTab.addEventListener('click', function () {
    removeActive();
    addMid();
    pexelTab.classList.add('tab-active');

    photoGal.innerHTML = '';

    getPexel();

});

pixaTab.addEventListener('click', function () {
    removeActive();
    pixaTab.classList.add('tab-active');

    photoGal.innerHTML = '';

    getPixa();

});

unsplashTab.addEventListener('click', function () {
    removeActive();
    addMid();
    unsplashTab.classList.add('tab-active')

    photoGal.innerHTML = '';
    getUnsplash();
});

// stockTab.addEventListener('click', function () {
//     removeActive();
//     stockTab.classList.add('tab-active');

//     photoGal.innerHTML = '';
//     getFlickr();
// });


// -------------------------------------------------