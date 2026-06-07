import { Router } from "express";
import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import config from '../config/env.js';

export const register =  async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hash,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        username: newUser.username,
        email: newUser.email,
      },
    });

  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login attempt with email:", email);
    console.log(password ? "Password provided " + password : "No password provided");

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log("User found:", user);


    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Password match:", isMatch);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      config.jwtSecret,
      {
        expiresIn: config.jwtExpiresIn,
      }
    );


    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};


export default {
  register,
  login
};