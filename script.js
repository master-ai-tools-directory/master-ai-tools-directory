import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig } from "./firebase.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadTools() {
  try {
    // Test 1: "Tool"
    const snap1 = await getDocs(collection(db, "Tool"));
    alert("'Tool' → " + snap1.size);
    
    // Test 2: "tools"
    const snap2 = await getDocs(collection(db, "tools"));
    alert("'tools' → " + snap2.size);
    
    // Test 3: "tool"
    const snap3 = await getDocs(collection(db, "tool"));
    alert("'tool' → " + snap3.size);
    
    // Test 4: "TOOL"
    const snap4 = await getDocs(collection(db, "TOOL"));
    alert("'TOOL' → " + snap4.size);
    
  } catch (e) {
    alert("Error: " + e.message);
  }
}
loadTools();
    alert("✅ Documents found: " + snapshot.size);
  } catch (e) {
    alert("❌ Error: " + e.message);
  }
}

loadTools();
