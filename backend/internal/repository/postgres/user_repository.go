package postgres

import (
    "context"
    "database/sql"
    "errors"

    "github.com/jmoiron/sqlx"

    "github.com/diogo-aparecido-smartfit/bookflow/backend/internal/domain"
    "github.com/diogo-aparecido-smartfit/bookflow/backend/internal/repository"
)

// userRepository implementa repository.UserRepository
type userRepository struct {
    db *sqlx.DB
}

// NewUserRepository cria uma nova instância do UserRepository
func NewUserRepository(db *sqlx.DB) repository.UserRepository {
    return &userRepository{
        db: db,
    }
}

// FindByID busca um usuário pelo ID
func (r *userRepository) FindByID(ctx context.Context, id string) (*domain.User, error) {
    const query = `SELECT id, name, email, password, created_at, updated_at FROM users WHERE id = $1`
    
    var user domain.User
    err := r.db.GetContext(ctx, &user, query, id)
    if err != nil {
        if errors.Is(err, sql.ErrNoRows) {
            return nil, domain.ErrUserNotFound
        }
        return nil, err
    }
    
    return &user, nil
}

// FindByEmail busca um usuário pelo email
func (r *userRepository) FindByEmail(ctx context.Context, email string) (*domain.User, error) {
    const query = `SELECT id, name, email, password, created_at, updated_at FROM users WHERE email = $1`
    
    var user domain.User
    err := r.db.GetContext(ctx, &user, query, email)
    if err != nil {
        if errors.Is(err, sql.ErrNoRows) {
            return nil, domain.ErrUserNotFound
        }
        return nil, err
    }
    
    return &user, nil
}

// FindAll busca todos os usuários com paginação
func (r *userRepository) FindAll(ctx context.Context, limit, offset int) ([]*domain.User, error) {
    const query = `SELECT id, name, email, created_at, updated_at FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2`
    
    var users []*domain.User
    err := r.db.SelectContext(ctx, &users, query, limit, offset)
    if err != nil {
        return nil, err
    }
    
    return users, nil
}

// Create insere um novo usuário
func (r *userRepository) Create(ctx context.Context, user *domain.User) error {
    const query = `INSERT INTO users (id, name, email, password, created_at, updated_at) 
                  VALUES ($1, $2, $3, $4, $5, $6)`
    
    _, err := r.db.ExecContext(ctx, query, user.ID, user.Name, user.Email, 
        user.Password, user.CreatedAt, user.UpdatedAt)
    
    return err
}

// Update atualiza um usuário existente
func (r *userRepository) Update(ctx context.Context, user *domain.User) error {
    const query = `UPDATE users SET name = $1, email = $2, password = $3, 
                  updated_at = $4 WHERE id = $5`
    
    result, err := r.db.ExecContext(ctx, query, user.Name, user.Email, 
        user.Password, user.UpdatedAt, user.ID)
    if err != nil {
        return err
    }
    
    rowsAffected, err := result.RowsAffected()
    if err != nil {
        return err
    }
    
    if rowsAffected == 0 {
        return domain.ErrUserNotFound
    }
    
    return nil
}

// Delete remove um usuário pelo ID
func (r *userRepository) Delete(ctx context.Context, id string) error {
    const query = `DELETE FROM users WHERE id = $1`
    
    result, err := r.db.ExecContext(ctx, query, id)
    if err != nil {
        return err
    }
    
    rowsAffected, err := result.RowsAffected()
    if err != nil {
        return err
    }
    
    if rowsAffected == 0 {
        return domain.ErrUserNotFound
    }
    
    return nil
}
