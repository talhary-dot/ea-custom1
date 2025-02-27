import express from "express";
import jwt from "jsonwebtoken";
import 'dotenv/config';
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET_KEY
const email_secret = process.env.EMAIL
const pass_secret = process.env.PASS

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email_secret !==email || pass_secret !== password) 
        return res.json({message:"not matched"}).status(500)
    const token = jwt.sign({email:email_secret, userId: '12345678' }, JWT_SECRET, {
      expiresIn: "30d",
    });
    res.status(200).json({ message: "User logged in successfully!", token });
  } catch (err) {
    res.status(500).send("Error logging in user");
  }
});
export default router;