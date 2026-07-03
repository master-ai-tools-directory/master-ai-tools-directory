import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { firebaseConfig } from "./firebase.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const toolsGrid = document.getElementById("toolsGrid");

async function loadTools() {
  toolsGrid.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "Tool"));

  querySnapshot.forEach((doc) => {
    const tool = doc.data();

    toolsGrid.innerHTML += `
      <div class="tool-card">
        <h3>${tool.name}</h3>
        <p>${tool.Description}</p>
        <span>${tool.Category}</span><br><br>
        <a href="${tool.Website}" target="_blank">Open Tool</a>
      </div>
    `;
  });
}

loadTools();
