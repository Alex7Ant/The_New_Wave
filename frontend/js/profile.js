class ProfileManager {
    constructor() {
        this.currentTab = 'overview';
        this.init();
    }

    init() {
        this.setupTabNavigation();
        this.setupProfileEditFeatures();
        this.setupInteractiveFunctionality();
        this.loadUserData();
    }

    setupTabNavigation() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.dataset.tab;
                this.switchTab(targetTab);
            });
        });
    }

    switchTab(tabName) {
        // Remove active class from all tabs and contents
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Add active class to selected tab and content
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');

        this.currentTab = tabName;

        // Load specific tab data if needed
        this.loadTabData(tabName);
    }

    loadTabData(tabName) {
        switch(tabName) {
            case 'overview':
                this.updateActivityFeed();
                break;
            case 'projects':
                this.loadProjectsData();
                break;
            case 'achievements':
                this.updateAchievements();
                break;
            case 'learning':
                this.updateLearningProgress();
                break;
            case 'settings':
                this.loadSettings();
                break;
        }
    }

    setupProfileEditFeatures() {
        const editBtn = document.querySelector('.edit-profile-btn');
        const avatarContainer = document.querySelector('.profile-avatar-container');

        editBtn?.addEventListener('click', () => {
            this.showEditProfileModal();
        });

        avatarContainer?.addEventListener('click', () => {
            this.changeProfilePicture();
        });
    }

    setupInteractiveFunctionality() {
        // Project actions
        document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleButtonClick(e);
            });
        });

        // Achievement interaction
        document.querySelectorAll('.badge').forEach(badge => {
            badge.addEventListener('click', (e) => {
                this.showBadgeDetails(e.target.closest('.badge'));
            });
        });

        // Settings toggles
        document.querySelectorAll('.toggle-switch input').forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                this.updatePreference(e.target.id, e.target.checked);
            });
        });

        // Create project button
        document.querySelector('.create-project-btn')?.addEventListener('click', () => {
            window.location.href = 'project-startup.html';
        });
    }

    loadUserData() {
        // Simulate loading user data from API
        const userData = this.getUserData();
        this.updateProfileDisplay(userData);
        this.animateProgressBars();
    }

    getUserData() {
        // Simulated user data - in real app, this would come from API
        return {
            name: "Alex Johnson",
            title: "Young Innovator & AI Enthusiast",
            location: "San Francisco, CA",
            joinDate: "March 2024",
            avatar: "https://via.placeholder.com/150x150",
            stats: {
                projects: 12,
                impactPoints: 1200,
                collaborations: 8,
                certifications: 5
            },
            scores: {
                innovation: 85,
                collaboration: 92,
                impactLevel: 4
            },
            goals: [
                { title: "Complete AI Fundamentals Course", progress: 75 },
                { title: "Launch Climate Tech Project", progress: 40 },
                { title: "Build Team of 5 Members", progress: 60 }
            ],
            recentActivity: [
                {
                    icon: "fas fa-star",
                    text: "Completed AI Project Analyzer certification",
                    time: "2 hours ago"
                },
                {
                    icon: "fas fa-users",
                    text: "Joined \"Climate Tech Innovation\" team",
                    time: "1 day ago"
                },
                {
                    icon: "fas fa-rocket",
                    text: "Launched \"Smart Water Management\" project",
                    time: "3 days ago"
                },
                {
                    icon: "fas fa-award",
                    text: "Earned \"Impact Innovator\" badge",
                    time: "1 week ago"
                }
            ]
        };
    }

    updateProfileDisplay(userData) {
        document.getElementById('profile-name').textContent = userData.name;
        document.querySelector('.profile-title').textContent = userData.title;
        document.querySelector('.profile-location span').textContent = userData.location;
        document.querySelector('.profile-joined span').textContent = `Joined ${userData.joinDate}`;

        // Update stats
        const statNumbers = document.querySelectorAll('.profile-stats .stat-number');
        statNumbers[0].textContent = userData.stats.projects;
        statNumbers[1].textContent = `${userData.stats.impactPoints / 1000}k`;
        statNumbers[2].textContent = userData.stats.collaborations;
        statNumbers[3].textContent = userData.stats.certifications;
    }

    updateActivityFeed() {
        const userData = this.getUserData();
        const activityFeed = document.querySelector('.activity-feed');
        
        if (!activityFeed) return;

        activityFeed.innerHTML = userData.recentActivity.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <p><strong>${activity.text}</strong></p>
                    <span class="activity-time">${activity.time}</span>
                </div>
            </div>
        `).join('');
    }

    animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        progressBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }, index * 200);
        });
    }

    loadProjectsData() {
        // Animate project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    card.style.transition = 'all 0.3s ease';
                }, 50);
            }, index * 100);
        });
    }

    updateAchievements() {
        // Animate badges
        const badges = document.querySelectorAll('.badge.earned');
        badges.forEach((badge, index) => {
            setTimeout(() => {
                badge.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    badge.style.transform = 'scale(1)';
                    badge.style.transition = 'transform 0.2s ease';
                }, 50);
            }, index * 100);
        });
    }

    updateLearningProgress() {
        const modules = document.querySelectorAll('.module');
        modules.forEach((module, index) => {
            setTimeout(() => {
                module.style.opacity = '0';
                module.style.transform = 'translateX(-20px)';
                setTimeout(() => {
                    module.style.opacity = '1';
                    module.style.transform = 'translateX(0)';
                    module.style.transition = 'all 0.3s ease';
                }, 50);
            }, index * 150);
        });
    }

    loadSettings() {
        // Initialize form with current settings
        this.initializeSettingsForm();
    }

    showEditProfileModal() {
        const modal = this.createEditModal();
        document.body.appendChild(modal);
        modal.style.display = 'flex';
    }

    createEditModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content profile-edit-modal">
                <div class="modal-header">
                    <h3><i class="fas fa-edit"></i> Edit Profile</h3>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="edit-profile-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="edit-name">Full Name</label>
                                <input type="text" id="edit-name" value="Alex Johnson" required>
                            </div>
                            <div class="form-group">
                                <label for="edit-title">Title</label>
                                <input type="text" id="edit-title" value="Young Innovator & AI Enthusiast">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="edit-bio">Bio</label>
                            <textarea id="edit-bio" rows="3" placeholder="Tell us about yourself...">Passionate young innovator focused on AI solutions for climate change and social impact.</textarea>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="edit-location">Location</label>
                                <input type="text" id="edit-location" value="San Francisco, CA">
                            </div>
                            <div class="form-group">
                                <label for="edit-skills">Skills</label>
                                <input type="text" id="edit-skills" placeholder="AI, Machine Learning, Python...">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                    <button class="btn-primary" onclick="profileManager.saveProfileChanges(); this.closest('.modal-overlay').remove();">Save Changes</button>
                </div>
            </div>
        `;
        return modal;
    }

    saveProfileChanges() {
        // Simulate saving changes
        const name = document.getElementById('edit-name').value;
        const title = document.getElementById('edit-title').value;
        const location = document.getElementById('edit-location').value;

        // Update the profile display
        document.getElementById('profile-name').textContent = name;
        document.querySelector('.profile-title').textContent = title;
        document.querySelector('.profile-location span').textContent = location;

        // Show success message
        this.showNotification('Profile updated successfully!', 'success');
    }

    changeProfilePicture() {
        // Simulate file upload
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    document.getElementById('profile-image').src = e.target.result;
                    this.showNotification('Profile picture updated!', 'success');
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    }

    handleButtonClick(e) {
        const button = e.target;
        const buttonText = button.textContent.trim();

        switch(buttonText) {
            case 'View Details':
                this.viewProjectDetails(button);
                break;
            case 'Edit':
                this.editProject(button);
                break;
            case 'Share':
                this.shareProject(button);
                break;
            case 'Continue Planning':
                this.continuePlanning(button);
                break;
            case 'Find Team':
                window.location.href = 'team-builder.html';
                break;
            default:
                this.showNotification(`${buttonText} clicked!`, 'info');
        }
    }

    viewProjectDetails(button) {
        const projectCard = button.closest('.project-card');
        const projectTitle = projectCard.querySelector('h4').textContent;
        this.showProjectModal(projectTitle);
    }

    showProjectModal(title) {
        const modal = this.createProjectModal(title);
        document.body.appendChild(modal);
        modal.style.display = 'flex';
    }

    createProjectModal(title) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content project-detail-modal">
                <div class="modal-header">
                    <h3><i class="fas fa-project-diagram"></i> ${title}</h3>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="project-details">
                        <div class="detail-section">
                            <h4>Project Overview</h4>
                            <p>This project focuses on developing innovative solutions for sustainable technology advancement.</p>
                        </div>
                        <div class="detail-section">
                            <h4>Team Members</h4>
                            <div class="team-list">
                                <div class="team-member">
                                    <img src="https://via.placeholder.com/40x40" alt="Member">
                                    <div class="member-info">
                                        <span class="name">Sarah Chen</span>
                                        <span class="role">UI/UX Designer</span>
                                    </div>
                                </div>
                                <div class="team-member">
                                    <img src="https://via.placeholder.com/40x40" alt="Member">
                                    <div class="member-info">
                                        <span class="name">Mike Rodriguez</span>
                                        <span class="role">Data Scientist</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="detail-section">
                            <h4>Progress</h4>
                            <div class="progress-details">
                                <div class="milestone completed">✓ Research & Planning</div>
                                <div class="milestone completed">✓ Team Formation</div>
                                <div class="milestone in-progress">⏳ Development Phase</div>
                                <div class="milestone upcoming">🔒 Testing & Launch</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">Close</button>
                    <button class="btn-primary">Edit Project</button>
                </div>
            </div>
        `;
        return modal;
    }

    showBadgeDetails(badge) {
        if (badge.classList.contains('locked')) {
            this.showNotification('This badge is locked. Complete more achievements to unlock!', 'info');
            return;
        }

        const badgeName = badge.querySelector('.badge-name').textContent;
        this.showNotification(`Badge: ${badgeName} - Great achievement!`, 'success');
    }

    updatePreference(prefId, value) {
        console.log(`Preference ${prefId} updated to:`, value);
        this.showNotification('Preference updated successfully!', 'success');
    }

    initializeSettingsForm() {
        const form = document.querySelector('.settings-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveSettings();
            });
        }
    }

    saveSettings() {
        this.showNotification('Settings saved successfully!', 'success');
    }

    showNotification(message, type = 'info') {
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

    editProject(button) {
        this.showNotification('Project editing functionality coming soon!', 'info');
    }

    shareProject(button) {
        this.showNotification('Project shared successfully!', 'success');
    }

    continuePlanning(button) {
        window.location.href = 'project-startup.html';
    }
}

// Initialize profile manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.profileManager = new ProfileManager();
});

// Mobile menu toggle function
function toggleMobileMenu() {
    const nav = document.querySelector('.nav-class');
    nav.classList.toggle('mobile-open');
}

// Additional utility functions
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

function timeAgo(date) {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
}