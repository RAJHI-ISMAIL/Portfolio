// Portfolio JavaScript - Modern Interactive Features

document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Navbar scroll effect
    initNavbarScroll();

    // Smooth scrolling for navigation links
    initSmoothScrolling();

    // Active section highlighting
    initActiveSection();

    // Typing animation for hero section
    // initTypingAnimation();

    // Contact form removed from HTML; contact handling is disabled.

    // Scroll to top button
    initScrollToTop();

    // Loading screen
    initLoadingScreen();

    // Parallax effects
    initParallaxEffects();

    // Skills animation
    initSkillsAnimation();

    // CV download tracking
    initCVDownload();

    // Custom cursor and mouse trail
    initCustomCursor();

    // Background particles
    initBackgroundParticles();
});

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    if (navbarToggler) navbarToggler.click();
                }
            }
        });
    });
}

// Active section highlighting
function initActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    window.addEventListener('scroll', function () {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    });
}

// Navbar scroll effect

function initTypingAnimation() {
    const roles = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'];
    const roleElement = document.querySelector('.hero-section h1');
    if (!roleElement) return;

    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    function typeRole() {
        const currentRole = roles[currentRoleIndex];

        if (isDeleting) {
            roleElement.textContent = currentRole.substring(0, currentCharIndex - 1);
            currentCharIndex--;
        } else {
            roleElement.textContent = currentRole.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }

        let typeSpeed = isDeleting ? 100 : 200;

        if (!isDeleting && currentCharIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        }

        setTimeout(typeRole, typeSpeed);
    }

    setTimeout(typeRole, 1000);
}



// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : 'danger'} notification`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        max-width: 400px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Scroll to top button
function initScrollToTop() {
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Loading screen
function initLoadingScreen() {
    // Create loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading';
    loadingScreen.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loadingScreen);

    window.addEventListener('load', function () {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(loadingScreen);
            }, 500);
        }, 1000);
    });
}

// Parallax effects
function initParallaxEffects() {
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-bg-overlay');

        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Skills animation
function initSkillsAnimation() {
    const skillCards = document.querySelectorAll('.skill-card');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    skillCards.forEach(card => {
        observer.observe(card);
    });
}

// Counter animation for stats - NOT USED (no stat elements in HTML)
// Uncomment if you add stat elements
/*
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h4');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        let count = 0;
        const increment = target / 100;

        const updateCounter = () => {
            if (count < target) {
                count += increment;
                counter.textContent = Math.ceil(count) + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
            }
        };

        updateCounter();
    });
}
*/

// Project filter functionality (for future enhancement) - NOT USED
// Uncomment if you add filter buttons to HTML
/*
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}
*/

// Mouse cursor effects - REPLACED BY initCustomCursor()
// Keeping commented for reference
/*
function initCursorEffects() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function (e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '0.5';
    });

    document.addEventListener('mouseenter', function () {
        cursor.style.opacity = '0.5';
    });

    document.addEventListener('mouseleave', function () {
        cursor.style.opacity = '0';
    });
}
*/

// Initialize theme switcher (optional) - NOT USED
// Uncomment if you want dark/light mode toggle
/*
function initThemeSwitcher() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="bi bi-moon"></i>';
    themeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
    `;

    document.body.appendChild(themeToggle);

    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-theme');
        const icon = this.querySelector('i');

        if (document.body.classList.contains('dark-theme')) {
            icon.className = 'bi bi-sun';
            localStorage.setItem('theme', 'dark');
        } else {
            icon.className = 'bi bi-moon';
            localStorage.setItem('theme', 'light');
        }
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.querySelector('i').className = 'bi bi-sun';
    }
}
*/

// CV Download functionality
function downloadCV() {
    // Show immediate feedback
    showNotification('Starting CV download... 📄', 'success');

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = 'cv/Rajhi Ismail cv.pdf';
    link.download = 'Rajhi_Ismail_CV.pdf';
    link.target = '_blank';

    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Update button feedback
    const button = document.getElementById('downloadCV');
    if (button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="bi bi-check-circle"></i> Downloaded!';
        button.style.background = '#28a745';
        button.style.borderColor = '#28a745';

        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
            button.style.borderColor = '';
        }, 3000);
    }

    console.log('CV Download attempted:', new Date().toISOString());
}

function initCVDownload() {
    const cvButton = document.querySelector('#downloadCV');

    if (cvButton) {
        // Add hover effect for CV button
        cvButton.addEventListener('mouseenter', function () {
            if (!this.innerHTML.includes('Downloaded')) {
                this.innerHTML = '<i class="bi bi-download"></i> Download CV';
            }
        });

        cvButton.addEventListener('mouseleave', function () {
            if (!this.innerHTML.includes('Downloaded')) {
                this.innerHTML = 'Download CV';
            }
        });
    }
}

