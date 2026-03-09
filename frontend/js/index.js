// Mobile Menu Functionality
function toggleMobileMenu() {
    const menuList = document.querySelector('.class-list');
    const toggleIcon = document.querySelector('.mobile-menu-toggle i');
    
    menuList.classList.toggle('active');
    
    // Toggle icon between hamburger and close
    if (menuList.classList.contains('active')) {
        toggleIcon.className = 'fas fa-times';
    } else {
        toggleIcon.className = 'fas fa-bars';
    }
}

// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('.class-list a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            const menuList = document.querySelector('.class-list');
            const toggleIcon = document.querySelector('.mobile-menu-toggle i');
            
            if (menuList.classList.contains('active')) {
                menuList.classList.remove('active');
                toggleIcon.className = 'fas fa-bars';
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const nav = document.querySelector('.nav-class');
        const menuList = document.querySelector('.class-list');
        const toggleIcon = document.querySelector('.mobile-menu-toggle i');
        
        if (!nav.contains(event.target) && menuList.classList.contains('active')) {
            menuList.classList.remove('active');
            toggleIcon.className = 'fas fa-bars';
        }
    });
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Responsive image loading optimization
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[src*="unsplash.com"]');
    
    function updateImageSizes() {
        const screenWidth = window.innerWidth;
        let imageWidth, imageHeight;
        
        if (screenWidth <= 480) {
            imageWidth = 280;
            imageHeight = 180;
        } else if (screenWidth <= 768) {
            imageWidth = 350;
            imageHeight = 200;
        } else {
            imageWidth = 300;
            imageHeight = 200;
        }
        
        images.forEach(img => {
            const currentSrc = img.src;
            const baseSrc = currentSrc.split('?')[0];
            img.src = `${baseSrc}?w=${imageWidth}&h=${imageHeight}&fit=crop&crop=top`;
        });
    }
    
    // Update image sizes on load and resize
    updateImageSizes();
    window.addEventListener('resize', debounce(updateImageSizes, 250));
});

// Debounce function for performance optimization
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

// Enhanced hover effects for touch devices
if ('ontouchstart' in window) {
    document.addEventListener('DOMContentLoaded', function() {
        const hoverElements = document.querySelectorAll('.service-section, .class-list li');
        
        hoverElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-hover');
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-hover');
                }, 300);
            });
        });
    });
}

// Performance optimization for scroll events
let ticking = false;

function updateScrollPosition() {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
    }
});