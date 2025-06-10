package dto

import "time"

type UserRegistrationRequest struct {
	Name     string `json:"name" binding:"required" example:"João Silva"`
	Email    string `json:"email" binding:"required,email" example:"joao.silva@example.com"`
	Password string `json:"password" binding:"required,min=6" example:"senha123"`
}

type UserLoginRequest struct {
	Email    string `json:"email" binding:"required,email" example:"joao.silva@example.com"`
	Password string `json:"password" binding:"required" example:"senha123"`
}

type UserResponse struct {
	ID        string    `json:"id" example:"a4b8c16e-1d2e-3f4g-5h6i-7j8k9l0m1n2o"`
	Name      string    `json:"name" example:"João Silva"`
	Email     string    `json:"email" example:"joao.silva@example.com"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
