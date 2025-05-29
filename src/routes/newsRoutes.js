const express = require('express');
const axios = require('axios');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const db = require('../models');
const User = db.users;

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findByPk(req.userId);
        console.log('====================================');
        console.log(user);
        console.log('====================================');
        if (!user || !user.preferences) {
            return res.status(400).json({ message: "User preferences not set." });
        }

        const { categories, languages } = user.preferences;

        if (!categories.length || !languages.length) {
            return res.status(400).json({ message: "Preferences are empty." });
        }

        // Use only the first language & category (simplified)
        const language = languages[0];
        const category = categories[0];

        const apiKey = process.env.NEWS_API_KEY; // Add your NewsAPI key in .env

        const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
            params: {
                language,
                category,
                apiKey,
                pageSize: 10
            }
        });

        return res.status(200).json(response.data.articles);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to fetch news", error: err.message });
    }
});

module.exports = router;
