package domain

import (
    "time"
)

// Book representa a entidade livro no sistema
// @Description Book entity representing a book in the system
type Book struct {
    // ID único do livro
    ID          string    `json:"id" db:"id" example:"e0c7f36a-9c5e-4c7d-b0a1-596b344f3a0b"`
    // Título do livro
    Title       string    `json:"title" db:"title" example:"O Senhor dos Anéis" binding:"required"`
    // Autor do livro
    Author      string    `json:"author" db:"author" example:"J.R.R. Tolkien" binding:"required"`
    // ISBN do livro
    ISBN        string    `json:"isbn" db:"isbn" example:"9788533615120"`
    // Descrição do livro
    Description string    `json:"description" db:"description" example:"Uma história épica de fantasia..."`
    // URL da capa do livro
    CoverURL    string    `json:"cover_url" db:"cover_url" example:"https://example.com/cover.jpg"`
    // Status do livro (available, borrowed, lost)
    Status      string    `json:"status" db:"status" example:"available" enums:"available,borrowed,lost"`
    // Data de criação do registro
    CreatedAt   time.Time `json:"created_at" db:"created_at"`
    // Data de atualização do registro
    UpdatedAt   time.Time `json:"updated_at" db:"updated_at"`
}

// BookStatus define os possíveis estados de um livro
const (
    StatusAvailable = "available"
    StatusBorrowed  = "borrowed"
    StatusLost      = "lost"
)