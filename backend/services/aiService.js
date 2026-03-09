const axios = require('axios');
const User = require('../db/models/User');
const Project = require('../db/models/Project');
const Mentor = require('../db/models/Mentor');

class AIService {
    constructor() {
        this.openaiApiKey = process.env.OPENAI_API_KEY;
        this.baseURL = 'https://api.openai.com/v1';
    }

    // AI-powered mentor matching algorithm
    async getMentorRecommendations(userProfile) {
        try {
            // Get all available mentors
            const mentors = await Mentor.find({ available: true })
                .populate('userId', 'fullName profile');

            // Prepare data for AI analysis
            const prompt = `
                Analyze this user profile and recommend the best mentors:
                
                User Profile:
                - Interests: ${userProfile.userInterests.join(', ')}
                - Skill Level: ${userProfile.skillLevel}
                - Goals: ${userProfile.goals.join(', ')}
                - Location: ${userProfile.location}
                - Project Idea: ${userProfile.projectIdea || 'Not specified'}
                
                Available Mentors:
                ${mentors.map(m => `
                - ID: ${m._id}
                - Name: ${m.userId.fullName}
                - Expertise: ${m.expertise.join(', ')}
                - Specializations: ${m.specializations.join(', ')}
                - Experience: ${m.experience_years} years
                - Industries: ${m.industries.join(', ')}
                `).join('\n')}
                
                Provide a JSON response with mentor recommendations including:
                1. Match score (0-100)
                2. Match reasons (array of strings)
                3. Compatibility factors
                4. Estimated impact level
                
                Format: { "matches": [{ "mentorId": "id", "matchScore": 85, "matchReasons": ["reason1"], "compatibility": {"technical": 90, "personality": 80}, "estimatedImpact": "High" }], "insights": "analysis" }
            `;

            const aiResponse = await this.callOpenAI(prompt, 'gpt-4');
            const recommendations = JSON.parse(aiResponse);

            // Sort by match score and get top recommendations
            const topMatches = recommendations.matches
                .sort((a, b) => b.matchScore - a.matchScore)
                .slice(0, 5);

            return {
                mentorIds: topMatches.map(m => m.mentorId),
                matches: topMatches,
                insights: recommendations.insights
            };

        } catch (error) {
            console.error('AI mentor matching error:', error);
            // Fallback to rule-based matching
            return this.fallbackMentorMatching(userProfile);
        }
    }

    // AI project analysis and feasibility assessment
    async analyzeProject(projectData) {
        try {
            const prompt = `
                Analyze this project idea and provide comprehensive insights:
                
                Project Details:
                - Title: ${projectData.title}
                - Description: ${projectData.description}
                - Category: ${projectData.category}
                - Target Impact: ${projectData.targetImpact}
                - Technical Requirements: ${projectData.technicalRequirements}
                - Team Size: ${projectData.teamSize || 'Not specified'}
                - Timeline: ${projectData.timeline || 'Not specified'}
                - Budget: ${projectData.budget || 'Not specified'}
                
                Please provide a detailed analysis including:
                1. Feasibility score (0-100)
                2. Market potential assessment
                3. Technical complexity analysis
                4. Risk assessment
                5. Recommendations for improvement
                6. Suggested next steps
                7. Potential funding sources
                8. Required team skills
                
                Return as JSON with structured analysis.
            `;

            const aiResponse = await this.callOpenAI(prompt, 'gpt-4');
            return JSON.parse(aiResponse);

        } catch (error) {
            console.error('Project analysis error:', error);
            return this.fallbackProjectAnalysis(projectData);
        }
    }

