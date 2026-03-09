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

// Setup mobile menu event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu event listeners
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
});

// Multi-step form functionality for the Join page
let currentStep = 1;
const totalSteps = 3;

function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
            hideStep(currentStep);
            currentStep++;
            showStep(currentStep);
            updateProgress();
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        hideStep(currentStep);
        currentStep--;
        showStep(currentStep);
        updateProgress();
    }
}

function showStep(step) {
    const stepElement = document.querySelector(`[data-step="${step}"]`);
    if (stepElement) {
        stepElement.classList.remove('hidden');
    }
}

function hideStep(step) {
    const stepElement = document.querySelector(`[data-step="${step}"]`);
    if (stepElement) {
        stepElement.classList.add('hidden');
    }
}

function updateProgress() {
    // Update progress indicators
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        if (index + 1 <= currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

function validateCurrentStep() {
    const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
    const requiredInputs = currentStepElement.querySelectorAll('input[required], select[required]');
    
    let isValid = true;
    requiredInputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ff4444';
        } else {
            input.style.borderColor = '';
        }
    });

    if (currentStep === 2) {
        // Check if at least one interest is selected
        const interests = currentStepElement.querySelectorAll('input[name="interests"]:checked');
        if (interests.length === 0) {
            isValid = false;
            showNotification('Please select at least one area of interest', 'warning');
        }
    }

    if (currentStep === 3) {
        // Check if at least one goal is selected
        const goals = currentStepElement.querySelectorAll('input[name="goals"]:checked');
        if (goals.length === 0) {
            isValid = false;
            showNotification('Please select at least one goal', 'warning');
        }
    }

    return isValid;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'warning' ? '#ff4444' : '#00aa44'};
        color: white;
        border-radius: 8px;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('innovatorSignupForm');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (!validateCurrentStep()) {
                return;
            }
            
            // Collect form data
            const formData = new FormData(form);
            const userData = {
                fullName: formData.get('fullName'),
                email: formData.get('email'),
                age: formData.get('age'),
                country: formData.get('country'),
                interests: formData.getAll('interests'),
                skillLevel: formData.get('skillLevel'),
                goals: formData.getAll('goals'),
                projectIdea: formData.get('projectIdea'),
                timestamp: new Date().toISOString()
            };
            
            try {
                // Show loading state
                const submitBtn = document.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                submitBtn.disabled = true;
                
                // Simulate API call (replace with actual backend endpoint)
                const response = await fetch('/api/join', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });
                
                if (response.ok) {
                    // Show success message and redirect
                    showNotification('Welcome to The New Wave! Check your email for next steps.', 'success');
                    
                    setTimeout(() => {
                        window.location.href = 'community.html';
                    }, 2000);
                } else {
                    throw new Error('Signup failed');
                }
                
            } catch (error) {
                console.error('Signup error:', error);
                showNotification('Something went wrong. Please try again.', 'warning');
                
                // Reset button
                const submitBtn = document.querySelector('.submit-btn');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // Add smooth animations for interest and goal cards
    const interestCards = document.querySelectorAll('.interest-card, .goal-option');
    interestCards.forEach(card => {
        const input = card.querySelector('input');
        const content = card.querySelector('.interest-content, span');
        
        card.addEventListener('click', function() {
            input.checked = !input.checked;
            
            if (input.checked) {
                content.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    content.style.transform = 'scale(1)';
                }, 100);
            }
        });
    });
    
    // Auto-save form data to localStorage
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        // Load saved data
        const savedValue = localStorage.getItem(`join_form_${input.name}`);
        if (savedValue && input.type !== 'checkbox') {
            input.value = savedValue;
        } else if (savedValue === 'true' && input.type === 'checkbox') {
            input.checked = true;
        }
        
        // Save data on change
        input.addEventListener('change', function() {
            if (input.type === 'checkbox') {
                localStorage.setItem(`join_form_${input.name}`, input.checked);
            } else {
                localStorage.setItem(`join_form_${input.name}`, input.value);
            }
        });
    });
});

// Add typing animation effect for the hero text
function typeWriter(element, text, speed = 50) {
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

// Initialize typing animation when page loads
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.join-hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 75);
        }, 500);
    }
});