const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    // Basic Project Information
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    shortDescription: {
        type: String,
        maxlength: 300,
        trim: true
    },
    
    // Project Classification
    category: {
        type: String,
        required: true,
        enum: [
            'climate-tech', 'ai-ml', 'health-tech', 'ed-tech', 'fintech',
            'social-impact', 'blockchain', 'iot', 'cybersecurity', 'robotics',
            'space-tech', 'biotech', 'clean-energy', 'transportation', 'agriculture',
            'smart-cities', 'accessibility', 'mental-health', 'sustainability'
        ]
    },
    tags: [{
        type: String,
        trim: true,
        maxlength: 50
    }],
    
    // Project Status & Phase
    status: {
        type: String,
        required: true,
        enum: ['ideation', 'planning', 'development', 'testing', 'launch', 'scaling', 'completed', 'paused', 'cancelled'],
        default: 'ideation'
    },
    phase: {
        type: String,
        enum: ['concept', 'mvp', 'prototype', 'beta', 'production'],
        default: 'concept'
    },
    visibility: {
        type: String,
        enum: ['public', 'private', 'team-only'],
        default: 'public'
    },
    
    // Team & Leadership
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    team: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: ['creator', 'co-founder', 'developer', 'designer', 'researcher', 'marketing', 'business', 'advisor', 'contributor']
        },
        permissions: {
            type: [String],
            enum: ['edit', 'invite', 'manage', 'admin'],
            default: ['edit']
        },
        joinedDate: {
            type: Date,
            default: Date.now
        },
        contributionScore: {
            type: Number,
            default: 0
        },
        isActive: {
            type: Boolean,
            default: true
        }
    }],
    
    // Project Requirements
    requiredSkills: [{
        skill: {
            type: String,
            required: true
        },
        level: {
            type: String,
            enum: ['beginner', 'intermediate', 'advanced', 'expert'],
            required: true
        },
        priority: {
            type: String,
            enum: ['critical', 'high', 'medium', 'low'],
            default: 'medium'
        },
        filled: {
            type: Boolean,
            default: false
        }
    }],
    teamSize: {
        target: {
            type: Number,
            min: 1,
            max: 50
        },
        current: {
            type: Number,
            default: 1
        }
    },
    
    // Project Goals & Impact
    problemStatement: {
        type: String,
        maxlength: 1000
    },
    solutionApproach: {
        type: String,
        maxlength: 1500
    },
    targetUsers: {
        primary: String,
        secondary: [String],
        demographics: {
            ageRange: String,
            geography: [String],
            interests: [String]
        }
    },
    impactGoals: {
        shortTerm: [String],
        longTerm: [String],
        metrics: [{
            name: String,
            target: String,
            timeline: String
        }]
    },
    
    // Technical Specifications
    technology: {
        stack: [String],
        platforms: [String],
        apis: [String],
        databases: [String],
        deployment: String
    },
    repository: {
        type: {
            type: String,
            enum: ['github', 'gitlab', 'bitbucket', 'other']
        },
        url: String,
        isPrivate: {
            type: Boolean,
            default: true
        }
    },
    
    // Timeline & Milestones
    timeline: {
        startDate: Date,
        targetLaunch: Date,
        estimatedDuration: String,
        currentMilestone: String
    },
    milestones: [{
        title: {
            type: String,
            required: true
        },
        description: String,
        dueDate: Date,
        status: {
            type: String,
            enum: ['pending', 'in-progress', 'completed', 'delayed'],
            default: 'pending'
        },
        assignedTo: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        completedDate: Date,
        completedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    
    // Resources & Support
    resources: {
        budget: {
            required: Number,
            secured: Number,
            currency: {
                type: String,
                default: 'USD'
            }
        },
        funding: {
            seeking: {
                type: Boolean,
                default: false
            },
            type: [String], // grants, investment, crowdfunding, etc.
            amount: Number,
            stage: String,
            applications: [{
                source: String,
                amount: Number,
                status: String,
                appliedDate: Date
            }]
        },
        mentorship: {
            seeking: {
                type: Boolean,
                default: false
            },
            areas: [String],
            currentMentors: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }]
        }
    },
    
    // AI Analysis & Insights
    aiAnalysis: {
        feasibilityScore: {
            type: Number,
            min: 0,
            max: 100
        },
        marketPotential: String,
        riskAssessment: [String],
        recommendations: [String],
        lastAnalyzed: Date,
        impactPrediction: {
            potentialReach: Number,
            timeToImpact: String,
            scalabilityScore: Number
        }
    },
    
    // Community Engagement
    community: {
        followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        likes: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            likedAt: {
                type: Date,
                default: Date.now
            }
        }],
        views: {
            type: Number,
            default: 0
        },
        shares: {
            type: Number,
            default: 0
        },
        collaborationRequests: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            message: String,
            requestedRole: String,
            status: {
                type: String,
                enum: ['pending', 'accepted', 'declined'],
                default: 'pending'
            },
            requestedAt: {
                type: Date,
                default: Date.now
            }
        }]
    },
    
    // Updates & Communication
    updates: [{
        title: String,
        content: String,
        type: {
            type: String,
            enum: ['progress', 'milestone', 'challenge', 'success', 'pivot', 'general']
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        postedAt: {
            type: Date,
            default: Date.now
        },
        media: [{
            type: String,
            url: String
        }],
        reactions: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            type: {
                type: String,
                enum: ['like', 'love', 'celebrate', 'support', 'insightful']
            }
        }],
        comments: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            content: String,
            postedAt: {
                type: Date,
                default: Date.now
            }
        }]
    }],
    
    // Success Metrics & Performance
    metrics: {
        usersReached: {
            type: Number,
            default: 0
        },
        signups: {
            type: Number,
            default: 0
        },
        activeUsers: {
            type: Number,
            default: 0
        },
        revenue: {
            type: Number,
            default: 0
        },
        socialImpact: {
            livesImproved: Number,
            environmentalBenefit: String,
            problemsSolved: Number
        },
        technicalMetrics: {
            codeCommits: Number,
            issuesResolved: Number,
            testCoverage: Number,
            performance: Number
        }
    },
    
    // Media & Assets
    media: {
        logo: String,
        banner: String,
        screenshots: [String],
        videos: [String],
        documents: [{
            name: String,
            url: String,
            type: String,
            uploadedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            uploadedAt: {
                type: Date,
                default: Date.now
            }
        }]
    },
    
    // External Links & Presence
    links: {
        website: String,
        demo: String,
        documentation: String,
        socialMedia: {
            twitter: String,
            facebook: String,
            linkedin: String,
            youtube: String
        },
        appStore: String,
        playStore: String
    },
    
    // Analytics & Tracking
    analytics: {
        pageViews: {
            type: Number,
            default: 0
        },
        uniqueVisitors: {
            type: Number,
            default: 0
        },
        engagementRate: {
            type: Number,
            default: 0
        },
        conversionRate: {
            type: Number,
            default: 0
        },
        lastUpdated: {
            type: Date,
            default: Date.now
        }
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for project health score
projectSchema.virtual('healthScore').get(function() {
    let score = 0;
    
    // Team activity (30%)
    const activeTeamMembers = this.team.filter(member => member.isActive).length;
    const teamScore = Math.min((activeTeamMembers / (this.teamSize.target || 5)) * 30, 30);
    score += teamScore;
    
    // Progress tracking (25%)
    const completedMilestones = this.milestones.filter(m => m.status === 'completed').length;
    const totalMilestones = this.milestones.length || 1;
    const progressScore = (completedMilestones / totalMilestones) * 25;
    score += progressScore;
    
    // Community engagement (25%)
    const engagementScore = Math.min((this.community.followers.length / 10) * 25, 25);
    score += engagementScore;
    
    // Recent activity (20%)
    const lastUpdate = this.updates.length > 0 ? this.updates[this.updates.length - 1].postedAt : this.createdAt;
    const daysSinceUpdate = (Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24);
    const activityScore = daysSinceUpdate < 7 ? 20 : daysSinceUpdate < 14 ? 15 : daysSinceUpdate < 30 ? 10 : 5;
    score += activityScore;
    
    return Math.round(score);
});

// Virtual for completion percentage
projectSchema.virtual('completionPercentage').get(function() {
    if (this.milestones.length === 0) return 0;
    
    const completedMilestones = this.milestones.filter(m => m.status === 'completed').length;
    return Math.round((completedMilestones / this.milestones.length) * 100);
});

// Virtual for funding percentage
projectSchema.virtual('fundingPercentage').get(function() {
    if (!this.resources.budget.required) return 100;
    
    return Math.round((this.resources.budget.secured / this.resources.budget.required) * 100);
});

// Virtual for team capacity
projectSchema.virtual('teamCapacity').get(function() {
    const activeMembers = this.team.filter(member => member.isActive).length;
    const targetSize = this.teamSize.target || activeMembers;
    
    return {
        current: activeMembers,
        target: targetSize,
        percentage: Math.round((activeMembers / targetSize) * 100),
        openPositions: Math.max(targetSize - activeMembers, 0)
    };
});

// Indexes for efficient querying
projectSchema.index({ creator: 1 });
projectSchema.index({ category: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ 'team.userId': 1 });
projectSchema.index({ tags: 1 });
projectSchema.index({ 'community.followers': 1 });
projectSchema.index({ createdAt: -1 });
projectSchema.index({ 'aiAnalysis.feasibilityScore': -1 });
projectSchema.index({ visibility: 1, status: 1 });

// Text search index
projectSchema.index({
    title: 'text',
    description: 'text',
    tags: 'text',
    problemStatement: 'text'
});

// Static methods
projectSchema.statics.findByCategory = function(category) {
    return this.find({ 
        category: category,
        visibility: 'public',
        status: { $nin: ['cancelled', 'completed'] }
    });
};

projectSchema.statics.findActiveProjects = function() {
    return this.find({
        status: { $in: ['development', 'testing', 'launch'] },
        visibility: 'public'
    });
};

projectSchema.statics.findProjectsNeedingHelp = function() {
    return this.find({
        'teamSize.current': { $lt: this.teamSize.target },
        status: { $in: ['planning', 'development'] },
        visibility: 'public'
    });
};

projectSchema.statics.searchProjects = function(query) {
    return this.find(
        { $text: { $search: query } },
        { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } });
};

