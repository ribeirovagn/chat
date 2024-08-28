-- Criação do Schema
CREATE SCHEMA IF NOT EXISTS bee_database;

-- Uso do Schema
SET search_path TO bee_database;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE messages (
    id UUID PRIMARY KEY,
    sender_id UUID REFERENCES users(id),
    recipient_id UUID REFERENCES users(id),
    message TEXT NOT NULL,
    send_at TIMESTAMP NOT NULL,
    status SMALLINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE message_status (
    id UUID PRIMARY KEY,
    ordering SMALLINT NOT NULL,
    name VARCHAR(20) NOT NULL
);

CREATE TABLE messages_have_status (
    message_id UUID REFERENCES messages(id),
    message_status_id UUID REFERENCES message_status(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- INSERT INTO users (id, name, email)
-- VALUES
--     ('d290f1ee-6c54-4b01-90e6-d701748f0851', 'Ribeiro', 'ribeiro@example.com'),
--     ('d290f1ee-6c54-4b01-90e6-d701748f0852', 'Vagner', 'vagner@example.com');


INSERT INTO message_status(id, ordering, name)
VALUES
    (uuid_generate_v4(), 0, 'create'),
    (uuid_generate_v4(), 1, 'send'),
    (uuid_generate_v4(), 2, 'receipt'),
    (uuid_generate_v4(), 3, 'read');