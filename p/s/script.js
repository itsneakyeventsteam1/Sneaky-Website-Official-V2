// Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

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
const auth = getAuth(app);

// Timestamp
function convertToPHT(date) {
  const utcDate = new Date(date);
  const options = {
    timeZone: 'Asia/Manila',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  return utcDate.toLocaleString('en-PH', options);
}

// Unified Error Handling Function
function handleError(message, error) {
  console.error(message, error);
  Swal.fire(message, 'An error occurred. Please try again.', 'error');
}

// Unified Alert for Authentication Required
function alertNotAuthenticated() {
  Swal.fire('Access Denied', 'You must be logged in to view this page.', 'error').then(() => {
    window.location.href = '/p/s/login.html';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.logoutpage');
  const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Logout';
    logoutButton.id = 'logout-button';

    // Append the logout button to the navigation
    if (nav) {
      nav.appendChild(logoutButton);
    }
  const currentPage = window.location.pathname;

  // Pages that don't require authentication
  const noAuthPages = ['/p/s/login.html'];

  // Global Auth Check
  if (!noAuthPages.includes(currentPage)) {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        alertNotAuthenticated();  // Alert user and redirect if not authenticated
      }
    });
  }


  // Admin Page Logic
  if (currentPage === '/p/s/players.html') {
    const gameSelector = document.getElementById('select-game');
    const mlbbMode = document.getElementById('mlbb-mode');
    const valorantMode = document.getElementById('valorant-mode');

    function showSelectedGame() {
      if (gameSelector.value === 'mlbb') {
        mlbbMode.style.display = 'block';
        valorantMode.style.display = 'none';
        displayData();
      } else if (gameSelector.value === 'valorant') {
        mlbbMode.style.display = 'none';
        valorantMode.style.display = 'block';
        displayValorantData();
      }
    }

    gameSelector.addEventListener('change', showSelectedGame);

    async function displayData() {
      document.getElementById('loading').style.display = 'block';
      try {
        const querySnapshot = await getDocs(collection(db, "mlbb"));
        const tableBody = document.getElementById('table-body');

        if (!querySnapshot.empty) {
          tableBody.innerHTML = '';
          querySnapshot.forEach((doc) => {
            const team = doc.data();
            const row = document.createElement('tr');
            row.innerHTML = `
              <td><input type="checkbox" class="delete-checkbox" data-id="${doc.id}"></td>
              <td>${team.Timestamp ? convertToPHT(team.Timestamp.toDate()) : 'N/A'}</td>
              <td>${team.Email}</td>
              <td>${team.TeamName}</td>
              <td>${team.ShortTeamName}</td>
              <td>${team.CaptainName}</td>
              <td>${team.CaptainEmail}</td>
              <td>${team.CaptainNumber}</td>
              <td>${team.CaptainDiscord}</td>
              <td>${team.CaptainFBLink}</td>
              <td>${team.Player_1_Name}</td>
              <td>${team.Player_1_IGN}</td>
              <td>${team.Player_1_MLID}</td>
              <td>${team.Player_1_Server}</td>
              <td>${team.Player_1_DiscordID}</td>
              <td>${team.Player_1_FBLink}</td>
              <td>${team.Player_2_Name}</td>
              <td>${team.Player_2_IGN}</td>
              <td>${team.Player_2_MLID}</td>
              <td>${team.Player_2_Server}</td>
              <td>${team.Player_2_DiscordID}</td>
              <td>${team.Player_2_FBLink}</td>
              <td>${team.Player_3_Name}</td>
              <td>${team.Player_3_IGN}</td>
              <td>${team.Player_3_MLID}</td>
              <td>${team.Player_3_Server}</td>
              <td>${team.Player_3_DiscordID}</td>
              <td>${team.Player_3_FBLink}</td>
              <td>${team.Player_4_Name}</td>
              <td>${team.Player_4_IGN}</td>
              <td>${team.Player_4_MLID}</td>
              <td>${team.Player_4_Server}</td>
              <td>${team.Player_4_DiscordID}</td>
              <td>${team.Player_4_FBLink}</td>
              <td>${team.Player_5_Name}</td>
              <td>${team.Player_5_IGN}</td>
              <td>${team.Player_5_MLID}</td>
              <td>${team.Player_5_Server}</td>
              <td>${team.Player_5_DiscordID}</td>
              <td>${team.Player_5_FBLink}</td>
              <td>${team.Sub_Name}</td>
              <td>${team.Sub_IGN}</td>
              <td>${team.Sub_MLID}</td>
              <td>${team.Sub_Server}</td>
              <td>${team.Sub_DiscordID}</td>
              <td>${team.Sub_FBLink}</td>
              <td><img src="${team.paymentUrl}" alt="Payment Image" width="100"></td>
              <td><img src="${team.logoUrl}" alt="Logo Image" width="100"></td>
            `;
            tableBody.appendChild(row);
          });
          document.getElementById('loading').style.display = 'none';
        } else {
          Swal.fire('No data found in Firestore!', '', 'info');
          document.getElementById('loading').style.display = 'none';
        }
      } catch (error) {
        handleError('Error fetching data from Firestore:', error);
        document.getElementById('loading').style.display = 'none';
      }
    }

    async function deleteSelected() {
      const checkboxes = document.querySelectorAll('.delete-checkbox:checked');
      if (checkboxes.length === 0) {
        Swal.fire('Please select at least one row to delete.', '', 'info');
        return;
      }

      const promises = [];
      checkboxes.forEach((checkbox) => {
        const docId = checkbox.getAttribute('data-id');
        promises.push(deleteDoc(doc(db, "mlbb", docId)));
      });

      try {
        await Promise.all(promises);
        Swal.fire('Selected rows have been deleted!', '', 'success');
        displayData();
      } catch (error) {
        handleError('Error deleting documents:', error);
      }
    }

    // Valorant Table Display Function
    async function displayValorantData() {
      document.getElementById('loading').style.display = 'block';
      try {
        const querySnapshot = await getDocs(collection(db, "valorant"));
        const tableBody = document.getElementById('tablev-body');

        if (!querySnapshot.empty) {
          tableBody.innerHTML = '';
          querySnapshot.forEach((doc) => {
            const team = doc.data();
            const row = document.createElement('tr');
            row.innerHTML = `
              <td><input type="checkbox" class="v-delete-checkbox" data-id="${doc.id}"></td>
              <td>${team.Timestamp ? convertToPHT(team.Timestamp.toDate()) : 'N/A'}</td>
              <td>${team.Email}</td>
              <td>${team.TeamName}</td>
              <td>${team.Player_1_Name}</td>
              <td>${team.Player_1_RiotId}</td>
              <td>${team.Player_2_Name}</td>
              <td>${team.Player_2_RiotId}</td>
              <td>${team.Player_3_Name}</td>
              <td>${team.Player_3_RiotId}</td>
              <td><img src="${team.logoUrl}" alt="Logo Image" width="100"></td>
              <td><img src="${team.photoplayerUrl}" alt="Player Photo" width="100"></td>
              <td><img src="${team.profileUrl}" alt="Player Photo" width="100"></td>
              <td><a href="${team.Fb_Page_of_School}">${team.Fb_Page_of_School}</a></td>
              <td><a href="${team.fbPageEsportUrl}">${team.fbPageEsportUrl}</a></td>
              
            `;
            tableBody.appendChild(row);
          });
          document.getElementById('loading').style.display = 'none';
        } else {
          Swal.fire('No Valorant data found in Firestore!', '', 'info');
          document.getElementById('loading').style.display = 'none';
        }
      } catch (error) {
        handleError('Error fetching Valorant data from Firestore:', error);
        document.getElementById('loading').style.display = 'none';
      }
    }

    // Valorant Delete Function
    async function deleteValorantSelected() {
      const checkboxes = document.querySelectorAll('.v-delete-checkbox:checked');
      if (checkboxes.length === 0) {
        Swal.fire('Please select at least one Valorant table row to delete.', '', 'info');
        return;
      }

      const promises = [];
      checkboxes.forEach((checkbox) => {
        const docId = checkbox.getAttribute('data-id');
        promises.push(deleteDoc(doc(db, "valorant", docId)));
      });

      try {
        await Promise.all(promises);
        Swal.fire('Selected Valorant rows have been deleted!', '', 'success');
        displayValorantData();
      } catch (error) {
        handleError('Error deleting Valorant documents:', error);
      }
    }


    onAuthStateChanged(auth, (user) => {
      if (user) {
        showSelectedGame(); // Display the initially selected game

        // Add event listener for deleting selected rows
        document.getElementById('delete-selected').addEventListener('click', deleteSelected);
        document.getElementById('vdelete-selected').addEventListener('click', deleteValorantSelected);

        // Select All checkbox logic for MLBB
        document.getElementById('select-all').addEventListener('change', (e) => {
          const checkboxes = document.querySelectorAll('.delete-checkbox');
          checkboxes.forEach(checkbox => {
            checkbox.checked = e.target.checked;
          });
        });

        // Select All checkbox logic for Valorant
        document.getElementById('v-select-all').addEventListener('change', (e) => {
          const checkboxes = document.querySelectorAll('.v-delete-checkbox');
          checkboxes.forEach(checkbox => {
            checkbox.checked = e.target.checked;
          });
        });
      } else {
        alertNotAuthenticated();  // Alert user and redirect if not authenticated
      }
    });
  }

  // Login Page Logic
  if (currentPage === '/p/s/login.html') {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        window.location.href = '/p/s/admin.html';
      }
    });

    document.getElementById('login-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      try {
        await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem('loggedIn', 'true');
        window.location.href = '/p/s/admin.html';
      } catch (error) {
        handleError('Login Error:', error);
      }
    });
  }


  if (currentPage === '/p/s/account.html') {
    // Logout Logic
  document.getElementById('logout-button').addEventListener('click', async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('loggedIn');
      Swal.fire('Logged out successfully!', '', 'success').then(() => {
        window.location.href = '/p/s/login.html';
      });
    } catch (error) {
      handleError('Logout error:', error);
    }
  });
  }
});