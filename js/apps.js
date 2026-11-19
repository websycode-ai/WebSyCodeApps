// WebSyCode Applications Catalog & Manager

// Real applications dataset. To add applications, insert app objects here or load them dynamically.
window.appsCatalog = {};

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

    // Populate appsGrid dynamically if apps exist
    appsGrid.innerHTML = appsList.map(app => `
      <div class="app-card-wrapper" data-category="${app.category || ''}" data-tags="${(app.tags || []).join(' ')}">
        <div class="app-card">
          <div class="app-card-header">
            <div class="app-icon-box" style="background: ${app.themeGradient || 'linear-gradient(135deg, #0673b5, #0097c9)'}">
              <i class="${app.iconClass || 'fa-solid fa-cube'}"></i>
            </div>
            <div class="app-header-text">
              <span class="app-category-pill">${app.categoryTitle || 'Application'}</span>
              <h3 class="app-name">${app.name}</h3>
              <p class="app-tagline">${app.tagline || ''}</p>
            </div>
          </div>

          <div class="app-card-body">
            <p class="app-desc">${app.shortDescription || ''}</p>
            <ul class="app-feature-list">
              ${(app.features || []).map(f => `<li><i class="fa-solid fa-circle-check"></i> <span>${f}</span></li>`).join('')}
            </ul>

            <div class="app-platform-badges">
              ${(app.platforms || []).map(p => `<span class="platform-pill">${p}</span>`).join('')}
            </div>
          </div>

          <div class="app-card-footer">
            <div class="d-flex gap-2">
              <button class="btn-app-action btn-primary-action" onclick="openAppModal('${app.id}')">
                <i class="fa-solid fa-expand"></i> View Details
              </button>
              ${app.apkLink ? `
                <a href="${app.apkLink}" class="btn-app-action btn-secondary-action" onclick="triggerAppAction('Download APK', '${app.name}')">
                  <i class="fa-brands fa-android"></i> APK
                </a>
              ` : ''}
              ${app.playStoreLink ? `
                <a href="${app.playStoreLink}" target="_blank" class="btn-app-action btn-secondary-action" onclick="triggerAppAction('Play Store Link', '${app.name}')">
                  <i class="fa-brands fa-google-play"></i> Play Store
                </a>
              ` : ''}
              ${app.webDemoLink ? `
                <a href="${app.webDemoLink}" target="_blank" class="btn-app-action btn-secondary-action" onclick="triggerAppAction('Launch Demo', '${app.name}')">
                  <i class="fa-solid fa-arrow-up-right-from-square"></i> Web Demo
                </a>
              ` : ''}
            </div>
            <button class="btn-app-action btn-preview-action" onclick="openAppModal('${app.id}')">
              <i class="fa-solid fa-images"></i> Screenshots
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
  const modalDownloadApk = document.getElementById("modalDownloadApk");
  const modalPlayStore = document.getElementById("modalPlayStore");
  const modalWebDemo = document.getElementById("modalWebDemo");
  const modalPreviewContainer = document.getElementById("modalAppPreviewScreen");

  window.openAppModal = function(appId) {
    const data = (window.appsCatalog || {})[appId];
    if (!data || !appModal) return;

    modalTitle.textContent = data.name;
    modalBadge.textContent = data.categoryTitle || "Application";
    modalDesc.textContent = data.longDescription || data.shortDescription || "";
    
    // Render features
    if (modalFeatures) {
      modalFeatures.innerHTML = (data.features || []).map(f => `<li><i class="fa-solid fa-circle-check"></i> ${f}</li>`).join("");
    }

    // Render tech stack tags
    if (modalTechStack) {
      modalTechStack.innerHTML = (data.techStack || []).map(t => `<span class="tech-tag">${t}</span>`).join("");
    }

    // Download / Launch URLs
    if (modalDownloadApk) {
      if (data.apkLink) {
        modalDownloadApk.href = data.apkLink;
        modalDownloadApk.style.display = "inline-flex";
      } else {
        modalDownloadApk.style.display = "none";
      }
    }
    if (modalPlayStore) {
      if (data.playStoreLink) {
        modalPlayStore.href = data.playStoreLink;
        modalPlayStore.style.display = "inline-flex";
      } else {
        modalPlayStore.style.display = "none";
      }
    }
    if (modalWebDemo) {
      if (data.webDemoLink) {
        modalWebDemo.href = data.webDemoLink;
        modalWebDemo.style.display = "inline-flex";
      } else {
        modalWebDemo.style.display = "none";
      }
    }

    // Preview mockup
    if (modalPreviewContainer) {
      modalPreviewContainer.innerHTML = `
        <div class="mockup-frame">
          <div class="mockup-header">
            <span class="mockup-dot red"></span>
            <span class="mockup-dot yellow"></span>
            <span class="mockup-dot green"></span>
            <span class="mockup-url-bar">${data.urlPreview || 'https://websycode.in/apps'}</span>
          </div>
          <div class="mockup-body">
            <div class="mockup-hero-banner" style="background: ${data.themeGradient || 'linear-gradient(135deg, #0673b5, #0097c9)'}">
              <div class="mockup-hero-icon"><i class="${data.iconClass || 'fa-solid fa-cube'}"></i></div>
              <h3>${data.name}</h3>
              <p>${data.tagline || ''}</p>
            </div>
            ${data.screens ? `
              <div class="mockup-content-grid">
                ${data.screens.map(sc => `
                  <div class="mockup-screen-card">
                    <div class="screen-title"><i class="fa-solid fa-layer-group"></i> ${sc.title}</div>
                    <p class="screen-caption">${sc.caption}</p>
                  </div>
                `).join("")}
              </div>
            ` : ''}
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

  // Toast alert for demo / download actions
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
