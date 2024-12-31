// routes/resume.js
import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import Resume from '../models/resume.model.js';
import authenticate from '../middleware/authMiddleware.js';
import { GoogleGenerativeAI } from "@google/generative-ai";
import pdfParse from 'pdf-parse';
dotenv.config();
const genAI = new GoogleGenerativeAI("GEMINI_API_KEY");

const router = express.Router();

// Setup multer for file uploading
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Store in an 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname); // Add timestamp to filename
  },
});

const upload = multer({ storage: storage });

// Upload Resume Route
router.post('/upload', authenticate, upload.single('resume'), async (req, res) => {
  const userId = req.user.userId;
  const resumePath = req.file.path;

  try {
    const resumeBuffer = req.file.buffer;
    const resumeText = await pdfParse(resumeBuffer).then(data => data.text);
    let resume = new Resume({
      userId,
      resumeText, // Store the parsed resume text
    });

    await resume.save();

    // Call the Generate_AI_response function
    const jobDescription = "Your job description here"; // Replace with actual job description
    const aiResponse = await Generate_AI_response(resumeText, jobDescription);
    
    res.json({ msg: 'Resume uploaded and analyzed successfully', aiResponse });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Optimize Resume Route (dummy optimization logic)
router.post('/optimize', authenticate, async (req, res) => {
  const userId = req.user.userId;

  try {
    const resume = await Resume.findOne({ userId }).sort({ createdAt: -1 });
    if (!resume) return res.status(400).json({ msg: 'No resume found' });

    // Dummy optimization: just adding a message to simulate optimization
    resume.optimizedResume = 'Optimized version of the resume...';
    await resume.save();

    res.json({ optimizedResume: resume.optimizedResume });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


async function Generate_AI_response(resumetext,jobdesc){
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = "Given the resume text and job description , I want you to analyze the resume of the candidate and give detailed analysis of the resume in points and whether it is in accordance of the job description given.In the analysis I want you (who is an expert resume reviewer) to include the points in resume which align with the job description, extra points which can be included to tailor the resume according to the job (eg courses to take, projects to do, experiences to gain, positions etc), these are the points the candidate needs to improve upon. Here is the Resume: "+resumetext+" Here is the job description: "+jobdesc;
  const result = await model.generateContent(prompt);
  console.log(result.response.text());
}

export default router;
