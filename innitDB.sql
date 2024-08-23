-- Criação do Schema
CREATE SCHEMA IF NOT EXISTS bee_database;

-- Uso do Schema
SET search_path TO bee_database;
CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE messages (
    id UUID PRIMARY KEY,
    sender UUID REFERENCES users(id),
    recipient UUID REFERENCES users(id),
    message TEXT NOT NULL,
    send_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);