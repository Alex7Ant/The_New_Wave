const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // Basic Information
    fullName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    age: {
        type: Number,
        required: true,
        min: 13,
        max: 30
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    
    // Profile Information
    bio: {
        type: String,
        maxlength: 500,
        trim: true
    },
    avatar: {
        type: String,
        default: null
    },
    location: {
        city: String,
        state: String,
        timezone: String
    },
    
    // Innovation Interests & Goals
    interests: [{
        type: String,
        enum: [
            'climate-tech', 'ai-ml', 'health-tech', 'ed-tech', 'fintech',
            'social-impact', 'blockchain', 'iot', 'cybersecurity', 'robotics',
            'space-tech', 'biotech', 'clean-energy', 'transportation', 'agriculture'
        ]
    }],
    skillLevel: {
        type: String,
        required: true,
        enum: ['beginner', 'intermediate', 'advanced', 'expert']
    },
    goals: [{
        type: String,
        enum: [
            'learn-skills', 'find-mentor', 'build-project', 'join-team',
            'get-funding', 'make-impact', 'network', 'teach-others',
            'start-company', 'publish-research'
        ]
    }],
    projectIdea: {
        type: String,
        maxlength: 1000,
        trim: true
    },
    
    // Skills & Expertise
    skills: [{
        name: String,
        level: {
            type: String,
            enum: ['beginner', 'intermediate', 'advanced', 'expert']
        },
        verified: {
            type: Boolean,
            default: false
        },
        verifiedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    
    // Profile Statistics
    profile: {
        joinDate: {
            type: Date,
            default: Date.now
        },
        reputation: {
            type: Number,
            default: 0,
            min: 0
        },
        contributionScore: {
            type: Number,
            default: 0,
            min: 0
        },
        projectsCompleted: {
            type: Number,
            default: 0
        },
        mentorshipSessions: {
            type: Number,
            default: 0
        },
        innovationPoints: {
            type: Number,
            default: 0
        },
        impactScore: {
            type: Number,
            default: 0
        }
    },
    
    // Platform Activity
    activity: {
        lastLogin: {
            type: Date,
            default: Date.now
        },
        totalLogins: {
            type: Number,
            default: 1
        },
        postsCount: {
            type: Number,
            default: 0
        },
        commentsCount: {
            type: Number,
            default: 0
        },
        connectionsCount: {
            type: Number,
            default: 0
        }
    },
    
    // Preferences & Settings
    preferences: {
        notifications: {
            email: {
                type: Boolean,
                default: true
            },
            push: {
                type: Boolean,
                default: true
            },
            weeklyDigest: {
                type: Boolean,
                default: true
            },
            mentorshipUpdates: {
                type: Boolean,
                default: true
            },
            projectInvites: {
                type: Boolean,
                default: true
            }
        },
        privacy: {
            publicProfile: {
                type: Boolean,
                default: true
            },
            showEmail: {
                type: Boolean,
                default: false
            },
            showLocation: {
                type: Boolean,
                default: true
            },
            allowDirectMessages: {
                type: Boolean,
                default: true
            }
        },
        matchmaking: {
            enabled: {
                type: Boolean,
                default: true
            },
            preferredTeamSize: {
                type: String,
                enum: ['small', 'medium', 'large', 'any'],
                default: 'any'
            },
            timeCommitment: {
                type: String,
                enum: ['part-time', 'full-time', 'flexible'],
                default: 'flexible'
            },
            remoteWork: {
                type: Boolean,
                default: true
            }
        }
    },
    
    // Learning & Development
    learningPath: {
        currentlyLearning: [String],
        completedCourses: [{
            courseName: String,
            provider: String,
            completedDate: Date,
            certificateUrl: String
        }],
        learningGoals: [String],
        preferredLearningStyle: {
            type: String,
            enum: ['visual', 'auditory', 'kinesthetic', 'reading', 'mixed'],
            default: 'mixed'
        }
    },
    
    // Achievements & Badges
    achievements: [{
        title: String,
        description: String,
        badgeUrl: String,
        earnedDate: {
            type: Date,
            default: Date.now
        },
        category: {
            type: String,
            enum: ['innovation', 'collaboration', 'mentorship', 'impact', 'learning', 'leadership']
        }
    }],
    
    // Social Connections
    connections: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        connectionType: {
            type: String,
            enum: ['follower', 'following', 'mutual', 'collaborator', 'mentor', 'mentee'],
            default: 'follower'
        },
        connectedDate: {
            type: Date,
            default: Date.now
        },
        collaborationHistory: [{
            projectId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Project'
            },
            role: String
        }]
    }],
    
    // Innovation Projects
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }],
    
    // Mentorship
    mentorship: {
        isMentor: {
            type: Boolean,
            default: false
        },
        mentorProfile: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Mentor'
        },
        currentMentees: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        currentMentors: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        mentorshipHistory: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            type: {
                type: String,
                enum: ['mentor', 'mentee']
            },
            startDate: Date,
            endDate: Date,
            rating: {
                type: Number,
                min: 1,
                max: 5
            }
        }]
    },
    
    // AI & Analytics Data
    aiData: {
        personalityProfile: {
            type: Map,
            of: Number
        },
        skillAssessments: [{
            skill: String,
            score: Number,
            assessedDate: Date,
            assessmentType: String
        }],
        recommendationPreferences: {
            type: Map,
            of: mongoose.Schema.Types.Mixed
        },
        engagementPatterns: {
            activeHours: [Number],
            preferredInteractionTypes: [String],
            responseTimeAverage: Number
        }
    },
    
    // Verification & Trust
    verification: {
        emailVerified: {
            type: Boolean,
            default: false
        },
        phoneVerified: {
            type: Boolean,
            default: false
        },
        identityVerified: {
            type: Boolean,
            default: false
        },
        backgroundChecked: {
            type: Boolean,
            default: false
        },
        trustScore: {
            type: Number,
            default: 50,
            min: 0,
            max: 100
        }
    },
    
    // Account Management
    accountStatus: {
        type: String,
        enum: ['active', 'inactive', 'suspended', 'pending'],
        default: 'active'
    },
    suspensionReason: String,
    lastPasswordChange: {
        type: Date,
        default: Date.now
    },
    
    // External Integrations
    externalProfiles: {
        github: String,
        linkedin: String,
        twitter: String,
        personalWebsite: String,
        portfolioUrl: String
    }
}, {
    timestamps: true,
    toJSON: { 
        virtuals: true,
        transform: function(doc, ret) {
            delete ret.password;
            return ret;
        }
    },
    toObject: { 
        virtuals: true,
        transform: function(doc, ret) {
            delete ret.password;
            return ret;
        }
    }
});

