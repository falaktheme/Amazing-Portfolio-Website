// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navigation background change on scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
    } else {
        nav.style.backgroundColor = 'transparent';
    }
});

// Initialize skill progress bars
function initializeSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        const progress = item.getAttribute('data-progress');
        const progressBar = item.querySelector('.progress-bar');
        progressBar.style.setProperty('--progress', `${progress}%`);
    });
}

// Animate elements on scroll
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.classList.contains('skill-item')) {
                const progress = entry.target.getAttribute('data-progress');
                const progressBar = entry.target.querySelector('.progress-bar');
                progressBar.style.setProperty('--progress', `${progress}%`);
            }
        }
    });
}, { threshold: 0.2 });

// Observe elements for animation
document.querySelectorAll('.project-card, .service-card, .skill-item').forEach(el => {
    animateOnScroll.observe(el);
});

// Typing animation for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Typing Animation
class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = JSON.parse(words);
        this.wait = parseInt(wait);
        this.text = '';
        this.wordIndex = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullText = this.words[current];

        if (this.isDeleting) {
            this.text = fullText.substring(0, this.text.length - 1);
        } else {
            this.text = fullText.substring(0, this.text.length + 1);
        }

        this.element.textContent = this.text;

        let typeSpeed = 100;
        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.text === fullText) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.text === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Particle Animation
function createParticles() {
    const particles = document.querySelector('.hero-particles');
    const numberOfParticles = 50;

    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 255, 0, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 5}s linear infinite;
            transform: scale(${Math.random() * 2});
        `;
        particles.appendChild(particle);
    }
}

// Form validation and submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(this);
    const formValues = Object.fromEntries(formData.entries());
    
    // Basic form validation
    let isValid = true;
    for (let [key, value] of formData.entries()) {
        if (!value.trim()) {
            isValid = false;
            const input = this.querySelector(`[name="${key}"]`);
            input.classList.add('error');
        }
    }
    
    if (isValid) {
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formValues);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Message sent successfully!';
        this.appendChild(successMessage);
        
        // Clear form
        this.reset();
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    }
});

// Active Section Highlighting
function highlightActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
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
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

// Add scroll event listener for active section highlighting
window.addEventListener('scroll', highlightActiveSection);
window.addEventListener('load', highlightActiveSection);

// Project Filtering
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                // Remove hide class first
                card.classList.remove('hide');
                
                // Add animation classes
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';

                // Filter logic
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 300);
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Close mobile menu when clicking on a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Add active class to nav links on scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typing animation
    const dynamicText = document.querySelector('.dynamic-text');
    if (dynamicText) {
        new TypeWriter(
            dynamicText,
            dynamicText.getAttribute('data-words'),
            dynamicText.getAttribute('data-wait')
        );
    }

    // Create particles
    createParticles();

    // Initialize skill progress bars
    initializeSkills();
    
    // Observe elements for animation
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                if (entry.target.classList.contains('skill-item')) {
                    const progress = entry.target.getAttribute('data-progress');
                    const progressBar = entry.target.querySelector('.progress-bar');
                    progressBar.style.setProperty('--progress', `${progress}%`);
                }
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.project-card, .service-card, .skill-item').forEach(el => {
        animateOnScroll.observe(el);
    });

    // Start typing animation for hero section
    const heroText = document.querySelector('.hero-content h1');
    if (heroText) {
        const originalText = heroText.textContent;
        typeWriter(heroText, originalText);
    }

    // Initialize project filters
    initializeProjectFilters();
});

// Add floating animation to skill icons
document.querySelectorAll('.skill-icon').forEach((icon, index) => {
    icon.style.animation = `float ${Math.random() * 2 + 3}s ease-in-out infinite`;
    icon.style.animationDelay = `${index * 0.2}s`;
});

// Add glitch effect on hover
const glitchText = document.querySelector('.glitch-text');
if (glitchText) {
    glitchText.addEventListener('mouseover', () => {
        glitchText.classList.add('glitch');
    });
    glitchText.addEventListener('mouseout', () => {
        glitchText.classList.remove('glitch');
    });
}

// Particle effect in hero section
function createParticles() {
    const circle = document.querySelector('.circle');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.setProperty('--angle', `${Math.random() * 360}deg`);
        particle.style.setProperty('--delay', `${Math.random() * 2}s`);
        circle.appendChild(particle);
    }
}

createParticles();
