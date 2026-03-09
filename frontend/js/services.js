class ServicesManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupServiceInteractions();
        this.setupMobileMenu();
    }

    setupScrollAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe service cards
        document.querySelectorAll('.service-card').forEach(card => {
            observer.observe(card);
        });

        // Observe feature sections
        document.querySelectorAll('.feature-section').forEach(section => {
            observer.observe(section);
        });
    }

    setupServiceInteractions() {
        // Service card hover effects
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateServiceCard(card, 'enter');
            });

            card.addEventListener('mouseleave', () => {
                this.animateServiceCard(card, 'leave');
            });
        });

        // Service CTA buttons
        document.querySelectorAll('.service-cta').forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleServiceCTA(e);
            });
        });

        // Feature buttons
        document.querySelectorAll('.feature-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleFeatureClick(e);
            });
        });
    }

    setupMobileMenu() {
        // Mobile menu functionality if needed
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
    }

    animateServiceCard(card, action) {
        const icon = card.querySelector('.service-icon');
        const features = card.querySelectorAll('.service-features li');

        if (action === 'enter') {
            icon?.classList.add('animated');
            features.forEach((feature, index) => {
                setTimeout(() => {
                    feature.style.transform = 'translateX(5px)';
                    feature.style.color = 'var(--primary-yellow)';
                }, index * 50);
            });
        } else {
            icon?.classList.remove('animated');
            features.forEach(feature => {
                feature.style.transform = 'translateX(0)';
                feature.style.color = '';
            });
        }
    }

    handleServiceCTA(e) {
        e.preventDefault();
        const button = e.target.closest('.service-cta');
        const href = button.getAttribute('href');
        
        // Add loading animation
        button.style.opacity = '0.7';
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';

        // Navigate after animation
        setTimeout(() => {
            if (href && href !== '#') {
                window.location.href = href;
            } else {
                this.showNotification('This feature is coming soon!', 'info');
                button.style.opacity = '1';
                button.innerHTML = 'Learn More <i class="fas fa-arrow-right"></i>';
            }
        }, 1000);
    }

    handleFeatureClick(e) {
        e.preventDefault();
        const button = e.target.closest('.feature-btn');
        const buttonText = button.textContent.trim();

        this.showNotification(`${buttonText} - Opening tool...`, 'success');

        // Simulate loading then navigate
        setTimeout(() => {
            const href = button.getAttribute('href');
            if (href && href !== '#') {
                window.location.href = href;
            }
        }, 1500);
    }

    toggleMobileMenu() {
        const nav = document.querySelector('.nav-class');
        nav?.classList.toggle('mobile-open');
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize services manager
document.addEventListener('DOMContentLoaded', () => {
    new ServicesManager();
});

// Mobile menu toggle function (global)
function toggleMobileMenu() {
    const nav = document.querySelector('.nav-class');
    nav?.classList.toggle('mobile-open');
}

// Add smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add scroll effects for header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header?.classList.add('scrolled');
    } else {
        header?.classList.remove('scrolled');
    }
});