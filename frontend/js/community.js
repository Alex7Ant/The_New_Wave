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

// Community page functionality
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
    
    initializeCommunity();
    setupRealTimeUpdates();
    setupInteractionFeatures();
});

function initializeCommunity() {
    // Animate discussion cards on load
    const discussionCards = document.querySelectorAll('.discussion-card');
    discussionCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });

    // Add click handlers for discussion cards
    discussionCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            const author = this.querySelector('h4').textContent;
            openDiscussionModal(title, author, this);
        });
        
        card.style.cursor = 'pointer';
    });

    // Initialize connect buttons
    const connectButtons = document.querySelectorAll('.connect-btn, .mini-connect-btn');
    connectButtons.forEach(button => {
        button.addEventListener('click', handleConnect);
    });

    // Initialize event registration
    const eventButtons = document.querySelectorAll('.event-btn');
    eventButtons.forEach(button => {
        button.addEventListener('click', handleEventRegistration);
    });

    // Initialize feature buttons
    const featureButtons = document.querySelectorAll('.feature-btn');
    featureButtons.forEach(button => {
        button.addEventListener('click', handleFeatureAccess);
    });
}

function setupRealTimeUpdates() {
    // Simulate real-time updates to discussion engagement
    setInterval(() => {
        updateDiscussionStats();
    }, 30000); // Update every 30 seconds

    // Simulate new community members joining
    setInterval(() => {
        updateCommunityStats();
    }, 45000); // Update every 45 seconds
}

function updateDiscussionStats() {
    const replyCounters = document.querySelectorAll('.discussion-meta span:last-child');
    
    replyCounters.forEach(counter => {
        const currentCount = parseInt(counter.textContent.match(/\d+/)[0]);
        const increment = Math.floor(Math.random() * 3) + 1;
        const newCount = currentCount + increment;
        
        counter.innerHTML = `<i class="fas fa-comments"></i> ${newCount} replies`;
        
        // Add pulse animation
        counter.style.animation = 'pulse 1s ease';
        setTimeout(() => counter.style.animation = '', 1000);
    });
}

function updateCommunityStats() {
    const memberCount = document.querySelector('.hero-banner p');
    if (memberCount && memberCount.textContent.includes('47,000+')) {
        const newCount = Math.floor(Math.random() * 100) + 47000;
        const formattedCount = (newCount / 1000).toFixed(1) + 'K+';
        memberCount.textContent = memberCount.textContent.replace('47,000+', formattedCount);
        
        showNotification('🎉 New innovators joined the community!', 'info');
    }
}

function setupInteractionFeatures() {
    // Add like functionality to discussions
    const discussionCards = document.querySelectorAll('.discussion-card');
    discussionCards.forEach(card => {
        const likeButton = document.createElement('button');
        likeButton.className = 'like-btn';
        likeButton.innerHTML = '<i class="fas fa-heart"></i> <span>12</span>';
        likeButton.style.cssText = `
            background: none;
            border: none;
            color: #ccc;
            cursor: pointer;
            padding: 0.5rem;
            transition: all 0.3s ease;
            font-size: 0.9rem;
        `;
        
        likeButton.addEventListener('click', function(e) {
            e.stopPropagation();
            const heartIcon = this.querySelector('i');
            const countSpan = this.querySelector('span');
            const currentCount = parseInt(countSpan.textContent);
            
            if (this.classList.contains('liked')) {
                // Unlike
                this.classList.remove('liked');
                heartIcon.style.color = '#ccc';
                this.style.color = '#ccc';
                countSpan.textContent = currentCount - 1;
            } else {
                // Like
                this.classList.add('liked');
                heartIcon.style.color = '#ff4444';
                this.style.color = '#ff4444';
                countSpan.textContent = currentCount + 1;
                
                // Add heart animation
                heartIcon.style.animation = 'heartBeat 0.6s ease';
                setTimeout(() => heartIcon.style.animation = '', 600);
            }
        });
        
        const discussionMeta = card.querySelector('.discussion-meta');
        discussionMeta.appendChild(likeButton);
    });
}

