package usecase

import (
    "context"
    "time"

    "github.com/google/uuid"

    "github.com/diogo-aparecido-smartfit/bookflow/backend/internal/domain"
    "github.com/diogo-aparecido-smartfit/bookflow/backend/internal/repository"
)

// BookService define operações de alto nível para gerenciar livros
type BookService struct {
    bookRepo repository.BookRepository
}

// NewBookService cria um novo serviço de livros
func NewBookService(bookRepo repository.BookRepository) *BookService {
    return &BookService{
        bookRepo: bookRepo,
    }
}

// GetBook busca um livro pelo ID
func (s *BookService) GetBook(ctx context.Context, id string) (*domain.Book, error) {
    return s.bookRepo.FindByID(ctx, id)
}

// ListBooks lista todos os livros com paginação
func (s *BookService) ListBooks(ctx context.Context, page, pageSize int) ([]*domain.Book, error) {
    if page < 1 {
        page = 1
    }
    if pageSize < 1 || pageSize > 100 {
        pageSize = 10
    }
    
    offset := (page - 1) * pageSize
    return s.bookRepo.FindAll(ctx, pageSize, offset)
}

// CreateBook cria um novo livro
func (s *BookService) CreateBook(ctx context.Context, book *domain.Book) error {
    // Validação dos dados
    if book.Title == "" || book.Author == "" {
        return domain.ErrInvalidInput
    }
    
    // Gerar ID e timestamps
    book.ID = uuid.New().String()
    now := time.Now()
    book.CreatedAt = now
    book.UpdatedAt = now
    
    // Status padrão é available
    if book.Status == "" {
        book.Status = domain.StatusAvailable
    }
    
    // Persiste no repositório
    return s.bookRepo.Create(ctx, book)
}

// UpdateBook atualiza um livro existente
func (s *BookService) UpdateBook(ctx context.Context, id string, book *domain.Book) error {
    // Validação dos dados
    if book.Title == "" || book.Author == "" {
        return domain.ErrInvalidInput
    }
    
    // Busca o livro atual
    existingBook, err := s.bookRepo.FindByID(ctx, id)
    if err != nil {
        return err
    }
    
    // Atualiza os campos
    existingBook.Title = book.Title
    existingBook.Author = book.Author
    existingBook.ISBN = book.ISBN
    existingBook.Description = book.Description
    
    if book.CoverURL != "" {
        existingBook.CoverURL = book.CoverURL
    }
    
    if book.Status != "" {
        existingBook.Status = book.Status
    }
    
    existingBook.UpdatedAt = time.Now()
    
    // Persiste no repositório
    return s.bookRepo.Update(ctx, existingBook)
}

// DeleteBook remove um livro pelo ID
func (s *BookService) DeleteBook(ctx context.Context, id string) error {
    return s.bookRepo.Delete(ctx, id)
}
