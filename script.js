// ===========================================================
// Mobile nav toggle
// ===========================================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// ===========================================================
// Scroll reveal
// ===========================================================
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealEls.forEach(el => io.observe(el));
} else {
    revealEls.forEach(el => el.classList.add('is-visible'));
}

// ===========================================================
// Hero terminal — simulated scan output typing effect
// ===========================================================
const termBody = document.getElementById('termBody');

const scanLines = [
    { text: 'sana@vapt:~$ nmap -sV --skills sana.dev', cls: 'line-cmd' },
    { text: '', cls: '' },
    { text: 'Starting scan ...', cls: 'line-head' },
    { text: '', cls: '' },
    { text: 'PORT      STATE  SERVICE', cls: 'line-head' },
    { text: '443/tcp   open   web-application-security', cls: 'line-svc' },
    { text: '8443/tcp  open   api-security', cls: 'line-svc' },
    { text: '5555/tcp  open   android-security', cls: 'line-svc' },
    { text: '1337/tcp  open   red-teaming', cls: 'line-svc' },
    { text: '9001/tcp  open   vulnerability-research', cls: 'line-svc' },
    { text: '', cls: '' },
    { text: 'Scan done: 5 services open on 1 host', cls: 'line-open' },
];

function typeTerminal(lines, el, opts = {}) {
    const charDelay = opts.charDelay ?? 14;
    const lineDelay = opts.lineDelay ?? 220;

    el.innerHTML = '';
    const cursor = document.createElement('span');
    cursor.className = 'term-cursor';

    let li = 0;

    function typeLine() {
        if (li >= lines.length) {
            el.appendChild(cursor);
            return;
        }
        const { text, cls } = lines[li];
        const lineEl = document.createElement('div');
        if (cls) lineEl.className = cls;
        el.appendChild(lineEl);

        let ci = 0;
        function typeChar() {
            if (ci < text.length) {
                lineEl.textContent = text.slice(0, ci + 1);
                ci++;
                setTimeout(typeChar, charDelay);
            } else {
                li++;
                setTimeout(typeLine, lineDelay);
            }
        }
        if (text.length === 0) {
            li++;
            setTimeout(typeLine, lineDelay / 2);
        } else {
            typeChar();
        }
    }

    typeLine();
}

if (termBody) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        termBody.innerHTML = scanLines
            .map(l => `<div class="${l.cls}">${l.text}</div>`)
            .join('');
    } else {
        // Kick off once the hero is on screen
        typeTerminal(scanLines, termBody);
    }
}

// ===========================================================
// Active nav link on scroll
// ===========================================================
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

if (sections.length && navAnchors.length && 'IntersectionObserver' in window) {
    const navIo = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navAnchors.forEach(a => {
                    a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--text)' : '';
                });
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(s => navIo.observe(s));
}