function handleConnect(event) {
    event.stopPropagation();
    
    const button = event.target;
    const originalText = button.textContent;
    
    // Show loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    button.disabled = true;
    
    setTimeout(() => {
        if (button.classList.contains('mini-connect-btn')) {
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.style.background = '#00aa44';
        } else {
            button.innerHTML = '<i class="fas fa-check"></i> Connected';
            button.style.background = 'linear-gradient(45deg, #00aa44, #00cc44)';
        }
        
        showNotification('🤝 Connection request sent! They\'ll be notified.', 'success');
        
        // Add to user's network count
        incrementNetworkCount();
        
    }, 1500);
}

function handleEventRegistration(event) {
    event.stopPropagation();
    
    const button = event.target;
    const eventCard = button.closest('.event-card');
    const eventTitle = eventCard.querySelector('h3').textContent;
    
    // Show loading state
    const originalText = button.textContent;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Registered';
        button.style.background = 'linear-gradient(45deg, #00aa44, #00cc44)';
        
        showNotification(`🎉 You're registered for "${eventTitle}"! Calendar invite sent.`, 'success');
        
        // Update participant count
        const participantInfo = eventCard.querySelector('p');
        const currentCount = parseInt(participantInfo.textContent.match(/\d+/)[0]);
        const newCount = currentCount + 1;
        participantInfo.textContent = participantInfo.textContent.replace(/\d+\+/, newCount + '+');
        
    }, 2000);
}

function handleFeatureAccess(event) {
    const button = event.target;
    const featureTitle = button.closest('.feature-card').querySelector('h3').textContent;
    
    const originalText = button.textContent;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    button.disabled = true;
    
    setTimeout(() => {
        switch(featureTitle) {
            case 'Innovation Circles':
                showCirclesModal();
                break;
            case 'Global Events':
                showEventsModal();
                break;
            case 'Mentor Network':
                showMentorModal();
                break;
            case 'Achievement Hub':
                showAchievementsModal();
                break;
        }
        
        button.textContent = originalText;
        button.disabled = false;
    }, 1500);
}

