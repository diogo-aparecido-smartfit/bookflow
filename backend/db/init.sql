CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Criação da tabela de livros
CREATE TABLE IF NOT EXISTS books (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    isbn VARCHAR(20),
    description TEXT,
    cover_url TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'available',
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_books_title ON books(title);
CREATE INDEX IF NOT EXISTS idx_books_author ON books(author);
CREATE INDEX IF NOT EXISTS idx_books_status ON books(status);

INSERT INTO users (id, name, email, password, created_at, updated_at)
VALUES 
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Admin User', 'example@example.com', '$2a$10$gFpmYjNrVZTXVQfFnEwVx.1U8I1dMK6.Ec.Rw8bU0LXty2LTkWMwu', NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

INSERT INTO books (id, title, author, isbn, description, cover_url, status, created_at, updated_at)
VALUES
('550e8400-e29b-41d4-a716-446655440000', 'O Senhor dos Anéis', 'J.R.R. Tolkien', '9788533615120', 'Uma história épica de fantasia...', 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'available', NOW(), NOW()),
('f47ac10b-58cc-4372-a567-0e02b2c3d480', 'Harry Potter e a Pedra Filosofal', 'J.K. Rowling', '9788532511010', 'O começo da jornada de um jovem bruxo...', 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'available', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;