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

// Innovation page functionality
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
    
    // Add interactive features to the innovation tools
    initializeFeatureCards();
    initializeProjectCards();
    initializeStatsCounter();
    
    // AI Project Analyzer functionality
    const analyzeButtons = document.querySelectorAll('.feature-btn');
    analyzeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const featureCard = this.closest('.feature-card');
            const featureTitle = featureCard.querySelector('h3').textContent;
            
            handleFeatureClick(featureTitle, this);
        });
    });
    
    // Project join functionality
    const joinButtons = document.querySelectorAll('.join-project-btn');
    joinButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectCard = this.closest('.project-card');
            const projectTitle = projectCard.querySelector('h3').textContent;
            
            handleProjectJoin(projectTitle, this);
        });
    });
    
    // Learning section functionality
    const startLearningBtn = document.querySelector('.start-learning-btn, [href*="learning"], button[onclick*="learning"], .learning-cta, .btn-learning');
    if (startLearningBtn) {
        startLearningBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleStartLearning(this);
        });
    }
    
    const joinMentorshipBtn = document.querySelector('.join-mentorship-btn, [href*="mentorship"], button[onclick*="mentorship"], .mentorship-cta, .btn-mentorship');
    if (joinMentorshipBtn) {
        joinMentorshipBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleJoinMentorship(this);
        });
    }

    // Alternative approach: find buttons by text content if specific classes aren't available
    const allButtons = document.querySelectorAll('button, a');
    allButtons.forEach(button => {
        const text = button.textContent.trim().toLowerCase();
        if (text.includes('start learning') && !button.hasAttribute('data-learning-handler')) {
            button.setAttribute('data-learning-handler', 'true');
            button.addEventListener('click', function(e) {
                e.preventDefault();
                handleStartLearning(this);
            });
        } else if (text.includes('mentorship') && !button.hasAttribute('data-mentorship-handler')) {
            button.setAttribute('data-mentorship-handler', 'true');
            button.addEventListener('click', function(e) {
                e.preventDefault();
                handleJoinMentorship(this);
            });
        }
    });
});

function initializeFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
        // Add staggered animation on load
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
        
        // Add hover sound effect (visual feedback)
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 35px rgba(255, 215, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // Add loading animation
        setTimeout(() => {
            card.style.animation = 'slideInUp 0.6s ease forwards';
        }, index * 150);
        
        // Add real-time stats update simulation
        const statsElements = card.querySelectorAll('.project-stats span');
        statsElements.forEach(stat => {
            animateNumbers(stat);
        });
    });
}

function initializeStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Intersection Observer for triggering animation when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElement = entry.target;
                const finalValue = statElement.textContent;
                animateCounter(statElement, finalValue);
                observer.unobserve(statElement);
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element, finalValue) {
    const numValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
    const suffix = finalValue.replace(/[\d.,]/g, '');
    const duration = 2000; // 2 seconds
    const increment = numValue / (duration / 16); // 60 FPS
    let currentValue = 0;
    
    const timer = setInterval(() => {
        currentValue += increment;
        
        if (currentValue >= numValue) {
            currentValue = numValue;
            clearInterval(timer);
        }
        
        // Format the number appropriately
        let displayValue;
        if (numValue >= 1000000) {
            displayValue = (currentValue / 1000000).toFixed(1) + 'M';
        } else if (numValue >= 1000) {
            displayValue = (currentValue / 1000).toFixed(1) + 'K';
        } else {
            displayValue = Math.floor(currentValue).toString();
        }
        
        element.textContent = displayValue + suffix.replace(/[KM]/g, '');
    }, 16);
}

