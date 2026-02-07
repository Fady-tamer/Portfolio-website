// Typewriter Effect
const textElement = document.getElementById('typewriter');
const phrases = ['Frontend Developer'];
let phraseIndex = 0;
let charIndex = 0;

function type() {
    if (phraseIndex < phrases.length) {
        if (charIndex < phrases[phraseIndex].length) {
            textElement.textContent += phrases[phraseIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 150); // Made slightly faster for cleaner feel
        }
    }
}
type();

// Scroll & Navigation Logic
const header = document.querySelector('header');
const headerName = document.querySelector('.header_name');
const navMap = [
    { link: document.querySelector('#aboutLink'), section: document.querySelector('#about') },
    { link: document.querySelector('#certificationsLink'), section: document.querySelector('#certifications') },
    { link: document.querySelector('#projectsLink'), section: document.querySelector('#projects') },
    { link: document.querySelector('#skillsLink'), section: document.querySelector('#skills') },
    { link: document.querySelector('#contactLink'), section: document.querySelector('#contact') }
];

// Scroll to top on name click
headerName.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth Scroll for Nav Links
navMap.forEach(({ link, section }) => {
    if (!link || !section) return;
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const offset = 80; // Adjusted for new header height
        const top = section.offsetTop - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

// Active Link Highlighting on Scroll
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Add border to header on scroll
    header.style.borderBottom = scrollY > 50 ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.05)';

    const offset = 150; // Trigger zone

    navMap.forEach(({ link, section }) => {
        if (!link || !section) return;
        
        const sectionTop = section.offsetTop - offset;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionBottom) {
            link.classList.add('active'); // Use CSS class for active state
            link.style.color = 'var(--TC)';
        } else {
            link.classList.remove('active');
            link.style.color = '';
        }
    });
});

// Contact Form Handling
const contactForm = document.querySelector('.contactForm');
const toast = document.getElementById('toast-notification');
const toastMsg = document.getElementById('toast-message');

function showToast(message, isError = false) {
    toastMsg.innerText = message;
    toast.style.borderColor = isError ? '#dc3545' : 'var(--TC)';
    toast.style.color = isError ? '#dc3545' : 'var(--TC)';
    toast.className = "toast show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
}

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const button = contactForm.querySelector('button');
        const data = new FormData(contactForm);
        
        const originalText = button.innerText;
        button.innerText = 'Sending...';
        button.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
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
            button.innerText = originalText;
            button.disabled = false;
        }
    });
}

/* --- Mobile Menu Logic --- */
const menuBtn = document.getElementById('menuBtn');
const headerLinks = document.getElementById('headerLinks');
const menuIcon = menuBtn.querySelector('i');

// Toggle Menu Open/Close
menuBtn.addEventListener('click', () => {
    headerLinks.classList.toggle('active');
    
    // Optional: Switch icon from Bars to X
    if (headerLinks.classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-xmark');
    } else {
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
    }
});

// Close menu when a link is clicked
document.querySelectorAll('.header_links_a').forEach(link => {
    link.addEventListener('click', () => {
        headerLinks.classList.remove('active');
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
    });
});

// Close menu if clicking outside of it
document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
        headerLinks.classList.remove('active');
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
    }
});