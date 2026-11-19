# WebSyCode & WebSyCodeApps

A recreation and clone of [WebSyCode](https://websycode.in/) featuring:
- Full responsive fidelity across desktop, tablet, and mobile devices
- Interactive HTML5 canvas particle constellation network animation
- 3D Coverflow team carousel featuring team members and their superhero monikers
- 9 core service offerings with dynamic hover animations
- Authentic typography (Google Fonts *Montserrat* and *Marvel*), color palette (`#0673b5`, `#0097c9`, `#232323`), and brand logos
- Top slide-down hiring alert banner and floating social media bar
- Standalone Contact page with 45-degree diamond icon cards, direct WhatsApp integration, authentic QR code, and interactive inquiry form
- Dedicated **Apps** showcase page (`apps.html`) with real-time keyword search, category filter chips, interactive screenshot mockups, tech stack specifications, platform availability tags, and store/download links
- Interactive Inquiry widget with multi-choice quick actions

---

## 📁 Project Architecture

```
WebSyCodeApps/
├── index.html              # Main landing page (Hero canvas, About, Services, Team, Careers, Footer)
├── apps.html               # New Applications showcase page (Search, Filter, Mockup Modals, Downloads)
├── contact.html            # Contact Us page (Address, WhatsApp, Email, QR Code, Message Form)
├── app-ads.txt             # Authorized Digital Sellers verification for AdMob/Google Ads
├── assets/
│   ├── header_logo.webp    # Authentic WebSyCode brand header logo
│   ├── favicon.webp        # Authentic WebSyCode favicon
│   └── qr_websycode.png    # Authentic WebSyCode WhatsApp / Contact QR code
├── css/
│   ├── styles.css          # Core CSS variables, typography, component styles, and animations
│   ├── bootstrap.min.css   # Bootstrap responsive grid system
│   └── swiper.min.css      # Swiper 3D coverflow carousel styles
└── js/
    ├── particle.js         # Full-bleed interactive canvas particle constellation animation
    ├── script.js           # Header scroll spy, mobile navigation, and team Swiper logic
    ├── apps.js             # Real-time search, category filters, and modal preview catalog
    ├── additionals.js      # Top hiring alert banner and floating inquiry modal helpers
    └── swiper.min.js       # Swiper touch-enabled slider library
```

---

## 📱 Featured Applications (`apps.html`)

| Application | Category | Description | Platforms | Store Link |
| :--- | :--- | :--- | :--- | :--- |
| **Notiva – Simple Notes, Your Way** | Tools & Productivity | Lightweight, distraction-free notes app with local Realm database, light/dark themes, pinning, search, and RTL support | Android 7.0+ | [Google Play Store](https://play.google.com/store/apps/details?id=com.studio.quicknotes&hl=en_IN) |

---

## 🚀 Running Locally

To preview the website locally using Python's built-in HTTP server:

```bash
python3 -m http.server 8080
```

Then open your browser at:
- Home: `http://localhost:8080/`
- Apps: `http://localhost:8080/apps.html`
- Contact: `http://localhost:8080/contact.html`