function handleFeatureClick(featureTitle, button) {
    // Show loading state
    const originalText = button.textContent;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    button.disabled = true;
    
    // Simulate AI processing
    setTimeout(() => {
        switch(featureTitle) {
            case 'AI Project Analyzer':
                showModal('AI Project Analyzer', generateProjectAnalysis());
                break;
            case 'Smart Team Builder':
                showModal('Smart Team Builder', generateTeamSuggestions());
                break;
            case 'Impact Predictor':
                showModal('Impact Predictor', generateImpactPrediction());
                break;
            case 'Funding Finder':
                showModal('Funding Finder', generateFundingOptions());
                break;
        }
        
        // Reset button
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

function handleProjectJoin(projectTitle, button) {
    const originalText = button.textContent;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Joining...';
    button.disabled = true;
    
    // Simulate joining process
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Joined!';
        button.style.background = 'linear-gradient(45deg, #00aa44, #00cc44)';
        
        showNotification(`Successfully joined "${projectTitle}"! Check your dashboard for team details.`);
        
        // Update project stats
        const projectCard = button.closest('.project-card');
        const contributorStat = projectCard.querySelector('.project-stats span');
        if (contributorStat) {
            const currentNum = parseInt(contributorStat.textContent.match(/\d+/)[0]);
            contributorStat.innerHTML = `<i class="fas fa-users"></i> ${currentNum + 1} contributors`;
        }
    }, 1500);
}

function handleStartLearning(button) {
    // Show loading state
    const originalText = button.textContent;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Launching...';
    button.disabled = true;
    
    // Simulate loading and show learning options
    setTimeout(() => {
        showLearningModal();
        
        // Reset button
        button.textContent = originalText;
        button.disabled = false;
    }, 1000);
}

function handleJoinMentorship(button) {
    // Show loading state
    const originalText = button.textContent;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
    button.disabled = true;
    
    // Simulate mentorship connection
    setTimeout(() => {
        showMentorshipModal();
        
        // Reset button
        button.textContent = originalText;
        button.disabled = false;
    }, 1000);
}

function showLearningModal() {
    // Create learning pathways modal
    const modal = document.createElement('div');
    modal.className = 'ai-modal learning-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-graduation-cap"></i> Start Your Learning Journey</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${generateLearningContent()}
            </div>
            <div class="modal-footer">
                <button class="modal-btn primary" data-action="skill-development">
                    <i class="fas fa-rocket"></i> Start Learning Path
                </button>
                <button class="modal-btn secondary" data-action="browse-resources">
                    <i class="fas fa-book-open"></i> Browse Resources
                </button>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => modal.style.opacity = '1', 100);
    
    // Close functionality
    const closeBtn = modal.querySelector('.modal-close');
    const closeModal = () => {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Button functionality
    const primaryBtn = modal.querySelector('.modal-btn.primary');
    const secondaryBtn = modal.querySelector('.modal-btn.secondary');
    
    primaryBtn.addEventListener('click', () => {
        closeModal();
        window.location.href = 'skill-development.html';
    });
    
    secondaryBtn.addEventListener('click', () => {
        closeModal();
        showNotification('Learning resources will be available soon! Check out our skill development section.', 'success');
        setTimeout(() => {
            window.location.href = 'skill-development.html';
        }, 2000);
    });
}

function showMentorshipModal() {
    // Create mentorship modal
    const modal = document.createElement('div');
    modal.className = 'ai-modal mentorship-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-users"></i> Join AI Mentorship Program</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${generateMentorshipContent()}
            </div>
            <div class="modal-footer">
                <button class="modal-btn primary" data-action="ai-mentorship">
                    <i class="fas fa-brain"></i> Get AI Mentor
                </button>
                <button class="modal-btn secondary" data-action="human-mentorship">
                    <i class="fas fa-handshake"></i> Find Human Mentor
                </button>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => modal.style.opacity = '1', 100);
    
    // Close functionality
    const closeBtn = modal.querySelector('.modal-close');
    const closeModal = () => {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Button functionality
    const primaryBtn = modal.querySelector('.modal-btn.primary');
    const secondaryBtn = modal.querySelector('.modal-btn.secondary');
    
    primaryBtn.addEventListener('click', () => {
        closeModal();
        window.location.href = 'ai-mentorship.html';
    });
    
    secondaryBtn.addEventListener('click', () => {
        closeModal();
        showNotification('Connecting you with mentorship opportunities...', 'success');
        setTimeout(() => {
            window.location.href = 'ai-mentorship.html';
        }, 2000);
    });
}

function showModal(title, content) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'ai-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-robot"></i> ${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
            <div class="modal-footer">
                <button class="modal-btn primary">Get Started</button>
                <button class="modal-btn secondary">Learn More</button>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => modal.style.opacity = '1', 100);
    
    // Close functionality
    const closeBtn = modal.querySelector('.modal-close');
    const closeModal = () => {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Button functionality
    const primaryBtn = modal.querySelector('.modal-btn.primary');
    primaryBtn.addEventListener('click', () => {
        closeModal();
        window.location.href = 'join.html';
    });
}

