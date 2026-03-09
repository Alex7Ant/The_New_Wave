const express = require('express');
const User = require('../db/models/User');
const Mentor = require('../db/models/Mentor');
const { aiService } = require('../services/aiService');
const { body, validationResult } = require('express-validator');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Get AI-powered mentor recommendations
router.get('/recommendations', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Get AI-powered mentor recommendations
        const recommendations = await aiService.getMentorRecommendations({
            userInterests: user.interests,
            skillLevel: user.skillLevel,
            goals: user.goals,
            location: user.country,
            projectIdea: user.projectIdea
        });

        // Fetch actual mentor profiles
        const mentorProfiles = await Mentor.find({
            _id: { $in: recommendations.mentorIds }
        }).populate('userId', 'fullName profile');

        // Enhance with AI matching scores
        const enhancedMentors = mentorProfiles.map(mentor => {
            const aiData = recommendations.matches.find(m => m.mentorId.equals(mentor._id));
            return {
                ...mentor.toObject(),
                aiMatch: {
                    score: aiData?.matchScore || 0,
                    reasons: aiData?.matchReasons || [],
                    compatibility: aiData?.compatibility || {},
                    estimatedImpact: aiData?.estimatedImpact || 'Medium'
                }
            };
        });

        res.json({
            message: 'Mentor recommendations generated successfully',
            mentors: enhancedMentors,
            totalMatches: enhancedMentors.length,
            aiInsights: recommendations.insights
        });

    } catch (error) {
        console.error('Mentor recommendation error:', error);
        res.status(500).json({ message: 'Error generating mentor recommendations' });
    }
});

// Send mentorship request
router.post('/request', authenticateToken, [
    body('mentorId').notEmpty().withMessage('Mentor ID is required'),
    body('message').isLength({ min: 50, max: 500 }).withMessage('Message must be 50-500 characters'),
    body('sessionType').isIn(['one-time', 'ongoing', 'project-based']).withMessage('Invalid session type'),
    body('availability').isArray().withMessage('Availability must be an array')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { mentorId, message, sessionType, availability, projectDetails } = req.body;

        // Check if mentor exists and is available
        const mentor = await Mentor.findById(mentorId).populate('userId');
        if (!mentor || !mentor.available) {
            return res.status(400).json({ message: 'Mentor not available' });
        }

        // Check if user already has a pending request with this mentor
        const existingRequest = await MentorshipRequest.findOne({
            menteeId: req.user.userId,
            mentorId: mentorId,
            status: 'pending'
        });

        if (existingRequest) {
            return res.status(400).json({ message: 'You already have a pending request with this mentor' });
        }

        // Create mentorship request
        const mentorshipRequest = new MentorshipRequest({
            menteeId: req.user.userId,
            mentorId: mentorId,
            message,
            sessionType,
            availability,
            projectDetails,
            status: 'pending',
            createdAt: new Date()
        });

        await mentorshipRequest.save();

        // Send notification to mentor (would integrate with email/notification service)
        // await notificationService.sendMentorshipRequest(mentor.userId.email, mentorshipRequest);

        // Generate AI-powered conversation starters
        const conversationStarters = await aiService.generateConversationStarters({
            mentorExpertise: mentor.expertise,
            menteeGoals: req.body.goals,
            projectType: projectDetails?.type
        });

        res.status(201).json({
            message: 'Mentorship request sent successfully',
            requestId: mentorshipRequest._id,
            conversationStarters: conversationStarters,
            estimatedResponseTime: '24-48 hours'
        });

    } catch (error) {
        console.error('Mentorship request error:', error);
        res.status(500).json({ message: 'Error sending mentorship request' });
    }
});

// Get mentorship sessions for user
router.get('/sessions', authenticateToken, async (req, res) => {
    try {
        const { status, type, page = 1, limit = 10 } = req.query;
        
        const query = {
            $or: [
                { menteeId: req.user.userId },
                { 'mentor.userId': req.user.userId }
            ]
        };

        if (status) {
            query.status = status;
        }
        if (type) {
            query.sessionType = type;
        }

        const sessions = await MentorshipSession.find(query)
            .populate('menteeId', 'fullName profile')
            .populate('mentorId', 'userId expertise specializations')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await MentorshipSession.countDocuments(query);

        // Add AI-generated session insights
        const sessionsWithInsights = await Promise.all(
            sessions.map(async (session) => {
                const insights = await aiService.generateSessionInsights(session);
                return {
                    ...session.toObject(),
                    aiInsights: insights
                };
            })
        );

        res.json({
            sessions: sessionsWithInsights,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });

    } catch (error) {
        console.error('Sessions fetch error:', error);
        res.status(500).json({ message: 'Error fetching mentorship sessions' });
    }
});

