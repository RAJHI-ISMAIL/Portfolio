// Portfolio JavaScript - Modern Interactive Features

document.addEventListener('DOMContentLoaded', function() {
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
    initTypingAnimation();
    
    // Contact form handling
    initContactForm();
    
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
});

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
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
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    navbarToggler.click();
                }
            }
        });
    });
}

// Active section highlighting
function initActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    window.addEventListener('scroll', function() {
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

// Typing animation for hero section
function initTypingAnimation() {
    const roles = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'];
    const roleElement = document.querySelector('.hero-section h3');
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
    
    if (roleElement) {
        setTimeout(typeRole, 1000);
    }
}

// Contact form handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[placeholder="Your Name"]').value;
            const email = this.querySelector('input[placeholder="Your Email"]').value;
            const subject = this.querySelector('input[placeholder="Subject"]').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
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
    
    window.addEventListener('load', function() {
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
    window.addEventListener('scroll', function() {
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
    
    const observer = new IntersectionObserver(function(entries) {
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

// Counter animation for stats
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

// Project filter functionality (for future enhancement)
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
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

// Mouse cursor effects
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
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '0.5';
    });
    
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '0.5';
    });
    
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });
}

// Initialize theme switcher (optional)
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
    
    themeToggle.addEventListener('click', function() {
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

// CV Download functionality
function downloadCV() {
    // Show immediate feedback
    showNotification('Starting CV download... 📄', 'success');
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = 'cv/Rajhisimailcv.pdf';
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
        cvButton.addEventListener('mouseenter', function() {
            if (!this.innerHTML.includes('Downloaded')) {
                this.innerHTML = '<i class="bi bi-download"></i> Download CV';
            }
        });
        
        cvButton.addEventListener('mouseleave', function() {
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
            image: 'images/project3.jpg',
            description: 'Weatherly is a beautiful and intuitive weather app built with Flutter that provides live weather forecasts for any location. With stunning animations and a clean, modern interface.',
            tech: ['Flutter','Dart','OpenWeather API'],
            // Open local video when "View" is clicked
            live: 'Projects/Weatherly/Weatherlyvid.mp4',
            code: 'https://github.com/RAJHI-ISMAIL/Weatherly/blob/main/README.md'
        }
    };

    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const id = this.getAttribute('data-project');
            const p = projects[id];
            if (!p) return;

            // If the project has a live link that points to an external page (http) or a video file (.mp4/.webm),
            // open it directly instead of showing the modal.
            if (p.live && p.live !== '#') {
                const lower = p.live.toLowerCase();
                if (lower.endsWith('.mp4') || lower.endsWith('.webm') || p.live.startsWith('http')) {
                    window.open(p.live, '_blank', 'noopener');
                    return;
                }
            }

            // populate modal
            document.getElementById('projectModalLabel').textContent = p.title;
            document.getElementById('projectModalImage').src = p.image;
            document.getElementById('projectModalDescription').textContent = p.description;
            document.getElementById('projectModalTech').innerHTML = p.tech.map(t => `<span class="badge bg-secondary me-1">${t}</span>`).join(' ');
            document.getElementById('projectModalLive').href = p.live;
            document.getElementById('projectModalCode').href = p.code;

            bsModal.show();
        });
    });
}

// Initialize project modal listener after DOM load
document.addEventListener('DOMContentLoaded', function() {
    initProjectModal();
});