function generateProjectAnalysis() {
    return `
        <div class="ai-analysis">
            <h4>🎯 Feasibility Assessment: 92%</h4>
            <div class="progress-bar">
                <div class="progress-fill" style="width: 92%; background: linear-gradient(45deg, #FFD700, #FFA500);"></div>
            </div>
            
            <h4>📊 Market Analysis</h4>
            <ul>
                <li>✅ Strong market demand in Climate Tech sector</li>
                <li>✅ Low competition for your specific approach</li>
                <li>⚠️ Consider regulatory challenges in target regions</li>
            </ul>
            
            <h4>🚀 Recommendations</h4>
            <ul>
                <li>Partner with environmental NGOs for credibility</li>
                <li>Start with a pilot program in one region</li>
                <li>Apply for climate innovation grants (3 matches found)</li>
            </ul>
            
            <div class="ai-confidence">
                <small>AI Confidence: 94% | Analysis based on 10K+ similar projects</small>
            </div>
        </div>
    `;
}

function generateTeamSuggestions() {
    return `
        <div class="team-suggestions">
            <h4>🤖 Perfect Team Matches Found</h4>
            
            <div class="team-member">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=50&h=50&fit=crop&crop=face" alt="Team member">
                <div>
                    <strong>Maria Santos</strong> • Backend Developer
                    <p>95% match • Available for 15hrs/week • Same timezone</p>
                    <span class="skill-tags">Python, Django, Climate Tech</span>
                </div>
            </div>
            
            <div class="team-member">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face" alt="Team member">
                <div>
                    <strong>Alex Chen</strong> • UI/UX Designer
                    <p>89% match • Available for 12hrs/week • +2hrs timezone</p>
                    <span class="skill-tags">Figma, User Research, Climate Apps</span>
                </div>
            </div>
            
            <h4>💡 Team Formation Tips</h4>
            <ul>
                <li>Your team needs 1 more marketing specialist</li>
                <li>Consider adding someone from your target region</li>
                <li>Schedule a team chemistry call within 48 hours</li>
            </ul>
        </div>
    `;
}

function generateImpactPrediction() {
    return `
        <div class="impact-prediction">
            <h4>🌍 Projected Global Impact</h4>
            
            <div class="impact-metrics">
                <div class="metric">
                    <div class="metric-value">2.3M</div>
                    <div class="metric-label">People Reached (Year 1)</div>
                </div>
                <div class="metric">
                    <div class="metric-value">15</div>
                    <div class="metric-label">Countries</div>
                </div>
                <div class="metric">
                    <div class="metric-value">$4.2M</div>
                    <div class="metric-label">Economic Value</div>
                </div>
            </div>
            
            <h4>📈 Growth Trajectory</h4>
            <ul>
                <li><strong>Month 1-3:</strong> MVP launch, 500 early adopters</li>
                <li><strong>Month 4-8:</strong> Scale to 50K users, partnerships</li>
                <li><strong>Month 9-12:</strong> International expansion, 2M+ users</li>
            </ul>
            
            <div class="confidence-score">
                <strong>Prediction Confidence: 87%</strong>
                <small>Based on 500+ similar climate tech projects</small>
            </div>
        </div>
    `;
}

