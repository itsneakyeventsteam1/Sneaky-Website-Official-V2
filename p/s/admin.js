// Import Firebase SDK modules
import { getStorage, ref, listAll, getDownloadURL, uploadBytes, deleteObject, getMetadata } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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
const db = getFirestore(app);

const imageList = document.getElementById("image-list");
const imageInput = document.getElementById("image-input");
const imageUploadBtn = document.getElementById("image-upload-btn");
const imageDeleteBtn = document.getElementById("image-delete-btn");
const uploadStatus = document.getElementById("upload-status");

let selectedImages = [];

// Function to load images from Firebase Storage
function loadImages() {
  const listRef = ref(storage, 'events_pictures');

  listAll(listRef).then((res) => {
    res.items.forEach((itemRef) => {
      getDownloadURL(itemRef).then((url) => {
        const img = document.createElement("img");
        img.src = url;
        img.alt = itemRef.name;
        img.dataset.storagePath = itemRef.fullPath;
        imageList.appendChild(img);

        img.addEventListener("click", () => {
          if (img.classList.contains('selected')) {
            img.classList.remove('selected');
            selectedImages = selectedImages.filter(path => path !== img.dataset.storagePath);
          } else {
            img.classList.add('selected');
            selectedImages.push(img.dataset.storagePath);
          }

          updateDeleteButtonState();
        });
      });
    });
  }).catch((error) => {
    console.error("Error loading images:", error);
  });
}

// Load images when the page loads
window.addEventListener("load", loadImages);

document.addEventListener("DOMContentLoaded", () => {
  calculateStorageUsage();
})

// Image upload handler
imageUploadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const files = imageInput.files;
  if (!files.length) {
    alert("Please select an image to upload");
    return;
  }

  uploadStatus.textContent = "Image is uploading...";
  imageUploadBtn.disabled = true;

  const promises = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    const storageRef = ref(storage, `events_pictures/${file.name}`);

    const uploadTask = uploadBytes(storageRef, file).then((snapshot) => {
      return getDownloadURL(snapshot.ref);
    }).then((downloadURL) => {
      const img = document.createElement("img");
      img.src = downloadURL;
      img.alt = file.name;
      img.dataset.storagePath = `events_pictures/${file.name}`;
      imageList.appendChild(img);

      img.addEventListener("click", () => {
        if (img.classList.contains('selected')) {
          img.classList.remove('selected');
          selectedImages = selectedImages.filter(path => path !== img.dataset.storagePath);
        } else {
          img.classList.add('selected');
          selectedImages.push(img.dataset.storagePath);
        }

        updateDeleteButtonState();
      });
    }).catch((error) => {
      console.error("Error uploading image:", error);
    });

    promises.push(uploadTask);
  }

  Promise.all(promises).then(() => {
    uploadStatus.textContent = "Images uploaded successfully";
    imageUploadBtn.disabled = false;
  }).catch((error) => {
    uploadStatus.textContent = "Image upload failed";
    imageUploadBtn.disabled = false;
    console.error(error);
  });
});

// Image deletion handler
imageDeleteBtn.addEventListener("click", () => {
  const deletePromises = selectedImages.map((storagePath) => {
    const storageRef = ref(storage, storagePath);
    return deleteObject(storageRef).then(() => {
      const img = document.querySelector(`img[data-storage-path='${storagePath}']`);
      if (img) {
        img.remove();
      }
    }).catch((error) => {
      console.error("Error deleting image:", error);
    });
  });

  Promise.all(deletePromises).then(() => {
    selectedImages = [];
    updateDeleteButtonState();
    uploadStatus.textContent = "Selected images deleted successfully";
  }).catch((error) => {
    uploadStatus.textContent = "Error deleting images";
    console.error("Error deleting images:", error);
  });
});

// Function to update the delete button state
function updateDeleteButtonState() {
  if (selectedImages.length === 0) {
    imageDeleteBtn.disabled = true;
    imageDeleteBtn.title = "Must select at least one image";
  } else {
    imageDeleteBtn.disabled = false;
    imageDeleteBtn.title = "";
  }
}

// Firestore Registration Details

// Get references to DOM elements
const titleInput = document.getElementById('registration-details-input');
const contentInput = document.getElementById('registration-details-input-text');
const saveRegistrationBtn = document.getElementById('save-registration-btn');
const saveStatus = document.getElementById('save-status');

// Get references for the preview elements
const titlePreview = document.getElementById('registration-details-preview-title');
const contentPreview = document.getElementById('registration-details-preview-content');

// Function to convert plain text with links to HTML
function formatContentWithLinks(content) {
  const urlRegex = /(https?:\/\/[^\s]+)/g; // Regex to find URLs
  return content.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
}

// Function to retrieve and display Firestore data
async function loadRegistrationDetails() {
  const docRef = doc(db, "registration-details", "registration-text");
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();

      // Display the title and content in preview
      titlePreview.textContent = data.Title || 'No Title';
      contentPreview.innerHTML = formatContentWithLinks(data.Text || 'No Content');
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching document:", error);
  }
}

// Load registration details when the page loads
loadRegistrationDetails();

// Save registration details to Firestore
saveRegistrationBtn.addEventListener('click', async () => {
  const title = titleInput.value;
  const content = contentInput.value;

  if (title && content) {
    try {
      await setDoc(doc(db, "registration-details", "registration-text"), {
        Title: title,
        Text: content
      });
      saveStatus.textContent = "Registration details saved successfully!";
      loadRegistrationDetails(); // Reload the data after saving
    } catch (error) {
      console.error("Error saving registration details:", error);
      saveStatus.textContent = "Error saving registration details.";
    }
  } else {
    saveStatus.textContent = "Please fill in both fields.";
  }
});


const storageChartCanvas = document.getElementById('storageChart');

async function calculateStorageUsage() {
  const storageRef = ref(storage, 'events_pictures');
  const { items } = await listAll(storageRef);
  
  let totalSize = 0;

  for (const itemRef of items) {
    const metadata = await getMetadata(itemRef);
    totalSize += metadata.size; // size in bytes
  }

  const totalStorage = 5 * 1024 * 1024 * 1024; // 5 GB in bytes
  const usedStorage = totalSize; 
  const remainingStorage = totalStorage - usedStorage;

  // Update the chart with storage usage
  createStorageChart(usedStorage, remainingStorage);
}

// Function to create the storage chart
function createStorageChart(usedStorage, remainingStorage) {
  const ctx = storageChartCanvas.getContext('2d');
  const storageChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Used Storage', 'Remaining Storage'],
      datasets: [{
        data: [usedStorage / (1024 * 1024), remainingStorage / (1024 * 1024)], // Convert to MB
        backgroundColor: ['#ff6384', '#36a2eb'],
        hoverBackgroundColor: ['#ff6384', '#36a2eb']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Firebase Storage Usage'
        }
      }
    }
  });
}
