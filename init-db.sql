-- Initialize Book Database
-- This file is executed when the MariaDB container starts for the first time

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS book_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use the database
USE book_database;

-- Create tables if they don't exist
-- Note: The actual table creation is handled by Spring Boot JPA/Liquibase
-- This file is mainly for database initialization

-- Grant permissions to the application user
GRANT ALL PRIVILEGES ON book_database.* TO 'bookuser'@'%';
FLUSH PRIVILEGES;

-- Show database status
SHOW DATABASES;
SELECT 'Book Database initialized successfully!' as status; 