function generateFundingOptions() {
    return `
        <div class="funding-options">
            <h4>💰 Personalized Funding Matches</h4>
            
            <div class="funding-option">
                <div class="funding-badge hot">🔥 Hot Match</div>
                <h5>Climate Innovation Grant</h5>
                <p><strong>$50K - $200K</strong> • Deadline: March 30</p>
                <p>Perfect fit for your climate tech solution. 78% match score.</p>
            </div>
            
            <div class="funding-option">
                <div class="funding-badge">✨ Good Fit</div>
                <h5>Youth Impact Accelerator</h5>
                <p><strong>$25K + Mentorship</strong> • Rolling applications</p>
                <p>Focuses on under-25 innovators. Includes 6-month program.</p>
            </div>
            
            <div class="funding-option">
                <div class="funding-badge">💡 Consider</div>
                <h5>Tech for Good Fellowship</h5>
                <p><strong>$15K + Network</strong> • Deadline: April 15</p>
                <p>Competitive but great for building connections.</p>
            </div>
            
            <h4>📋 Next Steps</h4>
            <ul>
                <li>Prepare your pitch deck (AI template available)</li>
                <li>Connect with previous grant winners</li>
                <li>Schedule mock interviews with mentors</li>
            </ul>
        </div>
    `;
}

function generateLearningContent() {
    return `
        <div class="learning-pathways">
            <h4>🚀 Personalized Learning Paths</h4>
            <p>Based on your interests and goals, here are the best learning paths for you:</p>
            
            <div class="learning-path">
                <div class="path-icon">💻</div>
                <div class="path-content">
                    <h5>Full-Stack Development</h5>
                    <p>Master web development from frontend to backend</p>
                    <div class="path-details">
                        <span class="duration"><i class="fas fa-clock"></i> 12 weeks</span>
                        <span class="level"><i class="fas fa-signal"></i> Beginner to Advanced</span>
                        <span class="projects"><i class="fas fa-project-diagram"></i> 8 projects</span>
                    </div>
                    <div class="path-skills">
                        <span class="skill-tag">HTML/CSS</span>
                        <span class="skill-tag">JavaScript</span>
                        <span class="skill-tag">React</span>
                        <span class="skill-tag">Node.js</span>
                    </div>
                </div>
            </div>

            <div class="learning-path">
                <div class="path-icon">🤖</div>
                <div class="path-content">
                    <h5>AI & Machine Learning</h5>
                    <p>Build intelligent systems and AI applications</p>
                    <div class="path-details">
                        <span class="duration"><i class="fas fa-clock"></i> 16 weeks</span>
                        <span class="level"><i class="fas fa-signal"></i> Intermediate</span>
                        <span class="projects"><i class="fas fa-project-diagram"></i> 6 AI projects</span>
                    </div>
                    <div class="path-skills">
                        <span class="skill-tag">Python</span>
                        <span class="skill-tag">TensorFlow</span>
                        <span class="skill-tag">Neural Networks</span>
                        <span class="skill-tag">Data Science</span>
                    </div>
                </div>
            </div>

            <div class="learning-path">
                <div class="path-icon">🎨</div>
                <div class="path-content">
                    <h5>Product Design & UX</h5>
                    <p>Create user-centered designs and beautiful interfaces</p>
                    <div class="path-details">
                        <span class="duration"><i class="fas fa-clock"></i> 10 weeks</span>
                        <span class="level"><i class="fas fa-signal"></i> Beginner</span>
                        <span class="projects"><i class="fas fa-project-diagram"></i> 5 design projects</span>
                    </div>
                    <div class="path-skills">
                        <span class="skill-tag">Figma</span>
                        <span class="skill-tag">User Research</span>
                        <span class="skill-tag">Prototyping</span>
                        <span class="skill-tag">Design Systems</span>
                    </div>
                </div>
            </div>

            <div class="learning-path">
                <div class="path-icon">🌍</div>
                <div class="path-content">
                    <h5>Social Impact Innovation</h5>
                    <p>Learn to create solutions for global challenges</p>
                    <div class="path-details">
                        <span class="duration"><i class="fas fa-clock"></i> 8 weeks</span>
                        <span class="level"><i class="fas fa-signal"></i> All levels</span>
                        <span class="projects"><i class="fas fa-project-diagram"></i> 1 impact project</span>
                    </div>
                    <div class="path-skills">
                        <span class="skill-tag">Systems Thinking</span>
                        <span class="skill-tag">Impact Measurement</span>
                        <span class="skill-tag">Design Thinking</span>
                        <span class="skill-tag">Sustainability</span>
                    </div>
                </div>
            </div>

            <div class="learning-features">
                <h4>✨ What You'll Get</h4>
                <div class="features-grid">
                    <div class="feature-item">
                        <i class="fas fa-brain"></i>
                        <span>AI-Powered Learning</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-users"></i>
                        <span>Peer Collaboration</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-trophy"></i>
                        <span>Real Project Portfolio</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-medal"></i>
                        <span>Industry Certification</span>
                    </div>
                </div>
            </div>
            
            <div class="urgency-message">
                <i class="fas fa-fire"></i>
                <strong>Limited Time:</strong> Join our next cohort starting March 15th!
            </div>
        </div>
    `;
}

