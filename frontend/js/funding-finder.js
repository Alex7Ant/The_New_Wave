// Funding Finder JavaScript Functionality

// Mobile menu toggle function
function toggleMobileMenu() {
    const classList = document.querySelector('.class-list');
    classList.classList.toggle('active');
}

// Funding Finder class
class FundingFinder {
    constructor() {
        this.fundingResults = [];
        this.selectedOpportunities = new Set();
        this.initializeForm();
    }

    initializeForm() {
        const form = document.getElementById('funding-finder-form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmission(e));
        }

        // Add character counters for text areas
        this.addCharacterCounters();
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

    async handleFormSubmission(e) {
        e.preventDefault();
        
        // Show loading state
        this.showLoadingState();

        // Collect form data
        const formData = this.collectFormData();
        
        // Simulate funding search (in real app, this would call an API)
        setTimeout(() => {
            this.performFundingSearch(formData);
        }, 2000);
    }

    collectFormData() {
        const form = document.getElementById('funding-finder-form');
        const formData = new FormData(form);
        const data = {};

        for (let [key, value] of formData.entries()) {
            if (key === 'impact-focus' || key === 'preferred-funding-types' || key === 'additional-support') {
                if (!data[key]) data[key] = [];
                data[key].push(value);
            } else {
                data[key] = value;
            }
        }

        return data;
    }

    showLoadingState() {
        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching Opportunities...';
        submitButton.disabled = true;
    }

    hideLoadingState() {
        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.innerHTML = '<i class="fas fa-search"></i> Find Funding Opportunities';
        submitButton.disabled = false;
    }

    performFundingSearch(data) {
        this.fundingResults = this.generateFundingOpportunities(data);
        this.displayResults();
        this.hideLoadingState();
    }

    generateFundingOpportunities(data) {
        // Generate realistic funding opportunities based on form data
        const opportunities = [];
        const industry = data.industry;
        const amount = data['funding-amount'];
        const stage = data['project-stage'];
        const prefTypes = data['preferred-funding-types'] || [];
        const impactFocus = data['impact-focus'] || [];

        // Sample funding opportunities database
        const fundingDatabase = [
            {
                name: "Climate Innovation Challenge",
                type: "competition",
                amount: "50k-250k",
                industry: ["environment", "energy", "agriculture"],
                stage: ["prototype", "mvp", "pre-launch"],
                description: "Annual competition for climate solutions with global impact potential",
                organization: "Global Climate Foundation",
                deadline: "2024-06-15",
                requirements: ["Working prototype", "Environmental impact metrics", "Scalability plan"],
                additionalSupport: ["Mentorship", "Market validation", "Media exposure"],
                location: "Global",
                equity: "none",
                matchFactors: ["climate-focused", "prototype-ready", "global-scale"]
            },
            {
                name: "Health Innovation Grant",
                type: "foundation-grant",
                amount: "25k-100k",
                industry: ["healthcare", "biotech"],
                stage: ["research", "prototype", "mvp"],
                description: "Supporting breakthrough healthcare solutions for underserved populations",
                organization: "Gates Foundation",
                deadline: "2024-04-30",
                requirements: ["Clinical evidence", "Target population defined", "Implementation plan"],
                additionalSupport: ["Research partnerships", "Regulatory guidance", "Pilot funding"],
                location: "Global",
                equity: "none",
                matchFactors: ["healthcare-focused", "underserved-populations", "evidence-based"]
            },
            {
                name: "TechStars Accelerator",
                type: "accelerator-program",
                amount: "100k-120k",
                industry: ["any"],
                stage: ["mvp", "pre-launch", "early-revenue"],
                description: "3-month accelerator program with mentorship and demo day",
                organization: "Techstars",
                deadline: "Rolling admissions",
                requirements: ["Functioning product", "Team of 2+", "Market validation"],
                additionalSupport: ["Mentorship network", "Demo day", "Follow-on funding"],
                location: "Multiple cities",
                equity: "6-8%",
                matchFactors: ["tech-startup", "team-ready", "scalable-business"]
            },
            {
                name: "Social Impact Venture Fund",
                type: "impact-investor",
                amount: "250k-1m",
                industry: ["social-impact", "education", "healthcare"],
                stage: ["early-revenue", "scaling"],
                description: "Patient capital for ventures solving pressing social problems",
                organization: "Acumen Capital",
                deadline: "Ongoing",
                requirements: ["Proven social impact", "Revenue traction", "Scalable model"],
                additionalSupport: ["Impact measurement", "Strategic partnerships", "Board support"],
                location: "Global",
                equity: "10-20%",
                matchFactors: ["social-impact", "revenue-generating", "scalable"]
            },
            {
                name: "SBIR Phase I Grant",
                type: "government-grant",
                amount: "100k-250k",
                industry: ["healthcare", "energy", "ai-ml", "transportation"],
                stage: ["research", "prototype"],
                description: "Federal funding for small business innovation research",
                organization: "US Government (NSF)",
                deadline: "Multiple deadlines yearly",
                requirements: ["US-based small business", "Innovation potential", "Commercialization plan"],
                additionalSupport: ["Phase II eligibility", "Government partnerships", "IP support"],
                location: "United States",
                equity: "none",
                matchFactors: ["research-intensive", "innovation-focused", "government-aligned"]
            },
            {
                name: "Female Founders Fund",
                type: "angel-investor",
                amount: "50k-250k",
                industry: ["any"],
                stage: ["mvp", "pre-launch", "early-revenue"],
                description: "Supporting female-led startups with capital and community",
                organization: "F3 Fund",
                deadline: "Ongoing",
                requirements: ["Female founder", "Scalable business model", "Strong team"],
                additionalSupport: ["Female entrepreneur network", "Go-to-market support", "PR assistance"],
                location: "North America",
                equity: "5-15%",
                matchFactors: ["female-led", "community-driven", "scalable"]
            },
            {
                name: "Clean Energy Innovation Program",
                type: "government-grant",
                amount: "500k-2m",
                industry: ["energy", "environment"],
                stage: ["prototype", "mvp", "pre-launch"],
                description: "Advancing clean energy technologies towards commercialization",
                organization: "Department of Energy",
                deadline: "2024-05-20",
                requirements: ["Clean energy focus", "Technology validation", "Commercial pathway"],
                additionalSupport: ["National lab partnerships", "Testing facilities", "Market analysis"],
                location: "United States",
                equity: "none",
                matchFactors: ["clean-energy", "technology-focus", "commercialization-ready"]
            },
            {
                name: "EdTech Innovation Challenge",
                type: "competition",
                amount: "25k-100k",
                industry: ["education"],
                stage: ["prototype", "mvp", "early-revenue"],
                description: "Transforming education through innovative technology solutions",
                organization: "Education Ministry Consortium",
                deadline: "2024-07-01",
                requirements: ["Education technology", "Student outcome metrics", "Pilot results"],
                additionalSupport: ["School partnerships", "Curriculum integration", "Scale-up funding"],
                location: "Global",
                equity: "none",
                matchFactors: ["education-focused", "technology-enabled", "outcome-driven"]
            },
            {
                name: "FinTech Venture Capital",
                type: "venture-capital",
                amount: "1m-5m",
                industry: ["fintech"],
                stage: ["early-revenue", "scaling"],
                description: "Series A funding for disruptive financial technology companies",
                organization: "Andreessen Horowitz",
                deadline: "Ongoing",
                requirements: ["Strong traction", "Large market", "Experienced team"],
                additionalSupport: ["Industry expertise", "Business development", "Follow-on funding"],
                location: "Global",
                equity: "15-25%",
                matchFactors: ["fintech-focus", "high-growth", "experienced-team"]
            },
            {
                name: "Impact Accelerator Program",
                type: "accelerator-program",
                amount: "50k-75k",
                industry: ["social-impact", "environment", "healthcare"],
                stage: ["prototype", "mvp"],
                description: "4-month program for social entrepreneurs creating positive impact",
                organization: "Unreasonable Group",
                deadline: "2024-03-15",
                requirements: ["Social/environmental impact", "Scalable solution", "Committed team"],
                additionalSupport: ["Impact measurement", "Corporate partnerships", "Global network"],
                location: "Multiple locations",
                equity: "3-5%",
                matchFactors: ["impact-driven", "scalable-solution", "global-network"]
            }
        ];

        // Filter and score opportunities based on form data
        const matchedOpportunities = fundingDatabase.filter(opp => {
            return this.isOpportunityMatch(opp, data);
        }).map(opp => {
            const score = this.calculateMatchScore(opp, data);
            return { ...opp, matchScore: score };
        }).sort((a, b) => b.matchScore - a.matchScore);

        return matchedOpportunities.slice(0, 8); // Return top 8 matches
    }

    isOpportunityMatch(opportunity, data) {
        // Check industry match
        if (!opportunity.industry.includes(data.industry) && !opportunity.industry.includes('any')) {
            return false;
        }

        // Check stage match
        if (!opportunity.stage.includes(data['project-stage'])) {
            return false;
        }

        // Check funding amount overlap
        const userAmount = data['funding-amount'];
        const oppAmount = opportunity.amount;
        
        // Basic amount matching logic
        const amountOverlap = this.checkAmountOverlap(userAmount, oppAmount);
        if (!amountOverlap) {
            return false;
        }

        // Check funding type preference
        const prefTypes = data['preferred-funding-types'] || [];
        if (prefTypes.length > 0) {
            const oppType = opportunity.type.replace('-', '_');
            if (!prefTypes.includes(oppType) && !prefTypes.includes(opportunity.type)) {
                // Allow if no strong preference or type mismatch is minor
                return prefTypes.length <= 2;
            }
        }

        return true;
    }

    checkAmountOverlap(userAmount, oppAmount) {
        // Simple overlap check - in real app, this would be more sophisticated
        const userAmountRankings = {
            'under-10k': 1,
            '10k-25k': 2,
            '25k-50k': 3,
            '50k-100k': 4,
            '100k-250k': 5,
            '250k-500k': 6,
            '500k-1m': 7,
            '1m-5m': 8,
            '5m+': 9
        };

        const oppAmountRankings = {
            'under-10k': 1,
            '25k-100k': 3,
            '50k-250k': 4,
            '100k-120k': 4,
            '100k-250k': 5,
            '250k-1m': 6,
            '500k-2m': 7,
            '1m-5m': 8
        };

        const userRank = userAmountRankings[userAmount] || 5;
        const oppRank = oppAmountRankings[oppAmount] || 5;

        // Allow 2 levels of difference
        return Math.abs(userRank - oppRank) <= 2;
    }

    calculateMatchScore(opportunity, data) {
        let score = 60; // Base score

        // Industry exact match bonus
        if (opportunity.industry.includes(data.industry)) {
            score += 25;
        } else if (opportunity.industry.includes('any')) {
            score += 15;
        }

        // Stage exact match bonus
        if (opportunity.stage.includes(data['project-stage'])) {
            score += 20;
        }

        // Funding type preference match
        const prefTypes = data['preferred-funding-types'] || [];
        const oppType = opportunity.type.replace('-', '_');
        if (prefTypes.includes(opportunity.type) || prefTypes.includes(oppType)) {
            score += 15;
        }

        // Impact focus alignment
        const impactFocus = data['impact-focus'] || [];
        if (impactFocus.length > 0) {
            const hasImpactAlignment = impactFocus.some(focus => 
                opportunity.matchFactors.some(factor => factor.includes(focus.replace('_', '-')))
            );
            if (hasImpactAlignment) {
                score += 10;
            }
        }

        // Additional support match
        const additionalSupport = data['additional-support'] || [];
        if (additionalSupport.length > 0) {
            const supportMatch = additionalSupport.filter(support =>
                opportunity.additionalSupport.some(oppSupport =>
                    oppSupport.toLowerCase().includes(support.replace('_', ' ').toLowerCase())
                )
            ).length;
            score += supportMatch * 3;
        }

        // Equity preference alignment
        const equityPref = data['equity-willingness'];
        if (equityPref === 'no-equity' && opportunity.equity === 'none') {
            score += 10;
        } else if (equityPref === 'equity-flexible') {
            score += 5;
        }

        // Location preference (simplified)
        if (opportunity.location === 'Global' && data.location) {
            score += 5;
        }

        return Math.min(100, score);
    }

    displayResults() {
        const resultsSection = document.getElementById('funding-results');
        const opportunitiesContainer = document.getElementById('funding-opportunities');
        const matchCount = document.getElementById('match-count');
        const totalPotential = document.getElementById('total-potential');

        // Update match count and total potential
        matchCount.textContent = this.fundingResults.length;
        const totalAmount = this.calculateTotalPotential();
        totalPotential.textContent = totalAmount;

        // Clear previous results
        opportunitiesContainer.innerHTML = '';

        // Create opportunity cards
        this.fundingResults.forEach(opportunity => {
            const opportunityCard = this.createOpportunityCard(opportunity);
            opportunitiesContainer.appendChild(opportunityCard);
        });

        // Initialize event listeners
        this.initializeResultsEventListeners();

        // Show results
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    createOpportunityCard(opportunity) {
        const card = document.createElement('div');
        card.className = 'opportunity-card';
        card.setAttribute('data-opportunity-id', opportunity.name);

        const typeIcons = {
            'competition': 'fa-trophy',
            'foundation-grant': 'fa-hand-holding-usd',
            'government-grant': 'fa-university',
            'accelerator-program': 'fa-rocket',
            'venture-capital': 'fa-chart-line',
            'angel-investor': 'fa-angel',
            'impact-investor': 'fa-heart'
        };

        const typeIcon = typeIcons[opportunity.type] || 'fa-dollar-sign';

        card.innerHTML = `
            <div class="opportunity-header">
                <div class="opportunity-title">
                    <h3>${opportunity.name}</h3>
                    <span class="opportunity-type">
                        <i class="fas ${typeIcon}"></i>
                        ${opportunity.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                </div>
                <div class="match-score">
                    <div class="score-circle">
                        <span>${opportunity.matchScore}%</span>
                    </div>
                    <p>Match</p>
                </div>
            </div>

            <div class="opportunity-content">
                <div class="opportunity-meta">
                    <div class="meta-item">
                        <i class="fas fa-dollar-sign"></i>
                        <span>${this.formatFundingAmount(opportunity.amount)}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-building"></i>
                        <span>${opportunity.organization}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-calendar-alt"></i>
                        <span>${this.formatDeadline(opportunity.deadline)}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-globe-americas"></i>
                        <span>${opportunity.location}</span>
                    </div>
                </div>

                <div class="opportunity-description">
                    <p>${opportunity.description}</p>
                </div>

                <div class="opportunity-details">
                    <div class="detail-section">
                        <h4><i class="fas fa-list-check"></i> Key Requirements</h4>
                        <ul>
                            ${opportunity.requirements.map(req => `<li>${req}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="detail-section">
                        <h4><i class="fas fa-hands-helping"></i> Additional Support</h4>
                        <div class="support-tags">
                            ${opportunity.additionalSupport.map(support => 
                                `<span class="support-tag">${support}</span>`
                            ).join('')}
                        </div>
                    </div>

                    <div class="opportunity-equity">
                        <strong>Equity:</strong> ${this.formatEquity(opportunity.equity)}
                    </div>
                </div>
            </div>

            <div class="opportunity-actions">
                <button class="btn-secondary save-opportunity" data-opportunity="${opportunity.name}">
                    <i class="fas fa-bookmark"></i> Save
                </button>
                <button class="btn-primary learn-more" data-opportunity="${opportunity.name}">
                    <i class="fas fa-external-link-alt"></i> Learn More
                </button>
                <button class="btn-success apply-now" data-opportunity="${opportunity.name}">
                    <i class="fas fa-paper-plane"></i> Apply Now
                </button>
            </div>
        `;

        return card;
    }

    calculateTotalPotential() {
        let total = 0;
        this.fundingResults.forEach(opp => {
            // Extract maximum amount from range
            const amount = opp.amount;
            if (amount.includes('1m-5m')) total += 5000000;
            else if (amount.includes('500k-2m')) total += 2000000;
            else if (amount.includes('500k-1m')) total += 1000000;
            else if (amount.includes('250k-1m')) total += 1000000;
            else if (amount.includes('250k-500k')) total += 500000;
            else if (amount.includes('100k-250k')) total += 250000;
            else if (amount.includes('50k-250k')) total += 250000;
            else if (amount.includes('25k-100k')) total += 100000;
            else if (amount.includes('50k-100k')) total += 100000;
            else total += 50000; // Default minimum
        });

        if (total >= 1000000) {
            return '$' + (total / 1000000).toFixed(1) + 'M';
        }
        return '$' + (total / 1000).toFixed(0) + 'K';
    }

    formatFundingAmount(amount) {
        return amount.replace('k', 'K').replace('m', 'M').replace('-', ' - $');
    }

    formatDeadline(deadline) {
        if (deadline === 'Rolling admissions' || deadline === 'Ongoing') {
            return deadline;
        }
        
        const date = new Date(deadline);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    formatEquity(equity) {
        if (equity === 'none') return 'Non-dilutive';
        return equity + ' equity';
    }

    initializeResultsEventListeners() {
        // Save opportunity buttons
        document.querySelectorAll('.save-opportunity').forEach(button => {
            button.addEventListener('click', (e) => {
                const opportunityName = e.target.getAttribute('data-opportunity');
                this.toggleSaveOpportunity(opportunityName, e.target);
            });
        });

        // Learn more buttons
        document.querySelectorAll('.learn-more').forEach(button => {
            button.addEventListener('click', (e) => {
                const opportunityName = e.target.getAttribute('data-opportunity');
                this.showOpportunityDetails(opportunityName);
            });
        });

        // Apply now buttons
        document.querySelectorAll('.apply-now').forEach(button => {
            button.addEventListener('click', (e) => {
                const opportunityName = e.target.getAttribute('data-opportunity');
                this.startApplication(opportunityName);
            });
        });

        // Sort functionality
        document.getElementById('sort-results').addEventListener('change', (e) => {
            this.sortResults(e.target.value);
        });

        // Support buttons
        document.getElementById('get-application-help').addEventListener('click', () => {
            this.getApplicationHelp();
        });

        document.getElementById('save-opportunities').addEventListener('click', () => {
            this.saveAllSelectedOpportunities();
        });
    }

    toggleSaveOpportunity(opportunityName, buttonElement) {
        if (this.selectedOpportunities.has(opportunityName)) {
            this.selectedOpportunities.delete(opportunityName);
            buttonElement.innerHTML = '<i class="fas fa-bookmark"></i> Save';
            buttonElement.classList.remove('saved');
        } else {
            this.selectedOpportunities.add(opportunityName);
            buttonElement.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
            buttonElement.classList.add('saved');
        }
    }

    showOpportunityDetails(opportunityName) {
        const opportunity = this.fundingResults.find(opp => opp.name === opportunityName);
        if (opportunity) {
            // In a real app, this would open a detailed modal or redirect
            alert(`Learn more about ${opportunity.name}\n\nThis would open a detailed page with:\n- Full application requirements\n- Application timeline\n- Success stories\n- Contact information\n- Application tips`);
        }
    }

    startApplication(opportunityName) {
        const opportunity = this.fundingResults.find(opp => opp.name === opportunityName);
        if (opportunity) {
            // In a real app, this would start the application process
            alert(`Starting application for ${opportunity.name}\n\nThis would:\n- Open application form\n- Provide guided assistance\n- Save progress\n- Connect with mentors if available`);
        }
    }

    sortResults(sortBy) {
        let sortedResults;
        
        switch(sortBy) {
            case 'amount':
                sortedResults = [...this.fundingResults].sort((a, b) => {
                    const getMaxAmount = (amount) => {
                        if (amount.includes('5m+')) return 5000000;
                        if (amount.includes('1m-5m')) return 5000000;
                        if (amount.includes('500k-2m')) return 2000000;
                        if (amount.includes('500k-1m')) return 1000000;
                        if (amount.includes('250k-1m')) return 1000000;
                        if (amount.includes('250k-500k')) return 500000;
                        if (amount.includes('100k-250k')) return 250000;
                        return 100000;
                    };
                    return getMaxAmount(b.amount) - getMaxAmount(a.amount);
                });
                break;
            case 'deadline':
                sortedResults = [...this.fundingResults].sort((a, b) => {
                    const getDeadlineValue = (deadline) => {
                        if (deadline === 'Rolling admissions' || deadline === 'Ongoing') return new Date('2099-12-31');
                        return new Date(deadline);
                    };
                    return getDeadlineValue(a.deadline) - getDeadlineValue(b.deadline);
                });
                break;
            case 'type':
                sortedResults = [...this.fundingResults].sort((a, b) => 
                    a.type.localeCompare(b.type)
                );
                break;
            default: // match-score
                sortedResults = [...this.fundingResults].sort((a, b) => 
                    b.matchScore - a.matchScore
                );
        }

        this.fundingResults = sortedResults;
        this.displayResults();
    }

    getApplicationHelp() {
        alert('Application Support Services\n\n✅ Pitch deck review\n✅ Application writing assistance\n✅ Financial projections help\n✅ 1-on-1 mentoring sessions\n✅ Mock interview preparation\n\nThis would connect you with our expert advisors to maximize your funding success.');
    }

    saveAllSelectedOpportunities() {
        if (this.selectedOpportunities.size === 0) {
            alert('Please save some opportunities first by clicking the bookmark icon on each opportunity card.');
            return;
        }

        const savedNames = Array.from(this.selectedOpportunities);
        alert(`Successfully saved ${savedNames.length} opportunities:\n\n${savedNames.join('\n')}\n\nThese opportunities have been added to your dashboard for easy tracking and application management.`);
    }
}

// Initialize the funding finder when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new FundingFinder();
});