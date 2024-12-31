 // Resume Schema
import mongoose from "mongoose";

 const resumeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    resumeText: { type: String, required: true },
    optimizedResume: { type: String },
  });
  const Resume = mongoose.model('Resume', resumeSchema);



  export default Resume;
  