// Project modal handler
function initProjectModal() {
    const buttons = document.querySelectorAll('.project-view-btn');
    const modalEl = document.getElementById('projectModal');
    if (!modalEl) return;

    const bsModal = new bootstrap.Modal(modalEl);

    const projects = {
        weatherly: {
            title: 'Weatherly',
            image: 'Projects/Weatherly/Weatherly.png',
            video: 'Projects/Weatherly/Weatherlyvid.mp4',
            description: 'Weatherly is a beautiful and intuitive weather app built with Flutter that provides real-time weather forecasts for any location worldwide. Featuring stunning Lottie animations and a clean, modern interface that makes checking the weather a delightful experience.',
            tech: ['Flutter', 'Dart', 'OpenWeather API', 'Lottie Animations'],
            demoLink: 'Projects/Weatherly/Weatherlyvid.mp4',
            repoLink: 'https://github.com/RAJHI-ISMAIL/Weatherly',
            details: 'Built with Flutter for cross-platform compatibility. Features include location-based weather, hourly forecasts, and beautiful animations.'
        },
        cinescope: {
            title: 'CineScope',
            image: 'Projects/CineScope/logo.png',
            video: 'Projects/CineScope/viewcine.mp4',
            description: 'CineScope is a comprehensive movie discovery app built with Flutter. It allows users to search for movies, TV series, view ratings, and manage their watchlist.',
            tech: ['Flutter', 'Dart', 'Movie API', 'State Management'],
            demoLink: 'Projects/CineScope/viewcine.mp4',
            repoLink: 'https://github.com/RAJHI-ISMAIL/CineScope',
            details: 'A feature-rich app that integrates with a movie database API. Users can browse trending movies, search by genre, and save favorites.'
        }
    };

    buttons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const id = this.getAttribute('data-project');
            const p = projects[id];
            if (!p) return;

            // Populate modal
            document.getElementById('projectModalLabel').textContent = p.title;
            
            // Handle media display (image or video)
            const mediaContainer = document.getElementById('projectModalMediaContainer');
            const imgElement = document.getElementById('projectModalImage');
            const videoElement = document.getElementById('projectModalVideo');
            
            if (p.video) {
                imgElement.style.display = 'none';
                videoElement.style.display = 'block';
                videoElement.src = p.video;
                videoElement.load();
            } else {
                videoElement.style.display = 'none';
                imgElement.style.display = 'block';
                imgElement.src = p.image;
            }
            
            document.getElementById('projectModalDescription').textContent = p.description;
            document.getElementById('projectModalTech').innerHTML = p.tech.map(t => `<span class="badge bg-primary me-1">${t}</span>`).join('');
            
            // Set up demo link - if it's a video, clicking will play it in modal
            const demoBtn = document.getElementById('projectModalLive');
            if (p.video && p.video.toLowerCase().endsWith('.mp4')) {
                demoBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    videoElement.play();
                });
            } else {
                demoBtn.href = p.demoLink;
            }
            
            // Set up GitHub link
            const codeBtn = document.getElementById('projectModalCode');
            codeBtn.href = p.repoLink;
            codeBtn.target = '_blank';
            codeBtn.rel = 'noopener';
            
            document.getElementById('projectModalDetails').innerHTML = `<p class="text-muted mb-0"><strong>About:</strong> ${p.details}</p>`;

            bsModal.show();
        });
    });
}

// Initialize project modal listener after DOM load
document.addEventListener('DOMContentLoaded', function () {
    initProjectModal();
});

// Custom Cursor Implementation - Updated for new design
function initCustomCursor() {
    // Create cursor elements with new class names
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    const cursorOutline = document.createElement('div');
    cursorOutline.className = 'cursor-outline';
    document.body.appendChild(cursorOutline);

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    let dotX = 0;
    let dotY = 0;

    // Track mouse position
    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Create particle trail
        createCursorParticle(e.clientX, e.clientY);
    });

    // Hide cursor when mouse leaves window
    document.addEventListener('mouseleave', function () {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });

    // Show cursor when mouse enters window
    document.addEventListener('mouseenter', function () {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });

    // Smooth cursor following animation
    function animateCursor() {
        // Outline follows with delay for smooth effect
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        // Dot follows more quickly
        dotX += (mouseX - dotX) * 0.6;
        dotY += (mouseY - dotY) * 0.6;

        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';

        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .glass-card, .navbar-brand, .nav-link, .social-links a');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function () {
            document.body.classList.add('hovering');
        });

        element.addEventListener('mouseleave', function () {
            document.body.classList.remove('hovering');
        });
    });

    // Click ripple effect
    document.addEventListener('mousedown', function (e) {
        const ripple = document.createElement('div');
        ripple.className = 'cursor-ripple';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        ripple.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                document.body.removeChild(ripple);
            }
        }, 600);
    });
}

// Cursor Particle Trail
let particleThrottle = 0;
function createCursorParticle(x, y) {
    particleThrottle++;
    // Create particle every 5 frames for performance
    if (particleThrottle % 5 !== 0) return;

    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.transform = 'translate(-50%, -50%)';

    document.body.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            document.body.removeChild(particle);
        }
    }, 800);
}


// Background Particles System
function initBackgroundParticles() {
    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.insertBefore(particlesContainer, document.body.firstChild);

    const particleCount = 30;
    const shapes = ['circle', 'square', 'triangle'];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, shapes);
    }

    // Continuously create new particles
    setInterval(() => {
        if (particlesContainer.children.length < particleCount) {
            createParticle(particlesContainer, shapes);
        }
    }, 3000);
}

function createParticle(container, shapes) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random shape
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    if (shape !== 'circle') {
        particle.classList.add(shape);
    }

    // Random size
    const size = Math.random() * 15 + 5; // 5-20px
    if (shape === 'circle' || shape === 'square') {
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
    }

    // Random starting position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.bottom = '-50px';

    // Random animation duration
    const duration = Math.random() * 15 + 15; // 15-30 seconds
    particle.style.animationDuration = duration + 's';

    // Random delay
    const delay = Math.random() * 5;
    particle.style.animationDelay = delay + 's';

    // Random horizontal movement
    const moveX = (Math.random() - 0.5) * 200; // -100 to 100px
    particle.style.setProperty('--moveX', moveX + 'px');

    container.appendChild(particle);

    // Remove particle after animation completes
    setTimeout(() => {
        if (particle.parentNode) {
            container.removeChild(particle);
        }
    }, (duration + delay) * 1000);
}

