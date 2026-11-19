// WebSyCode Apps Page Interactive Logic

document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("appSearchInput");
  const filterButtons = document.querySelectorAll(".app-filter-btn");
  const appCards = document.querySelectorAll(".app-card-wrapper");
  const noResultsMsg = document.getElementById("noAppsFound");

  let currentCategory = "all";
  let currentSearchQuery = "";

  function filterApps() {
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
        card.classList.remove("fade-out");
        card.classList.add("fade-in");
        visibleCount++;
      } else {
        card.style.display = "none";
        card.classList.remove("fade-in");
      }
    });

    if (noResultsMsg) {
      if (visibleCount === 0) {
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
    const data = window.appsCatalog[appId];
    if (!data || !appModal) return;

    modalTitle.textContent = data.name;
    modalBadge.textContent = data.categoryTitle;
    modalDesc.textContent = data.longDescription;
    
    // Render features
    if (modalFeatures) {
      modalFeatures.innerHTML = data.features.map(f => `<li><i class="fa-solid fa-circle-check"></i> ${f}</li>`).join("");
    }

    // Render tech stack tags
    if (modalTechStack) {
      modalTechStack.innerHTML = data.techStack.map(t => `<span class="tech-tag">${t}</span>`).join("");
    }

    // Download / Launch URLs
    if (modalDownloadApk) modalDownloadApk.href = data.apkLink || "#";
    if (modalPlayStore) modalPlayStore.href = data.playStoreLink || "#";
    if (modalWebDemo) modalWebDemo.href = data.webDemoLink || "#";

    // Preview mockup
    if (modalPreviewContainer) {
      modalPreviewContainer.innerHTML = `
        <div class="mockup-frame mockup-${data.type}">
          <div class="mockup-header">
            <span class="mockup-dot red"></span>
            <span class="mockup-dot yellow"></span>
            <span class="mockup-dot green"></span>
            <span class="mockup-url-bar">${data.urlPreview}</span>
          </div>
          <div class="mockup-body">
            <div class="mockup-hero-banner" style="background: ${data.themeGradient}">
              <div class="mockup-hero-icon"><i class="${data.iconClass}"></i></div>
              <h3>${data.name}</h3>
              <p>${data.tagline}</p>
            </div>
            <div class="mockup-content-grid">
              ${data.screens.map((sc, i) => `
                <div class="mockup-screen-card">
                  <div class="screen-title"><i class="fa-solid fa-layer-group"></i> ${sc.title}</div>
                  <p class="screen-caption">${sc.caption}</p>
                </div>
              `).join("")}
            </div>
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
    showToast(`${appName}: ${actionType} initiated!`);
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
});

// Catalog of applications created by WebSyCode
window.appsCatalog = {
  websy_bill: {
    id: "websy_bill",
    name: "WebSy Bill (Smart POS & GST)",
    tagline: "Fast & Offline-Ready Billing Software for Retail and Wholesalers",
    categoryTitle: "Business & POS",
    iconClass: "fa-solid fa-cash-register",
    themeGradient: "linear-gradient(135deg, #0673b5, #0097c9)",
    type: "desktop",
    urlPreview: "https://pos.websycode.in/billing",
    longDescription: "WebSy Bill is an all-in-one POS and GST-compliant invoicing system crafted for supermarkets, electronics showrooms, pharmacies, and trading businesses. Designed with 99.99% reliability, high-speed thermal printing, barcode scanner compatibility, and instant WhatsApp bill delivery.",
    features: [
      "GST Invoice generation in under 3 seconds",
      "Offline-first mode with automatic background cloud sync",
      "Barcode scanning and multi-shelf inventory tracking",
      "Instant WhatsApp & SMS digital invoice dispatch",
      "Support for 2-inch and 3-inch thermal printers and A4 laser invoices",
      "Daily profit, sales, tax reports, and ledger export to Excel/Tally"
    ],
    techStack: ["React", "Electron", "Node.js", "SQLite / PostgreSQL", "WebSy Cloud Sync"],
    apkLink: "#download-apk",
    playStoreLink: "https://play.google.com/store/apps/details?id=in.websycode.billpos",
    webDemoLink: "https://websycode.in/#contact",
    screens: [
      { title: "Point of Sale Checkout", caption: "Lightning-fast barcode scan, hotkeys, and multi-payment split (Cash, UPI QR, Card)." },
      { title: "Inventory & Low Stock Alerts", caption: "Automatic reorder notifications, expiry tracking, and supplier batch ledger." },
      { title: "Tax & GSTR Analytics", caption: "Auto-computed GSTR-1 & GSTR-3B summaries ready for monthly filing." }
    ]
  },
  websy_campus: {
    id: "websy_campus",
    name: "WebSy Campus ERP",
    tagline: "Complete College, University & Training Institute Management Suite",
    categoryTitle: "Education & Campus",
    iconClass: "fa-solid fa-graduation-cap",
    themeGradient: "linear-gradient(135deg, #0097c9, #0673b5)",
    type: "mobile",
    urlPreview: "https://campus.websycode.in/dashboard",
    longDescription: "Built specifically for degree colleges, BCA/MCA universities, and technical training centers. WebSy Campus handles daily attendance with fast QR codes, student performance monitoring, project submissions, tuition fee installments, and live notifications.",
    features: [
      "Fast QR Code student attendance tracking with geofence protection",
      "Semester project submission portal with plagiarism checks",
      "Tuition fee management, online payment gateway, and receipt generation",
      "Teacher timetable scheduling and lecture logs",
      "Parent portal with daily absence and exam performance alerts",
      "Comprehensive certificate and ID card batch printing"
    ],
    techStack: ["Android (Kotlin)", "Flutter", "PHP / Laravel", "MySQL", "Firebase"],
    apkLink: "#download-apk",
    playStoreLink: "https://play.google.com/store/apps/details?id=in.websycode.campus",
    webDemoLink: "https://websycode.in/#contact",
    screens: [
      { title: "QR Attendance Terminal", caption: "Students tap their mobile ID to log morning attendance in real time." },
      { title: "Project & Assignment Hub", caption: "Upload practical files, review student code, and assign marks online." },
      { title: "Fee & Dues Tracker", caption: "Automated payment links sent to parents via WhatsApp and SMS." }
    ]
  },
  shopsy_store: {
    id: "shopsy_store",
    name: "ShopSy Omnichannel E-Commerce",
    tagline: "High-Performance Mobile Shopping App & Storefront Engine",
    categoryTitle: "E-Commerce",
    iconClass: "fa-solid fa-bag-shopping",
    themeGradient: "linear-gradient(135deg, #0673b5, #1e3c72)",
    type: "mobile",
    urlPreview: "https://shopsy.websycode.in",
    longDescription: "ShopSy is our flagship turnkey E-Commerce solution tailored for retail brands. It offers a synchronized Android & iOS customer app, lightning-fast progressive web app (PWA), integrated payments (Razorpay, PhonePe, Paytm, Stripe), and real-time order delivery notifications.",
    features: [
      "Ultra-fast product search, filter, and multi-variant attributes",
      "One-click UPI checkout, credit cards, EMI, and COD with OTP verification",
      "Live order status tracker with push notifications and WhatsApp integration",
      "Automated abandoned cart recovery notifications",
      "Vendor and delivery agent tracking dispatch portal",
      "Coupons, flash sales, discount rules, and customer loyalty rewards"
    ],
    techStack: ["Flutter", "Next.js", "Node.js", "Redis", "Razorpay SDK"],
    apkLink: "#download-apk",
    playStoreLink: "https://play.google.com/store/apps/details?id=in.websycode.shopsy",
    webDemoLink: "https://websycode.in/#contact",
    screens: [
      { title: "Modern Mobile Storefront", caption: "Smooth product grids, dynamic banner carousels, and instant add-to-bag." },
      { title: "Instant UPI Checkout", caption: "Seamless intent-based payment with GPay, PhonePe, and Paytm." },
      { title: "Merchant Order Console", caption: "Process orders, generate packing slips, and book couriers in 1 click." }
    ]
  },
  taskcraft_pm: {
    id: "taskcraft_pm",
    name: "TaskCraft Agile PM",
    tagline: "Agile Project & Task Management Tool for Engineering Teams",
    categoryTitle: "Productivity & Dev",
    iconClass: "fa-solid fa-list-check",
    themeGradient: "linear-gradient(135deg, #232323, #0673b5)",
    type: "desktop",
    urlPreview: "https://taskcraft.websycode.in/sprints",
    longDescription: "Engineered around Agile Software Craftsmanship principles, TaskCraft enables software development teams, interns, and project managers to plan sprints, assign user stories, link GitHub commits, and track velocity with zero bloat.",
    features: [
      "Kanban boards and Sprint backlogs with drag-and-drop ease",
      "GitHub & GitLab commit sync with automated issue status transition",
      "Time logging, billable hour tracking, and team capacity planning",
      "Sprint burndown charts, cumulative flow diagrams, and velocity stats",
      "Document editor with markdown support for technical specifications",
      "Encrypted cloud backups with exportable audit logs"
    ],
    techStack: ["Vue.js", "Tailwind CSS", "Go / Python", "Docker", "PostgreSQL"],
    apkLink: "#download-apk",
    playStoreLink: "https://play.google.com/store/apps/details?id=in.websycode.taskcraft",
    webDemoLink: "https://websycode.in/#contact",
    screens: [
      { title: "Agile Sprint Board", caption: "Interactive swimlanes with story point estimations and PR badges." },
      { title: "Commit & Code Activity", caption: "Real-time stream of merged commits directly on each task card." },
      { title: "Burndown Analytics", caption: "Precise sprint delivery projections based on historic team velocity." }
    ]
  },
  quickorder_pos: {
    id: "quickorder_pos",
    name: "QuickOrder Restaurant POS & KDS",
    tagline: "Touch POS, Table Ordering & Kitchen Display for Cafes & Dining",
    categoryTitle: "Business & POS",
    iconClass: "fa-solid fa-utensils",
    themeGradient: "linear-gradient(135deg, #0097c9, #232323)",
    type: "tablet",
    urlPreview: "https://order.websycode.in/kds",
    longDescription: "A reliable point-of-sale and kitchen coordination system for restaurants, cafes, cloud kitchens, and bakeries. Supports QR table ordering where guests view digital menus on their phone, order, and pay instantly.",
    features: [
      "Floor plan designer with real-time table occupancy status",
      "Kitchen Display Screen (KDS) with color-coded preparation timers",
      "QR code contactless menu & self-ordering for customers",
      "Custom item modifiers (addons, spice level, combos)",
      "Zomato & Swiggy online order sync into a single tablet dashboard",
      "Day-end cashier handover settlement and sales breakdown"
    ],
    techStack: ["React Native", "Android POS SDK", "WebSocket", "Node.js", "MongoDB"],
    apkLink: "#download-apk",
    playStoreLink: "https://play.google.com/store/apps/details?id=in.websycode.quickorder",
    webDemoLink: "https://websycode.in/#contact",
    screens: [
      { title: "Table Floor Management", caption: "Visual seating layout showing occupied, reserved, and billing tables." },
      { title: "Live Kitchen Display (KDS)", caption: "Color-coded tickets alert chefs to urgent items and order modifications." },
      { title: "Contactless QR Ordering", caption: "Diners scan the table QR code to browse pictures and order directly." }
    ]
  },
  websy_cloudsync: {
    id: "websy_cloudsync",
    name: "WebSy CloudSync & Client Portal",
    tagline: "Secure Enterprise Backup, File Vault & Client Delivery Hub",
    categoryTitle: "Cloud & Utilities",
    iconClass: "fa-solid fa-cloud-arrow-up",
    themeGradient: "linear-gradient(135deg, #0673b5, #005689)",
    type: "desktop",
    urlPreview: "https://cloud.websycode.in/vault",
    longDescription: "Secure business cloud storage and dedicated client deliverables portal. With WebSy CloudSync, businesses keep their critical databases, documents, and code repositories backed up with AES-256 encryption and 99.99% uptime.",
    features: [
      "End-to-end AES-256 encryption at rest and in transit",
      "Automated scheduled MySQL, PostgreSQL, and folder backups",
      "Branded client download portal with password-protected expiring links",
      "Granular team access control and IP restriction policies",
      "Version history with 30-day instant rollback",
      "High-speed CDN edge endpoints across India and global regions"
    ],
    techStack: ["Golang", "AWS S3 / Wasabi", "React", "Docker", "Nginx"],
    apkLink: "#download-apk",
    playStoreLink: "https://play.google.com/store/apps/details?id=in.websycode.cloudsync",
    webDemoLink: "https://websycode.in/#contact",
    screens: [
      { title: "Automated Backup Monitor", caption: "Real-time health check of daily database and directory snapshots." },
      { title: "Client Secure Share", caption: "Generate custom branded download links with expiry date and pin." },
      { title: "Activity Audit Logs", caption: "Complete trail of downloads, logins, and permission changes." }
    ]
  }
};