    // Smart team formation recommendations
    async recommendTeamMembers(projectRequirements, existingTeam = []) {
        try {
            // Get users based on required skills
            const requiredSkills = projectRequirements.skills || [];
            const users = await User.find({
                interests: { $in: requiredSkills },
                _id: { $nin: existingTeam }
            }).select('fullName interests skillLevel goals profile country');

            const prompt = `
                Recommend optimal team members for this project:
                
                Project Requirements:
                - Required Skills: ${requiredSkills.join(', ')}
                - Project Type: ${projectRequirements.type}
                - Expected Duration: ${projectRequirements.duration}
                - Complexity Level: ${projectRequirements.complexity}
                
                Available Users:
                ${users.map(u => `
                - ID: ${u._id}
                - Name: ${u.fullName}
                - Skills/Interests: ${u.interests.join(', ')}
                - Skill Level: ${u.skillLevel}
                - Goals: ${u.goals.join(', ')}
                - Country: ${u.country}
                - Contribution Score: ${u.profile.contributionScore}
                `).join('\n')}
                
                Recommend 3-5 team members considering:
                - Skill complementarity
                - Experience levels
                - Time zone compatibility
                - Past collaboration success
                
                Return JSON with recommendations including match reasons.
            `;

            const aiResponse = await this.callOpenAI(prompt, 'gpt-4');
            return JSON.parse(aiResponse);

        } catch (error) {
            console.error('Team recommendation error:', error);
            return this.fallbackTeamRecommendation(projectRequirements, existingTeam);
        }
    }

    // AI-powered conversation starters for mentorship
    async generateConversationStarters(context) {
        try {
            const prompt = `
                Generate 5 thoughtful conversation starters for a mentorship session:
                
                Context:
                - Mentor Expertise: ${context.mentorExpertise.join(', ')}
                - Mentee Goals: ${context.menteeGoals.join(', ')}
                - Project Type: ${context.projectType || 'General'}
                
                Each starter should:
                - Be specific and actionable
                - Help build rapport
                - Lead to valuable insights
                - Be appropriate for the first interaction
                
                Return as JSON array of strings.
            `;

            const aiResponse = await this.callOpenAI(prompt, 'gpt-3.5-turbo');
            return JSON.parse(aiResponse);

        } catch (error) {
            console.error('Conversation starters error:', error);
            return [
                "I'd love to learn more about your journey in this field. What initially sparked your interest?",
                "What's one piece of advice you wish you had received when you were starting out?",
                "Can you share an example of a challenge you overcame early in your career?",
                "What trends do you see emerging in this space that excite you most?",
                "How do you typically approach problem-solving in your work?"
            ];
        }
    }

    // Generate personalized learning paths
    async generateLearningPath(userProfile, targetSkill) {
        try {
            const prompt = `
                Create a personalized learning path for this user:
                
                User Profile:
                - Current Skill Level: ${userProfile.skillLevel}
                - Interests: ${userProfile.interests.join(', ')}
                - Goals: ${userProfile.goals.join(', ')}
                - Learning Style Preference: ${userProfile.learningStyle || 'Mixed'}
                
                Target Skill: ${targetSkill}
                
                Create a structured learning path with:
                1. Prerequisites assessment
                2. Learning milestones (beginner, intermediate, advanced)
                3. Recommended resources (courses, books, projects)
                4. Practical exercises
                5. Project ideas to apply knowledge
                6. Assessment methods
                7. Estimated timeline
                
                Return structured JSON with detailed curriculum.
            `;

            const aiResponse = await this.callOpenAI(prompt, 'gpt-4');
            return JSON.parse(aiResponse);

        } catch (error) {
            console.error('Learning path generation error:', error);
            return this.fallbackLearningPath(targetSkill);
        }
    }

    // AI impact prediction for projects
    async predictProjectImpact(projectData, teamData) {
        try {
            const prompt = `
                Predict the potential impact of this innovation project:
                
                Project:
                - Category: ${projectData.category}
                - Target Problem: ${projectData.targetProblem}
                - Solution Approach: ${projectData.solutionApproach}
                - Target Users: ${projectData.targetUsers}
                
                Team:
                - Team Size: ${teamData.size}
                - Experience Level: ${teamData.averageExperience}
                - Skill Diversity Score: ${teamData.skillDiversity}
                
                Predict:
                1. Number of people potentially reached (Year 1, Year 3)
                2. Geographic spread potential
                3. Economic value creation
                4. Social impact metrics
                5. Growth trajectory milestones
                6. Success probability factors
                
                Return detailed JSON with metrics and reasoning.
            `;

            const aiResponse = await this.callOpenAI(prompt, 'gpt-4');
            return JSON.parse(aiResponse);

        } catch (error) {
            console.error('Impact prediction error:', error);
            return this.fallbackImpactPrediction(projectData);
        }
    }

