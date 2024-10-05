const backgroundImages = [
    "url('/p/s/reg/bg/hok1.jpg')",
    "url('/p/s/reg/bg/hok2.jpg')",
    "url('/p/s/reg/bg/hok3.jpg')",
    "url('/p/s/reg/bg/hok4.jpg')",
];
const randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

document.body.style.backgroundImage = randomImage;