// Virtual for full profile completion percentage
userSchema.virtual('profileCompletion').get(function() {
    let completionScore = 0;
    const totalFields = 15;
    
    // Basic info (required fields are already validated)
    if (this.fullName && this.email) completionScore += 2;
    if (this.bio) completionScore += 1;
    if (this.avatar) completionScore += 1;
    if (this.location && this.location.city) completionScore += 1;
    
    // Interests and goals
    if (this.interests && this.interests.length > 0) completionScore += 2;
    if (this.goals && this.goals.length > 0) completionScore += 2;
    if (this.projectIdea) completionScore += 1;
    
    // Skills
    if (this.skills && this.skills.length > 0) completionScore += 2;
    
    // External profiles
    if (this.externalProfiles) {
        const externalCount = Object.values(this.externalProfiles).filter(Boolean).length;
        if (externalCount > 0) completionScore += 1;
        if (externalCount >= 2) completionScore += 1;
    }
    
    // Learning path
    if (this.learningPath && this.learningPath.currentlyLearning && this.learningPath.currentlyLearning.length > 0) {
        completionScore += 1;
    }
    
    return Math.round((completionScore / totalFields) * 100);
});

// Virtual for user level based on contribution score
userSchema.virtual('userLevel').get(function() {
    const score = this.profile.contributionScore;
    if (score < 100) return 'Newcomer';
    if (score < 500) return 'Explorer';
    if (score < 1500) return 'Innovator';
    if (score < 5000) return 'Pioneer';
    if (score < 15000) return 'Leader';
    return 'Visionary';
});

// Virtual for impact rating
userSchema.virtual('impactRating').get(function() {
    const impact = this.profile.impactScore;
    if (impact < 50) return 'Emerging';
    if (impact < 200) return 'Growing';
    if (impact < 800) return 'Significant';
    if (impact < 2000) return 'High';
    return 'Transformational';
});

// Indexes for efficient querying
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ interests: 1 });
userSchema.index({ skillLevel: 1 });
userSchema.index({ country: 1 });
userSchema.index({ 'profile.contributionScore': -1 });
userSchema.index({ 'profile.reputation': -1 });
userSchema.index({ 'activity.lastLogin': -1 });
userSchema.index({ accountStatus: 1 });

// Pre-save middleware
userSchema.pre('save', function(next) {
    if (this.isModified('email')) {
        this.verification.emailVerified = false;
    }
    
    // Update activity stats
    if (this.isModified('activity.lastLogin')) {
        this.activity.totalLogins += 1;
    }
    
    next();
});

// Static methods
userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email: email.toLowerCase() });
};

userSchema.statics.findActiveUsers = function() {
    return this.find({ 
        accountStatus: 'active',
        'activity.lastLogin': { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    });
};

userSchema.statics.findByInterests = function(interests) {
    return this.find({ 
        interests: { $in: interests },
        accountStatus: 'active'
    });
};

// Instance methods
userSchema.methods.updateContributionScore = function(points) {
    this.profile.contributionScore += points;
    return this.save();
};

userSchema.methods.addAchievement = function(achievement) {
    this.achievements.push(achievement);
    return this.save();
};

userSchema.methods.canMentorOthers = function() {
    return this.profile.reputation >= 100 && 
           this.profile.contributionScore >= 500 && 
           this.verification.trustScore >= 70;
};

module.exports = mongoose.model('User', userSchema);