// AI Project Analyzer JavaScript Functionality

// Mobile menu toggle function
function toggleMobileMenu() {
    const classList = document.querySelector('.class-list');
    classList.classList.toggle('active');
}

// Analysis algorithm and logic
class ProjectAnalyzer {
    constructor() {
        this.analysisData = null;
        this.initializeForm();
    }

    initializeForm() {
        const form = document.getElementById('project-analysis-form');
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
        
        // Simulate AI analysis (in real app, this would call an API)
        setTimeout(() => {
            this.performAnalysis(formData);
        }, 2000);
    }

    collectFormData() {
        const form = document.getElementById('project-analysis-form');
        const formData = new FormData(form);
        const data = {};

        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        // Get checkbox values
        data['seeking-funding'] = document.getElementById('seeking-funding').checked;
        data['open-source'] = document.getElementById('open-source').checked;
        data['social-impact'] = document.getElementById('social-impact').checked;

        return data;
    }

    showLoadingState() {
        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
        submitButton.disabled = true;
    }

    hideLoadingState() {
        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.innerHTML = '<i class="fas fa-brain"></i> Analyze My Project';
        submitButton.disabled = false;
    }

    performAnalysis(data) {
        this.analysisData = this.generateAnalysis(data);
        this.displayResults();
        this.hideLoadingState();
    }

    generateAnalysis(data) {
        // Sophisticated analysis algorithm
        const analysis = {
            feasibility: this.calculateFeasibilityScore(data),
            market: this.analyzeMarket(data),
            technical: this.analyzeTechnical(data),
            resources: this.analyzeResources(data),
            recommendations: this.generateRecommendations(data)
        };

        return analysis;
    }

    calculateFeasibilityScore(data) {
        let score = 0;
        
        // Base score
        score += 30;

        // Industry factor
        const industryScores = {
            'healthcare': 15,
            'environment': 12,
            'education': 10,
            'fintech': 8,
            'agriculture': 12,
            'social-impact': 15,
            'smart-cities': 10,
            'entertainment': 6
        };
        score += industryScores[data.industry] || 8;

        // Description quality (longer, more detailed = higher score)
        if (data['idea-description'] && data['idea-description'].length > 200) {
            score += 15;
        } else if (data['idea-description'] && data['idea-description'].length > 100) {
            score += 10;
        } else {
            score += 5;
        }

        // Target market clarity
        if (data['target-users'] && data['target-users'].length > 50) {
            score += 10;
        } else {
            score += 5;
        }

        // Development stage
        const stageScores = {
            'concept': 5,
            'research': 8,
            'prototype': 12,
            'mvp': 15,
            'testing': 18
        };
        score += stageScores[data['development-stage']] || 5;

        // Budget realism
        const budgetScores = {
            'under-1k': 5,
            '1k-5k': 8,
            '5k-25k': 12,
            '25k-100k': 15,
            '100k+': 10
        };
        score += budgetScores[data['budget-estimate']] || 8;

        // Social impact bonus
        if (data['social-impact']) {
            score += 8;
        }

        // Open source bonus
        if (data['open-source']) {
            score += 5;
        }

        return Math.min(100, Math.max(30, score));
    }

    analyzeMarket(data) {
        const marketSizes = {
            'healthcare': 'Large',
            'education': 'Large',
            'environment': 'Medium to Large',
            'fintech': 'Large',
            'agriculture': 'Medium',
            'social-impact': 'Medium',
            'smart-cities': 'Medium to Large',
            'entertainment': 'Large'
        };

        const competitionLevels = {
            'healthcare': 'High',
            'education': 'Moderate',
            'environment': 'Low to Moderate',
            'fintech': 'High',
            'agriculture': 'Moderate',
            'social-impact': 'Low',
            'smart-cities': 'Moderate',
            'entertainment': 'High'
        };

        const adoptionPotentials = {
            'healthcare': 'Medium',
            'education': 'High',
            'environment': 'Medium',
            'fintech': 'High',
            'agriculture': 'Medium',
            'social-impact': 'High',
            'smart-cities': 'Medium',
            'entertainment': 'High'
        };

        return {
            size: marketSizes[data.industry] || 'Medium',
            competition: competitionLevels[data.industry] || 'Moderate',
            adoption: adoptionPotentials[data.industry] || 'Medium'
        };
    }