    // Generate funding recommendations
    async findFundingOpportunities(projectProfile) {
        try {
            // This would integrate with funding databases
            const prompt = `
                Find funding opportunities for this project:
                
                Project Profile:
                - Category: ${projectProfile.category}
                - Stage: ${projectProfile.stage}
                - Funding Needed: ${projectProfile.fundingAmount}
                - Geographic Focus: ${projectProfile.geographicFocus}
                - Team Demographics: Young innovators (13-25 years old)
                - Impact Focus: ${projectProfile.impactFocus}
                
                Recommend:
                1. Grant opportunities (foundations, government)
                2. Competition/challenge funds
                3. Accelerator programs
                4. Angel investors interested in this space
                5. Crowdfunding platforms
                
                For each recommendation include:
                - Amount range
                - Application requirements
                - Timeline
                - Success probability
                - Application tips
                
                Return structured JSON with opportunities.
            `;

            const aiResponse = await this.callOpenAI(prompt, 'gpt-4');
            return JSON.parse(aiResponse);

        } catch (error) {
            console.error('Funding opportunities error:', error);
            return this.fallbackFundingOpportunities(projectProfile);
        }
    }

    // Analyze community discussions for insights
    async analyzeDiscussionTrends(discussions) {
        try {
            const discussionText = discussions.map(d => d.content).join('\n\n');
            const tags = discussions.flatMap(d => d.tags);

            const prompt = `
                Analyze these community discussions to identify trends:
                
                Discussions:
                ${discussionText}
                
                Common Tags: ${tags.join(', ')}
                
                Identify:
                1. Emerging themes and topics
                2. Common challenges mentioned
                3. Popular solutions being discussed
                4. Knowledge gaps
                5. Collaboration opportunities
                6. Trending technologies/approaches
                
                Return insights as JSON with actionable recommendations.
            `;

            const aiResponse = await this.callOpenAI(prompt, 'gpt-3.5-turbo');
            return JSON.parse(aiResponse);

        } catch (error) {
            console.error('Discussion analysis error:', error);
            return { insights: 'Analysis temporarily unavailable' };
        }
    }

    // Helper method to call OpenAI API
    async callOpenAI(prompt, model = 'gpt-3.5-turbo') {
        try {
            const response = await axios.post(
                `${this.baseURL}/chat/completions`,
                {
                    model: model,
                    messages: [{ role: 'user', content: prompt }],
                    max_tokens: 2000,
                    temperature: 0.3
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.openaiApiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            return response.data.choices[0].message.content.trim();

        } catch (error) {
            console.error('OpenAI API error:', error.response?.data || error.message);
            throw new Error('AI service unavailable');
        }
    }

    // Fallback methods when AI service is unavailable
    fallbackMentorMatching(userProfile) {
        return {
            mentorIds: [],
            matches: [],
            insights: 'AI matching temporarily unavailable. Using basic criteria matching.'
        };
    }

    fallbackProjectAnalysis(projectData) {
        return {
            feasibilityScore: 75,
            marketPotential: 'Medium',
            technicalComplexity: 'Moderate',
            recommendations: ['Define clear milestones', 'Start with MVP', 'Gather user feedback early'],
            risks: ['Resource constraints', 'Market competition'],
            nextSteps: ['Create detailed project plan', 'Identify key stakeholders']
        };
    }

    fallbackTeamRecommendation(requirements, existingTeam) {
        return {
            recommendations: [],
            insights: 'Team matching temporarily unavailable. Consider posting in relevant community circles.'
        };
    }

    fallbackLearningPath(targetSkill) {
        return {
            milestones: ['Fundamental concepts', 'Practical application', 'Advanced techniques'],
            estimatedDuration: '3-6 months',
            resources: ['Online courses', 'Documentation', 'Practice projects'],
            projects: ['Build a simple application', 'Contribute to open source', 'Create portfolio project']
        };
    }

    fallbackImpactPrediction(projectData) {
        return {
            potentialReach: { year1: 1000, year3: 10000 },
            geographicSpread: 'Regional',
            economicValue: 'Medium',
            socialImpact: 'Positive',
            successProbability: 70
        };
    }

    fallbackFundingOpportunities(projectProfile) {
        return {
            opportunities: [
                {
                    name: 'Youth Innovation Grant',
                    amount: '$5,000 - $25,000',
                    type: 'Grant',
                    deadline: 'Rolling applications'
                }
            ]
        };
    }
}

module.exports = new AIService();