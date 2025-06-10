package domain

import (
    "time"
)

// User representa a entidade usuário no sistema
// @Description User entity representing a user in the system
type User struct {
    // ID único do usuário
    ID        string    `json:"id" db:"id" example:"a4b8c16e-1d2e-3f4g-5h6i-7j8k9l0m1n2o"`
    // Nome do usuário
    Name      string    `json:"name" db:"name" example:"João Silva" binding:"required"`
    // Email do usuário (único)
    Email     string    `json:"email" db:"email" example:"joao.silva@example.com" binding:"required,email"`
    // Senha do usuário (não retornada nas respostas)
    Password  string    `json:"-" db:"password" binding:"required,min=6"`
    // Data de criação do registro
    CreatedAt time.Time `json:"created_at" db:"created_at"`
    // Data de atualização do registro
    UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}