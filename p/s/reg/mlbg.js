const backgroundImages = [
    "url('/p/s/reg/bg/ml1.jpg')",
    "url('/p/s/reg/bg/ml2.jpg')",
    "url('/p/s/reg/bg/ml3.jpg')",
    "url('/p/s/reg/bg/ml4.jpg')",
];
const randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

document.body.style.backgroundImage = randomImage;