const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const db = require('../models');
const User = db.users;

// Get preferences
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findByPk(req.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const { preferences = { categories: [], languages: [] } } = user;
        res.json({ preferences });
    } catch (error) {
        res.status(500).json({ message: "Failed to get preferences", error: error.message });
    }
});

// Update preferences
router.put('/', auth, async (req, res) => {
    console.log('====================================');
    console.log(req.body);
    console.log('====================================');
    const { categories = [], languages = [] } = req.body;

    try {
        const user = await User.findByPk(req.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Optional: validate types
        if (!Array.isArray(categories) || !Array.isArray(languages)) {
            return res.status(400).json({ message: "categories and languages must be arrays." });
        }

        user.preferences = { categories, languages };
        await user.save();

        res.json({ message: "Preferences updated", preferences: user.preferences });
    } catch (error) {
        res.status(500).json({ message: "Failed to update preferences", error: error.message });
    }
});

module.exports = router;