function openDiscussionModal(title, author, cardElement) {
    const modal = document.createElement('div');
    modal.className = 'discussion-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="discussion-full">
                    <div class="author-info">
                        <img src="${cardElement.querySelector('img').src}" alt="${author}">
                        <div>
                            <h4>${author}</h4>
                            <span class="author-badge">${cardElement.querySelector('.user-badge').textContent}</span>
                        </div>
                        <button class="follow-btn">Follow</button>
                    </div>
                    
                    <div class="discussion-content">
                        <p>${cardElement.querySelector('p').textContent}</p>
                        <p>This is where the full discussion content would appear. In a real implementation, this would be loaded from the backend with the complete post content, including any images, code snippets, or other rich media.</p>
                        
                        <div class="discussion-actions">
                            <button class="action-btn like"><i class="fas fa-heart"></i> Like (23)</button>
                            <button class="action-btn comment"><i class="fas fa-comment"></i> Comment</button>
                            <button class="action-btn share"><i class="fas fa-share"></i> Share</button>
                            <button class="action-btn bookmark"><i class="fas fa-bookmark"></i> Save</button>
                        </div>
                    </div>
                    
                    <div class="comments-section">
                        <h4>Comments (${Math.floor(Math.random() * 50) + 10})</h4>
                        <div class="comment-input">
                            <textarea placeholder="Share your thoughts..."></textarea>
                            <button class="post-comment-btn">Post Comment</button>
                        </div>
                        
                        <div class="comments-list">
                            ${generateSampleComments()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    addModal(modal);
}

function showCirclesModal() {
    const modal = document.createElement('div');
    modal.className = 'circles-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-users-cog"></i> Innovation Circles</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="circles-grid">
                    <div class="circle-card">
                        <div class="circle-icon climate">🌱</div>
                        <h4>Climate Tech Pioneers</h4>
                        <p>2,341 members • Very Active</p>
                        <div class="circle-topics">Carbon Capture, Renewable Energy, Climate Data</div>
                        <button class="join-circle-btn">Join Circle</button>
                    </div>
                    
                    <div class="circle-card">
                        <div class="circle-icon ai">🤖</div>
                        <h4>AI for Good</h4>
                        <p>1,876 members • Active</p>
                        <div class="circle-topics">Machine Learning, AI Ethics, Social Impact</div>
                        <button class="join-circle-btn">Join Circle</button>
                    </div>
                    
                    <div class="circle-card">
                        <div class="circle-icon health">💚</div>
                        <h4>HealthTech Builders</h4>
                        <p>1,423 members • Active</p>
                        <div class="circle-topics">Digital Health, Mental Health, Med Devices</div>
                        <button class="join-circle-btn">Join Circle</button>
                    </div>
                    
                    <div class="circle-card">
                        <div class="circle-icon education">🎓</div>
                        <h4>Education Innovators</h4>
                        <p>981 members • Growing</p>
                        <div class="circle-topics">EdTech, Learning Science, Accessibility</div>
                        <button class="join-circle-btn">Join Circle</button>
                    </div>
                </div>
                
                <div class="create-circle">
                    <h4>Can't find your interest?</h4>
                    <button class="create-circle-btn">Create New Circle</button>
                </div>
            </div>
        </div>
    `;
    
    addModal(modal);
}

function generateSampleComments() {
    const comments = [
        {
            author: 'David Kim',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
            text: 'This is such an important discussion! I\'ve been working on something similar and would love to collaborate.',
            time: '2h ago'
        },
        {
            author: 'Emma Johnson',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face',
            text: 'Have you considered using blockchain for transparency? I could help with that aspect.',
            time: '1h ago'
        },
        {
            author: 'Zara Ahmed',
            avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=40&h=40&fit=crop&crop=face',
            text: 'Great insights! This could really help communities in developing countries.',
            time: '45m ago'
        }
    ];
    
    return comments.map(comment => `
        <div class="comment">
            <img src="${comment.avatar}" alt="${comment.author}">
            <div class="comment-content">
                <div class="comment-header">
                    <strong>${comment.author}</strong>
                    <span class="comment-time">${comment.time}</span>
                </div>
                <p>${comment.text}</p>
                <div class="comment-actions">
                    <button class="comment-like"><i class="fas fa-heart"></i> ${Math.floor(Math.random() * 20) + 1}</button>
                    <button class="comment-reply">Reply</button>
                </div>
            </div>
        </div>
    `).join('');
}

function addModal(modal) {
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
        overflow-y: auto;
        padding: 2rem;
    `;
    
    document.body.appendChild(modal);
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
    
    // Add interaction handlers
    modal.querySelectorAll('.join-circle-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-check"></i> Joined';
            this.style.background = 'linear-gradient(45deg, #00aa44, #00cc44)';
            showNotification('🎉 Welcome to the circle! Check your dashboard for updates.');
        });
    });
}

function incrementNetworkCount() {
    // This would typically update the user's profile
    const networkElements = document.querySelectorAll('[data-network-count]');
    networkElements.forEach(element => {
        const currentCount = parseInt(element.dataset.networkCount) || 0;
        element.dataset.networkCount = currentCount + 1;
    });
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#00aa44' : '#0066cc'};
        color: white;
        border-radius: 8px;
        z-index: 10001;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        max-width: 400px;
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
    }, 5000);
}

