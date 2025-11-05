-- Equipment Lending Portal Database Schema
-- MySQL 8.0+

-- Create database
CREATE DATABASE IF NOT EXISTS equipment_lending_db;
USE equipment_lending_db;

-- Drop tables if they exist (for clean recreation)
DROP TABLE IF EXISTS borrow_requests;
DROP TABLE IF EXISTS equipment;
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role ENUM('STUDENT', 'STAFF', 'ADMIN') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create equipment table
CREATE TABLE equipment (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    quantity INT NOT NULL DEFAULT 1,
    available_qty INT NOT NULL DEFAULT 1,
    `condition` VARCHAR(50) NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_available (available_qty),
    CHECK (available_qty >= 0),
    CHECK (available_qty <= quantity),
    CHECK (quantity > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create borrow_requests table
CREATE TABLE borrow_requests (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    equipment_id BIGINT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('PENDING', 'APPROVED', 'REJECTED', 'RETURNED') NOT NULL DEFAULT 'PENDING',
    approved_by BIGINT,
    approved_date TIMESTAMP NULL,
    due_date DATE,
    returned_date TIMESTAMP NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (equipment_id) REFERENCES equipment(id) ON DELETE CASCADE,
    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_request_date (request_date),
    INDEX idx_user_status (user_id, status),
    CHECK (quantity > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert sample data for testing

-- Insert users (password for all: password123)
-- Note: These are bcrypt hashes of 'password123'
INSERT INTO users (username, password_hash, email, full_name, role) VALUES
('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'admin@school.edu', 'Admin User', 'ADMIN'),
('john_staff', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'john.staff@school.edu', 'John Staff', 'STAFF'),
('sarah_staff', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'sarah.staff@school.edu', 'Sarah Staff', 'STAFF'),
('alice_student', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'alice@student.school.edu', 'Alice Johnson', 'STUDENT'),
('bob_student', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'bob@student.school.edu', 'Bob Williams', 'STUDENT'),
('charlie_student', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'charlie@student.school.edu', 'Charlie Brown', 'STUDENT');

-- Insert sample equipment
INSERT INTO equipment (name, category, description, quantity, available_qty, `condition`, image_url) VALUES
-- Photography Equipment
('Canon EOS 90D Camera', 'Photography', 'Professional DSLR camera with 24-70mm lens, perfect for photography projects', 3, 3, 'EXCELLENT', 'https://example.com/camera.jpg'),
('Nikon D5600', 'Photography', 'Entry-level DSLR with 18-55mm kit lens', 2, 2, 'GOOD', 'https://example.com/nikon.jpg'),
('Tripod - Manfrotto', 'Photography', 'Professional camera tripod with fluid head', 5, 5, 'GOOD', 'https://example.com/tripod.jpg'),

-- Lab Equipment
('Compound Microscope', 'Lab Equipment', 'Compound microscope for biology experiments with 1000x magnification', 5, 5, 'GOOD', 'https://example.com/microscope.jpg'),
('Digital Multimeter', 'Lab Equipment', 'Digital multimeter for physics lab experiments', 8, 8, 'EXCELLENT', 'https://example.com/multimeter.jpg'),
('Lab Coat', 'Lab Equipment', 'Standard white lab coat, various sizes available', 15, 15, 'GOOD', 'https://example.com/labcoat.jpg'),
('Safety Goggles', 'Lab Equipment', 'Chemical splash protection goggles', 20, 20, 'GOOD', 'https://example.com/goggles.jpg'),

-- Musical Instruments
('Acoustic Guitar - Yamaha', 'Musical Instruments', 'Yamaha acoustic guitar for music class and practice', 4, 4, 'GOOD', 'https://example.com/guitar.jpg'),
('Electric Keyboard', 'Musical Instruments', '61-key electronic keyboard with stand', 3, 3, 'EXCELLENT', 'https://example.com/keyboard.jpg'),
('Violin with Case', 'Musical Instruments', 'Student violin with bow and case', 6, 6, 'GOOD', 'https://example.com/violin.jpg'),

-- Sports Equipment
('Basketball', 'Sports', 'Official size basketball for indoor/outdoor use', 10, 10, 'GOOD', 'https://example.com/basketball.jpg'),
('Football', 'Sports', 'Standard football/soccer ball', 8, 8, 'GOOD', 'https://example.com/football.jpg'),
('Badminton Set', 'Sports', 'Complete badminton set with rackets and shuttlecocks', 5, 5, 'FAIR', 'https://example.com/badminton.jpg'),
('Tennis Racket', 'Sports', 'Professional tennis racket', 6, 6, 'GOOD', 'https://example.com/tennis.jpg'),

-- Electronics
('Laptop - Dell Latitude', 'Electronics', 'Dell Latitude laptop with i5 processor, 8GB RAM, suitable for programming', 6, 6, 'EXCELLENT', 'https://example.com/laptop.jpg'),
('iPad - 10th Gen', 'Electronics', 'iPad with Apple Pencil for digital art and notes', 4, 4, 'EXCELLENT', 'https://example.com/ipad.jpg'),
('Arduino Starter Kit', 'Electronics', 'Arduino Uno with breadboard, sensors, and components', 8, 8, 'GOOD', 'https://example.com/arduino.jpg'),
('Raspberry Pi 4 Kit', 'Electronics', 'Raspberry Pi 4 with case, power supply, and SD card', 5, 5, 'EXCELLENT', 'https://example.com/raspi.jpg'),

-- Project Materials
('3D Printer Filament', 'Project Materials', 'PLA filament for 3D printing projects, 1kg spool', 10, 10, 'EXCELLENT', 'https://example.com/filament.jpg'),
('Projector', 'Project Materials', 'HD projector for presentations', 3, 3, 'GOOD', 'https://example.com/projector.jpg'),
('Whiteboard', 'Project Materials', 'Portable whiteboard with markers', 4, 4, 'FAIR', 'https://example.com/whiteboard.jpg');

-- Insert sample borrow requests with various statuses
INSERT INTO borrow_requests (user_id, equipment_id, quantity, status, approved_by, approved_date, due_date, notes) VALUES
-- Pending requests
(4, 1, 1, 'PENDING', NULL, NULL, DATE_ADD(CURDATE(), INTERVAL 7 DAY), 'Need for photography assignment'),
(5, 8, 1, 'PENDING', NULL, NULL, DATE_ADD(CURDATE(), INTERVAL 5 DAY), 'Music class practice'),
(6, 15, 1, 'PENDING', NULL, NULL, DATE_ADD(CURDATE(), INTERVAL 10 DAY), 'Programming project'),

-- Approved requests (currently borrowed)
(4, 5, 1, 'APPROVED', 2, DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_ADD(CURDATE(), INTERVAL 5 DAY), 'Physics lab experiment'),
(5, 11, 2, 'APPROVED', 2, DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 3 DAY), 'PE class'),
(6, 17, 1, 'APPROVED', 1, DATE_SUB(NOW(), INTERVAL 3 DAY), DATE_ADD(CURDATE(), INTERVAL 11 DAY), 'IoT project'),

-- Rejected requests
(4, 15, 2, 'REJECTED', 2, DATE_SUB(NOW(), INTERVAL 5 DAY), NULL, 'Insufficient quantity available'),

-- Returned requests
(5, 1, 1, 'RETURNED', 2, DATE_SUB(NOW(), INTERVAL 10 DAY), DATE_SUB(CURDATE(), INTERVAL 3 DAY), 'Completed photography project'),
(6, 4, 1, 'RETURNED', 1, DATE_SUB(NOW(), INTERVAL 15 DAY), DATE_SUB(CURDATE(), INTERVAL 8 DAY), 'Lab work completed');

-- Update available quantities based on approved requests
UPDATE equipment SET available_qty = available_qty - 1 WHERE id = 5;  -- Multimeter
UPDATE equipment SET available_qty = available_qty - 2 WHERE id = 11; -- Basketball
UPDATE equipment SET available_qty = available_qty - 1 WHERE id = 17; -- Raspberry Pi

-- Display summary
SELECT 'Database setup completed successfully!' AS Message;
SELECT COUNT(*) AS TotalUsers FROM users;
SELECT COUNT(*) AS TotalEquipment FROM equipment;
SELECT COUNT(*) AS TotalRequests FROM borrow_requests;

