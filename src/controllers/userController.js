const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const db = require("../models");

const User = db.users;

const validator = require("validator");

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required." });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long." });
        }

        const hashedPass = await bcrypt.hash(password, 12);
        const data = { name, email, password: hashedPass };

        const user = await User.create(data);
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        where: {
            email: email
        }
    });

    const isPassMatch = await bcrypt.compare(password, user.password);

    if (user && isPassMatch) {
        let token = jwt.sign({
            id: user.id
        }, process.env.secretKey,
            {
                expiresIn: 4 * 60 * 60
            }
        );

        res.cookie("jwt", token, { maxAge: 4 * 60 * 60, httpOnly: true });

        return res.status(200).json({ message: "Login success", token, user });
    } else {
        return res.status(401).json({ message: "Invalid credentials" });
    }
}

const logOut = (req, res) => {
    res.clearCookie('jwt');
    return res.status(200).send({ message: "Log out successfully!!" });
}

module.exports = {
    login,
    logOut,
    signUp
};