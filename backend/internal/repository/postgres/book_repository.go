package postgres

import (
    "context"
    "database/sql"
    "errors"

    "github.com/jmoiron/sqlx"

    "github.com/diogo-aparecido-smartfit/bookflow/backend/internal/domain"
    "github.com/diogo-aparecido-smartfit/bookflow/backend/internal/repository"
)

// bookRepository implementa repository.BookRepository
type bookRepository struct {
    db *sqlx.DB
}

// NewBookRepository cria uma nova instância do BookRepository
func NewBookRepository(db *sqlx.DB) repository.BookRepository {
    return &bookRepository{
        db: db,
    }
}

// FindByID busca um livro pelo ID
func (r *bookRepository) FindByID(ctx context.Context, id string) (*domain.Book, error) {
    const query = `SELECT id, title, author, isbn, description, cover_url, status, 
                  created_at, updated_at FROM books WHERE id = $1`
    
    var book domain.Book
    err := r.db.GetContext(ctx, &book, query, id)
    if err != nil {
        if errors.Is(err, sql.ErrNoRows) {
            return nil, domain.ErrBookNotFound
        }
        return nil, err
    }
    
    return &book, nil
}

// FindAll busca todos os livros com paginação
func (r *bookRepository) FindAll(ctx context.Context, limit, offset int) ([]*domain.Book, error) {
    const query = `SELECT id, title, author, isbn, description, cover_url, status, 
                  created_at, updated_at FROM books ORDER BY created_at DESC LIMIT $1 OFFSET $2`
    
    var books []*domain.Book
    err := r.db.SelectContext(ctx, &books, query, limit, offset)
    if err != nil {
        return nil, err
    }
    
    return books, nil
}

// Create insere um novo livro
func (r *bookRepository) Create(ctx context.Context, book *domain.Book) error {
    const query = `INSERT INTO books (id, title, author, isbn, description, cover_url, status, 
                   created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`
    
    _, err := r.db.ExecContext(ctx, query, book.ID, book.Title, book.Author, book.ISBN,
        book.Description, book.CoverURL, book.Status, book.CreatedAt, book.UpdatedAt)
    
    return err
}

// Update atualiza um livro existente
func (r *bookRepository) Update(ctx context.Context, book *domain.Book) error {
    const query = `UPDATE books SET title = $1, author = $2, isbn = $3, description = $4, 
                  cover_url = $5, status = $6, updated_at = $7 WHERE id = $8`
    
    result, err := r.db.ExecContext(ctx, query, book.Title, book.Author, book.ISBN,
        book.Description, book.CoverURL, book.Status, book.UpdatedAt, book.ID)
    if err != nil {
        return err
    }
    
    rowsAffected, err := result.RowsAffected()
    if err != nil {
        return err
    }
    
    if rowsAffected == 0 {
        return domain.ErrBookNotFound
    }
    
    return nil
}

// Delete remove um livro pelo ID
func (r *bookRepository) Delete(ctx context.Context, id string) error {
    const query = `DELETE FROM books WHERE id = $1`
    
    result, err := r.db.ExecContext(ctx, query, id)
    if err != nil {
        return err
    }
    
    rowsAffected, err := result.RowsAffected()
    if err != nil {
        return err
    }
    
    if rowsAffected == 0 {
        return domain.ErrBookNotFound
    }
    
    return nil
}