// Add CSS animations
const communityStyles = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes heartBeat {
        0% { transform: scale(1); }
        25% { transform: scale(1.2); }
        50% { transform: scale(1); }
        75% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .modal-content {
        background: linear-gradient(135deg, #2d2d2d, #1a1a1a);
        border: 2px solid #FFD700;
        border-radius: 12px;
        width: 100%;
        max-width: 800px;
        max-height: 90vh;
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
    
    .author-info {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2rem;
        padding: 1rem;
        background: rgba(26, 26, 26, 0.5);
        border-radius: 8px;
    }
    
    .author-info img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
    }
    
    .author-badge {
        background: #FFD700;
        color: #1a1a1a;
        padding: 0.2rem 0.6rem;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 600;
    }
    
    .follow-btn {
        background: transparent;
        border: 2px solid #FFD700;
        color: #FFD700;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        cursor: pointer;
        margin-left: auto;
        transition: all 0.3s ease;
    }
    
    .follow-btn:hover {
        background: #FFD700;
        color: #1a1a1a;
    }
    
    .discussion-actions {
        display: flex;
        gap: 1rem;
        margin: 2rem 0;
        padding: 1rem 0;
        border-top: 1px solid #2d2d2d;
    }
    
    .action-btn {
        background: none;
        border: 1px solid #2d2d2d;
        color: #ccc;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .action-btn:hover {
        border-color: #FFD700;
        color: #FFD700;
    }
    
    .comment-input {
        margin: 2rem 0;
    }
    
    .comment-input textarea {
        width: 100%;
        min-height: 80px;
        padding: 1rem;
        background: rgba(26, 26, 26, 0.8);
        border: 2px solid #2d2d2d;
        border-radius: 8px;
        color: white;
        resize: vertical;
        margin-bottom: 1rem;
    }
    
    .comment-input textarea:focus {
        outline: none;
        border-color: #FFD700;
    }
    
    .post-comment-btn {
        background: linear-gradient(45deg, #FFD700, #FFA500);
        color: #1a1a1a;
        border: none;
        padding: 0.8rem 1.5rem;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .post-comment-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
    }
    
    .comment {
        display: flex;
        gap: 1rem;
        margin: 1rem 0;
        padding: 1rem;
        background: rgba(26, 26, 26, 0.3);
        border-radius: 8px;
    }
    
    .comment img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }
    
    .comment-content {
        flex: 1;
    }
    
    .comment-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }
    
    .comment-time {
        color: #888;
        font-size: 0.8rem;
    }
    
    .comment-actions {
        display: flex;
        gap: 1rem;
        margin-top: 0.5rem;
    }
    
    .comment-like, .comment-reply {
        background: none;
        border: none;
        color: #888;
        cursor: pointer;
        font-size: 0.8rem;
        transition: color 0.3s ease;
    }
    
    .comment-like:hover, .comment-reply:hover {
        color: #FFD700;
    }
    
    .circles-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-bottom: 2rem;
    }
    
    .circle-card {
        background: rgba(26, 26, 26, 0.8);
        padding: 2rem;
        border-radius: 12px;
        text-align: center;
        border: 2px solid transparent;
        transition: all 0.3s ease;
    }
    
    .circle-card:hover {
        border-color: #FFD700;
        transform: translateY(-5px);
    }
    
    .circle-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }
    
    .circle-topics {
        background: rgba(255, 215, 0, 0.1);
        color: #FFD700;
        padding: 0.5rem;
        border-radius: 6px;
        font-size: 0.9rem;
        margin: 1rem 0;
    }
    
    .join-circle-btn {
        background: linear-gradient(45deg, #FFD700, #FFA500);
        color: #1a1a1a;
        border: none;
        padding: 0.8rem 1.5rem;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        width: 100%;
    }
    
    .join-circle-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
    }
    
    .create-circle {
        text-align: center;
        padding: 2rem;
        background: rgba(45, 45, 45, 0.5);
        border-radius: 12px;
        border: 2px dashed #FFD700;
    }
    
    .create-circle-btn {
        background: transparent;
        border: 2px solid #FFD700;
        color: #FFD700;
        padding: 1rem 2rem;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        margin-top: 1rem;
        transition: all 0.3s ease;
    }
    
    .create-circle-btn:hover {
        background: #FFD700;
        color: #1a1a1a;
    }
`;

// Inject community styles
const communityStyleSheet = document.createElement('style');
communityStyleSheet.textContent = communityStyles;
document.head.appendChild(communityStyleSheet);