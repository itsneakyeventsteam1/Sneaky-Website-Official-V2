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

const notyf = new Notyf({
  position: { x: 'left', y: 'top' }
});

const imageList = document.getElementById("image-list");
const imageListMerch = document.getElementById("image-list-merch");
const imageInput = document.getElementById("image-input");
const imageInputMerch = document.getElementById("image-input-merch");
const imageUploadBtn = document.getElementById("image-upload-btn");
const imageUploadMerchBtn = document.getElementById("image-upload-merch-btn");
const imageDeleteBtn = document.getElementById("image-delete-btn");
const uploadStatus = document.getElementById("upload-status");

let selectedImages = [];

// Function to load images from Firebase Storage
function loadImages() {
  const listRef = ref(storage, 'events_pictures');
  const listRefMerch = ref(storage, 'merch_pictures');

  // Load event images
  listAll(listRef).then((res) => {
    res.items.forEach((itemRef) => {
      getDownloadURL(itemRef).then((url) => {
        const img = document.createElement("img");
        img.src = url;
        img.alt = itemRef.name;
        img.dataset.storagePath = itemRef.fullPath;
        imageList.appendChild(img);

        img.addEventListener("click", () => {
          toggleImageSelection(img);
        });
      });
    });
  }).catch((error) => {
    console.error("Error loading images:", error);
  });

  // Load merch images
  listAll(listRefMerch).then((res) => {
    res.items.forEach((itemRef) => {
      getDownloadURL(itemRef).then((url) => {
        const img = document.createElement("img");
        img.src = url;
        img.alt = itemRef.name;
        img.dataset.storagePath = itemRef.fullPath;
        imageListMerch.appendChild(img);

        img.addEventListener("click", () => {
          toggleImageSelection(img);
        });
      });
    });
  }).catch((error) => {
    console.error("Error loading merch images:", error);
  });
}

// Helper function to toggle image selection
function toggleImageSelection(img) {
  if (img.classList.contains('selected')) {
    img.classList.remove('selected');
    selectedImages = selectedImages.filter(path => path !== img.dataset.storagePath);
  } else {
    img.classList.add('selected');
    selectedImages.push(img.dataset.storagePath);
  }
  updateDeleteButtonState();
}

// Load images when the page loads
window.addEventListener("load", loadImages);

// Image upload handler for events
imageUploadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  uploadImages(imageInput.files, 'events_pictures', imageList);
});

// Image upload handler for merch
imageUploadMerchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  uploadImages(imageInputMerch.files, 'merch_pictures', imageListMerch);
});

// Upload images to Firebase Storage
function uploadImages(files, folderPath, imageListElement) {
  if (!files.length) {
    notyf.error("Please select an image to upload");
    return;
  }

  uploadStatus.textContent = "Image is uploading...";
  const promises = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const storageRef = ref(storage, `${folderPath}/${file.name}`);

    const uploadTask = uploadBytes(storageRef, file).then((snapshot) => {
      return getDownloadURL(snapshot.ref);
    }).then((downloadURL) => {
      const img = document.createElement("img");
      img.src = downloadURL;
      img.alt = file.name;
      img.dataset.storagePath = `${folderPath}/${file.name}`;
      imageListElement.appendChild(img);

      img.addEventListener("click", () => {
        toggleImageSelection(img);
      });
    }).catch((error) => {
      console.error("Error uploading image:", error);
    });

    promises.push(uploadTask);
  }

  Promise.all(promises).then(() => {
    notyf.success('Images uploaded successfully');
    uploadStatus.textContent = "";
  }).catch((error) => {
    notyf.error('Error uploading images');
    uploadStatus.textContent = "Image upload failed";
    console.error(error);
  });
}

// Delete selected images from Firebase Storage
imageDeleteBtn.addEventListener("click", () => {
  const deleteCount = selectedImages.length;
  const deletePromises = selectedImages.map((storagePath) => {
    const storageRef = ref(storage, storagePath);
    return deleteObject(storageRef).then(() => {
      const img = document.querySelector(`img[data-storage-path='${storagePath}']`);
      if (img) img.remove();
    }).catch((error) => {
      console.error("Error deleting image:", error);
    });
  });

  Promise.all(deletePromises).then(() => {
    selectedImages = [];
    updateDeleteButtonState();
    notyf.success(`${deleteCount} images deleted successfully`);
    uploadStatus.textContent = `${deleteCount} images deleted successfully`;
  }).catch((error) => {
    notyf.error('Error deleting images');
    uploadStatus.textContent = "Error deleting images";
    console.error(error);
  });
});

// Update the delete button state
function updateDeleteButtonState() {
  if (selectedImages.length === 0) {
    imageDeleteBtn.disabled = true;
    imageDeleteBtn.title = "Must select at least one image";
  } else {
    imageDeleteBtn.disabled = false;
    imageDeleteBtn.title = "";
  }
}

// Firestore Registration Details Handling
const titleInput = document.getElementById('registration-details-input');
const contentInput = document.getElementById('registration-details-input-text');
const saveRegistrationBtn = document.getElementById('save-registration-btn');
const saveStatus = document.getElementById('save-status');

// Display Firestore registration details
async function loadRegistrationDetails() {
  const docRef = doc(db, "registration-details", "registration-text");
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      document.getElementById('registration-details-preview-title').textContent = data.Title || 'No Title';
      document.getElementById('registration-details-preview-content').innerHTML = formatContentWithLinks(data.Text || 'No Content');
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching document:", error);
  }
}

// Format content with links
function formatContentWithLinks(content) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return content.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
}

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
      loadRegistrationDetails();
    } catch (error) {
      console.error("Error saving registration details:", error);
      saveStatus.textContent = "Error saving registration details.";
    }
  } else {
    
    saveStatus.textContent = "Please fill in both fields.";
  }
});

// Load registration details on page load
loadRegistrationDetails();


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
    type: 'doughnut',
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
          text: 'Storage Usage'
        }
      }
    }
  });
}




const saveSwitchState = async (switchId, isEnabled) => {
  const switchStatus = isEnabled ? "enabled" : "disabled";
  try {
      await setDoc(doc(db, 'reg_switches', switchId), { switchStatus });
      console.log(`${switchId} saved as ${switchStatus}`);
  } catch (error) {
      console.error("Error saving switch state: ", error);
  }
};

const loadSwitchState = async (switchId) => {
  try {
      const docRef = doc(db, 'reg_switches', switchId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
          const switchStatus = docSnap.data().switchStatus;
          const switchInput = document.getElementById(`${switchId}Switch`);
          switchInput.checked = switchStatus === "enabled";

          const associatedCheckboxId = switchId + 'Checkbox';
          const associatedCheckbox = document.getElementById(associatedCheckboxId);
          associatedCheckbox.disabled = !switchInput.checked;
          associatedCheckbox.checked = switchInput.checked;
      }
  } catch (error) {
      console.error("Error loading switch state: ", error);
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  // Load the state for each switch on page load
  const switchIds = ['valorant', 'mlbb', 'hok'];
  for (const switchId of switchIds) {
      await loadSwitchState(switchId);
  }

  document.querySelectorAll('.switch input').forEach(switchInput => {
      switchInput.addEventListener('change', () => {
          const associatedCheckboxId = switchInput.id.replace('Switch', 'Checkbox');
          const associatedCheckbox = document.getElementById(associatedCheckboxId);
          associatedCheckbox.disabled = !switchInput.checked;
          associatedCheckbox.checked = switchInput.checked;

          const switchId = switchInput.id.replace('Switch', '');
          saveSwitchState(switchId, switchInput.checked);
      });
  });
});
