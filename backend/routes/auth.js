const express = require('express');
const router = express.Router();
//const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const pool = require('../config/db');
const admin = require('../config/firebase-admin');
/*
// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFileName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});*/

// Stage 1: Store basic user information
router.post('/register/:userType',  async (req, res) => {
  try {
    const { name, phone, aadhar, pan, profession } = req.body;
    const { userType } = req.params;
    const photoPath = req.file ? req.file.path : null;
    
    // Validate user type
    if (userType !== 'borrower' && userType !== 'lender') {
      return res.status(400).json({ error: 'Invalid user type' });
    }
    
    // Generate a unique session ID for tracking this registration
    const sessionId = uuidv4();
    
    // Select the appropriate table based on user type
    const tableName = userType === 'borrower' ? 'borrower' : 'lender';
    
    // Store user data without email and password (will be added after Firebase auth)
    const connection = await pool.getConnection();
    
    try {
      // Read the file as binary data
      let photoBlob = null;
      if (photoPath) {
        photoBlob = await fs.readFile(photoPath);
      }
      
      const [result] = await connection.execute(
        `INSERT INTO ${tableName} (name, number, aadhar_id, pan_no, profession, photo) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [name, phone, aadhar, pan, profession, photoBlob]
      );
      
      // Store the user ID in the session for the second stage
      const userId = result.insertId;
      
      res.status(201).json({ 
        success: true, 
        message: 'Basic information stored successfully',
        sessionId: sessionId,
        userId: userId,
        userType: userType
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
});

// Stage 2: Update user with Firebase auth email
router.post('/complete-registration', async (req, res) => {
  try {
    const { userId, userType, email, firebaseUid } = req.body;
    
    // Validate user type
    if (userType !== 'borrower' && userType !== 'lender') {
      return res.status(400).json({ error: 'Invalid user type' });
    }
    
    // Select the appropriate table based on user type
    const tableName = userType === 'borrower' ? 'borrower' : 'lender';
    const idField = userType === 'borrower' ? 'borrower_id' : 'lender_id';
    
    // Update user with email from Firebase
    const connection = await pool.getConnection();
    
    try {
      await connection.execute(
        `UPDATE ${tableName} SET email = ?, firebase_uid = ? WHERE ${idField} = ?`,
        [email, firebaseUid, userId]
      );
      
      res.status(200).json({ 
        success: true, 
        message: 'Registration completed successfully',
        userId: userId,
        userType: userType
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Complete registration error:', error);
    res.status(500).json({ error: 'Failed to complete registration', details: error.message });
  }
});

// Verify if user exists in the database
router.post('/verify-user', async (req, res) => {
  try {
    const { email, firebaseUid, userType } = req.body;
    
    // Validate user type
    if (userType !== 'borrower' && userType !== 'lender') {
      return res.status(400).json({ error: 'Invalid user type' });
    }
    
    // Select the appropriate table based on user type
    const tableName = userType === 'borrower' ? 'borrower' : 'lender';
    const idField = userType === 'borrower' ? 'borrower_id' : 'lender_id';
    
    // Check if user exists
    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.execute(
        `SELECT ${idField}, name, email FROM ${tableName} WHERE email = ? OR firebase_uid = ?`,
        [email, firebaseUid]
      );
      
      if (rows.length > 0) {
        res.status(200).json({ 
          success: true, 
          message: 'User verified successfully',
          userId: rows[0][idField],
          name: rows[0].name,
          email: rows[0].email,
          userType: userType
        });
      } else {
        res.status(404).json({ 
          success: false, 
          message: 'User not found'
        });
      }
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('User verification error:', error);
    res.status(500).json({ error: 'Failed to verify user', details: error.message });
  }
});

// Route to verify token from Firebase
router.post('/verify-token', async (req, res) => {
  try {
    const { idToken } = req.body;
    
    // Verify the ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    res.status(200).json({ 
      success: true,
      uid: decodedToken.uid,
      email: decodedToken.email
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Unauthorized', details: error.message });
  }
});

module.exports = router;