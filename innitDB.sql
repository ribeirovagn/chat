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

INSERT INTO users (id, name, email)
VALUES
    ('d290f1ee-6c54-4b01-90e6-d701748f0851', 'Ribeiro', 'ribeiro@example.com'),
    ('d290f1ee-6c54-4b01-90e6-d701748f0852', 'Vagner', 'vagner@example.com');
