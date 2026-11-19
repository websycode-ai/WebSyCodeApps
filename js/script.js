var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const header = document.querySelector("header");
const home = document.querySelector(".home");

const intersectionOptions = {
  rootMargin: "-250px 0px 0px 0px"
};

function closeIfOpen() {
  const navToggle = document.getElementById("nav-toggle");
  if (navToggle && navToggle.checked) {
    navToggle.checked = false;
  }
}

// Add scrolled class when user leaves hero section
if (home && header) {
  const homeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        header.classList.add("nav-scrolled");
      } else {
        header.classList.remove("nav-scrolled");
      }
    });
  }, intersectionOptions);

  homeObserver.observe(home);
} else if (header) {
  // On pages without hero section (e.g. contact.html, apps.html), keep header visible with scrolled styling
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("nav-scrolled");
    } else {
      header.classList.remove("nav-scrolled");
    }
  });
}

// Team Members Dataset
const teamMembers = [
  {
    name: "Pranav Shukla",
    position: "NICK FURY",
    icon: "fa-shield-halved",
    color: "#0673b5"
  },
  {
    name: "Parth Mistry",
    position: "CAPTAIN AMERICA",
    icon: "fa-shield",
    color: "#0097c9"
  },
  {
    name: "Gopal Ghanghar",
    position: "THOR",
    icon: "fa-bolt-lightning",
    color: "#0673b5"
  },
  {
    name: "Arpan Shah",
    position: "ANT-MAN",
    icon: "fa-cube",
    color: "#0097c9"
  },
  {
    name: "Parth Vishvajit",
    position: "DR. STRANGE",
    icon: "fa-eye",
    color: "#0673b5"
  },
  {
    name: "Parth Pandya",
    position: "ROCKET",
    icon: "fa-rocket",
    color: "#0097c9"
  },
  {
    name: "Akash Dave",
    position: "VISION",
    icon: "fa-gem",
    color: "#0673b5"
  },
  {
    name: "Nikhil Tuck",
    position: "IRON MAN",
    icon: "fa-microchip",
    color: "#0097c9"
  },
  {
    name: "Navin Gelot",
    position: "BLACK PANTHER",
    icon: "fa-paw",
    color: "#0673b5"
  },
  {
    name: "Sarita Mall",
    position: "SHURI",
    icon: "fa-dna",
    color: "#0097c9"
  },
  {
    name: "Urvashi Vegda",
    position: "CAPTAIN MARVEL",
    icon: "fa-star",
    color: "#0673b5"
  },
  {
    name: "Ketul Padariya",
    position: "HULK",
    icon: "fa-hand-fist",
    color: "#0097c9"
  },
  {
    name: "Pradip Sodha",
    position: "SPIDERMAN",
    icon: "fa-network-wired",
    color: "#0673b5"
  },
  {
    name: "Krunal Prajapati",
    position: "JARVIS",
    icon: "fa-robot",
    color: "#0097c9"
  },
  {
    name: "Dashrath Gelot",
    position: "WOLVERINE",
    icon: "fa-feather-pointed",
    color: "#0673b5"
  },
  {
    name: "Tamanna Nagar",
    position: "WHITE TIGER",
    icon: "fa-wand-magic-sparkles",
    color: "#0097c9"
  }
];

const teamDiv = document.querySelector(".team-members .swiper-wrapper");
let avengerCount = 1;

function createMemberCard(member) {
  const initials = member.name.split(" ").map(n => n[0]).join("");
  return `
    <div class="swiper-slide">
      <div class="member-card" id="avenger-${avengerCount++}">
        <div class="hero member-avatar-display" style="background: linear-gradient(135deg, ${member.color} 0%, #232323 100%);">
          <div class="member-avatar-glow">
            <i class="fa-solid ${member.icon} member-superhero-icon"></i>
            <span class="member-initials">${initials}</span>
          </div>
        </div>
        <span class="hero-details">
          <span class="hero-title">${member.name}</span>
          <span class="hero-position">${member.position}</span>
        </span>
      </div>
    </div>
  `;
}

if (teamDiv && typeof Swiper !== "undefined") {
  teamDiv.innerHTML = teamMembers.map(member => createMemberCard(member)).join("");

  new Swiper(".team-members", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    initialSlide: 2,
    coverflowEffect: {
      rotate: 35,
      stretch: 0,
      depth: 120,
      modifier: 1,
      slideShadows: true
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    }
  });
}
