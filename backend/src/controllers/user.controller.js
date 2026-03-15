import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "ALL DETAILS ARE IMPORTANT !!!!!!!" });
        }

        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({ message: "User Already Exists" });
        }

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false,
        });

        res.status(201).json({
            message: "User Registered Successfully",
            user: { id: user._id, email: user.email, username: user.username }
        });

    } catch (error) {
        res.status(500).json({ message: "Internal Server error", error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) return res.status(400).json({ message: "User not Found" });

        const isMatch = await user.comparePassword(password);  // ✅ fixed case
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        res.status(200).json({
            message: "User Logged in",
            user: {
                id: user._id,        // ✅ fixed
                email: user.email,
                username: user.username,
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message }); // ✅ fixed
    }
};

const logoutuser = async (req,res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({
            email
        });
        
        if(!user) return res.status(404).json ({
            message: "User not Found"
        });

        res.status(200).json({
            message: "Logout Successful"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Servor Error", error
        });
    }
}
export { registerUser,
    loginUser,
    logoutuser
 };