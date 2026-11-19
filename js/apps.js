// WebSyCode Applications Catalog & Manager

// Real applications dataset
window.appsCatalog = {
  notiva: {
    id: "notiva",
    name: "Notiva – Simple Notes, Your Way",
    shortName: "Notiva",
    tagline: "Capture your thoughts, organize ideas, and keep important information close",
    packageName: "com.studio.quicknotes",
    category: "tools",
    categoryTitle: "Tools & Productivity",
    developer: "WebSyCode",
    version: "2.0.0",
    rating: "Rated 3+",
    downloads: "New Release on Google Play",
    requiresAndroid: "Android 7.0 and up",
    iconSrc: "assets/apps/notiva/icon.webp",
    remoteIcon: "https://play-lh.googleusercontent.com/YkqPIijJcuJ4QPmyPuVssXOeltsd51R6wNOO2yXzUykE7PXdxYnGb2yVdAxPQNWfA_cy00jWEXhg68Vmbmi15A=w240-h480-rw",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.studio.quicknotes&hl=en_IN",
    shortDescription: "Notiva focuses on what matters most: a clean interface, a comfortable writing experience, and easy access to your notes. Whether you're writing a quick reminder, saving an idea, creating a checklist, or keeping important information organized, Notiva helps you stay on top of everything.",
    longDescription: "Notiva is a simple and modern notes app designed for everyday life. Enjoy a minimal, distraction-free interface that makes creating and managing notes effortless. With offline-first local storage powered by Realm Database and responsive design across phones, foldables, and tablets, your notes remain completely private and accessible without needing an internet connection or creating an account.",
    features: [
      "Simple & Clean Design: Minimal, distraction-free interface to focus on your ideas",
      "Quick Search: Fast searching across all saved notes and checklists",
      "Pin Important Notes: Keep your most critical notes easily accessible at the top",
      "Organize & Archive: Move notes to archive or trash with one-click restoration",
      "Light & Dark Mode: Choose clean light theme, dark theme, or follow system appearance",
      "Offline-First & Local Storage: Uses Realm Database locally with zero backend tracking",
      "Privacy First: No account required, no personal data collected or shared",
      "Multilingual & RTL: Full support for diverse languages and Right-to-Left scripts",
      "Responsive Layout: Custom-tailored layouts for phones, foldables, and tablets"
    ],
    techStack: ["Android (Kotlin)", "Realm Database", "Material 3 Design", "Offline-First", "Jetpack"],
    platforms: ["<i class=\"fa-brands fa-android\"></i> Android 7.0+", "<i class=\"fa-brands fa-google-play\"></i> Google Play"],
    screenshots: [
      {
        src: "assets/apps/notiva/screenshot1.webp",
        title: "Clean Note Editor",
        caption: "Distraction-free interface for effortless note taking and editing."
      },
      {
        src: "assets/apps/notiva/screenshot2.webp",
        title: "Search & Pinning",
        caption: "Pin high-priority notes and search through your thoughts instantly."
      },
      {
        src: "assets/apps/notiva/screenshot3.webp",
        title: "Organize & Archive",
        caption: "Keep your workspace tidy with archive and trash folders."
      },
      {
        src: "assets/apps/notiva/screenshot4.webp",
        title: "Light & Dark Themes",
        caption: "Comfortable reading experience in both light and dark modes."
      }
    ]
  }
};

