import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import bodyParser from 'body-parser';

// Initialize dotenv for environment variables
dotenv.config();
app.use(cors());

// Create an instance of Express
const app = express();

// Port setup
const PORT = process.env.PORT || 5000;

app.use(express.json());  //Its a middleware. allows us to accept JSON data in the request body(req.body)
// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// File upload configuration with Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });
  
  
  
 
  // Authentication Middleware
  const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send('Authentication required');
    
    try {
      const decoded = jwt.decode(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).send('Invalid token');
    }
  };

app.listen(port,()=>{
    connectDB();
    console.log(`Server started at http://localhost:${port}`);
})


/**
 * express: For setting up the server.
mongoose: For interacting with MongoDB.
jwt-simple: For JWT-based authentication.
multer: For handling file uploads.
axios: For API requests to Gemini API and Google AI Studio.
dotenv: For storing environment variables securely.
 */