import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig } from "./firebase.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadTools() {
  try {
    const snapshot = await getDocs(collection(db, "Tool "));
    const toolsGrid = document.getElementById("toolsGrid");
    
    if (!toolsGrid) {
      console.error("toolsGrid element not found!");
      return;
    }
    
    if (snapshot.empty) {
      toolsGrid.innerHTML = `<p style="text-align:center;color:#aaa;padding:40px;">No tools found.</p>`;
      return;
    }
    
    let html = "";
    let seenTools = new Set();
    
    snapshot.forEach((doc) => {
      const tool = doc.data();
      if (seenTools.has(tool.name)) return;
      seenTools.add(tool.name);
      
      html += `
        <div class="tool-card">
          <img src="${tool.image || 'https://via.placeholder.com/150'}" alt="${tool.name || 'Tool'}">
          <h3>${tool.name || 'Unnamed Tool'}</h3>
          <p>${tool.description || 'No description available'}</p>
          <span class="category">${tool.category || 'Uncategorized'}</span>
          <span class="rating">⭐ ${tool.rating || 'N/A'}</span>
          <button class="try-btn">Try Now</button>
        </div>
      `;
    });
    
    toolsGrid.innerHTML = html;
    console.log(`✅ Loaded ${snapshot.size} tools`);
    
  } catch (e) {
    console.error("Error loading tools:", e);
    document.getElementById("toolsGrid").innerHTML = `
      <p style="text-align:center;color:#ff6b6b;padding:40px;">
        ❌ Error loading tools: ${e.message}
      </p>
    `;
  }
}

loadTools();
