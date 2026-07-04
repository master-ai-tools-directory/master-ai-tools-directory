import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig } from "./firebase.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testCollections() {
  try {
    // Test 1: "Tool" (Capital T)
    const snap1 = await getDocs(collection(db, "Tool"));
    alert("🔵 'Tool' → " + snap1.size + " documents");
    
    // Test 2: "tools" (small t)
    const snap2 = await getDocs(collection(db, "tools"));
    alert("🟢 'tools' → " + snap2.size + " documents");
    
    // Test 3: "tool" (small t)
    const snap3 = await getDocs(collection(db, "tool"));
    alert("🟡 'tool' → " + snap3.size + " documents");
    
  } catch (e) {
    alert("❌ Error: " + e.message);
  }
}

testCollections();
