// Header scroll effect (can't be done with pure CSS)
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const scrolled = window.scrollY > 50;
    
    header.classList.toggle('scrolled', scrolled);
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Initialize scroll animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add animate class to elements that need scroll animation
    const animatedElements = document.querySelectorAll(
        '.hero-text, .hero-visual, .trusted-by, .feature-card, .testimonial-card, .stat-item'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
});

// Animated counter for stats (complex logic that needs JS)
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        const isSlash = target.includes('/');
        
        let finalNumber;
        if (isPercentage) {
            finalNumber = parseFloat(target.replace('%', ''));
        } else if (isPlus) {
            finalNumber = parseFloat(target.replace(/[M+]/g, ''));
        } else if (isSlash) {
            finalNumber = parseFloat(target.replace(/[/]/g, ''));
        } else {
            finalNumber = parseFloat(target.replace(/[^\d.]/g, ''));
        }
        
        let current = 0;
        const increment = finalNumber / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= finalNumber) {
                current = finalNumber;
                clearInterval(timer);
            }
            
            let displayValue;
            if (isPercentage) {
                displayValue = current.toFixed(1) + '%';
            } else if (isPlus && target.includes('M')) {
                displayValue = Math.floor(current) + 'M+';
            } else if (isPlus) {
                displayValue = Math.floor(current) + '+';
            } else if (isSlash) {
                displayValue = Math.floor(current) + '/7';
            } else {
                displayValue = Math.floor(current);
            }
            
            counter.textContent = displayValue;
        }, 20);
    });
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});