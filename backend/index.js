const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple '/' route
app.get('/', (req, res) => {
  res.send('Welcome to Loan Connect Hub API');
});
// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);

// Database initialization
const pool = require('./config/db');

// Initialize DB tables if they don't exist
const initDb = async () => {
  try {
    const connection = await pool.getConnection();
    
    try {
      // Check if borrower table exists
      const [borrowerExists] = await connection.execute(`
        SELECT COUNT(*) as count FROM information_schema.tables 
        WHERE table_schema = ? AND table_name = 'borrower'
      `, [process.env.DB_NAME]);
      
      if (borrowerExists[0].count === 0) {
        // Create borrower table
        await connection.execute(`
          CREATE TABLE borrower (
            borrower_id     INT PRIMARY KEY AUTO_INCREMENT,
            name            VARCHAR(100) NOT NULL,
            number          VARCHAR(15) NOT NULL,
            aadhar_id       VARCHAR(12) NOT NULL UNIQUE,
            pan_no          VARCHAR(10) NOT NULL UNIQUE,
            profession      VARCHAR(50),
            email           VARCHAR(100) UNIQUE,
            firebase_uid    VARCHAR(128) UNIQUE,
            created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `);
        console.log('Borrower table created');
      }
      
      // Check if lender table exists
      const [lenderExists] = await connection.execute(`
        SELECT COUNT(*) as count FROM information_schema.tables 
        WHERE table_schema = ? AND table_name = 'lender'
      `, [process.env.DB_NAME]);
      
      if (lenderExists[0].count === 0) {
        // Create lender table
        await connection.execute(`
          CREATE TABLE lender (
            lender_id       INT PRIMARY KEY AUTO_INCREMENT,
            name            VARCHAR(100) NOT NULL,
            number          VARCHAR(15) NOT NULL,
            aadhar_id       VARCHAR(12) NOT NULL UNIQUE,
            pan_no          VARCHAR(10) NOT NULL UNIQUE,
            profession      VARCHAR(50),
            email           VARCHAR(100) UNIQUE,
            firebase_uid    VARCHAR(128) UNIQUE,
            created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `);
        console.log('Lender table created');
      }
      
      // Check if loan_request table exists
      const [loanRequestExists] = await connection.execute(`
        SELECT COUNT(*) as count FROM information_schema.tables 
        WHERE table_schema = ? AND table_name = 'loan_request'
      `, [process.env.DB_NAME]);
      
      if (loanRequestExists[0].count === 0) {
        // Create loan_request table
        await connection.execute(`
          CREATE TABLE loan_request (
            request_id         INT PRIMARY KEY AUTO_INCREMENT,
            borrower_id        INT NOT NULL,
            amount_requested   DECIMAL(10, 2) NOT NULL,
            reason             TEXT,
            duration_months    INT NOT NULL,
            status             ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
            created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            
            FOREIGN KEY (borrower_id) REFERENCES borrower(borrower_id)
          )
        `);
        console.log('Loan Request table created');
      }
      
      // Check if approved_loan table exists
      const [approvedLoanExists] = await connection.execute(`
        SELECT COUNT(*) as count FROM information_schema.tables 
        WHERE table_schema = ? AND table_name = 'approved_loan'
      `, [process.env.DB_NAME]);
      
      if (approvedLoanExists[0].count === 0) {
        // Create approved_loan table
        await connection.execute(`
          CREATE TABLE approved_loan (
            loan_id           INT PRIMARY KEY AUTO_INCREMENT,
            request_id        INT NOT NULL,
            borrower_id       INT NOT NULL,
            lender_id         INT NOT NULL,
            amount_approved   DECIMAL(10, 2) NOT NULL,
            interest_rate     DECIMAL(5, 2) NOT NULL,
            approved_date     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            status            ENUM('active', 'repaid', 'defaulted') DEFAULT 'active',
          
            FOREIGN KEY (request_id) REFERENCES loan_request(request_id),
            FOREIGN KEY (borrower_id) REFERENCES borrower(borrower_id),
            FOREIGN KEY (lender_id) REFERENCES lender(lender_id)
          )
        `);
        console.log('Approved Loan table created');
      }
      
      // Check if emi table exists
      const [emiExists] = await connection.execute(`
        SELECT COUNT(*) as count FROM information_schema.tables 
        WHERE table_schema = ? AND table_name = 'emi'
      `, [process.env.DB_NAME]);
      
      if (emiExists[0].count === 0) {
        // Create emi table
        await connection.execute(`
          CREATE TABLE emi (
            emi_id            INT AUTO_INCREMENT PRIMARY KEY,
            loan_id           INT NOT NULL,
            borrower_id       INT NOT NULL,
            emi_amount        DECIMAL(10,2) NOT NULL,
            due_date          DATE NOT NULL,
            payment_status    ENUM('Paid', 'Unpaid', 'Overdue') DEFAULT 'Unpaid',
            payment_date      DATE,
            late_fee          DECIMAL(10,2) DEFAULT 0.00,
            created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            
            FOREIGN KEY (loan_id) REFERENCES approved_loan(loan_id),
            FOREIGN KEY (borrower_id) REFERENCES borrower(borrower_id)
          )
        `);
        console.log('EMI table created');
      }
      
      // Check if chat table exists
      const [chatExists] = await connection.execute(`
        SELECT COUNT(*) as count FROM information_schema.tables 
        WHERE table_schema = ? AND table_name = 'chat'
      `, [process.env.DB_NAME]);
      
      if (chatExists[0].count === 0) {
        // Create chat table
        await connection.execute(`
          CREATE TABLE chat (
            chat_id           INT PRIMARY KEY AUTO_INCREMENT,
            borrower_id       INT NOT NULL,
            lender_id         INT NOT NULL,
            loan_id           INT,
            created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            
            FOREIGN KEY (borrower_id) REFERENCES borrower(borrower_id),
            FOREIGN KEY (lender_id) REFERENCES lender(lender_id),
            FOREIGN KEY (loan_id) REFERENCES approved_loan(loan_id)
          )
        `);
        console.log('Chat table created');
      }
      
      // Check if chat_message table exists
      const [chatMessageExists] = await connection.execute(`
        SELECT COUNT(*) as count FROM information_schema.tables 
        WHERE table_schema = ? AND table_name = 'chat_message'
      `, [process.env.DB_NAME]);
      
      if (chatMessageExists[0].count === 0) {
        // Create chat_message table
        await connection.execute(`
          CREATE TABLE chat_message (
            message_id        INT PRIMARY KEY AUTO_INCREMENT,
            chat_id           INT NOT NULL,
            sender_type       ENUM('borrower', 'lender') NOT NULL,
            sender_id         INT NOT NULL,
            message           TEXT NOT NULL,
            read_status       BOOLEAN DEFAULT FALSE,
            created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            
            FOREIGN KEY (chat_id) REFERENCES chat(chat_id)
          )
        `);
        console.log('Chat Message table created');
      }
      
    } finally {
      connection.release();
    }
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    process.exit(1);
  }
};

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await initDb();
});