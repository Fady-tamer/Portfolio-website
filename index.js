// --- Dynamic Content Rendering ---
function renderPortfolio() {
  if (typeof portfolioData === "undefined") return;

  // 1. Personal Info
  const headerName = document.querySelector(".header_name_h1");
  if (headerName)
    headerName.textContent =
      portfolioData.personalInfo.logoName || portfolioData.personalInfo.name;

  const welcomeMainText = document.querySelector(".welcomeMainText");
  if (welcomeMainText)
    welcomeMainText.textContent =
      portfolioData.personalInfo.greeting || "Hi, my name is";

  document.querySelector(".name").textContent = portfolioData.personalInfo.name;
  document.querySelector(".welcomeBtn[download]").href =
    portfolioData.personalInfo.cvLink;
  document.querySelector("#about-text").innerHTML =
    portfolioData.personalInfo.about;

  // 2. Typewriter roles
  phrases.length = 0;
  const roles = portfolioData.personalInfo.role.split("&").map((r) => r.trim());
  phrases.push(...roles);

  // 3. Social Links
  const linkContainer = document.querySelector(".footer .link");
  if (linkContainer) {
    linkContainer.innerHTML = "";
    const socials = [
      { key: "linkedin", icon: "fa-linkedin-in" },
      { key: "facebook", icon: "fa-facebook" },
      { key: "instagram", icon: "fa-instagram" },
      { key: "github", icon: "fa-github" },
    ];
    socials.forEach((s) => {
      if (portfolioData.socialLinks[s.key]) {
        linkContainer.innerHTML += `<a href="${portfolioData.socialLinks[s.key]}" 
          target="_blank" class="text-decoration-none" 
          rel="noopener noreferrer" 
          aria-label="${s.key}">
          <i class="fa-brands ${s.icon}"></i>
        </a>`;
      }
    });
  }

  // 4. Certifications
  const certGrid = document.querySelector("#certifications-grid");
  if (certGrid && portfolioData.certifications) {
    certGrid.innerHTML = portfolioData.certifications
      .map(
        (cert) => `
          <div class="col-md-6 col-lg-4">
              <article class="card h-100 custom-portfolio-card">
                  <img src="${cert.image}" alt="${cert.title}" class="cardImage certImage p-0 object-fit-cover" loading="lazy">
                  <div class="d-flex flex-column flex-grow-1 p-4">
                      <h3 class="cardTitle">${cert.title}</h3>
                      <p class="cardSubtitle"><span>Credential ID: </span>${cert.credentialId}</p>
                      <p class="cardSubtitle"><span>Date: </span>${cert.date}</p>
                      <div class="usedSkill d-flex flex-wrap gap-2 mt-auto pt-3">
                          ${cert.skills.map((skill) => `<span>${skill}</span>`).join("")}
                      </div>
                  </div>
              </article>
          </div>
      `,
      )
      .join("");
  }

  // 5. Projects
  const projGrid = document.querySelector("#projects-grid");
  if (projGrid && portfolioData.projects) {
    projGrid.innerHTML = portfolioData.projects
      .map(
        (proj) => `
          <div class="col-md-6 col-lg-4">
              <article class="card h-100 custom-portfolio-card">
                  <img src="${proj.image}" alt="${proj.title}" class="cardImage" loading="lazy" width="400" height="200">
                  <div class="cardLink position-absolute w-100 h-50 d-flex justify-content-center align-items-center gap-4">
                      ${proj.github ? `<a href="${proj.github}" target="_blank" class="text-decoration-none" rel="noopener noreferrer" aria-label="View on GitHub"><i class="fa-brands fa-github"></i></a>` : ""}
                      ${proj.live ? `<a href="${proj.live}" target="_blank" class="text-decoration-none" rel="noopener noreferrer" aria-label="View Live Gallery"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ""}
                  </div>
                  <div class="d-flex flex-column flex-grow-1 p-4">
                      <h3 class="cardTitle">${proj.title}</h3>
                      <p class="cardDescription flex-grow-1">${proj.description}</p>
                      <div class="usedSkill d-flex flex-wrap gap-2 mt-auto pt-3">
                          ${proj.skills.map((skill) => `<span>${skill}</span>`).join("")}
                      </div>
                  </div>
              </article>
          </div>
      `,
      )
      .join("");
  }

  // 6. Skills
  const skillsGrid = document.querySelector("#skills-grid");
  if (skillsGrid && portfolioData.skills) {
    skillsGrid.innerHTML = portfolioData.skills
      .map(
        (cat) => `
          <div class="col-md-6">
              <div class="skill-category">
                  <div class="skill-category-header">
                      <div class="skill-category-icon">
                          <i class="${cat.icon}"></i>
                      </div>
                      <h3 class="skill-category-title">${cat.category}</h3>
                  </div>
                  <div class="skill-badges">
                      ${cat.items
                        .map(
                          (item) => `
                          <div class="skill-badge">
                              ${item.image ? `<img src="${item.image}" alt="${item.name}" loading="lazy" width="28" height="28">` : `<i class="${item.icon}" style="font-size:28px; color:${item.color};"></i>`}
                              <span>${item.name}</span>
                          </div>
                      `,
                        )
                        .join("")}
                  </div>
              </div>
          </div>
      `,
      )
      .join("");
  }
}

const phrases = [];
renderPortfolio();

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

// Scroll to top on name click
headerName.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

navMap.forEach(({ link, section, hr }) => {
  if (!link || !section || !hr) return;
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const offset = 80;
    const top = section.offsetTop - offset;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

// --- Back to top ---
const backToTop = document.querySelector("#backToTop");
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// --- Active Link Highlighting on Scroll ---
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  // Back to top visibility
  backToTop.style.display = scrollY > 300 ? "flex" : "none";

  // Header scrolled state
  header.classList.toggle("scrolled", scrollY > 50);

  // Nav highlighting
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

/* --- Mobile Menu Logic --- */
const menuBtn = document.getElementById("menuBtn");
const headerLinks = document.getElementById("headerLinks");
const menuIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", () => {
  headerLinks.classList.toggle("active");
  if (headerLinks.classList.contains("active")) {
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-xmark");
  } else {
    menuIcon.classList.remove("fa-xmark");
    menuIcon.classList.add("fa-bars");
  }
});

document.querySelectorAll(".header_links_a").forEach((link) => {
  link.addEventListener("click", () => {
    headerLinks.classList.remove("active");
    menuIcon.classList.remove("fa-xmark");
    menuIcon.classList.add("fa-bars");
  });
});

document.addEventListener("click", (e) => {
  if (!header.contains(e.target)) {
    headerLinks.classList.remove("active");
    menuIcon.classList.remove("fa-xmark");
    menuIcon.classList.add("fa-bars");
  }
});
