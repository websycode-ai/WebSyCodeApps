// Hiring banner scroll trigger and close handler
window.addEventListener("scroll", function() {
  var banner = document.getElementById("hire-banner");
  if (banner) {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      banner.style.top = "0";
    } else {
      banner.style.top = "-55px";
    }
  }
});

function showBanner() {
  var banner = document.getElementById("hire-banner");
  if (banner) {
    banner.style.display = "block";
    banner.style.top = "0";
  }
}

function closeBanner() {
  var banner = document.getElementById("hire-banner");
  if (banner) {
    banner.style.display = "none";
  }
}

// Automatically reveal banner after 2.5 seconds
setTimeout(showBanner, 2500);

// Inquiry chat widget modal helper
function openInquiryModal() {
  var modal = document.getElementById("inquiryModal");
  if (modal) {
    modal.classList.add("show");
  }
}

function closeInquiryModal() {
  var modal = document.getElementById("inquiryModal");
  if (modal) {
    modal.classList.remove("show");
  }
}
