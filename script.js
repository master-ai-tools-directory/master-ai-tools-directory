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
// Category Filtering
const categoryBtns = document.querySelectorAll('.category-btn');
const searchBox = document.getElementById('searchBox');

categoryBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    // Active کلاس ہٹائیں
    categoryBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    
    const category = this.dataset.category;
    filterTools(category);
  });
});

function filterTools(category) {
  const cards = document.querySelectorAll('.tool-card');
  cards.forEach(card => {
    const cardCategory = card.querySelector('.category')?.textContent || '';
    if (category === 'all' || cardCategory === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}
// Search Functionality
searchBox.addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const cards = document.querySelectorAll('.tool-card');
  
  cards.forEach(card => {
    const name = card.querySelector('h3')?.textContent?.toLowerCase() || '';
    const desc = card.querySelector('p')?.textContent?.toLowerCase() || '';
    
    if (name.includes(query) || desc.includes(query)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});
