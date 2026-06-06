// --- Typewriter Effect ---
const phrases = ["Frontend Developer"];
const textElement = document.getElementById("typewriter");
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  if (phrases.length === 0) return;
  const current = phrases[phraseIndex];

  if (isDeleting) {
    textElement.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    textElement.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 50 : 120;

  if (!isDeleting && charIndex === current.length) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }
  setTimeout(typeWriter, delay);
}
setTimeout(typeWriter, 2200);

// --- Dynamic Year ---
const yearEl = document.getElementById("currentYear");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// --- Scroll & Navigation Logic ---
const header = document.querySelector("header");
const headerName = document.querySelector(".header_name");

const navMap = [
  {
    link: document.querySelector("#aboutLink"),
    section: document.querySelector("#about"),
    hr: document.querySelector("#aboutHr"),
  },
  {
    link: document.querySelector("#certificationsLink"),
    section: document.querySelector("#certifications"),
    hr: document.querySelector("#certificationsHr"),
  },
  {
    link: document.querySelector("#projectsLink"),
    section: document.querySelector("#projects"),
    hr: document.querySelector("#projectsHr"),
  },
  {
    link: document.querySelector("#skillsLink"),
    section: document.querySelector("#skills"),
    hr: document.querySelector("#skillsHr"),
  },
  {
    link: document.querySelector("#contactLink"),
    section: document.querySelector("#contact"),
    hr: document.querySelector("#contactHr"),
  },
];

headerName.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

navMap.forEach(({ link, section }) => {
  if (!link || !section) return;
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const top = section.offsetTop - 80;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

// --- Back to Top ---
const backToTop = document.querySelector("#backToTop");
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// --- Active Link Highlighting on Scroll ---
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  backToTop.style.display = scrollY > 300 ? "flex" : "none";
  header.classList.toggle("scrolled", scrollY > 50);

  const linkBackground = document.querySelector(".linkBackground");
  navMap.forEach(({ link, section, hr }) => {
    if (!link || !section || !hr) return;
    const sectionTop = section.offsetTop - window.innerHeight / 4;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionBottom) {
      link.classList.add("active");
      link.style.color = "var(--TC)";
      linkBackground.style.left = `${link.offsetLeft}px`;
      linkBackground.style.width = `${link.offsetWidth}px`;
      linkBackground.style.height = `${link.offsetHeight}px`;
      linkBackground.style.backgroundColor = "rgba(34, 42, 51, 0.8)";
      hr.style.backgroundColor = "var(--TC)";
      hr.style.animation = "growUp 3s 1 forwards";
    } else {
      link.classList.remove("active");
      link.style.color = "";
      link.style.backgroundColor = "transparent";
      hr.style.backgroundColor = "#233554";
      hr.style.animation = "";
    }
  });
});

// --- IntersectionObserver for Section Reveal ---
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        sectionObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
);

document.querySelectorAll(".section-container").forEach((section) => {
  sectionObserver.observe(section);
});

// --- Contact Form Handling ---
const contactForm = document.querySelector(".contactForm");
const toast = document.getElementById("toast-notification");
const toastMsg = document.getElementById("toast-message");

function showToast(message, isError = false) {
  toastMsg.innerText = message;
  toast.style.borderColor = isError ? "#dc3545" : "var(--TC)";
  toast.style.color = isError ? "#dc3545" : "var(--TC)";
  toast.className = "custom-toast show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const button = contactForm.querySelector("button");
    const data = new FormData(contactForm);
    const originalHTML = button.innerHTML;

    button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    button.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        showToast("Success! I'll get back to you soon.");
        contactForm.reset();
      } else {
        showToast("Something went wrong. Please try again.", true);
      }
    } catch (error) {
      showToast("Network error. Check your connection.", true);
    } finally {
      button.innerHTML = originalHTML;
      button.disabled = false;
    }
  });
}

// --- Mobile Menu Logic ---
const menuBtn = document.getElementById("menuBtn");
const headerLinks = document.getElementById("headerLinks");
const menuIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", () => {
  headerLinks.classList.toggle("active");
  if (headerLinks.classList.contains("active")) {
    menuIcon.classList.replace("fa-bars", "fa-xmark");
  } else {
    menuIcon.classList.replace("fa-xmark", "fa-bars");
  }
});

document.querySelectorAll(".header_links_a").forEach((link) => {
  link.addEventListener("click", () => {
    headerLinks.classList.remove("active");
    menuIcon.classList.replace("fa-xmark", "fa-bars");
  });
});

document.addEventListener("click", (e) => {
  if (!header.contains(e.target)) {
    headerLinks.classList.remove("active");
    menuIcon.classList.replace("fa-xmark", "fa-bars");
  }
});
