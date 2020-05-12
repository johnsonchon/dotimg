// search 
const homeForm = document.querySelector('.home-form');

const nav = document.querySelector('.nav')
window.onscroll = () => {
    const top = window.scrollY
    if (top >= 100) {
        nav.classList.add('nav-shadow')
    } else {
        nav.classList.remove('nav-shadow')
    }
}


homeForm.addEventListener('submit', function (e) {
    // e.target.el
    e.preventDefault();
    let searchedPic = e.target.elements.searchHome.value;
    console.log(searchedPic);
    localStorage.clear();
    localStorage.setItem('Search', searchedPic);
    window.location.href = './results.html';
})

// Put random pixa images on homepage

const getPixa = function () {
    const pixaApiKey = "4282776-27fa57906aa34123504a6dc56";
    let heroImgA = [
        'forest',
        'mountain',
        'ocean',
        'rain'
    ]
    
    let mainImg = [
        'paris',
        'rome',
        'new york',
        'san francisco',
        'japan'
    ]

    let topImg = [
        'love',
        'friends',
        'family'
    ]

    let botImg = [
        'cat',
        'dog',
        'elephant',
        'wolf'
    ]

    let heroImgAR = heroImgA[Math.floor(Math.random() * heroImgA.length)];
    let mainImgR = mainImg[Math.floor(Math.random() * mainImg.length)];
    let topImgR = topImg[Math.floor(Math.random() * topImg.length)];
    let botImgR = botImg[Math.floor(Math.random() * botImg.length)];

    let randomNumb = Math.random() * (20 - 1) + 1;
    let randomNumF = randomNumb.toFixed(0);

    fetch('https://pixabay.com/api/?key=' + pixaApiKey + '&q=' + heroImgAR + '&image_type=photo&', {
        method: 'GET',
        body: JSON.stringify()
    }).then(function (response) {
        return response.json();

    }).then(function (data) {
        // console.log(data);

        const heroPhoto = document.querySelector('.hero-img');
        const heroPhotoLink = document.querySelector('.hero-img-link');

        heroPhoto.src = data.hits[randomNumF].largeImageURL;


    });

    fetch('https://pixabay.com/api/?key=' + pixaApiKey + '&q=' + mainImgR + '&image_type=photo&', {
        method: 'GET',
        body: JSON.stringify()
    }).then(function (response) {
        return response.json();

    }).then(function (data) {
        // console.log(data);

        const leftPhoto = document.querySelector('.main-img');
        const leftPhotoLink = document.querySelector('.main-img-link');

        leftPhoto.src = data.hits[randomNumF].largeImageURL;
        leftPhotoLink.href = data.hits[randomNumF].pageURL;

    });

    fetch('https://pixabay.com/api/?key=' + pixaApiKey + '&q=' + topImgR + '&image_type=photo&', {
        method: 'GET',
        body: JSON.stringify()
    }).then(function (response) {
        return response.json();

    }).then(function (data) {
        // console.log(data);

        const topPhoto = document.querySelector('.photo-top');
        const topPhotoLink = document.querySelector('.photo-top-link');

        topPhoto.src = data.hits[randomNumF].largeImageURL;
        topPhotoLink.href = data.hits[randomNumF].pageURL;

    });

    fetch('https://pixabay.com/api/?key=' + pixaApiKey + '&q=' + botImgR + '&image_type=photo&', {
        method: 'GET',
        body: JSON.stringify()
    }).then(function (response) {
        return response.json();

    }).then(function (data) {
        // console.log(data);

        const botPhoto = document.querySelector('.photo-bot');
        const botPhotoLink = document.querySelector('.photo-bot-link');

        botPhoto.src = data.hits[randomNumF].largeImageURL;
        botPhotoLink.href = data.hits[randomNumF].pageURL;
        // console.log(data.hits)

    });
}

getPixa();