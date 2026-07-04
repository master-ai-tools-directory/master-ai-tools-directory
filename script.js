import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig } from "./firebase.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadTools() {
  try {
  const snapshot = await getDocs(collection(db, "tool"));
    alert("✅ Documents found: " + snapshot.size);
  } catch (e) {
    alert("❌ Error: " + e.message);
  }
}

loadTools();
