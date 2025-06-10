package usecase

import (
	"context"
	"time"

	"github.com/google/uuid"

	"github.com/diogo-aparecido-smartfit/bookflow/backend/internal/domain"
	"github.com/diogo-aparecido-smartfit/bookflow/backend/internal/repository"
)

type BookService struct {
	bookRepo repository.BookRepository
}

func NewBookService(bookRepo repository.BookRepository) *BookService {
	return &BookService{
		bookRepo: bookRepo,
	}
}

func (s *BookService) GetBook(ctx context.Context, id string) (*domain.Book, error) {
	return s.bookRepo.FindByID(ctx, id)
}

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

func (s *BookService) CreateBook(ctx context.Context, book *domain.Book) error {
	if book.Title == "" || book.Author == "" {
		return domain.ErrInvalidInput
	}

	book.ID = uuid.New().String()
	now := time.Now()
	book.CreatedAt = now
	book.UpdatedAt = now

	if book.Status == "" {
		book.Status = domain.StatusAvailable
	}

	return s.bookRepo.Create(ctx, book)
}

func (s *BookService) UpdateBook(ctx context.Context, id string, book *domain.Book) error {
	if book.Title == "" || book.Author == "" {
		return domain.ErrInvalidInput
	}

	existingBook, err := s.bookRepo.FindByID(ctx, id)
	if err != nil {
		return err
	}

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

	return s.bookRepo.Update(ctx, existingBook)
}

func (s *BookService) DeleteBook(ctx context.Context, id string) error {
	return s.bookRepo.Delete(ctx, id)
}