// Instance methods
projectSchema.methods.addTeamMember = function(userId, role, permissions = ['edit']) {
    // Check if user is already a team member
    const existingMember = this.team.find(member => member.userId.equals(userId));
    if (existingMember) {
        throw new Error('User is already a team member');
    }
    
    this.team.push({
        userId,
        role,
        permissions,
        joinedDate: new Date(),
        contributionScore: 0,
        isActive: true
    });
    
    this.teamSize.current += 1;
    return this.save();
};

projectSchema.methods.removeTeamMember = function(userId) {
    this.team = this.team.filter(member => !member.userId.equals(userId));
    this.teamSize.current = Math.max(this.teamSize.current - 1, 1);
    return this.save();
};

projectSchema.methods.addMilestone = function(milestone) {
    this.milestones.push({
        ...milestone,
        status: 'pending'
    });
    return this.save();
};

projectSchema.methods.updateMilestone = function(milestoneId, updates) {
    const milestone = this.milestones.id(milestoneId);
    if (!milestone) {
        throw new Error('Milestone not found');
    }
    
    Object.assign(milestone, updates);
    
    if (updates.status === 'completed' && !milestone.completedDate) {
        milestone.completedDate = new Date();
    }
    
    return this.save();
};

projectSchema.methods.addUpdate = function(updateData) {
    this.updates.push({
        ...updateData,
        postedAt: new Date()
    });
    return this.save();
};

projectSchema.methods.canUserEdit = function(userId) {
    const teamMember = this.team.find(member => member.userId.equals(userId));
    return teamMember && 
           teamMember.isActive && 
           (teamMember.permissions.includes('edit') || teamMember.permissions.includes('admin'));
};

projectSchema.methods.canUserManage = function(userId) {
    const teamMember = this.team.find(member => member.userId.equals(userId));
    return teamMember && 
           teamMember.isActive && 
           (teamMember.permissions.includes('manage') || teamMember.permissions.includes('admin'));
};

projectSchema.methods.isUserFollowing = function(userId) {
    return this.community.followers.includes(userId);
};

module.exports = mongoose.model('Project', projectSchema);