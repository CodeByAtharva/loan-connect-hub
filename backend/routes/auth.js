const express = require('express');
const router = express.Router();
//const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const pool = require('../config/db');
const admin = require('../config/firebase-admin');


// Input validation middleware
const validateRegistrationInput = (req, res, next) => {
  const { name, phone, aadhar, pan, profession } = req.body;
  const errors = {};

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }

  if (!phone || !/^\d{10}$/.test(phone)) {
    errors.phone = 'Phone number must be 10 digits';
  }

  if (!aadhar || !/^\d{12}$/.test(aadhar)) {
    errors.aadhar = 'Aadhar number must be 12 digits';
  }

  if (!pan || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)) {
    errors.pan = 'Invalid PAN format';
  }

  if (!profession || typeof profession !== 'string' || profession.trim().length < 2) {
    errors.profession = 'Profession is required';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ 
      success: false,
      errors 
    });
  }

  next();
};

// Add the missing endpoint for borrowers/signup
router.post('/borrowers/signup', validateRegistrationInput, async (req, res) => {
  try {
    const { name, phone, aadhar, pan, profession } = req.body;
    const userType = 'borrower';
   // const photoPath = req.file ? req.file.path : null;
    
    // Generate a unique session ID for tracking this registration
    const sessionId = uuidv4();
    
    // Select the appropriate table based on user type (always borrower for this endpoint)
    const tableName = 'borrower';
    
    const connection = await pool.getConnection();
    
    try {
      // Check if user already exists with same aadhar or pan
      const [existingUser] = await connection.execute(
        `SELECT * FROM ${tableName} WHERE aadhar_id = ? OR pan_no = ?`,
        [aadhar, pan]
      );

      if (existingUser.length > 0) {
        return res.status(409).json({
          success: false,
          error: 'User with this Aadhar or PAN already exists'
        });
      }

      // Read the file as binary data
      /*let photoBlob = null;
      if (photoPath) {
        photoBlob = await fs.readFile(photoPath);
      }
      */
      const [result] = await connection.execute(
        `INSERT INTO ${tableName} (name, number, aadhar_id, pan_no, profession) 
         VALUES (?, ?, ?, ?, ?)`,
        [name, phone, aadhar, pan, profession]
      );
      
      // Store the user ID in the session for the second stage
      const userId = result.insertId;
      
      res.status(201).json({ 
        success: true, 
        message: 'Basic information stored successfully',
        data: {
          sessionId,
          userId,
          userType
        }
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Registration failed',
      message: error.message 
    });
  }
});
router.post('/lenders/signup', validateRegistrationInput, async (req, res) => {
  try {
    const { name, phone, aadhar, pan, profession } = req.body;
    const userType = 'lender';
   // const photoPath = req.file ? req.file.path : null;
    
    // Generate a unique session ID for tracking this registration
    const sessionId = uuidv4();
    
    // Select the appropriate table based on user type (always borrower for this endpoint)
    const tableName = 'lender';
    
    const connection = await pool.getConnection();
    
    try {
      // Check if user already exists with same aadhar or pan
      const [existingUser] = await connection.execute(
        `SELECT * FROM ${tableName} WHERE aadhar_id = ? OR pan_no = ?`,
        [aadhar, pan]
      );

      if (existingUser.length > 0) {
        return res.status(409).json({
          success: false,
          error: 'User with this Aadhar or PAN already exists'
        });
      }

      // Read the file as binary data
      /*let photoBlob = null;
      if (photoPath) {
        photoBlob = await fs.readFile(photoPath);
      }
      */
      const [result] = await connection.execute(
        `INSERT INTO ${tableName} (name, number, aadhar_id, pan_no, profession) 
         VALUES (?, ?, ?, ?, ?)`,
        [name, phone, aadhar, pan, profession]
      );
      
      // Store the user ID in the session for the second stage
      const userId = result.insertId;
      
      res.status(201).json({ 
        success: true, 
        message: 'Basic information stored successfully',
        data: {
          sessionId,
          userId,
          userType
        }
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Registration failed',
      message: error.message 
    });
  }
});

// Stage 1: Store basic user information
router.post('/register/:userType', validateRegistrationInput, async (req, res) => {
  try {
    const { name, phone, aadhar, pan, profession } = req.body;
    const { userType } = req.params;
    const photoPath = req.file ? req.file.path : null;
    
    // Validate user type
    if (userType !== 'borrower' && userType !== 'lender') {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid user type. Must be either "borrower" or "lender"'
      });
    }
    
    // Generate a unique session ID for tracking this registration
    const sessionId = uuidv4();
    
    // Select the appropriate table based on user type
    const tableName = userType === 'borrower' ? 'borrower' : 'lender';
    
    const connection = await pool.getConnection();
    
    try {
      // Check if user already exists with same aadhar or pan
      const [existingUser] = await connection.execute(
        `SELECT * FROM ${tableName} WHERE aadhar_id = ? OR pan_no = ?`,
        [aadhar, pan]
      );

      if (existingUser.length > 0) {
        return res.status(409).json({
          success: false,
          error: 'User with this Aadhar or PAN already exists'
        });
      }

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
        data: {
          sessionId,
          userId,
          userType
        }
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Registration failed',
      message: error.message 
    });
  }
});

// Validate complete registration input
const validateCompleteRegistration = (req, res, next) => {
  const { userId, userType, email, firebaseUid } = req.body;
  const errors = {};

  if (!userId || typeof userId !== 'number') {
    errors.userId = 'Valid user ID is required';
  }

  if (!userType || !['borrower', 'lender'].includes(userType)) {
    errors.userType = 'User type must be either "borrower" or "lender"';
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Valid email address is required';
  }

  if (!firebaseUid || typeof firebaseUid !== 'string') {
    errors.firebaseUid = 'Valid Firebase UID is required';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ 
      success: false,
      errors 
    });
  }

  next();
};

// Stage 2: Update user with Firebase auth email
router.post('/complete-registration', validateCompleteRegistration, async (req, res) => {
  try {
    const { userId, userType, email, firebaseUid } = req.body;
    
    // Select the appropriate table based on user type
    const tableName = userType === 'borrower' ? 'borrower' : 'lender';
    const idField = userType === 'borrower' ? 'borrower_id' : 'lender_id';
    
    const connection = await pool.getConnection();
    
    try {
      // Check if email or firebaseUid already exists
      const [existingUser] = await connection.execute(
        `SELECT * FROM ${tableName} WHERE email = ? OR firebase_uid = ?`,
        [email, firebaseUid]
      );

      if (existingUser.length > 0) {
        return res.status(409).json({
          success: false,
          error: 'User with this email or Firebase UID already exists'
        });
      }

      // Update user with email from Firebase
      await connection.execute(
        `UPDATE ${tableName} SET email = ?, firebase_uid = ? WHERE ${idField} = ?`,
        [email, firebaseUid, userId]
      );
      
      res.status(200).json({ 
        success: true, 
        message: 'Registration completed successfully',
        data: {
          userId,
          userType
        }
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Complete registration error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to complete registration',
      message: error.message 
    });
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