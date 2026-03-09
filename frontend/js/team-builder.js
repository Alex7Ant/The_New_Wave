// Team Builder JavaScript Functionality

// Mobile menu toggle function
function toggleMobileMenu() {
    const classList = document.querySelector('.class-list');
    classList.classList.toggle('active');
}

// Team Builder class
class TeamBuilder {
    constructor() {
        this.selectedMembers = new Set();
        this.teamMatches = [];
        this.initializeForm();
    }

    initializeForm() {
        const form = document.getElementById('team-builder-form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmission(e));
        }

        // Add character counters for text areas
        this.addCharacterCounters();
        
        // Initialize skill selection
        this.initializeSkillSelection();
    }

    addCharacterCounters() {
        const textareas = document.querySelectorAll('textarea');
        textareas.forEach(textarea => {
            this.addCharacterCounter(textarea);
        });
    }

    addCharacterCounter(textarea) {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.fontSize = '12px';
        counter.style.color = '#666';
        counter.style.marginTop = '4px';
        
        const updateCounter = () => {
            const count = textarea.value.length;
            counter.textContent = `${count} characters`;
        };

        textarea.addEventListener('input', updateCounter);
        textarea.parentNode.appendChild(counter);
        updateCounter();
    }

    initializeSkillSelection() {
        const skillCheckboxes = document.querySelectorAll('input[name="skills"]');
        const selectedSkillsDisplay = document.createElement('div');
        selectedSkillsDisplay.className = 'selected-skills-display';
        selectedSkillsDisplay.style.marginTop = '10px';
        
        const skillsSelector = document.querySelector('.skills-selector');
        skillsSelector.appendChild(selectedSkillsDisplay);

        skillCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateSelectedSkills();
            });
        });

        this.updateSelectedSkills();
    }

    updateSelectedSkills() {
        const selectedSkills = Array.from(document.querySelectorAll('input[name="skills"]:checked'))
            .map(cb => cb.value.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()));
        
        const display = document.querySelector('.selected-skills-display');
        if (selectedSkills.length > 0) {
            display.innerHTML = `<strong>Selected Skills:</strong> ${selectedSkills.join(', ')}`;
        } else {
            display.innerHTML = '<em>No skills selected yet</em>';
        }
    }

    async handleFormSubmission(e) {
        e.preventDefault();
        
        // Validate skill selection
        const selectedSkills = document.querySelectorAll('input[name="skills"]:checked');
        if (selectedSkills.length === 0) {
            alert('Please select at least one required skill for your project.');
            return;
        }

        // Show loading state
        this.showLoadingState();

        // Collect form data
        const formData = this.collectFormData();
        
        // Simulate team matching (in real app, this would call an API)
        setTimeout(() => {
            this.performTeamMatching(formData);
        }, 3000);
    }

    collectFormData() {
        const form = document.getElementById('team-builder-form');
        const formData = new FormData(form);
        const data = {};

        for (let [key, value] of formData.entries()) {
            if (key === 'skills') {
                if (!data.skills) data.skills = [];
                data.skills.push(value);
            } else {
                data[key] = value;
            }
        }

        // Get checkbox values
        data['mentor-access'] = document.getElementById('mentor-access').checked;
        data['skill-development'] = document.getElementById('skill-development').checked;
        data['fast-matching'] = document.getElementById('fast-matching').checked;

        return data;
    }

    showLoadingState() {
        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Finding Your Team...';
        submitButton.disabled = true;
    }

    hideLoadingState() {
        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.innerHTML = '<i class="fas fa-users"></i> Find My Team';
        submitButton.disabled = false;
    }

    performTeamMatching(data) {
        this.teamMatches = this.generateTeamMatches(data);
        this.displayMatches();
        this.hideLoadingState();
    }

    generateTeamMatches(data) {
        // Generate realistic team member profiles based on form data
        const members = [];
        const skills = data.skills || [];
        
        // Sample names and profiles
        const sampleProfiles = [
            { name: "Alex Chen", location: "San Francisco, CA", timezone: "PST" },
            { name: "Maria Rodriguez", location: "Barcelona, Spain", timezone: "CET" },
            { name: "Jordan Kim", location: "Toronto, Canada", timezone: "EST" },
            { name: "Priya Patel", location: "Mumbai, India", timezone: "IST" },
            { name: "David Johnson", location: "London, UK", timezone: "GMT" },
            { name: "Sarah Williams", location: "Austin, TX", timezone: "CST" },
            { name: "Ahmed Hassan", location: "Cairo, Egypt", timezone: "EET" },
            { name: "Emily Zhang", location: "Sydney, Australia", timezone: "AEDT" },
            { name: "Lucas Silva", location: "São Paulo, Brazil", timezone: "BRT" },
            { name: "Nina Petrov", location: "Berlin, Germany", timezone: "CET" },
            { name: "Raj Sharma", location: "Bangalore, India", timezone: "IST" },
            { name: "Sophie Martin", location: "Paris, France", timezone: "CET" }
        ];

        // Skill descriptions mapping
        const skillDescriptions = {
            'frontend-development': ['React', 'Vue.js', 'Angular', 'TypeScript', 'CSS3'],
            'backend-development': ['Node.js', 'Python', 'Java', 'PostgreSQL', 'MongoDB'],
            'mobile-development': ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic'],
            'ui-design': ['Figma', 'Adobe XD', 'Sketch', 'Principle', 'InVision'],
            'ux-design': ['User Research', 'Prototyping', 'Usability Testing', 'Information Architecture'],
            'data-science': ['Python', 'R', 'Machine Learning', 'Statistics', 'Visualization'],
            'product-management': ['Agile', 'Scrum', 'Product Strategy', 'Analytics', 'Roadmapping'],
            'marketing': ['Digital Marketing', 'Content Strategy', 'SEO/SEM', 'Social Media', 'Analytics'],
            'business-development': ['Sales', 'Partnerships', 'Strategy', 'Networking', 'Presentations'],
            'cybersecurity': ['Penetration Testing', 'Risk Assessment', 'Compliance', 'Incident Response'],
            'machine-learning': ['TensorFlow', 'PyTorch', 'Deep Learning', 'NLP', 'Computer Vision'],
            'devops': ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Infrastructure as Code']
        };

        // Experience levels
        const experienceLevels = [
            'Junior (1-2 years)',
            'Mid-level (3-5 years)',
            'Senior (5-8 years)',
            'Expert (8+ years)'
        ];

        // Generate matches for each required skill
        skills.forEach((skill, index) => {
            if (members.length >= 12) return; // Limit to 12 matches
            
            const profile = sampleProfiles[index % sampleProfiles.length];
            const skillTechs = skillDescriptions[skill] || ['General Skills'];
            
            const member = {
                id: `member-${index + 1}`,
                name: profile.name,
                title: this.generateTitle(skill),
                location: profile.location,
                timezone: profile.timezone,
                primarySkill: skill.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
                skills: skillTechs.slice(0, 4),
                experience: experienceLevels[Math.floor(Math.random() * experienceLevels.length)],
                availability: this.generateAvailability(),
                compatibility: Math.floor(Math.random() * 20) + 80, // 80-100%
                hourlyRate: this.generateRate(data['budget-info']),
                bio: this.generateBio(skill),
                projectsCompleted: Math.floor(Math.random() * 15) + 3,
                rating: (Math.random() * 1 + 4).toFixed(1), // 4.0-5.0
                languages: this.generateLanguages(),
                workStyle: this.generateWorkStyle(),
                responseTime: this.generateResponseTime()
            };

            members.push(member);
        });

        // Add some additional diverse members
        for (let i = skills.length; i < Math.min(12, skills.length + 4); i++) {
            const profile = sampleProfiles[i % sampleProfiles.length];
            const randomSkill = skills[Math.floor(Math.random() * skills.length)];
            
            const member = {
                id: `member-${i + 1}`,
                name: profile.name,
                title: this.generateTitle(randomSkill),
                location: profile.location,
                timezone: profile.timezone,
                primarySkill: randomSkill.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
                skills: skillDescriptions[randomSkill]?.slice(0, 3) || ['General Skills'],
                experience: experienceLevels[Math.floor(Math.random() * experienceLevels.length)],
                availability: this.generateAvailability(),
                compatibility: Math.floor(Math.random() * 15) + 75, // 75-90%
                hourlyRate: this.generateRate(data['budget-info']),
                bio: this.generateBio(randomSkill),
                projectsCompleted: Math.floor(Math.random() * 10) + 5,
                rating: (Math.random() * 0.8 + 4.2).toFixed(1),
                languages: this.generateLanguages(),
                workStyle: this.generateWorkStyle(),
                responseTime: this.generateResponseTime()
            };

            members.push(member);
        }

        // Sort by compatibility
        return members.sort((a, b) => b.compatibility - a.compatibility);
    }

    generateTitle(skill) {
        const titles = {
            'frontend-development': 'Frontend Developer',
            'backend-development': 'Backend Engineer',
            'mobile-development': 'Mobile App Developer',
            'fullstack-development': 'Full-Stack Developer',
            'ui-design': 'UI Designer',
            'ux-design': 'UX Designer',
            'product-design': 'Product Designer',
            'data-science': 'Data Scientist',
            'machine-learning': 'ML Engineer',
            'product-management': 'Product Manager',
            'marketing': 'Marketing Specialist',
            'business-development': 'Business Developer',
            'cybersecurity': 'Security Engineer',
            'devops': 'DevOps Engineer',
            'blockchain': 'Blockchain Developer'
        };
        return titles[skill] || 'Tech Specialist';
    }

    generateAvailability() {
        const options = [
            "20-30 hrs/week",
            "15-25 hrs/week", 
            "10-20 hrs/week",
            "Full-time",
            "Weekends only",
            "Evenings & weekends"
        ];
        return options[Math.floor(Math.random() * options.length)];
    }

    generateRate(budgetType) {
        if (budgetType === 'volunteer') return 'Volunteer';
        if (budgetType === 'equity') return 'Equity only';
        
        const rates = ['$25-35/hr', '$35-50/hr', '$50-75/hr', '$75-100/hr', '$100+/hr'];
        return rates[Math.floor(Math.random() * rates.length)];
    }

    generateBio(skill) {
        const bios = {
            'frontend-development': 'Passionate frontend developer with expertise in modern frameworks. Love creating intuitive user interfaces.',
            'backend-development': 'Backend engineer focused on scalable systems and clean architecture. Experience with cloud platforms.',
            'ui-design': 'UI designer with an eye for beautiful, functional interfaces. Experienced in design systems and prototyping.',
            'ux-design': 'UX researcher and designer passionate about user-centered design. Strong background in usability testing.',
            'data-science': 'Data scientist with strong analytical skills. Experience in machine learning and statistical modeling.',
            'product-management': 'Product manager with experience launching successful products. Strong analytical and communication skills.'
        };
        return bios[skill] || 'Experienced professional passionate about technology and innovation.';
    }

    generateLanguages() {
        const languages = [
            ['English', 'Spanish'],
            ['English', 'Mandarin'],
            ['English', 'German'],
            ['English', 'French'],
            ['English', 'Hindi'],
            ['English', 'Portuguese'],
            ['English'],
            ['English', 'Arabic'],
            ['English', 'Japanese']
        ];
        return languages[Math.floor(Math.random() * languages.length)];
    }

    generateWorkStyle() {
        const styles = [
            'Collaborative',
            'Independent',
            'Agile/Scrum',
            'Structured',
            'Creative',
            'Analytical'
        ];
        return styles[Math.floor(Math.random() * styles.length)];
    }

    generateResponseTime() {
        const times = [
            'Within hours',
            'Same day',
            '1-2 days',
            'Within 24 hours',
            'Very responsive'
        ];
        return times[Math.floor(Math.random() * times.length)];
    }

    displayMatches() {
        const matchesSection = document.getElementById('team-matches');
        const matchesGrid = document.getElementById('matches-grid');
        const matchCount = document.getElementById('match-count');

        // Update match count
        matchCount.textContent = this.teamMatches.length;

        // Clear previous results
        matchesGrid.innerHTML = '';

        // Create match cards
        this.teamMatches.forEach(member => {
            const memberCard = this.createMemberCard(member);
            matchesGrid.appendChild(memberCard);
        });

        // Initialize event listeners
        this.initializeMatchEventListeners();

        // Show results
        matchesSection.style.display = 'block';
        matchesSection.scrollIntoView({ behavior: 'smooth' });
    }

    createMemberCard(member) {
        const card = document.createElement('div');
        card.className = 'member-card';
        card.setAttribute('data-member-id', member.id);

        card.innerHTML = `
            <div class="member-header">
                <div class="member-avatar">
                    <i class="fas fa-user-circle"></i>
                </div>
                <div class="member-info">
                    <h3>${member.name}</h3>
                    <p class="member-title">${member.title}</p>
                    <div class="member-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${member.location}</span>
                    </div>
                </div>
                <div class="compatibility-score">
                    <div class="score-circle">
                        <span>${member.compatibility}%</span>
                    </div>
                    <p>Match</p>
                </div>
            </div>

            <div class="member-details">
                <div class="member-skills">
                    <h4>Skills</h4>
                    <div class="skills-tags">
                        ${member.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>

                <div class="member-stats">
                    <div class="stat">
                        <i class="fas fa-star"></i>
                        <span>${member.rating}</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-project-diagram"></i>
                        <span>${member.projectsCompleted} projects</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-clock"></i>
                        <span>${member.availability}</span>
                    </div>
                </div>

                <div class="member-bio">
                    <p>${member.bio}</p>
                </div>

                <div class="member-extra">
                    <div class="extra-info">
                        <span><strong>Experience:</strong> ${member.experience}</span>
                        <span><strong>Rate:</strong> ${member.hourlyRate}</span>
                        <span><strong>Languages:</strong> ${member.languages.join(', ')}</span>
                    </div>
                </div>
            </div>

            <div class="member-actions">
                <button class="btn-secondary select-member" data-member-id="${member.id}">
                    <i class="fas fa-plus"></i> Select
                </button>
                <button class="btn-primary view-profile" data-member-id="${member.id}">
                    <i class="fas fa-user"></i> View Profile
                </button>
            </div>
        `;

        return card;
    }

    initializeMatchEventListeners() {
        // Select member buttons
        document.querySelectorAll('.select-member').forEach(button => {
            button.addEventListener('click', (e) => {
                const memberId = e.target.getAttribute('data-member-id');
                this.toggleMemberSelection(memberId, e.target);
            });
        });

        // View profile buttons
        document.querySelectorAll('.view-profile').forEach(button => {
            button.addEventListener('click', (e) => {
                const memberId = e.target.getAttribute('data-member-id');
                this.showMemberProfile(memberId);
            });
        });

        // Sort functionality
        document.getElementById('sort-matches').addEventListener('change', (e) => {
            this.sortMatches(e.target.value);
        });

        // Contact and create project buttons
        document.getElementById('contact-selected').addEventListener('click', () => {
            this.contactSelectedMembers();
        });

        document.getElementById('create-project').addEventListener('click', () => {
            this.createProjectWorkspace();
        });
    }

    toggleMemberSelection(memberId, buttonElement) {
        if (this.selectedMembers.has(memberId)) {
            this.selectedMembers.delete(memberId);
            buttonElement.innerHTML = '<i class="fas fa-plus"></i> Select';
            buttonElement.classList.remove('selected');
        } else {
            this.selectedMembers.add(memberId);
            buttonElement.innerHTML = '<i class="fas fa-check"></i> Selected';
            buttonElement.classList.add('selected');
        }

        // Update contact button
        const contactButton = document.getElementById('contact-selected');
        if (this.selectedMembers.size > 0) {
            contactButton.textContent = `Contact ${this.selectedMembers.size} Selected Members`;
            contactButton.disabled = false;
        } else {
            contactButton.textContent = 'Contact Selected Members';
            contactButton.disabled = true;
        }
    }

    showMemberProfile(memberId) {
        const member = this.teamMatches.find(m => m.id === memberId);
        if (member) {
            // In a real app, this would open a detailed profile modal or page
            alert(`View ${member.name}'s detailed profile\n\nExperience: ${member.experience}\nWork Style: ${member.workStyle}\nResponse Time: ${member.responseTime}\n\nThis would open a detailed profile view in the full application.`);
        }
    }

    sortMatches(sortBy) {
        let sortedMatches;
        
        switch(sortBy) {
            case 'experience':
                sortedMatches = [...this.teamMatches].sort((a, b) => {
                    const experienceOrder = ['Junior', 'Mid-level', 'Senior', 'Expert'];
                    const aLevel = experienceOrder.findIndex(level => a.experience.includes(level));
                    const bLevel = experienceOrder.findIndex(level => b.experience.includes(level));
                    return bLevel - aLevel;
                });
                break;
            case 'availability':
                sortedMatches = [...this.teamMatches].sort((a, b) => {
                    const availabilityScore = (avail) => {
                        if (avail.includes('Full-time')) return 4;
                        if (avail.includes('20-30')) return 3;
                        if (avail.includes('15-25')) return 2;
                        return 1;
                    };
                    return availabilityScore(b.availability) - availabilityScore(a.availability);
                });
                break;
            case 'location':
                sortedMatches = [...this.teamMatches].sort((a, b) => 
                    a.location.localeCompare(b.location)
                );
                break;
            default: // compatibility
                sortedMatches = [...this.teamMatches].sort((a, b) => 
                    b.compatibility - a.compatibility
                );
        }

        this.teamMatches = sortedMatches;
        this.displayMatches();
    }

    contactSelectedMembers() {
        if (this.selectedMembers.size === 0) {
            alert('Please select at least one team member to contact.');
            return;
        }

        const selectedNames = Array.from(this.selectedMembers).map(id => {
            const member = this.teamMatches.find(m => m.id === id);
            return member ? member.name : 'Unknown';
        });

        // In a real app, this would initiate messaging or email
        alert(`Contact initiated with: ${selectedNames.join(', ')}\n\nIn the full application, this would:\n- Send introductory messages\n- Create a team chat\n- Share project details\n- Schedule intro calls`);
    }

    createProjectWorkspace() {
        // In a real app, this would create a project workspace
        window.location.href = 'project-startup.html';
    }
}

// Initialize the team builder when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TeamBuilder();
});