document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("appSearchInput");
  const filterButtons = document.querySelectorAll(".app-filter-btn");
  const appsGrid = document.querySelector(".apps-grid");
  const noResultsMsg = document.getElementById("noAppsFound");
  const emptyStateContainer = document.getElementById("emptyAppsState");

  let currentCategory = "all";
  let currentSearchQuery = "";

  // Render applications or empty state
  function renderCatalog() {
    const appsList = Object.values(window.appsCatalog || {});

    if (appsList.length === 0) {
      if (appsGrid) appsGrid.style.display = "none";
      if (emptyStateContainer) emptyStateContainer.style.display = "block";
      const toolbarSection = document.querySelector(".apps-toolbar-section");
      if (toolbarSection) toolbarSection.style.display = "none";
      return;
    }

    if (emptyStateContainer) emptyStateContainer.style.display = "none";
    if (appsGrid) appsGrid.style.display = "grid";

    // Populate appsGrid dynamically with authentic apps
    appsGrid.innerHTML = appsList.map(app => `
      <div class="app-card-wrapper" data-category="${app.category || ''}" data-tags="${(app.features || []).join(' ')} ${app.name} ${app.categoryTitle}">
        <div class="app-card">
          <div class="app-card-header">
            <div class="app-icon-box">
              <img src="${app.iconSrc}" alt="${app.name} icon" onerror="this.src='${app.remoteIcon}'">
            </div>
            <div class="app-header-text">
              <div class="d-flex align-items-center flex-wrap gap-1">
                <span class="app-category-pill">${app.categoryTitle || 'Tools & Productivity'}</span>
                <span class="app-store-meta-badge"><i class="fa-brands fa-google-play"></i> Official App</span>
              </div>
              <h3 class="app-name">${app.name}</h3>
              <p class="app-tagline">${app.tagline || ''}</p>
            </div>
          </div>

          <div class="app-card-body">
            <p class="app-desc">${app.shortDescription || ''}</p>
            <ul class="app-feature-list">
              ${(app.features || []).slice(0, 4).map(f => `<li><i class="fa-solid fa-circle-check"></i> <span>${f}</span></li>`).join('')}
            </ul>

            <div class="app-screenshot-thumbnail-grid">
              ${(app.screenshots || []).map(sc => `
                <div class="app-screenshot-thumb" onclick="openAppModal('${app.id}')" title="${sc.title}">
                  <img src="${sc.src}" alt="${sc.title}">
                </div>
              `).join('')}
            </div>

            <div class="app-platform-badges">
              ${(app.platforms || []).map(p => `<span class="platform-pill">${p}</span>`).join('')}
              <span class="platform-pill"><i class="fa-solid fa-shield-halved"></i> Realm Offline-First</span>
            </div>
          </div>

          <div class="app-card-footer">
            <div class="d-flex gap-2 flex-wrap">
              <a href="${app.playStoreLink}" target="_blank" rel="noopener noreferrer" class="btn-app-action btn-primary-action" onclick="triggerAppAction('Opening Play Store', '${app.name}')">
                <i class="fa-brands fa-google-play"></i> Get on Google Play
              </a>
              <button class="btn-app-action btn-secondary-action" onclick="openAppModal('${app.id}')">
                <i class="fa-solid fa-circle-info"></i> Details
              </button>
            </div>
            <button class="btn-app-action btn-preview-action" onclick="openAppModal('${app.id}')">
              <i class="fa-solid fa-images"></i> Full Screenshots
            </button>
          </div>
        </div>
      </div>
    `).join('');

    filterApps();
  }

  function filterApps() {
    const appCards = document.querySelectorAll(".app-card-wrapper");
    let visibleCount = 0;

    appCards.forEach(card => {
      const category = card.getAttribute("data-category") || "";
      const name = (card.querySelector(".app-name")?.textContent || "").toLowerCase();
      const desc = (card.querySelector(".app-desc")?.textContent || "").toLowerCase();
      const tags = (card.getAttribute("data-tags") || "").toLowerCase();

      const matchesCategory = currentCategory === "all" || category.includes(currentCategory);
      const matchesSearch = !currentSearchQuery || 
                            name.includes(currentSearchQuery) || 
                            desc.includes(currentSearchQuery) || 
                            tags.includes(currentSearchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = "block";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    if (noResultsMsg) {
      if (visibleCount === 0 && Object.keys(window.appsCatalog || {}).length > 0) {
        noResultsMsg.style.display = "block";
      } else {
        noResultsMsg.style.display = "none";
      }
    }
  }

  // Category Filter Click
  filterButtons.forEach(btn => {
    btn.addEventListener("click", function() {
      filterButtons.forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      currentCategory = this.getAttribute("data-filter") || "all";
      filterApps();
    });
  });

  // Search Input Trigger
  if (searchInput) {
    searchInput.addEventListener("input", function(e) {
      currentSearchQuery = e.target.value.trim().toLowerCase();
      filterApps();
    });
  }

  // Modal Setup for App Previews & Details
  const appModal = document.getElementById("appDetailsModal");
  const modalCloseBtn = document.querySelector(".app-modal-close");
  const modalTitle = document.getElementById("modalAppName");
  const modalBadge = document.getElementById("modalAppCategory");
  const modalDesc = document.getElementById("modalAppDescription");
  const modalFeatures = document.getElementById("modalAppFeatures");
  const modalTechStack = document.getElementById("modalAppTechStack");
  const modalPlayStore = document.getElementById("modalPlayStore");
  const modalPreviewContainer = document.getElementById("modalAppPreviewScreen");

  window.openAppModal = function(appId) {
    const data = (window.appsCatalog || {})[appId];
    if (!data || !appModal) return;

    modalTitle.textContent = data.name;
    modalBadge.textContent = data.categoryTitle || "Tools & Productivity";
    modalDesc.textContent = data.longDescription || data.shortDescription || "";
    
    // Render features
    if (modalFeatures) {
      modalFeatures.innerHTML = (data.features || []).map(f => `<li><i class="fa-solid fa-circle-check"></i> ${f}</li>`).join("");
    }

    // Render tech stack tags
    if (modalTechStack) {
      modalTechStack.innerHTML = (data.techStack || []).map(t => `<span class="tech-tag">${t}</span>`).join("");
    }

    // Google Play Store button
    if (modalPlayStore) {
      modalPlayStore.href = data.playStoreLink || "#";
      modalPlayStore.style.display = "inline-flex";
    }

    // Screenshots Gallery in Modal
    if (modalPreviewContainer) {
      modalPreviewContainer.innerHTML = `
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 25px;">
          <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
            <img src="${data.iconSrc}" alt="${data.name}" style="width: 64px; height: 64px; border-radius: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <div>
              <h4 style="margin: 0; font-weight: 700; color: #1e293b;">${data.name}</h4>
              <p style="margin: 2px 0 0; color: #64748b; font-size: 0.9rem;">By <strong>${data.developer}</strong> • Version ${data.version} • ${data.requiresAndroid}</p>
            </div>
          </div>

          <h5 style="font-size: 0.95rem; font-weight: 700; color: #334155; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
            <i class="fa-solid fa-images"></i> Official Screenshots from Google Play
          </h5>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px;">
            ${(data.screenshots || []).map(sc => `
              <div style="background: #ffffff; border-radius: 10px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.06); text-align: center;">
                <img src="${sc.src}" alt="${sc.title}" style="width: 100%; height: auto; display: block;">
                <div style="padding: 10px;">
                  <strong style="font-size: 0.85rem; color: #1e293b; display: block;">${sc.title}</strong>
                  <span style="font-size: 0.78rem; color: #64748b;">${sc.caption}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    appModal.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  window.closeAppModal = function() {
    if (appModal) {
      appModal.classList.remove("open");
      document.body.style.overflow = "";
    }
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeAppModal);
  }

  if (appModal) {
    appModal.addEventListener("click", function(e) {
      if (e.target === appModal) {
        closeAppModal();
      }
    });
  }

  // Toast alert for action triggers
  window.triggerAppAction = function(actionType, appName) {
    showToast(`${appName}: ${actionType}`);
  };

  function showToast(message) {
    let toast = document.getElementById("appActionToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "appActionToast";
      toast.className = "app-toast";
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-circle-info"></i> ${message}`;
    toast.classList.add("visible");
    setTimeout(() => {
      toast.classList.remove("visible");
    }, 3500);
  }

  // Initial render
  renderCatalog();
});
