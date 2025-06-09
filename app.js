// AI Programming Anxiety - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    initScrollProgress();
    initNumberCounters();
    initIntersectionObserver();
    initSmoothScrolling();
    initParallaxEffects();
    initCardInteractions();
});

// Scroll progress bar
function initScrollProgress() {
    const progressBar = document.querySelector('.progress-bar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Number counter animation
function initNumberCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseFloat(counter.getAttribute('data-value'));
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = target * easeOut;
            
            counter.textContent = current.toFixed(1);
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toFixed(1);
            }
        };
        
        requestAnimationFrame(updateCounter);
    };

    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Intersection Observer for card animations
function initIntersectionObserver() {
    const cards = document.querySelectorAll('.bento-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                setTimeout(() => {
                    entry.target.classList.add('animate');
                    
                    // Add specific animation classes based on card position
                    if (index % 3 === 0) {
                        entry.target.classList.add('animate-fade-in');
                    } else if (index % 3 === 1) {
                        entry.target.classList.add('animate-scale-in');
                    } else {
                        entry.target.classList.add('animate-slide-in');
                    }
                }, index * 100);
                
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach(card => {
        cardObserver.observe(card);
    });
}

// Smooth scrolling for internal links
function initSmoothScrolling() {
    // Smooth scroll for scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const bentoGrid = document.getElementById('bento-grid');
            bentoGrid.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
}

// Parallax effects
function initParallaxEffects() {
    const hero = document.querySelector('.hero');
    const heroBackdrop = document.querySelector('.hero-backdrop');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        const scrollProgress = scrolled / heroHeight;
        
        if (scrollProgress <= 1) {
            // Parallax effect for hero backdrop
            if (heroBackdrop) {
                heroBackdrop.style.transform = `translateY(${scrolled * 0.5}px)`;
                heroBackdrop.style.opacity = 1 - scrollProgress;
            }
        }
    });
}

// Card interactions and hover effects
function initCardInteractions() {
    const cards = document.querySelectorAll('.bento-card');
    
    cards.forEach(card => {
        // Mouse enter effect
        card.addEventListener('mouseenter', function() {
            // Add subtle rotation and glow effect
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
            this.style.boxShadow = '0 20px 60px rgba(255, 107, 53, 0.3)';
            
            // Animate card background
            const cardBg = this.querySelector('.card-bg');
            if (cardBg) {
                cardBg.style.transform = 'scale(1.05)';
                cardBg.style.opacity = '0.8';
            }
        });
        
        // Mouse leave effect
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg)';
            this.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
            
            const cardBg = this.querySelector('.card-bg');
            if (cardBg) {
                cardBg.style.transform = 'scale(1)';
                cardBg.style.opacity = '0.5';
            }
        });
        
        // Click effect with ripple animation
        card.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '0px';
            ripple.style.height = '0px';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 107, 53, 0.3)';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.pointerEvents = 'none';
            ripple.style.zIndex = '10';
            
            this.appendChild(ripple);
            
            // Animate ripple
            ripple.style.transition = 'width 0.6s ease, height 0.6s ease, opacity 0.6s ease';
            ripple.style.width = '300px';
            ripple.style.height = '300px';
            ripple.style.opacity = '0';
            
            // Remove ripple after animation
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
            
            // Add subtle shake animation
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'shake 0.3s ease-in-out';
            }, 10);
        });
    });
}

// Add shake animation keyframes via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateY(-10px) rotateX(5deg) translateX(0); }
        25% { transform: translateY(-10px) rotateX(5deg) translateX(-2px); }
        75% { transform: translateY(-10px) rotateX(5deg) translateX(2px); }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .pulse-animation {
        animation: pulse 2s infinite;
    }
`;
document.head.appendChild(style);

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        const currentScroll = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const nextSection = currentScroll + windowHeight;
        
        window.scrollTo({
            top: nextSection,
            behavior: 'smooth'
        });
    }
    
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        const currentScroll = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const prevSection = Math.max(0, currentScroll - windowHeight);
        
        window.scrollTo({
            top: prevSection,
            behavior: 'smooth'
        });
    }
});

// Performance optimization: throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(function() {
    // Additional scroll handling if needed
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Resize handler for responsive adjustments
window.addEventListener('resize', function() {
    // Recalculate positions and animations on resize
    const cards = document.querySelectorAll('.bento-card');
    cards.forEach(card => {
        card.style.transform = '';
        card.style.transition = 'none';
        setTimeout(() => {
            card.style.transition = '';
        }, 100);
    });
});

// Loading animation
window.addEventListener('load', function() {
    // Add loading complete class to body
    document.body.classList.add('loaded');
    
    // Trigger hero animations
    const heroElements = document.querySelectorAll('.mega-title, .subtitle, .stat-container, .hero-text');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animate-fade-in');
        }, index * 200);
    });
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg triggered
        const cards = document.querySelectorAll('.bento-card');
        cards.forEach(card => {
            card.classList.add('pulse-animation');
            setTimeout(() => {
                card.classList.remove('pulse-animation');
            }, 4000);
        });
        
        // Reset the code
        konamiCode = [];
    }
});

// Export functions for potential external use
window.AIAnxietyApp = {
    initScrollProgress,
    initNumberCounters,
    initIntersectionObserver,
    initSmoothScrolling,
    initParallaxEffects,
    initCardInteractions
};