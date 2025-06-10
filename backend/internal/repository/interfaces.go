package repository

import (
    "context"

    "github.com/diogo-aparecido-smartfit/bookflow/backend/internal/domain"
)

type BookRepository interface {
    FindByID(ctx context.Context, id string) (*domain.Book, error)
    FindAll(ctx context.Context, limit, offset int) ([]*domain.Book, error)
    Create(ctx context.Context, book *domain.Book) error
    Update(ctx context.Context, book *domain.Book) error
    Delete(ctx context.Context, id string) error
}

type UserRepository interface {
    FindByID(ctx context.Context, id string) (*domain.User, error)
    FindByEmail(ctx context.Context, email string) (*domain.User, error)
    FindAll(ctx context.Context, limit, offset int) ([]*domain.User, error)
    Create(ctx context.Context, user *domain.User) error
    Update(ctx context.Context, user *domain.User) error
    Delete(ctx context.Context, id string) error
}