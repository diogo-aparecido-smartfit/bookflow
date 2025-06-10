package domain

import "errors"

// Erros do domínio
var (
    ErrBookNotFound = errors.New("book not found")
    ErrUserNotFound = errors.New("user not found")
    ErrInvalidInput = errors.New("invalid input")
)
