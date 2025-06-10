package handler

import (
    "net/http"
    "strconv"

    "github.com/gin-gonic/gin"

    "github.com/diogo-aparecido-smartfit/bookflow/backend/internal/domain"
    "github.com/diogo-aparecido-smartfit/bookflow/backend/internal/usecase"
)

type BookHandler struct {
    bookService *usecase.BookService
}

func NewBookHandler(bookService *usecase.BookService) *BookHandler {
    return &BookHandler{
        bookService: bookService,
    }
}

// GetBook godoc
// @Summary      Get a book
// @Description  Get a book by its ID
// @Tags         books
// @Accept       json
// @Produce      json
// @Param        id   path      string  true  "Book ID"
// @Success      200  {object}  domain.Book
// @Failure      404  {object}  handler.ErrorResponse
// @Failure      500  {object}  handler.ErrorResponse
// @Router       /books/{id} [get]
func (h *BookHandler) GetBook(c *gin.Context) {
    id := c.Param("id")
    
    book, err := h.bookService.GetBook(c.Request.Context(), id)
    if err != nil {
        if err == domain.ErrBookNotFound {
            c.JSON(http.StatusNotFound, gin.H{"error": "book not found"})
            return
        }
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    
    c.JSON(http.StatusOK, book)
}

// ListBooks godoc
// @Summary      List books
// @Description  Get a paginated list of all books
// @Tags         books
// @Accept       json
// @Produce      json
// @Param        page       query     int  false  "Page number"       default(1)
// @Param        page_size  query     int  false  "Items per page"    default(10)
// @Success      200        {array}   domain.Book
// @Failure      500        {object}  handler.ErrorResponse
// @Router       /books [get]
func (h *BookHandler) ListBooks(c *gin.Context) {
    pageStr := c.DefaultQuery("page", "1")
    pageSizeStr := c.DefaultQuery("page_size", "10")
    
    page, err := strconv.Atoi(pageStr)
    if err != nil || page < 1 {
        page = 1
    }
    
    pageSize, err := strconv.Atoi(pageSizeStr)
    if err != nil || pageSize < 1 {
        pageSize = 10
    }
    
    books, err := h.bookService.ListBooks(c.Request.Context(), page, pageSize)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    
    c.JSON(http.StatusOK, books)
}

// CreateBook godoc
// @Summary      Create a book
// @Description  Add a new book to the database
// @Tags         books
// @Accept       json
// @Produce      json
// @Param        book  body      domain.Book  true  "Book information"
// @Success      201   {object}  domain.Book
// @Failure      400   {object}  handler.ErrorResponse
// @Failure      500   {object}  handler.ErrorResponse
// @Router       /books [post]
func (h *BookHandler) CreateBook(c *gin.Context) {
    var book domain.Book
    
    if err := c.ShouldBindJSON(&book); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
        return
    }
    
    if err := h.bookService.CreateBook(c.Request.Context(), &book); err != nil {
        if err == domain.ErrInvalidInput {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    
    c.JSON(http.StatusCreated, book)
}

// UpdateBook godoc
// @Summary      Update a book
// @Description  Update an existing book by ID
// @Tags         books
// @Accept       json
// @Produce      json
// @Param        id    path      string       true  "Book ID"
// @Param        book  body      domain.Book  true  "Book information"
// @Success      200   {object}  domain.Book
// @Failure      400   {object}  handler.ErrorResponse
// @Failure      404   {object}  handler.ErrorResponse
// @Failure      500   {object}  handler.ErrorResponse
// @Router       /books/{id} [put]
func (h *BookHandler) UpdateBook(c *gin.Context) {
    id := c.Param("id")
    
    var book domain.Book
    if err := c.ShouldBindJSON(&book); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
        return
    }
    
    if err := h.bookService.UpdateBook(c.Request.Context(), id, &book); err != nil {
        if err == domain.ErrBookNotFound {
            c.JSON(http.StatusNotFound, gin.H{"error": "book not found"})
            return
        }
        if err == domain.ErrInvalidInput {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    
    // Busca o livro atualizado
    updatedBook, err := h.bookService.GetBook(c.Request.Context(), id)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    
    c.JSON(http.StatusOK, updatedBook)
}

// DeleteBook godoc
// @Summary      Delete a book
// @Description  Remove a book by ID
// @Tags         books
// @Accept       json
// @Produce      json
// @Param        id   path      string  true  "Book ID"
// @Success      204  {object}  nil
// @Failure      404  {object}  handler.ErrorResponse
// @Failure      500  {object}  handler.ErrorResponse
// @Router       /books/{id} [delete]
func (h *BookHandler) DeleteBook(c *gin.Context) {
    id := c.Param("id")
    
    if err := h.bookService.DeleteBook(c.Request.Context(), id); err != nil {
        if err == domain.ErrBookNotFound {
            c.JSON(http.StatusNotFound, gin.H{"error": "book not found"})
            return
        }
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    
    c.Status(http.StatusNoContent)
}

func (h *BookHandler) RegisterRoutes(router *gin.RouterGroup) {
    books := router.Group("/books")
    {
        books.GET("/:id", h.GetBook)
        books.GET("", h.ListBooks)
        books.POST("", h.CreateBook)
        books.PUT("/:id", h.UpdateBook)
        books.DELETE("/:id", h.DeleteBook)
    }
}
