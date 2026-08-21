// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE MENU =====
const navBurger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
navBurger.addEventListener('click', () => {
    navBurger.classList.toggle('active');
    navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navBurger.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// ===== HERO ANIMATIONS =====
document.addEventListener('DOMContentLoaded', () => {
    const heroEls = document.querySelectorAll('.hero [data-animate], .hero-tagline, .hero-title, .hero-subtitle, .hero-buttons, .hero-stats');
    heroEls.forEach((el, i) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.transition = `opacity 0.7s ease, transform 0.7s ease`;
        }, 200 + i * 120);
    });

    // Particles
    const pc = document.getElementById('heroParticles');
    for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.className = 'hero-particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = 30 + Math.random() * 60 + '%';
        p.style.animationDelay = Math.random() * 8 + 's';
        p.style.animationDuration = 6 + Math.random() * 6 + 's';
        p.style.background = `hsl(${280 + Math.random() * 60}, 60%, 70%)`;
        const size = 2 + Math.random() * 3 + 'px';
        p.style.width = size;
        p.style.height = size;
        pc.appendChild(p);
    }

    animateCounters();
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || 0);
            setTimeout(() => entry.target.classList.add('animated'), delay);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('[data-animate]:not(.hero [data-animate])').forEach(el => observer.observe(el));

// ===== COUNTERS =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const co = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.dataset.count);
                const isDecimal = el.dataset.decimal === 'true';
                const start = performance.now();
                function update(now) {
                    const p = Math.min((now - start) / 2000, 1);
                    const eased = 1 - Math.pow(1 - p, 3);
                    const val = eased * target;
                    el.textContent = isDecimal ? val.toFixed(1) : (target >= 100 ? Math.floor(val).toLocaleString('ru-RU') + '+' : Math.floor(val) + '+');
                    if (p < 1) requestAnimationFrame(update);
                }
                requestAnimationFrame(update);
                co.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => co.observe(c));
}

// ===== FORM =====
const bookingForm = document.getElementById('bookingForm');
const successModal = document.getElementById('successModal');
const modalClose = document.getElementById('modalClose');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.innerHTML = '<span>Отправляю...</span>';
    btn.disabled = true;
    setTimeout(() => {
        successModal.classList.add('active');
        btn.innerHTML = '<span>Записаться</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
        btn.disabled = false;
        bookingForm.reset();
    }, 1000);
});

modalClose.addEventListener('click', () => successModal.classList.remove('active'));
successModal.addEventListener('click', (e) => { if (e.target === successModal) successModal.classList.remove('active'); });

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        e.preventDefault();
        const t = document.querySelector(this.getAttribute('href'));
        if (t) t.scrollIntoView({ behavior: 'smooth' });
    });
});

// ===== PHONE MASK (+375) =====
const phoneInput = document.getElementById('formPhone');
phoneInput.addEventListener('input', function(e) {
    let v = e.target.value.replace(/\D/g, '');
    // Remove country code prefix if typed
    if (v.startsWith('375')) v = v.substring(3);
    if (v.startsWith('80')) v = v.substring(2);

    let f = '+375';
    if (v.length > 0) f += ' (' + v.substring(0, 2);
    if (v.length >= 2) f += ') ' + v.substring(2, 5);
    if (v.length >= 5) f += '-' + v.substring(5, 7);
    if (v.length >= 7) f += '-' + v.substring(7, 9);
    e.target.value = v.length > 0 ? f : '';
});
