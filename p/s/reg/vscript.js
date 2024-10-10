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

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);

  // Form submission
  document.querySelector('form[name="reg-form-2"]').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    let teamName = formData.get('vl-Team Name').replace(/[\/.]/g, "_");
    
    const photoofplayer = document.getElementById('photoofplayer').files[0];
    const team = document.getElementById('logo2').files[0];
    const profile = document.getElementById('profile').files[0];

    try {
      const photoPlayer = ref(storage, `${teamName}/photo_of_player/${photoofplayer.name}`);
      await uploadBytes(photoPlayer, photoofplayer);
      const photoplayerUrl = await getDownloadURL(photoPlayer);

      const logoRef = ref(storage, `${teamName}/team_logo/${team.name}`);
      await uploadBytes(logoRef, team);
      const logoUrl = await getDownloadURL(logoRef);

      const profileRef = ref(storage, `${teamName}/profile/${profile.name}`);
      await uploadBytes(profileRef, profile);
      const profileUrl = await getDownloadURL(profileRef);

      const teamData = {
        Email: formData.get('vl-Email'),
        TeamName: formData.get('vl-Team Name'),
        photoplayerUrl,
        profileUrl,
        logoUrl,
        Player_1_Name: formData.get('vl-Player1Name'),
        Player_1_RiotId: formData.get('vl-Player1RiotId'),
        Player_2_Name: formData.get('vl-Player2Name'),
        Player_2_RiotId: formData.get('vl-Player2RiotId'),
        Player_3_Name: formData.get('vl-Player3Name'),
        Player_3_RiotId: formData.get('vl-Player3RiotId'),
        Player_4_Name: formData.get('vl-Player4Name'),
        Player_4_RiotId: formData.get('vl-Player4RiotId'),
        Player_5_Name: formData.get('vl-Player5Name'),
        Player_5_RiotId: formData.get('vl-Player5RiotId'),
        // Fb_Page_of_School: formData.get('vl-fbpageofschool'),
        fbPageEsportUrl: formData.get('vl-fbPageEsportUrl'),
        Timestamp: new Date(),
      };

      // Save to Firestore
      await setDoc(doc(db, "valorant5", teamName), teamData);

      // SweetAlert2 success message
      await Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Form submitted successfully!',
        confirmButtonText: 'OK'
      });
      e.target.reset();

    } catch (error) {
      console.error("Error uploading files or saving data:", error.message);
      // SweetAlert2 error message
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to upload files or save data.',
        confirmButtonText: 'OK'
      });
    }
  });