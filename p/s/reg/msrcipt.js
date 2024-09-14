// Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";

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
const storage = getStorage(app);

// Form submission
document.querySelector('form[name="reg-form-2"]').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Fetch form data
  const formData = new FormData(e.target);
  let teamName = formData.get('ml-Team Name').replace(/[\/.]/g, "_");
  
  // Files for Firebase Storage
  const proofOfPayment = document.getElementById('payment2').files[0];
  const teamLogo = document.getElementById('logo2').files[0];

  try {
    // Upload files to Firebase Storage
    const paymentRef = ref(storage, `${teamName}/proof_of_payment/${proofOfPayment.name}`);
    await uploadBytes(paymentRef, proofOfPayment);
    const paymentUrl = await getDownloadURL(paymentRef);

    const logoRef = ref(storage, `${teamName}/team_logo/${teamLogo.name}`);
    await uploadBytes(logoRef, teamLogo);
    const logoUrl = await getDownloadURL(logoRef);

    // Firestore data
    const teamData = {
      Email: formData.get('ml-Email'),
      TeamName: formData.get('ml-Team Name'),
      ShortTeamName: formData.get('ml-Short Team Name'),
      CaptainName: formData.get('ml-Team Captain Name'),
      CaptainEmail: formData.get('ml-Captain Email'),
      CaptainNumber: formData.get('ml-Captain/Coach Number'),
      CaptainDiscord: formData.get('ml-Captain Discord ID'),
      CaptainFBLink: formData.get('ml-Captain/Coach FB Link'),
      paymentUrl,
      logoUrl,
      Player_1_Name: formData.get('ml-Player1Name'),
      Player_1_IGN: formData.get('ml-Player1IGN'),
      Player_1_MLID: formData.get('ml-Player1MLID'),
      Player_1_Server: formData.get('ml-Player1Server'),
      Player_1_DiscordID: formData.get('ml-Player1DiscordID'),
      Player_1_FBLink: formData.get('ml-Player1FBLink'),

      Player_2_Name: formData.get('ml-Player2Name'),
      Player_2_IGN: formData.get('ml-Player2IGN'),
      Player_2_MLID: formData.get('ml-Player2MLID'),
      Player_2_Server: formData.get('ml-Player2Server'),
      Player_2_DiscordID: formData.get('ml-Player2DiscordID'),
      Player_2_FBLink: formData.get('ml-Player2FBLink'),

      Player_3_Name: formData.get('ml-Player3Name'),
      Player_3_IGN: formData.get('ml-Player3IGN'),
      Player_3_MLID: formData.get('ml-Player3MLID'),
      Player_3_Server: formData.get('ml-Player3Server'),
      Player_3_DiscordID: formData.get('ml-Player3DiscordID'),
      Player_3_FBLink: formData.get('ml-Player3FBLink'),
      
      Player_4_Name: formData.get('ml-Player4Name'),
      Player_4_IGN: formData.get('ml-Player4IGN'),
      Player_4_MLID: formData.get('ml-Player4MLID'),
      Player_4_Server: formData.get('ml-Player4Server'),
      Player_4_DiscordID: formData.get('ml-Player4DiscordID'),
      Player_4_FBLink: formData.get('ml-Player4FBLink'),

      Player_5_Name: formData.get('ml-Player5Name'),
      Player_5_IGN: formData.get('ml-Player5IGN'),
      Player_5_MLID: formData.get('ml-Player5MLID'),
      Player_5_Server: formData.get('ml-Player5Server'),
      Player_5_DiscordID: formData.get('ml-Player5DiscordID'),
      Player_5_FBLink: formData.get('ml-Player5FBLink'),

      Sub_Name: formData.get('ml-Player6Name'),
      Sub_IGN: formData.get('ml-Player6IGN'),
      Sub_MLID: formData.get('ml-Player6MLID'),
      Sub_Server: formData.get('ml-Player6Server'),
      Sub_DiscordID: formData.get('ml-Player6DiscordID'),
      Sub_FBLink: formData.get('ml-Player6FBLink'),
      
      Timestamp: new Date(),
    };

    // Save to Firestore
    await setDoc(doc(db, "mlbb", teamName), teamData);

    alert("Form submitted successfully!");
    e.target.reset();

  } catch (error) {
    console.error("Error uploading files or saving data:", error.message);
    alert("Failed to upload files or save data.");
  }
});