// Schedule mentorship session
router.post('/schedule', authenticateToken, [
    body('mentorId').notEmpty().withMessage('Mentor ID is required'),
    body('scheduledTime').isISO8601().withMessage('Valid date/time is required'),
    body('duration').isInt({ min: 30, max: 180 }).withMessage('Duration must be 30-180 minutes'),
    body('agenda').isLength({ min: 20, max: 300 }).withMessage('Agenda must be 20-300 characters'),
    body('sessionType').isIn(['video', 'phone', 'chat']).withMessage('Invalid session type')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { mentorId, scheduledTime, duration, agenda, sessionType, goals } = req.body;

        // Verify mentor availability
        const mentor = await Mentor.findById(mentorId);
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }

        // Check if time slot is available
        const conflictingSession = await MentorshipSession.findOne({
            mentorId: mentorId,
            scheduledTime: {
                $gte: new Date(scheduledTime),
                $lt: new Date(new Date(scheduledTime).getTime() + duration * 60000)
            },
            status: { $in: ['scheduled', 'in_progress'] }
        });

        if (conflictingSession) {
            return res.status(400).json({ message: 'Time slot not available' });
        }

        // Create session
        const session = new MentorshipSession({
            menteeId: req.user.userId,
            mentorId: mentorId,
            scheduledTime: new Date(scheduledTime),
            duration,
            agenda,
            sessionType,
            goals: goals || [],
            status: 'scheduled',
            createdAt: new Date()
        });

        await session.save();

        // Generate AI-powered pre-session preparation
        const preparation = await aiService.generateSessionPreparation({
            mentorExpertise: mentor.expertise,
            sessionGoals: goals,
            agenda: agenda,
            menteeLevel: req.user.skillLevel
        });

        // Create calendar invite (would integrate with calendar service)
        // await calendarService.createInvite(session);

        res.status(201).json({
            message: 'Mentorship session scheduled successfully',
            session: session,
            preparation: preparation,
            meetingLink: `${process.env.FRONTEND_URL}/meeting/${session._id}`
        });

    } catch (error) {
        console.error('Session scheduling error:', error);
        res.status(500).json({ message: 'Error scheduling mentorship session' });
    }
});

// Submit session feedback
router.post('/feedback/:sessionId', authenticateToken, [
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be 1-5'),
    body('feedback').isLength({ min: 10, max: 500 }).withMessage('Feedback must be 10-500 characters'),
    body('goals_achieved').isArray().withMessage('Goals achieved must be an array'),
    body('next_steps').optional().isLength({ max: 300 }).withMessage('Next steps must be max 300 characters')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { sessionId } = req.params;
        const { rating, feedback, goals_achieved, next_steps, would_recommend } = req.body;

        const session = await MentorshipSession.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        // Verify user was part of this session
        if (!session.menteeId.equals(req.user.userId) && !session.mentorId.equals(req.user.userId)) {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Determine feedback type
        const feedbackType = session.menteeId.equals(req.user.userId) ? 'mentee_feedback' : 'mentor_feedback';

        // Update session with feedback
        const feedbackData = {
            rating,
            feedback,
            goals_achieved,
            next_steps,
            would_recommend,
            submitted_at: new Date(),
            submitted_by: req.user.userId
        };

        session[feedbackType] = feedbackData;
        
        // Mark session as completed if both parties have given feedback
        if (session.mentee_feedback && session.mentor_feedback) {
            session.status = 'completed';
            
            // Update user and mentor statistics
            await updateUserStats(session.menteeId, 'session_completed');
            await updateMentorStats(session.mentorId, 'session_completed', rating);
        }

        await session.save();

        // Generate AI insights from feedback
        const insights = await aiService.analyzeFeedback({
            session: session,
            feedback: feedbackData,
            type: feedbackType
        });

        res.json({
            message: 'Feedback submitted successfully',
            insights: insights,
            sessionStatus: session.status
        });

    } catch (error) {
        console.error('Feedback submission error:', error);
        res.status(500).json({ message: 'Error submitting feedback' });
    }
});

// Get mentor analytics (for mentors)
router.get('/analytics', authenticateToken, async (req, res) => {
    try {
        // Check if user is a mentor
        const mentor = await Mentor.findOne({ userId: req.user.userId });
        if (!mentor) {
            return res.status(403).json({ message: 'Access denied - mentors only' });
        }

        // Generate comprehensive analytics
        const analytics = await aiService.generateMentorAnalytics({
            mentorId: mentor._id,
            timeframe: req.query.timeframe || '3months'
        });

        res.json(analytics);

    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({ message: 'Error generating analytics' });
    }
});

// Helper function to update user stats
async function updateUserStats(userId, action) {
    const updateQuery = {};
    
    switch (action) {
        case 'session_completed':
            updateQuery.$inc = { 
                'profile.mentorshipSessions': 1,
                'profile.contributionScore': 10
            };
            break;
        case 'feedback_positive':
            updateQuery.$inc = { 
                'profile.reputation': 5
            };
            break;
    }
    
    await User.findByIdAndUpdate(userId, updateQuery);
}

// Helper function to update mentor stats
async function updateMentorStats(mentorId, action, rating = null) {
    const updateQuery = {};
    
    switch (action) {
        case 'session_completed':
            updateQuery.$inc = { 
                'statistics.totalSessions': 1,
                'statistics.totalRating': rating || 0
            };
            break;
    }
    
    await Mentor.findByIdAndUpdate(mentorId, updateQuery);
}

module.exports = router;