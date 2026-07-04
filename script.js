import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { firebaseConfig } from "./firebase.js";

try {
  const app = initializeApp(firebaseConfig);
  console.log("✅ Firebase initialized successfully");
  
  const db = getFirestore(app);
  console.log("✅ Firestore connected");
  
  async function loadTools() {
    try {
      const snapshot = await getDocs(collection(db, "Tool"));
      alert("✅ Documents found: " + snapshot.size);
    } catch (e) {
      alert("❌ Error loading documents:\n" + e.message);
    }
  }
  
  loadTools();
} catch (e) {
  alert("❌ Firebase initialization failed:\n" + e.message);
}
