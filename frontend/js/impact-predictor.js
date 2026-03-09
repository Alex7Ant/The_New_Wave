// Impact Predictor JavaScript Functionality

// Mobile menu toggle function
function toggleMobileMenu() {
    const classList = document.querySelector('.class-list');
    classList.classList.toggle('active');
}

// Impact Predictor class
class ImpactPredictor {
    constructor() {
        this.impactData = null;
        this.initializeForm();
    }

    initializeForm() {
        const form = document.getElementById('impact-predictor-form');
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
            
            if (count > 500) {
                counter.style.color = '#f39c12';
            } else {
                counter.style.color = '#666';
            }
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
        
        // Simulate impact analysis (in real app, this would call an AI API)
        setTimeout(() => {
            this.performImpactAnalysis(formData);
        }, 2500);
    }

    collectFormData() {
        const form = document.getElementById('impact-predictor-form');
        const formData = new FormData(form);
        const data = {};

        for (let [key, value] of formData.entries()) {
            if (key === 'social-challenges' || key === 'resource-impact') {
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
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing Impact...';
        submitButton.disabled = true;
    }

    hideLoadingState() {
        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.innerHTML = '<i class="fas fa-chart-line"></i> Predict Impact';
        submitButton.disabled = false;
    }

    performImpactAnalysis(data) {
        this.impactData = this.generateImpactPrediction(data);
        this.displayResults();
        this.hideLoadingState();
    }

    generateImpactPrediction(data) {
        // Sophisticated impact analysis algorithm
        const analysis = {
            overallScore: this.calculateOverallScore(data),
            socialScore: this.calculateSocialScore(data),
            environmentalScore: this.calculateEnvironmentalScore(data),
            economicScore: this.calculateEconomicScore(data),
            projections: this.generateProjections(data),
            sdgAlignment: this.analyzeSDGAlignment(data),
            recommendations: this.generateRecommendations(data)
        };

        return analysis;
    }

    calculateOverallScore(data) {
        let score = 40; // Base score

        // Sector impact potential
        const sectorScores = {
            'health': 20,
            'education': 18,
            'environment': 20,
            'poverty': 19,
            'water': 17,
            'energy': 16,
            'agriculture': 15,
            'technology': 12,
            'cities': 14,
            'gender': 16,
            'peace': 15
        };
        score += sectorScores[data['primary-sector']] || 10;

        // Geographic scope
        const scopeScores = {
            'global': 20,
            'regional': 15,
            'national': 12,
            'developing': 18,
            'local': 8,
            'urban': 10,
            'rural': 12
        };
        score += scopeScores[data['geographic-scope']] || 10;

        // Scale potential
        const scaleScores = {
            'global': 15,
            'international': 12,
            'national': 10,
            'local': 6
        };
        score += scaleScores[data['scale-potential']] || 8;

        // Target reach
        const reachScores = {
            '1000000+': 15,
            '100000-1000000': 12,
            '10000-100000': 10,
            '1000-10000': 8,
            '100-1000': 5
        };
        score += reachScores[data['initial-reach']] || 8;

        // Sustainability model
        if (data['sustainability'] === 'self-sustaining') {
            score += 10;
        } else if (data['sustainability'] === 'mixed') {
            score += 7;
        } else {
            score += 5;
        }

        return Math.min(100, score);
    }

    calculateSocialScore(data) {
        let score = 35;

        // Primary sector social impact
        const socialSectors = ['health', 'education', 'poverty', 'gender', 'peace'];
        if (socialSectors.includes(data['primary-sector'])) {
            score += 20;
        } else {
            score += 10;
        }

        // Social challenges addressed
        const socialChallenges = data['social-challenges'] || [];
        score += Math.min(25, socialChallenges.length * 4);

        // Target audience clarity
        if (data['target-audience'] && data['target-audience'].length > 100) {
            score += 15;
        } else if (data['target-audience'] && data['target-audience'].length > 50) {
            score += 10;
        } else {
            score += 5;
        }

        // Reach potential
        const reachScores = {
            '1000000+': 15,
            '100000-1000000': 12,
            '10000-100000': 10,
            '1000-10000': 8,
            '100-1000': 5
        };
        score += reachScores[data['initial-reach']] || 8;

        return Math.min(100, score);
    }

    calculateEnvironmentalScore(data) {
        let score = 20;

        // Environmental sector bonus
        if (data['primary-sector'] === 'environment') {
            score += 30;
        } else if (['energy', 'water', 'agriculture', 'cities'].includes(data['primary-sector'])) {
            score += 20;
        } else {
            score += 10;
        }

        // Environmental benefits description
        if (data['environmental-benefits'] && data['environmental-benefits'].length > 50) {
            score += 20;
        } else if (data['environmental-benefits'] && data['environmental-benefits'].length > 20) {
            score += 15;
        } else if (data['environmental-benefits']) {
            score += 10;
        }

        // Resource impact
        const resourceImpact = data['resource-impact'] || [];
        score += Math.min(30, resourceImpact.length * 5);

        // Quantifiable impact
        if (data['quantifiable-environmental'] && data['quantifiable-environmental'].length > 50) {
            score += 15;
        } else if (data['quantifiable-environmental']) {
            score += 8;
        }

        return Math.min(100, score);
    }

    calculateEconomicScore(data) {
        let score = 30;

        // Market size
        const marketScores = {
            'massive': 25,
            'large': 20,
            'medium': 15,
            'small': 10,
            'non-profit': 12
        };
        score += marketScores[data['market-size']] || 10;

        // Job creation
        const jobScores = {
            '1000+': 20,
            '200-1000': 18,
            '50-200': 15,
            '10-50': 12,
            '1-10': 8,
            'none': 5
        };
        score += jobScores[data['job-creation']] || 5;

        // Economic benefits description
        if (data['economic-benefits'] && data['economic-benefits'].length > 50) {
            score += 15;
        } else if (data['economic-benefits']) {
            score += 10;
        }

        // Sustainability model
        if (data['sustainability'] === 'self-sustaining') {
            score += 15;
        } else if (data['sustainability'] === 'mixed') {
            score += 10;
        } else {
            score += 5;
        }

        return Math.min(100, score);
    }

    generateProjections(data) {
        const baseReach = this.getBaseReach(data['initial-reach']);
        const scaleFactor = this.getScaleFactor(data['scale-potential']);
        
        return {
            peopleImpacted: this.formatNumber(baseReach * scaleFactor * 5),
            communitiesReached: Math.floor(baseReach / 1000 * scaleFactor),
            jobsCreated: this.calculateJobProjection(data),
            economicValue: this.calculateEconomicProjection(data)
        };
    }

    getBaseReach(reachCategory) {
        const reachMap = {
            '100-1000': 500,
            '1000-10000': 5000,
            '10000-100000': 50000,
            '100000-1000000': 500000,
            '1000000+': 2000000
        };
        return reachMap[reachCategory] || 10000;
    }

    getScaleFactor(scaleCategory) {
        const scaleMap = {
            'local': 1,
            'national': 2.5,
            'international': 4,
            'global': 6
        };
        return scaleMap[scaleCategory] || 2;
    }

    calculateJobProjection(data) {
        const jobMap = {
            'none': 0,
            '1-10': 25,
            '10-50': 120,
            '50-200': 500,
            '200-1000': 1500,
            '1000+': 3000
        };
        return jobMap[data['job-creation']] || 100;
    }

    calculateEconomicProjection(data) {
        const marketMap = {
            'small': 250000,
            'medium': 2500000,
            'large': 15000000,
            'massive': 50000000,
            'non-profit': 1000000
        };
        
        const baseValue = marketMap[data['market-size']] || 2000000;
        return this.formatCurrency(baseValue);
    }

    analyzeSDGAlignment(data) {
        const sdgMapping = {
            'poverty': [{ goal: 1, title: 'No Poverty', strength: 'Primary' }],
            'health': [{ goal: 3, title: 'Good Health and Well-being', strength: 'Primary' }],
            'education': [{ goal: 4, title: 'Quality Education', strength: 'Primary' }],
            'gender': [{ goal: 5, title: 'Gender Equality', strength: 'Primary' }],
            'water': [{ goal: 6, title: 'Clean Water and Sanitation', strength: 'Primary' }],
            'energy': [{ goal: 7, title: 'Affordable and Clean Energy', strength: 'Primary' }],
            'technology': [{ goal: 9, title: 'Industry, Innovation and Infrastructure', strength: 'Primary' }],
            'cities': [{ goal: 11, title: 'Sustainable Cities and Communities', strength: 'Primary' }],
            'environment': [{ goal: 13, title: 'Climate Action', strength: 'Primary' }],
            'peace': [{ goal: 16, title: 'Peace, Justice and Strong Institutions', strength: 'Primary' }]
        };

        const primaryAlignment = sdgMapping[data['primary-sector']] || [];
        
        // Add secondary alignments based on challenges addressed
        const secondaryAlignment = [];
        const socialChallenges = data['social-challenges'] || [];
        
        socialChallenges.forEach(challenge => {
            const challengeSDG = {
                'poverty': { goal: 1, title: 'No Poverty', strength: 'Secondary' },
                'health': { goal: 3, title: 'Good Health and Well-being', strength: 'Secondary' },
                'education': { goal: 4, title: 'Quality Education', strength: 'Secondary' },
                'gender-equality': { goal: 5, title: 'Gender Equality', strength: 'Secondary' },
                'digital-divide': { goal: 9, title: 'Industry, Innovation and Infrastructure', strength: 'Secondary' },
                'community-building': { goal: 11, title: 'Sustainable Cities and Communities', strength: 'Secondary' },
                'social-justice': { goal: 16, title: 'Peace, Justice and Strong Institutions', strength: 'Secondary' }
            };
            
            if (challengeSDG[challenge] && !primaryAlignment.some(p => p.goal === challengeSDG[challenge].goal)) {
                secondaryAlignment.push(challengeSDG[challenge]);
            }
        });

        return [...primaryAlignment, ...secondaryAlignment.slice(0, 3)];
    }

    generateRecommendations(data) {
        const recommendations = [];

        // Score-based recommendations
        const overallScore = this.calculateOverallScore(data);
        const socialScore = this.calculateSocialScore(data);
        const environmentalScore = this.calculateEnvironmentalScore(data);
        const economicScore = this.calculateEconomicScore(data);

        if (overallScore >= 85) {
            recommendations.push({
                type: 'success',
                title: 'Exceptional Impact Potential',
                description: 'Your project shows outstanding potential for global impact. Consider applying for major impact awards and seeking high-profile partnerships.',
                priority: 'high'
            });
        } else if (overallScore >= 70) {
            recommendations.push({
                type: 'info',
                title: 'Strong Foundation for Impact',
                description: 'Your project has solid impact potential. Focus on scaling strategies and measuring outcomes effectively.',
                priority: 'medium'
            });
        } else {
            recommendations.push({
                type: 'warning',
                title: 'Enhance Impact Focus',
                description: 'Consider refining your approach to maximize impact. Define clearer success metrics and target beneficiaries.',
                priority: 'high'
            });
        }

        // Specific area recommendations
        if (socialScore < 70) {
            recommendations.push({
                type: 'info',
                title: 'Strengthen Social Impact',
                description: 'Consider expanding your focus on direct beneficiaries and community engagement to increase social impact.',
                priority: 'medium'
            });
        }

        if (environmentalScore < 60 && data['primary-sector'] !== 'environment') {
            recommendations.push({
                type: 'suggestion',
                title: 'Add Environmental Benefits',
                description: 'Look for opportunities to incorporate environmental benefits into your solution design.',
                priority: 'low'
            });
        }

        if (economicScore < 60) {
            recommendations.push({
                type: 'warning',
                title: 'Improve Economic Sustainability',
                description: 'Develop a clearer revenue model or sustainability strategy to ensure long-term impact.',
                priority: 'high'
            });
        }

        // Sector-specific recommendations
        const sectorAdvice = {
            'health': 'Consider partnerships with healthcare organizations and focus on measurable health outcomes.',
            'education': 'Engage with educational institutions and develop learning outcome metrics.',
            'environment': 'Quantify environmental benefits and consider carbon credit opportunities.',
            'poverty': 'Focus on sustainable livelihood creation and measure income improvements.',
            'technology': 'Ensure accessibility and digital inclusion in your technology design.'
        };

        if (sectorAdvice[data['primary-sector']]) {
            recommendations.push({
                type: 'suggestion',
                title: 'Sector-Specific Optimization',
                description: sectorAdvice[data['primary-sector']],
                priority: 'medium'
            });
        }

        return recommendations.sort((a, b) => {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M+';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K+';
        }
        return num.toLocaleString() + '+';
    }

    formatCurrency(amount) {
        if (amount >= 1000000) {
            return '$' + (amount / 1000000).toFixed(1) + 'M';
        }
        return '$' + (amount / 1000).toFixed(0) + 'K';
    }

    displayResults() {
        const resultsSection = document.getElementById('impact-results');
        
        // Update scores
        document.getElementById('overall-impact-score').textContent = this.impactData.overallScore;
        document.getElementById('social-score').textContent = this.impactData.socialScore;
        document.getElementById('environmental-score').textContent = this.impactData.environmentalScore;
        document.getElementById('economic-score').textContent = this.impactData.economicScore;

        // Update score descriptions
        this.updateScoreDescriptions();

        // Update projections
        document.getElementById('people-impacted').textContent = this.impactData.projections.peopleImpacted;
        document.getElementById('communities-reached').textContent = this.impactData.projections.communitiesReached;
        document.getElementById('jobs-created').textContent = this.impactData.projections.jobsCreated;
        document.getElementById('economic-value').textContent = this.impactData.projections.economicValue;

        // Display SDG alignment
        this.displaySDGAlignment();

        // Display recommendations
        this.displayRecommendations();

        // Show results
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    updateScoreDescriptions() {
        const socialDesc = document.getElementById('social-description');
        const environmentalDesc = document.getElementById('environmental-description');
        const economicDesc = document.getElementById('economic-description');

        // Social description
        if (this.impactData.socialScore >= 80) {
            socialDesc.textContent = 'Exceptional community impact potential';
        } else if (this.impactData.socialScore >= 60) {
            socialDesc.textContent = 'Good social benefits expected';
        } else {
            socialDesc.textContent = 'Moderate social impact';
        }

        // Environmental description
        if (this.impactData.environmentalScore >= 80) {
            environmentalDesc.textContent = 'Strong environmental benefits';
        } else if (this.impactData.environmentalScore >= 60) {
            environmentalDesc.textContent = 'Moderate environmental impact';
        } else {
            environmentalDesc.textContent = 'Limited environmental focus';
        }

        // Economic description
        if (this.impactData.economicScore >= 80) {
            economicDesc.textContent = 'Strong economic potential';
        } else if (this.impactData.economicScore >= 60) {
            economicDesc.textContent = 'Viable economic model';
        } else {
            economicDesc.textContent = 'Economic sustainability needs work';
        }
    }

    displaySDGAlignment() {
        const sdgContainer = document.getElementById('sdg-alignment');
        sdgContainer.innerHTML = '';

        this.impactData.sdgAlignment.forEach(sdg => {
            const sdgElement = document.createElement('div');
            sdgElement.className = `sdg-item ${sdg.strength.toLowerCase()}`;
            sdgElement.innerHTML = `
                <div class="sdg-number">${sdg.goal}</div>
                <div class="sdg-info">
                    <h4>${sdg.title}</h4>
                    <span class="sdg-strength">${sdg.strength} Alignment</span>
                </div>
            `;
            sdgContainer.appendChild(sdgElement);
        });
    }

    displayRecommendations() {
        const recommendationsContainer = document.getElementById('impact-recommendations');
        recommendationsContainer.innerHTML = '';

        this.impactData.recommendations.forEach(rec => {
            const recElement = document.createElement('div');
            recElement.className = `recommendation ${rec.type} priority-${rec.priority}`;
            recElement.innerHTML = `
                <div class="rec-icon">
                    <i class="fas ${this.getRecommendationIcon(rec.type)}"></i>
                </div>
                <div class="rec-content">
                    <h4>${rec.title}</h4>
                    <p>${rec.description}</p>
                    <span class="priority-badge">${rec.priority.toUpperCase()} PRIORITY</span>
                </div>
            `;
            recommendationsContainer.appendChild(recElement);
        });
    }

    getRecommendationIcon(type) {
        const icons = {
            'success': 'fa-check-circle',
            'warning': 'fa-exclamation-triangle',
            'info': 'fa-info-circle',
            'suggestion': 'fa-lightbulb'
        };
        return icons[type] || 'fa-info-circle';
    }
}

// Initialize the impact predictor when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ImpactPredictor();
});