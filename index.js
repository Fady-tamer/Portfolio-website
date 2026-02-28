// Typewriter Effect
const textElement = document.getElementById('typewriter');
const phrase = ['Frontend Developer'];
let phraseIndex = 0;
let charIndex = 0;

function type() {
    if (phraseIndex < phrase.length) {
        if (charIndex < phrase[phraseIndex].length) {
            textElement.textContent += phrase[phraseIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 150);
        }
    }
}
type();

// Scroll & Navigation Logic
const header = document.querySelector('header');
const headerName = document.querySelector('.header_name');
const navMap = [
    { link: document.querySelector('#aboutLink'), section: document.querySelector('#about'), hr: document.querySelector('#aboutHr')},
    { link: document.querySelector('#certificationsLink'), section: document.querySelector('#certifications'), hr: document.querySelector('#certificationsHr')},
    { link: document.querySelector('#projectsLink'), section: document.querySelector('#projects'), hr: document.querySelector('#projectsHr')},
    { link: document.querySelector('#skillsLink'), section: document.querySelector('#skills'), hr: document.querySelector('#skillsHr')},
    { link: document.querySelector('#contactLink'), section: document.querySelector('#contact'), hr: document.querySelector('#contactHr')}
];

// Scroll to top on name click
headerName.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

navMap.forEach(({ link, section, hr }) => {
    if (!link || !section || !hr) return;
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const offset = 80;
        const top = section.offsetTop - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

// Active Link Highlighting on Scroll
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    //back to top button
    const backToTop = document.querySelector('#backToTop');
    backToTop.style.display = scrollY > 50 ? 'flex' : 'none';
    backToTop.addEventListener('click', () =>{
        window.scrollTo({ top: 0, behavior: 'smooth' });
    })
    
    // header.style.borderBottom = scrollY > 50 ? '1px solid #0fe1fd7c' : '1px solid #0fe1fd26';

    // const offset = 150;

    const linkBackground = document.querySelector('.linkBackground');


    navMap.forEach(({ link, section, hr }) => {
        if (!link || !section || !hr) return;
        
        const sectionTop = section.offsetTop - window.innerHeight/4;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionBottom) {
            link.classList.add('active');
            link.style.color = 'var(--TC)';
            linkBackground.style.left = `${link.offsetLeft}px`;
            linkBackground.style.width = `${link.offsetWidth}px`;
            linkBackground.style.height = `${link.offsetHeight}px`;
            linkBackground.style.backgroundColor = 'rgba(34, 42, 51, 0.8)';
            hr.style.backgroundColor = 'var(--TC)';
            hr.style.animation = 'growUp 3s 1 forwards';
        } else {
            link.classList.remove('active');
            link.style.color = '';
            link.style.backgroundColor = 'transparent';
            hr.style.backgroundColor = '#233554';
            hr.style.animation = '';
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

// show section
window.addEventListener('scroll', () => {
    const triggerBottom = window.scrollY + window.innerHeight/2;
    
    navMap.forEach(({ section }) => {
        if (!section) return;
        
        const sectionTop = section.offsetTop;

        if (triggerBottom > sectionTop) {
            section.style.animation = 'show 3s forwards';
        }
    });
});