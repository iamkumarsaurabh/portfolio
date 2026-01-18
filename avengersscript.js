const themeToggle = document.querySelector(".themeIcon");

const navToggle = document.querySelector(".navIcon");
const navLinks = document.querySelector(".navlinks-list");

const typingText = document.querySelector(".typing");

const bg = document.querySelector('.bg-container');


const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.1,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target);
        }
    });
});

if (bg) {
    bg.style.height = window.innerHeight + 'px';
}

themeToggle.addEventListener('click', () => {
    if (themeToggle.innerText === "☀️") {
        themeToggle.innerText = "🌙";
        document.documentElement.style.setProperty('--bg-url', "url('avengersimages/light.png')");

        document.documentElement.style.setProperty('--red', '#D32F2F');
        document.documentElement.style.setProperty('--pink', '#C2185B');
        document.documentElement.style.setProperty('--purple', '#7B1FA2');
        document.documentElement.style.setProperty('--indigo', '#512DA8');
        document.documentElement.style.setProperty('--blue', '#1976D2');
        document.documentElement.style.setProperty('--green', '#00796B');
        document.documentElement.style.setProperty('--yellow', '#FBC02D');
        document.documentElement.style.setProperty('--orange', '#F57C00');
        document.documentElement.style.setProperty('--gray', '#616161');
        document.documentElement.style.setProperty('--main-color', 'black');


        if (window.innerWidth <= 985) {
            navLinks.style.backgroundColor = "rgba(255, 255, 255, 0.71)";
        }
        else {
            navLinks.style.backgroundColor = "transparent";
        }
    }

    else if (themeToggle.innerText === "🌙") {
        themeToggle.innerText = "☀️";
        document.documentElement.style.setProperty('--bg-url', "url('avengersimages/dark.png')");

        document.documentElement.style.setProperty('--red', '#EF9A9A');
        document.documentElement.style.setProperty('--pink', '#F48FB1');
        document.documentElement.style.setProperty('--purple', '#CE93D8');
        document.documentElement.style.setProperty('--indigo', '#B39DDB');
        document.documentElement.style.setProperty('--blue', '#90CAF9');
        document.documentElement.style.setProperty('--green', '#C5E1A5');
        document.documentElement.style.setProperty('--yellow', '#FFF176');
        document.documentElement.style.setProperty('--orange', '#FFCC80');
        document.documentElement.style.setProperty('--gray', '#E0E0E0');
        document.documentElement.style.setProperty('--main-color', 'white');

        if (window.innerWidth <= 985) {
            navLinks.style.backgroundColor = "rgba(0, 0, 0, 0.671)";
        }
        else {
            navLinks.style.backgroundColor = "transparent";
        }
    }

})


navToggle.addEventListener('click', () => {
    navLinks.classList.toggle("active");
    document.body.classList.toggle("menu-open");

    if (navToggle.innerText === "☰") {
        navLinks.style.display = "flex";
        navToggle.innerText = "✕";
    }
    else if (navToggle.innerText === "✕") {
        navLinks.style.display = "none";
        navToggle.innerText = "☰";
    }
    if (navLinks.classList.contains("active")) {
        navToggle.innerHTML = "&#10005;"; // ✕
        navToggle.style.transform = "rotate(90deg)";
    }
    else {
        navToggle.innerHTML = "&#9776;"; // ☰
        navToggle.style.transform = "rotate(0deg)";
    }
})

window.addEventListener('click', (e) => {
    if (navLinks.classList.contains("active")) {

        if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
            navLinks.classList.remove("active");
            document.body.classList.toggle("menu-open");

            navToggle.innerHTML = "&#9776;";
            navToggle.style.transform = "rotate(0deg)";
        }
    }
});


const roles = ["CSE (AI-ML) Undergrad", "Web Developer", "Tech Enthusiast", "Marvel Fan"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    }
    else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 100 : 200;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener("DOMContentLoaded", type);


const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-section');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('hidden-section');
    observer.observe(section);
});

const skillsOptions = {
    threshold: 0.3
};

const skillCards = document.querySelectorAll('.flip-card');

skillCards.forEach(card => {
    const bar = card.querySelector('.progress-fill');
    const targetWidth = bar.getAttribute('data-width');

    bar.style.width = '0%';

    card.addEventListener('mouseenter', () => {
        bar.style.transition = 'width 1s cubic-bezier(0.2, 1, 0.2, 1) 0.4s';

        requestAnimationFrame(() => {
            bar.style.width = targetWidth;
        });
    });

    card.addEventListener('mouseleave', () => {
        bar.style.transition = 'width 0.2s ease-in';
        bar.style.width = '0%';
    });
});