function generateMentorshipContent() {
    return `
        <div class="mentorship-program">
            <h4>🧠 AI-Powered Mentorship</h4>
            <p>Get personalized guidance from our advanced AI mentor and connect with industry experts.</p>
            
            <div class="mentorship-options">
                <div class="mentor-option ai-mentor">
                    <div class="mentor-avatar">🤖</div>
                    <div class="mentor-content">
                        <h5>AI Mentor - NOVA</h5>
                        <p>24/7 intelligent guidance tailored to your goals</p>
                        <div class="mentor-features">
                            <span class="feature"><i class="fas fa-clock"></i> Available 24/7</span>
                            <span class="feature"><i class="fas fa-brain"></i> Learns your style</span>
                            <span class="feature"><i class="fas fa-chart-line"></i> Tracks your progress</span>
                        </div>
                        <div class="mentor-specialties">
                            <span class="specialty">Career Planning</span>
                            <span class="specialty">Project Guidance</span>
                            <span class="specialty">Skill Development</span>
                        </div>
                    </div>
                </div>

                <div class="mentor-option human-mentor">
                    <div class="mentor-avatar">👨‍💼</div>
                    <div class="mentor-content">
                        <h5>Human Mentors</h5>
                        <p>Connect with industry leaders and experienced professionals</p>
                        <div class="mentor-features">
                            <span class="feature"><i class="fas fa-handshake"></i> 1-on-1 sessions</span>
                            <span class="feature"><i class="fas fa-network-wired"></i> Industry connections</span>
                            <span class="feature"><i class="fas fa-briefcase"></i> Career opportunities</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mentor-showcase">
                <h4>🌟 Featured Mentors</h4>
                <div class="featured-mentors">
                    <div class="mentor-card">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face" alt="Mentor">
                        <div class="mentor-info">
                            <strong>David Chen</strong>
                            <p>Senior Engineer at Tesla</p>
                            <span class="mentor-expertise">AI, Clean Energy</span>
                        </div>
                    </div>
                    
                    <div class="mentor-card">
                        <img src="https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=60&h=60&fit=crop&crop=face" alt="Mentor">
                        <div class="mentor-info">
                            <strong>Sarah Williams</strong>
                            <p>Product Manager at Microsoft</p>
                            <span class="mentor-expertise">Product Strategy, UX</span>
                        </div>
                    </div>
                    
                    <div class="mentor-card">
                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face" alt="Mentor">
                        <div class="mentor-info">
                            <strong>Alex Rodriguez</strong>
                            <p>Startup Founder & Investor</p>
                            <span class="mentor-expertise">Entrepreneurship, Funding</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mentorship-benefits">
                <h4>🎯 Why Join Our Mentorship Program?</h4>
                <div class="benefits-list">
                    <div class="benefit-item">
                        <i class="fas fa-rocket"></i>
                        <div>
                            <strong>Accelerate Your Growth</strong>
                            <p>Learn from experts who've been where you want to go</p>
                        </div>
                    </div>
                    <div class="benefit-item">
                        <i class="fas fa-lightbulb"></i>
                        <div>
                            <strong>Get Personalized Advice</strong>
                            <p>Receive guidance tailored to your specific challenges</p>
                        </div>
                    </div>
                    <div class="benefit-item">
                        <i class="fas fa-network-wired"></i>
                        <div>
                            <strong>Build Your Network</strong>
                            <p>Connect with industry leaders and fellow innovators</p>
                        </div>
                    </div>
                    <div class="benefit-item">
                        <i class="fas fa-target"></i>
                        <div>
                            <strong>Stay Accountable</strong>
                            <p>Get the support you need to achieve your goals</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="program-stats">
                <div class="stat-item">
                    <div class="stat-number">95%</div>
                    <div class="stat-label">Success Rate</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">2,500+</div>
                    <div class="stat-label">Mentees</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">150+</div>
                    <div class="stat-label">Expert Mentors</div>
                </div>
            </div>
        </div>
    `;
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#00aa44' : '#ff4444'};
        color: white;
        border-radius: 8px;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
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
    }, 4000);
}

