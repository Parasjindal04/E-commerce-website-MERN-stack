import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { z } from "zod";
import jwt from "jsonwebtoken";



export const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const userSchema = z.object({
        firstName: z.string().min(3, { message: "First name is required" }),
        lastName: z.string().min(3, { message: "Last name is required" }),
        email: z.string().email(),
        password: z.string().min(6, { message: "Password must be at least 6 characters long" })
    })

    const validateData = userSchema.safeParse(req.body);
    if (!validateData.success) {
        return res.status(400).json({ errors: validateData.error.issues.map((err) => err.message) });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ errors: "User already exists" });
        }
        //creat new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully", newUser });
    } catch (error) {
        res.status(500).json({ errors: "Error in signup" });
        console.log("Error in user signup", error);
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ errors: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ errors: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ errors: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_USER_PASSWORD,
            { expiresIn: "1d" }
        );
        const cookieOptions = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict"
        };
        res.cookie("jwt", token, cookieOptions);
        res.status(200).json({
            message: "Login successful",
            user,
            token
        });

    } catch (error) {
        console.log("Error in user login:", error);
        res.status(500).json({ errors: "Error in login" });
    }
};

export const logout = (req, res) => {
    try {

        res.clearCookie("jwt");
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ errors: "Error in logout" });
        console.log("Error in logout", error);
    }
};

import { Purchase } from "../models/purchase.model.js";
import { Course } from "../models/course.model.js";
import mongoose from "mongoose";

export const purchases = async (req, res) => {
  const userId = req.userId; // from JWT

  try {
    // Convert userId to ObjectId to match MongoDB type
    const purchased = await Purchase.find({ userId: mongoose.Types.ObjectId(userId) }).populate("courseId");

    // Extract course data
    const courses = purchased.map(p => p.courseId);

    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error in fetching purchased courses:", error);
    res.status(500).json({ errors: "Error in fetching purchased courses" });
  }
};