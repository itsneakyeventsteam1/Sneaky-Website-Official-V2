// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrLNQ7FwfXWpsFRdRqwjvBr_5CHKpk4P4",
  authDomain: "registration-sneaky.firebaseapp.com",
  projectId: "registration-sneaky",
  storageBucket: "registration-sneaky.appspot.com",
  messagingSenderId: "372050813304",
  appId: "1:372050813304:web:23bca4cd406ba0492c688d",
  measurementId: "G-D7S6B8GT6S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Storage: Display images
const storage = getStorage(app);
const listRef = ref(storage, 'events_pictures');

listAll(listRef).then((res) => {
    res.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((url) => {
            const img = document.createElement('img');
            img.classList.add('swiper-slide');
            img.src = url;
            const swiperWrapper = document.querySelector('.swiper-wrapper');
            if (swiperWrapper) {
                swiperWrapper.appendChild(img);
            } else {
                console.error('Element .swiper-wrapper not found');
            }
        });
    });
}).catch((error) => {
    console.error("Error fetching images: ", error);
});

// Display registration text and title
const db = getFirestore(app);
const registrationText = document.getElementById('registration-details');

if (registrationText) {
    const registrationTextRef = doc(db, "registration-details", "registration-text");

    getDoc(registrationTextRef).then((docSnap) => {
        if (docSnap.exists()) {

            // Add the title as <h1>
            const h1 = document.createElement('h1');
            h1.innerHTML = docSnap.data().Title || '';
            registrationText.appendChild(h1);

            const br = document.createElement('br');
            registrationText.appendChild(br);

            const p = document.createElement('p');
            let text = docSnap.data().Text || '';

            const urlRegex = /(https?:\/\/[^\s]+)/g;
            
            text = text.replace(urlRegex, (url) => `<a href="${url}" target="_blank">${url}</a>`);
            text = text.replace(/\n/g, '<br>');
            p.innerHTML = text;
            registrationText.appendChild(p);
        } else {
            console.error("No such document!");
        }
    }).catch((error) => {
        console.error("Error fetching document: ", error);
    });
} else {
    console.error("Element .registration-details not found in the DOM");
}