// Add CSS for modal and animations
const modalStyles = `
    .modal-content {
        background: linear-gradient(135deg, #2d2d2d, #1a1a1a);
        border: 2px solid #FFD700;
        border-radius: 12px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-bottom: 1px solid #FFD700;
    }
    
    .modal-header h3 {
        color: #FFD700;
        margin: 0;
    }
    
    .modal-close {
        background: none;
        border: none;
        color: #FFD700;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 4px;
        transition: background 0.3s ease;
    }
    
    .modal-close:hover {
        background: rgba(255, 215, 0, 0.1);
    }
    
    .modal-body {
        padding: 1.5rem;
        color: white;
    }
    
    .modal-footer {
        display: flex;
        gap: 1rem;
        padding: 1.5rem;
        justify-content: flex-end;
        border-top: 1px solid #2d2d2d;
    }
    
    .modal-btn {
        padding: 0.8rem 1.5rem;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    
    .modal-btn.primary {
        background: linear-gradient(45deg, #FFD700, #FFA500);
        color: #1a1a1a;
    }
    
    .modal-btn.secondary {
        background: transparent;
        border: 2px solid #FFD700;
        color: #FFD700;
    }
    
    .modal-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
    }
    
    .progress-bar {
        background: #2d2d2d;
        height: 8px;
        border-radius: 4px;
        overflow: hidden;
        margin: 1rem 0;
    }
    
    .progress-fill {
        height: 100%;
        transition: width 0.3s ease;
    }
    
    .team-member {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: rgba(26, 26, 26, 0.5);
        border-radius: 8px;
        margin: 1rem 0;
    }
    
    .team-member img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
    }
    
    .skill-tags {
        background: rgba(255, 215, 0, 0.2);
        color: #FFD700;
        padding: 0.2rem 0.5rem;
        border-radius: 12px;
        font-size: 0.8rem;
    }
    
    .impact-metrics {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 1rem;
        margin: 1rem 0;
    }
    
    .metric {
        text-align: center;
        padding: 1rem;
        background: rgba(26, 26, 26, 0.5);
        border-radius: 8px;
    }
    
    .metric-value {
        font-size: 2rem;
        font-weight: bold;
        color: #FFD700;
    }
    
    .metric-label {
        font-size: 0.9rem;
        color: #ccc;
    }
    
    .funding-option {
        background: rgba(26, 26, 26, 0.5);
        padding: 1.5rem;
        border-radius: 8px;
        margin: 1rem 0;
        position: relative;
    }
    
    .funding-badge {
        position: absolute;
        top: -8px;
        right: 1rem;
        background: #FFD700;
        color: #1a1a1a;
        padding: 0.3rem 0.8rem;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 600;
    }
    
    .funding-badge.hot {
        background: linear-gradient(45deg, #ff4444, #ff6666);
        color: white;
    }

    .learning-pathways {
        max-width: 100%;
    }
    
    .learning-path {
        display: flex;
        align-items: flex-start;
        gap: 1.5rem;
        background: rgba(26, 26, 26, 0.5);
        padding: 1.5rem;
        border-radius: 12px;
        margin: 1.5rem 0;
        border: 1px solid rgba(255, 215, 0, 0.2);
        transition: all 0.3s ease;
    }
    
    .learning-path:hover {
        border-color: #FFD700;
        box-shadow: 0 4px 20px rgba(255, 215, 0, 0.2);
    }
    
    .path-icon {
        font-size: 3rem;
        min-width: 4rem;
        text-align: center;
    }
    
    .path-content h5 {
        color: #FFD700;
        margin: 0 0 0.5rem 0;
        font-size: 1.3rem;
    }
    
    .path-details {
        display: flex;
        gap: 1.5rem;
        margin: 1rem 0;
        flex-wrap: wrap;
    }
    
    .path-details span {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #ccc;
        font-size: 0.9rem;
    }
    
    .path-skills {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        margin-top: 1rem;
    }
    
    .learning-features {
        margin-top: 2rem;
    }
    
    .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin: 1rem 0;
    }
    
    .feature-item {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        padding: 1rem;
        background: rgba(255, 215, 0, 0.1);
        border-radius: 8px;
        color: #FFD700;
    }
    
    .urgency-message {
        background: linear-gradient(45deg, #ff4444, #ff6666);
        color: white;
        padding: 1rem;
        border-radius: 8px;
        text-align: center;
        margin: 1.5rem 0;
        font-weight: 600;
    }
    
    .mentorship-program {
        max-width: 100%;
    }
    
    .mentorship-options {
        display: grid;
        gap: 1.5rem;
        margin: 1.5rem 0;
    }
    
    .mentor-option {
        display: flex;
        gap: 1.5rem;
        background: rgba(26, 26, 26, 0.5);
        padding: 1.5rem;
        border-radius: 12px;
        border: 1px solid rgba(255, 215, 0, 0.2);
    }
    
    .mentor-avatar {
        font-size: 3rem;
        min-width: 4rem;
        text-align: center;
    }
    
    .mentor-content h5 {
        color: #FFD700;
        margin: 0 0 0.5rem 0;
        font-size: 1.3rem;
    }
    
    .mentor-features {
        display: flex;
        gap: 1rem;
        margin: 1rem 0;
        flex-wrap: wrap;
    }
    
    .mentor-features .feature {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #ccc;
        font-size: 0.9rem;
    }
    
    .mentor-specialties {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }
    
    .specialty {
        background: rgba(255, 215, 0, 0.2);
        color: #FFD700;
        padding: 0.3rem 0.8rem;
        border-radius: 12px;
        font-size: 0.8rem;
    }
    
    .featured-mentors {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
        margin: 1rem 0;
    }
    
    .mentor-card {
        display: flex;
        align-items: center;
        gap: 1rem;
        background: rgba(26, 26, 26, 0.5);
        padding: 1rem;
        border-radius: 8px;
    }
    
    .mentor-card img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
    }
    
    .mentor-info strong {
        color: #FFD700;
        display: block;
    }
    
    .mentor-expertise {
        background: rgba(255, 215, 0, 0.2);
        color: #FFD700;
        padding: 0.2rem 0.6rem;
        border-radius: 10px;
        font-size: 0.8rem;
        display: inline-block;
        margin-top: 0.5rem;
    }
    
    .mentorship-benefits {
        margin: 2rem 0;
    }
    
    .benefits-list {
        display: grid;
        gap: 1rem;
    }
    
    .benefit-item {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        padding: 1rem;
        background: rgba(26, 26, 26, 0.3);
        border-radius: 8px;
    }
    
    .benefit-item i {
        color: #FFD700;
        font-size: 1.5rem;
        margin-top: 0.2rem;
    }
    
    .benefit-item strong {
        color: #FFD700;
        display: block;
        margin-bottom: 0.3rem;
    }
    
    .program-stats {
        display: flex;
        justify-content: space-around;
        margin: 2rem 0;
        padding: 1.5rem;
        background: rgba(255, 215, 0, 0.1);
        border-radius: 12px;
    }
    
    .stat-item {
        text-align: center;
    }
    
    .stat-number {
        font-size: 2.5rem;
        font-weight: bold;
        color: #FFD700;
        display: block;
    }
    
    .stat-label {
        color: #ccc;
        font-size: 0.9rem;
    }
    
    @media (max-width: 768px) {
        .learning-path, .mentor-option {
            flex-direction: column;
            text-align: center;
        }
        
        .path-details {
            justify-content: center;
        }
        
        .features-grid {
            grid-template-columns: 1fr;
        }
        
        .program-stats {
            flex-direction: column;
            gap: 1rem;
        }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);