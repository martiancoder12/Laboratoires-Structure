/* ===================================
   LABORATOIRES STRUCTURE - SCRIPT
   Complete JavaScript functionality
   =================================== */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Laboratoires Structure initialized');
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Initialize smooth scrolling
    initSmoothScroll();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!mobileToggle || !navMenu) return;
    
    mobileToggle.addEventListener('click', function() {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking nav links
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Scroll Effects
function initScrollEffects() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.borderBottomColor = 'rgba(0, 0, 0, 0.15)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.borderBottomColor = 'rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Smooth Scrolling for Anchor Links
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Button Hover Effects (Enhanced)
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Add ripple effect on click
        button.addEventListener('click', function(e) {
            // Only add ripple if user doesn't prefer reduced motion
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                pointer-events: none;
            `;
            
            // Add CSS animation if not already added
            if (!document.querySelector('#ripple-styles')) {
                const style = document.createElement('style');
                style.id = 'ripple-styles';
                style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                    .btn {
                        position: relative;
                        overflow: hidden;
                    }
                `;
                document.head.appendChild(style);
            }
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
});

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navMenu && navMenu.classList.contains('active')) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Handle page visibility changes (pause/resume animations)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.body.style.animationPlayState = 'paused';
    } else {
        document.body.style.animationPlayState = 'running';
    }
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
/* ===================================
   CONTACT FORM FUNCTIONALITY
   Add this to your existing script.js
   =================================== */

// Contact Form Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const formMessage = document.getElementById('form-message');
    const submitButton = contactForm ? contactForm.querySelector('.form-submit') : null;
    
    if (contactForm) {
        initContactForm();
    }
});

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const formMessage = document.getElementById('form-message');
    const submitButton = contactForm.querySelector('.form-submit');
    const originalButtonText = submitButton.textContent;
    
    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        setFormLoading(true);
        hideFormStatus();
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Submit to Formspree
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            setFormLoading(false);
            
            if (response.ok) {
                showFormStatus('success', 'Thank you for your message! We\'ll get back to you within 48 hours.');
                contactForm.reset();
            } else {
                return response.json().then(data => {
                    if (data.errors) {
                        const errorMessages = data.errors.map(error => error.message).join(', ');
                        throw new Error(errorMessages);
                    } else {
                        throw new Error('Something went wrong. Please try again.');
                    }
                });
            }
        })
        .catch(error => {
            setFormLoading(false);
            console.error('Form submission error:', error);
            showFormStatus('error', 'Sorry, there was an error sending your message. Please try emailing us directly at ashfaaq@labostructure.com');
        });
    });
    
    // Form validation on input
    const requiredFields = contactForm.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(field);
        });
        
        field.addEventListener('input', function() {
            // Remove error styling on input
            field.style.borderColor = '#000000';
        });
    });
    
    // Email field specific validation
    const emailField = contactForm.querySelector('#email');
    if (emailField) {
        emailField.addEventListener('blur', function() {
            validateEmail(emailField);
        });
    }
    
    function setFormLoading(isLoading) {
        if (isLoading) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            contactForm.classList.add('form-loading');
        } else {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
            contactForm.classList.remove('form-loading');
        }
    }
    
    function showFormStatus(type, message) {
        formStatus.className = `form-status ${type}`;
        formMessage.textContent = message;
        formStatus.style.display = 'block';
        
        // Scroll to status message
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                hideFormStatus();
            }, 5000);
        }
    }
    
    function hideFormStatus() {
        formStatus.style.display = 'none';
    }
    
    function validateField(field) {
        if (!field.value.trim()) {
            field.style.borderColor = '#dc3545';
            return false;
        } else {
            field.style.borderColor = '#000000';
            return true;
        }
    }
    
    function validateEmail(emailField) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(emailField.value);
        
        if (!isValid && emailField.value.trim()) {
            emailField.style.borderColor = '#dc3545';
            return false;
        } else {
            emailField.style.borderColor = '#000000';
            return true;
        }
    }
}

// Auto-resize textarea
document.addEventListener('DOMContentLoaded', function() {
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });
});

// Honeypot spam protection (if needed)
function addHoneypot() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const honeypot = document.createElement('input');
        honeypot.type = 'text';
        honeypot.name = '_gotcha';
        honeypot.style.display = 'none';
        honeypot.tabIndex = -1;
        honeypot.setAttribute('aria-hidden', 'true');
        contactForm.appendChild(honeypot);
    }
}