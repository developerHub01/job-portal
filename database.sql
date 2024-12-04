CREATE DATABASE job_portal;

USE job_portal;

-- Users Table
CREATE TABLE Users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Jobs Table (removed category_id)
CREATE TABLE Jobs (
  job_id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(255),
  salary DECIMAL(10, 2),
  user_id INT NOT NULL,  -- Creator of the job (employer or user)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Applications Table
CREATE TABLE Applications (
  application_id INT PRIMARY KEY AUTO_INCREMENT,
  job_id INT NOT NULL,
  user_id INT NOT NULL,  -- Applicant (user)
  status ENUM('applied', 'shortlisted', 'rejected', 'hired') DEFAULT 'applied',
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES Jobs(job_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Reviews Table (added)
CREATE TABLE Reviews (
  review_id INT PRIMARY KEY AUTO_INCREMENT,
  job_id INT NOT NULL,  -- The job being reviewed
  user_id INT NOT NULL,  -- The user giving the review
  rating INT NOT NULL,  -- Rating (e.g., 1 to 5 stars)
  comment TEXT,  -- Optional review comment
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES Jobs(job_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
