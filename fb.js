import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCrLNQ7FwfXWpsFRdRqwjvBr_5CHKpk4P4",
  authDomain: "registration-sneaky.firebaseapp.com",
  projectId: "registration-sneaky",
  storageBucket: "registration-sneaky.appspot.com",
  messagingSenderId: "372050813304",
  appId: "1:372050813304:web:23bca4cd406ba0492c688d",
  measurementId: "G-D7S6B8GT6S"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const listRef = ref(storage, 'events_pictures');
const listRefmerch = ref(storage, 'merch_pictures');
const db = getFirestore(initializeApp);

const loadingMessage = document.querySelector('.spinner-wrapper');
loadingMessage.style.display = 'flex';

document.addEventListener('DOMContentLoaded', () => {

    const fetchImages = (listRef, swiperWrapperSelector) => {
        return listAll(listRef).then((res) => {
            const swiperWrapper = document.querySelector(swiperWrapperSelector);
            const images = [];

            const fetchPromises = res.items.map((itemRef) => {
                return getDownloadURL(itemRef).then((url) => {
                    images.push(url);
                });
            });

            return Promise.all(fetchPromises).then(() => {
                const imgTags = swiperWrapper.getElementsByTagName('img');

                for (let i = 0; i < imgTags.length; i++) {
                    if (i < images.length) {
                        imgTags[i].src = images[i];
                        imgTags[i].classList.add('swiper-slide');
                    } else {
                        imgTags[i].remove();
                    }
                }

                const allImgTags = swiperWrapper.getElementsByTagName('img');
                const imageCount = images.length;

                for (let i = 0; i < allImgTags.length; i++) {
                    if (!allImgTags[i].src && imageCount > 0) {
                        allImgTags[i].src = images[i % imageCount];
                    }
                }
            });
        }).catch((error) => {
            console.error("Error fetching images: ", error);
        });
    };

    const fetchAllData = async () => {
        const db = getFirestore(app);
        const registrationText = document.getElementById('registration-details');

        await Promise.all([
            fetchImages(listRef, '.swiper-wrapper'),
            fetchImages(listRefmerch, '.merchandise'),
            getDoc(doc(db, "registration-details", "registration-text"))
                .then((docSnap) => {
                    if (docSnap.exists()) {
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
                })
        ]);
    };

    fetchAllData().then(() => {
        loadingMessage.style.display = 'none';
    }).catch(() => {
        loadingMessage.style.display = 'none';
    });

    async function checkSwitchStatus() {
        const games = ['valorant', 'mlbb', 'hok'];
        
        for (const game of games) {
            const docRef = doc(db, "reg_switches", game);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                const data = docSnap.data();

                const option = document.querySelector(`option[value='${game}']`);
                if (data.switchStatus === "disabled" && option) {
                    option.remove();
                }
            } else {
                console.log(`No such document: ${game}`);
            }
        }
    }
    
    checkSwitchStatus();
});