    analyzeTechnical(data) {
        const complexityLevels = {
            'solo': 'Low',
            'small': 'Low to Medium',
            'medium': 'Medium',
            'large': 'High'
        };

        const timelineMap = {
            '1-3months': '1-3 months',
            '3-6months': '3-6 months',
            '6-12months': '6-12 months',
            '1-2years': '1-2 years',
            '2years+': '2+ years'
        };

        // Determine technical risk based on technologies mentioned
        let techRisk = 'Low';
        const highRiskTechs = ['machine learning', 'ai', 'blockchain', 'quantum', 'iot'];
        const mediumRiskTechs = ['mobile app', 'web app', 'database', 'api'];
        
        if (data.technologies) {
            const techLower = data.technologies.toLowerCase();
            if (highRiskTechs.some(tech => techLower.includes(tech))) {
                techRisk = 'Medium to High';
            } else if (mediumRiskTechs.some(tech => techLower.includes(tech))) {
                techRisk = 'Low to Medium';
            }
        }

        return {
            complexity: complexityLevels[data['team-size']] || 'Medium',
            timeline: timelineMap[data.timeline] || '6-12 months',
            risk: techRisk
        };
    }

    analyzeResources(data) {
        const budgetMap = {
            'under-1k': '$500 - $1,000',
            '1k-5k': '$1,000 - $5,000',
            '5k-25k': '$5,000 - $25,000',
            '25k-100k': '$25,000 - $100,000',
            '100k+': '$100,000+'
        };

        const teamSizeMap = {
            'solo': '1 person',
            'small': '2-5 people',
            'medium': '6-15 people',
            'large': '16+ people'
        };

        // Generate skills needed based on industry and technologies
        let skillsNeeded = 'General Development';
        if (data.technologies) {
            const techLower = data.technologies.toLowerCase();
            const skills = [];
            
            if (techLower.includes('mobile') || techLower.includes('app')) {
                skills.push('Mobile Dev');
            }
            if (techLower.includes('web') || techLower.includes('frontend')) {
                skills.push('Frontend Dev');
            }
            if (techLower.includes('backend') || techLower.includes('server')) {
                skills.push('Backend Dev');
            }
            if (techLower.includes('design') || techLower.includes('ui')) {
                skills.push('UI/UX Design');
            }
            if (techLower.includes('machine learning') || techLower.includes('ai')) {
                skills.push('AI/ML');
            }
            if (techLower.includes('iot') || techLower.includes('sensor')) {
                skills.push('IoT/Hardware');
            }
            
            if (skills.length > 0) {
                skillsNeeded = skills.slice(0, 3).join(', ');
            }
        }

        return {
            budget: budgetMap[data['budget-estimate']] || '$10,000 - $50,000',
            teamSize: teamSizeMap[data['team-size']] || '3-5 people',
            skills: skillsNeeded
        };
    }

