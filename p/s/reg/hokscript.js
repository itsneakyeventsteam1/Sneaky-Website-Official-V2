// Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Firebase Config
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
const db = getFirestore(app);

// Form submission
document.querySelector('form[name="reg-form-hok"]').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Fetch form data
  const formData = new FormData(e.target);
  let teamName = formData.get('hok-Team Name').replace(/[\/.]/g, "_");
  

  try {


    // Firestore data
    const teamData = {
      Email: formData.get('hok-Email'),
      TeamName: formData.get('hok-Team Name'),
      CaptainName: formData.get('hok-Captain Name'),
      CaptainID: formData.get('hok-Captain-id'),
      CaptainFBLink: formData.get('hok-Captain FB Link'),
      SquadID: formData.get('hok-Squad-ID'),

      Player_1_IGN: formData.get('hok-Player1IGN'),
      Player_1_ID: formData.get('hok-Player1ID'),
      Player_1_FBLink: formData.get('hok-Player1FBLink'),

      Player_2_IGN: formData.get('hok-Player2IGN'),
      Player_2_ID: formData.get('hok-Player2ID'),
      Player_2_FBLink: formData.get('hok-Player2FBLink'),

      Player_3_IGN: formData.get('hok-Player3IGN'),
      Player_3_ID: formData.get('hok-Player3ID'),
      Player_3_FBLink: formData.get('hok-Player3FBLink'),
      
      Player_4_IGN: formData.get('hok-Player4IGN'),
      Player_4_ID: formData.get('hok-Player4ID'),
      Player_4_FBLink: formData.get('hok-Player4FBLink'),

      Player_5_IGN: formData.get('hok-Player5IGN'),
      Player_5_ID: formData.get('hok-Player5ID'),
      Player_5_FBLink: formData.get('hok-Player5FBLink'),
      
      Timestamp: new Date(),
    };

    // Save to Firestore
    await setDoc(doc(db, "hokreg", teamName), teamData);

    alert("Form submitted successfully!");
    e.target.reset();

  } catch (error) {
    console.error("Error uploading files or saving data:", error.message);
    alert("Failed to upload files or save data.");
  }
});