    generateRecommendations(data) {
        const recommendations = [];

        // Based on feasibility score
        const score = this.calculateFeasibilityScore(data);
        if (score >= 80) {
            recommendations.push({
                type: 'success',
                title: 'Strong Foundation',
                description: 'Your project has excellent potential. Consider moving quickly to prototype and validation.'
            });
        } else if (score >= 60) {
            recommendations.push({
                type: 'warning',
                title: 'Good Potential with Refinement',
                description: 'Your idea has merit. Focus on clarifying your value proposition and target market.'
            });
        } else {
            recommendations.push({
                type: 'info',
                title: 'Needs Development',
                description: 'Consider conducting more market research and refining your concept before proceeding.'
            });
        }

        // Industry-specific recommendations
        const industryAdvice = {
            'healthcare': 'Ensure compliance with health regulations (HIPAA, FDA) early in development.',
            'environment': 'Focus on measurable impact metrics and consider partnerships with environmental organizations.',
            'education': 'Validate with teachers and students early. Educational adoption can be slow but sticky.',
            'fintech': 'Regulatory compliance is crucial. Start with a narrow use case and expand.',
            'social-impact': 'Impact measurement is key. Consider B-Corp certification and social investment funding.'
        };

        if (industryAdvice[data.industry]) {
            recommendations.push({
                type: 'info',
                title: 'Industry-Specific Advice',
                description: industryAdvice[data.industry]
            });
        }

        // Budget recommendations
        if (data['budget-estimate'] === 'under-1k' || data['budget-estimate'] === '1k-5k') {
            recommendations.push({
                type: 'warning',
                title: 'Budget Considerations',
                description: 'Consider starting with an MVP to validate core assumptions before full development.'
            });
        }

        // Team recommendations
        if (data['team-size'] === 'solo') {
            recommendations.push({
                type: 'info',
                title: 'Solo Founder',
                description: 'Consider finding co-founders or key team members to complement your skills and share workload.'
            });
        }

        // Funding recommendations
        if (data['seeking-funding']) {
            recommendations.push({
                type: 'success',
                title: 'Funding Strategy',
                description: 'Prepare a strong pitch deck and consider starting with angel investors or accelerator programs.'
            });
        }

        return recommendations;
    }

    displayResults() {
        const resultsSection = document.getElementById('analysis-results');
        
        // Update feasibility score
        document.getElementById('feasibility-score').textContent = this.analysisData.feasibility;
        
        let explanation = '';
        if (this.analysisData.feasibility >= 80) {
            explanation = 'Your project shows strong potential with clear market demand and achievable technical requirements.';
        } else if (this.analysisData.feasibility >= 60) {
            explanation = 'Your project has good potential but may require refinement in certain areas.';
        } else {
            explanation = 'Your project needs further development and validation before moving forward.';
        }
        document.getElementById('feasibility-explanation').textContent = explanation;

        // Update market analysis
        document.getElementById('market-size').textContent = this.analysisData.market.size;
        document.getElementById('competition-level').textContent = this.analysisData.market.competition;
        document.getElementById('adoption-potential').textContent = this.analysisData.market.adoption;

        // Update technical analysis
        document.getElementById('complexity-level').textContent = this.analysisData.technical.complexity;
        document.getElementById('dev-time').textContent = this.analysisData.technical.timeline;
        document.getElementById('tech-risk').textContent = this.analysisData.technical.risk;

        // Update resource analysis
        document.getElementById('budget-estimate-result').textContent = this.analysisData.resources.budget;
        document.getElementById('team-size-result').textContent = this.analysisData.resources.teamSize;
        document.getElementById('skills-needed').textContent = this.analysisData.resources.skills;

        // Display recommendations
        this.displayRecommendations();

        // Show results
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    displayRecommendations() {
        const recommendationsList = document.getElementById('recommendations-list');
        recommendationsList.innerHTML = '';

        this.analysisData.recommendations.forEach(rec => {
            const recElement = document.createElement('div');
            recElement.className = `recommendation ${rec.type}`;
            recElement.innerHTML = `
                <div class="rec-icon">
                    <i class="fas ${this.getRecommendationIcon(rec.type)}"></i>
                </div>
                <div class="rec-content">
                    <h4>${rec.title}</h4>
                    <p>${rec.description}</p>
                </div>
            `;
            recommendationsList.appendChild(recElement);
        });
    }

    getRecommendationIcon(type) {
        const icons = {
            'success': 'fa-check-circle',
            'warning': 'fa-exclamation-triangle',
            'info': 'fa-info-circle',
            'error': 'fa-times-circle'
        };
        return icons[type] || 'fa-info-circle';
    }
}

// Initialize the analyzer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ProjectAnalyzer();
});